import { r as reactExports } from "./react.mjs";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _a, _b;
typeof window !== "undefined" && (((_a = window.document) == null ? void 0 : _a.createElement) || ((_b = window.navigator) == null ? void 0 : _b.product) === "ReactNative") ? reactExports.useLayoutEffect : reactExports.useEffect;
function traverseFiber(fiber, ascending, selector) {
  if (!fiber)
    return;
  if (selector(fiber) === true)
    return fiber;
  let child = fiber.child;
  while (child) {
    const match = traverseFiber(child, ascending, selector);
    if (match)
      return match;
    child = child.sibling;
  }
}
function wrapContext(context) {
  try {
    return Object.defineProperties(context, {
      _currentRenderer: {
        get() {
          return null;
        },
        set() {
        }
      },
      _currentRenderer2: {
        get() {
          return null;
        },
        set() {
        }
      }
    });
  } catch (_) {
    return context;
  }
}
const error = console.error;
console.error = function() {
  const message = [...arguments].join("");
  if ((message == null ? void 0 : message.startsWith("Warning:")) && message.includes("useContext")) {
    console.error = error;
    return;
  }
  return error.apply(this, arguments);
};
const FiberContext = wrapContext(reactExports.createContext(null));
class FiberProvider extends reactExports.Component {
  render() {
    return /* @__PURE__ */ reactExports.createElement(FiberContext.Provider, {
      value: this._reactInternals
    }, this.props.children);
  }
}
function useFiber() {
  const root = reactExports.useContext(FiberContext);
  if (root === null)
    throw new Error("its-fine: useFiber must be called within a <FiberProvider />!");
  const id = reactExports.useId();
  const fiber = reactExports.useMemo(() => {
    for (const maybeFiber of [root, root == null ? void 0 : root.alternate]) {
      if (!maybeFiber)
        continue;
      const fiber2 = traverseFiber(maybeFiber, false, (node) => {
        let state = node.memoizedState;
        while (state) {
          if (state.memoizedState === id)
            return true;
          state = state.next;
        }
      });
      if (fiber2)
        return fiber2;
    }
  }, [root, id]);
  return fiber;
}
function useContextMap() {
  const fiber = useFiber();
  const [contextMap] = reactExports.useState(() => /* @__PURE__ */ new Map());
  contextMap.clear();
  let node = fiber;
  while (node) {
    if (node.type && typeof node.type === "object") {
      const enableRenderableContext = node.type._context === void 0 && node.type.Provider === node.type;
      const context = enableRenderableContext ? node.type : node.type._context;
      if (context && context !== FiberContext && !contextMap.has(context)) {
        contextMap.set(context, reactExports.useContext(wrapContext(context)));
      }
    }
    node = node.return;
  }
  return contextMap;
}
function useContextBridge() {
  const contextMap = useContextMap();
  return reactExports.useMemo(
    () => Array.from(contextMap.keys()).reduce(
      (Prev, context) => (props) => /* @__PURE__ */ reactExports.createElement(Prev, null, /* @__PURE__ */ reactExports.createElement(context.Provider, __spreadProps(__spreadValues({}, props), {
        value: contextMap.get(context)
      }))),
      (props) => /* @__PURE__ */ reactExports.createElement(FiberProvider, __spreadValues({}, props))
    ),
    [contextMap]
  );
}
export {
  FiberProvider as F,
  useContextBridge as u
};
