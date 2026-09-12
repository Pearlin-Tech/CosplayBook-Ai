import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { C as Canvas, b as useLoader, a as useFrame } from "../_libs/react-three__fiber.mjs";
import { E as Environment, C as ContactShadows, O as OrbitControls, H as Html } from "../_libs/react-three__drei.mjs";
import { a5 as SRGBColorSpace, n as PlaneGeometry, h as Color, a8 as FrontSide, a9 as TextureLoader, aa as MultiplyBlending } from "../_libs/three.mjs";
import "../_libs/react-reconciler.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/suspend-react.mjs";
import "../_libs/debounce.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/react-dom.mjs";
import "stream";
import "util";
import "../_libs/three-stdlib.mjs";
import "../_libs/fflate.mjs";
import "module";
import "../_libs/monogrid__gainmap-js.mjs";
const BG = {
  studio: { color: "#F4F3F0", env: "studio" },
  warm: { color: "#EAE2D3", env: "apartment" },
  noir: { color: "#141414", env: "warehouse" }
};
function GarmentMesh({
  frontUrl,
  backUrl,
  designUrl,
  designPlacement,
  designOnBack,
  colorHex,
  autoRotate,
  hd,
  aspect
}) {
  const group = reactExports.useRef(null);
  const [frontTex, backTex] = useLoader(TextureLoader, [frontUrl, backUrl]);
  const designTex = useLoader(TextureLoader, designUrl || frontUrl);
  [frontTex, backTex, designTex].forEach((t) => {
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = hd ? 16 : 4;
  });
  const W = 2.4;
  const H = W / aspect;
  useFrame((_, dt) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += dt * 0.45;
    }
  });
  const geo = reactExports.useMemo(() => {
    const g = new PlaneGeometry(W, H, 32, 32);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = -Math.pow(x / (W / 2), 2) * 0.08;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, [W, H]);
  const color = reactExports.useMemo(() => new Color(colorHex), [colorHex]);
  const overlay = (placement, isBack) => {
    if (!placement || !designUrl) return null;
    const ow = placement.w / 100 * W;
    const ratio = designTex.image ? designTex.image.height / designTex.image.width : 1;
    const oh = ow * ratio;
    const lx = (placement.x / 100 - 0.5) * W * (isBack ? -1 : 1);
    const ly = -(placement.y / 100 - 0.5) * H;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { position: [lx, ly, isBack ? -0.012 : 0.012], rotation: [0, isBack ? Math.PI : 0, 0], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("planeGeometry", { args: [ow, oh] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "meshStandardMaterial",
        {
          map: designTex,
          transparent: true,
          blending: MultiplyBlending,
          depthWrite: false,
          roughness: 0.95,
          toneMapped: false
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: group, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: geo, position: [0, 0, 0.01], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        map: frontTex,
        color,
        roughness: hd ? 0.85 : 1,
        metalness: 0,
        side: FrontSide
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { geometry: geo, rotation: [0, Math.PI, 0], position: [0, 0, -0.01], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "meshStandardMaterial",
      {
        map: backTex,
        color,
        roughness: hd ? 0.85 : 1,
        metalness: 0,
        side: FrontSide
      }
    ) }),
    overlay(designPlacement, false),
    overlay(designOnBack, true)
  ] });
}
function Loader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Html, { center: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/60", children: "Rendering Atelier ·" }) });
}
function Garment3D(props) {
  const bg = BG[props.background];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      shadows: true,
      dpr: [1, 2],
      camera: { position: [0, 0, 4.2], fov: 32 },
      gl: { antialias: true, preserveDrawingBuffer: false },
      style: { background: bg.color },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.55 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [3, 4, 5], intensity: 1.1, castShadow: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [-3, 2, -2], intensity: 0.35 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GarmentMesh, { ...props }),
          props.hd && /* @__PURE__ */ jsxRuntimeExports.jsx(Environment, { preset: bg.env, background: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactShadows, { position: [0, -1.6, 0], opacity: 0.35, scale: 6, blur: 2.4, far: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OrbitControls,
          {
            enablePan: false,
            enableZoom: true,
            minDistance: 3.2,
            maxDistance: 6.5,
            autoRotate: false,
            rotateSpeed: 0.9,
            target: [0, 0, 0]
          }
        )
      ]
    }
  );
}
export {
  Garment3D as default
};
