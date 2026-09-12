import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      console.log(`[SSR] BEFORE rendering: ${request.url}`);
      const handler = await getServerEntry();
      console.log(`[SSR] AFTER getServerEntry`);
      
      const response = await handler.fetch(request, env, ctx);
      console.log(`[SSR] AFTER the React/TanStack render function starts. Status: ${response.status}`);

      let finalResponse = await normalizeCatastrophicSsrResponse(response);

      if (finalResponse.body) {
        let firstChunk = true;
        const transform = new TransformStream({
          start() {
            console.log(`[SSR] stream started`);
          },
          transform(chunk, controller) {
            if (firstChunk) {
              console.log(`[SSR] first streamed chunk received. Size: ${chunk?.length ?? chunk?.byteLength ?? 'unknown'}`);
              firstChunk = false;
            }
            controller.enqueue(chunk);
          },
          flush() {
            console.log(`[SSR] stream close / render completion`);
          }
        });
        
        finalResponse = new Response(finalResponse.body.pipeThrough(transform), {
          status: finalResponse.status,
          statusText: finalResponse.statusText,
          headers: finalResponse.headers,
        });
      } else {
        console.log(`[SSR] Response has no body stream.`);
      }

      return finalResponse;
    } catch (error) {
      console.error(`[SSR] stream error / catastrophic error:`, error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
