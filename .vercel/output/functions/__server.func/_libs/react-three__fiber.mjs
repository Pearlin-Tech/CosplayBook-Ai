import { R as Raycaster, O as OrthographicCamera, P as PerspectiveCamera, S as Scene, a as PCFSoftShadowMap, V as VSMShadowMap, b as PCFShadowMap, B as BasicShadowMap, N as NoToneMapping, A as ACESFilmicToneMapping, W as WebGLRenderer, C as Camera, c as Vector2, d as Vector3, e as Clock, f as BufferGeometry, M as Material, L as Layers, T as Texture, g as RGBAFormat, U as UnsignedByteType, h as Color, i as THREE } from "./three.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
import { c as constantsExports, R as Reconciler } from "./react-reconciler.mjs";
import { c as create } from "./zustand.mjs";
import { s as suspend, p as preload, c as clear } from "./suspend-react.mjs";
import { s as schedulerExports } from "./scheduler.mjs";
import { c as createDebounce } from "./debounce.mjs";
import { F as FiberProvider, u as useContextBridge } from "./its-fine.mjs";
const catalogue = {};
const extend = (objects) => void Object.assign(catalogue, objects);
function createRenderer(_roots, _getEventPriority) {
  function createInstance(type, {
    args = [],
    attach: attach2,
    ...props
  }, root) {
    let name = `${type[0].toUpperCase()}${type.slice(1)}`;
    let instance;
    if (type === "primitive") {
      if (props.object === void 0) throw new Error("R3F: Primitives without 'object' are invalid!");
      const object = props.object;
      instance = prepare(object, {
        type,
        root,
        attach: attach2,
        primitive: true
      });
    } else {
      const target = catalogue[name];
      if (!target) {
        throw new Error(`R3F: ${name} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);
      }
      if (!Array.isArray(args)) throw new Error("R3F: The args prop must be an array!");
      instance = prepare(new target(...args), {
        type,
        root,
        attach: attach2,
        // Save args in case we need to reconstruct later for HMR
        memoizedProps: {
          args
        }
      });
    }
    if (instance.__r3f.attach === void 0) {
      if (instance instanceof BufferGeometry) instance.__r3f.attach = "geometry";
      else if (instance instanceof Material) instance.__r3f.attach = "material";
    }
    if (name !== "inject") applyProps$1(instance, props);
    return instance;
  }
  function appendChild(parentInstance, child) {
    let added = false;
    if (child) {
      var _child$__r3f, _parentInstance$__r3f;
      if ((_child$__r3f = child.__r3f) != null && _child$__r3f.attach) {
        attach(parentInstance, child, child.__r3f.attach);
      } else if (child.isObject3D && parentInstance.isObject3D) {
        parentInstance.add(child);
        added = true;
      }
      if (!added) (_parentInstance$__r3f = parentInstance.__r3f) == null ? void 0 : _parentInstance$__r3f.objects.push(child);
      if (!child.__r3f) prepare(child, {});
      child.__r3f.parent = parentInstance;
      updateInstance(child);
      invalidateInstance(child);
    }
  }
  function insertBefore(parentInstance, child, beforeChild) {
    let added = false;
    if (child) {
      var _child$__r3f2, _parentInstance$__r3f2;
      if ((_child$__r3f2 = child.__r3f) != null && _child$__r3f2.attach) {
        attach(parentInstance, child, child.__r3f.attach);
      } else if (child.isObject3D && parentInstance.isObject3D) {
        child.parent = parentInstance;
        child.dispatchEvent({
          type: "added"
        });
        parentInstance.dispatchEvent({
          type: "childadded",
          child
        });
        const restSiblings = parentInstance.children.filter((sibling) => sibling !== child);
        const index = restSiblings.indexOf(beforeChild);
        parentInstance.children = [...restSiblings.slice(0, index), child, ...restSiblings.slice(index)];
        added = true;
      }
      if (!added) (_parentInstance$__r3f2 = parentInstance.__r3f) == null ? void 0 : _parentInstance$__r3f2.objects.push(child);
      if (!child.__r3f) prepare(child, {});
      child.__r3f.parent = parentInstance;
      updateInstance(child);
      invalidateInstance(child);
    }
  }
  function removeRecursive(array, parent, dispose2 = false) {
    if (array) [...array].forEach((child) => removeChild(parent, child, dispose2));
  }
  function removeChild(parentInstance, child, dispose2) {
    if (child) {
      var _parentInstance$__r3f3, _child$__r3f3, _child$__r3f5;
      if (child.__r3f) child.__r3f.parent = null;
      if ((_parentInstance$__r3f3 = parentInstance.__r3f) != null && _parentInstance$__r3f3.objects) parentInstance.__r3f.objects = parentInstance.__r3f.objects.filter((x) => x !== child);
      if ((_child$__r3f3 = child.__r3f) != null && _child$__r3f3.attach) {
        detach(parentInstance, child, child.__r3f.attach);
      } else if (child.isObject3D && parentInstance.isObject3D) {
        var _child$__r3f4;
        parentInstance.remove(child);
        if ((_child$__r3f4 = child.__r3f) != null && _child$__r3f4.root) {
          removeInteractivity(findInitialRoot(child), child);
        }
      }
      const isPrimitive = (_child$__r3f5 = child.__r3f) == null ? void 0 : _child$__r3f5.primitive;
      const shouldDispose = !isPrimitive && (dispose2 === void 0 ? child.dispose !== null : dispose2);
      if (!isPrimitive) {
        var _child$__r3f6;
        removeRecursive((_child$__r3f6 = child.__r3f) == null ? void 0 : _child$__r3f6.objects, child, shouldDispose);
        removeRecursive(child.children, child, shouldDispose);
      }
      delete child.__r3f;
      if (shouldDispose && child.dispose && child.type !== "Scene") {
        const callback = () => {
          try {
            child.dispose();
          } catch (e) {
          }
        };
        if (typeof IS_REACT_ACT_ENVIRONMENT === "undefined") {
          schedulerExports.unstable_scheduleCallback(schedulerExports.unstable_IdlePriority, callback);
        } else {
          callback();
        }
      }
      invalidateInstance(parentInstance);
    }
  }
  function switchInstance(instance, type, newProps, fiber) {
    var _instance$__r3f;
    const parent = (_instance$__r3f = instance.__r3f) == null ? void 0 : _instance$__r3f.parent;
    if (!parent) return;
    const newInstance = createInstance(type, newProps, instance.__r3f.root);
    if (instance.children) {
      for (const child of instance.children) {
        if (child.__r3f) appendChild(newInstance, child);
      }
      instance.children = instance.children.filter((child) => !child.__r3f);
    }
    instance.__r3f.objects.forEach((child) => appendChild(newInstance, child));
    instance.__r3f.objects = [];
    if (!instance.__r3f.autoRemovedBeforeAppend) {
      removeChild(parent, instance);
    }
    if (newInstance.parent) {
      newInstance.__r3f.autoRemovedBeforeAppend = true;
    }
    appendChild(parent, newInstance);
    if (newInstance.raycast && newInstance.__r3f.eventCount) {
      const rootState = findInitialRoot(newInstance).getState();
      rootState.internal.interaction.push(newInstance);
    }
    [fiber, fiber.alternate].forEach((fiber2) => {
      if (fiber2 !== null) {
        fiber2.stateNode = newInstance;
        if (fiber2.ref) {
          if (typeof fiber2.ref === "function") fiber2.ref(newInstance);
          else fiber2.ref.current = newInstance;
        }
      }
    });
  }
  const handleTextInstance = () => {
  };
  const reconciler2 = Reconciler({
    createInstance,
    removeChild,
    appendChild,
    appendInitialChild: appendChild,
    insertBefore,
    supportsMutation: true,
    isPrimaryRenderer: false,
    supportsPersistence: false,
    supportsHydration: false,
    noTimeout: -1,
    appendChildToContainer: (container, child) => {
      if (!child) return;
      const scene = container.getState().scene;
      if (!scene.__r3f) return;
      scene.__r3f.root = container;
      appendChild(scene, child);
    },
    removeChildFromContainer: (container, child) => {
      if (!child) return;
      removeChild(container.getState().scene, child);
    },
    insertInContainerBefore: (container, child, beforeChild) => {
      if (!child || !beforeChild) return;
      const scene = container.getState().scene;
      if (!scene.__r3f) return;
      insertBefore(scene, child, beforeChild);
    },
    getRootHostContext: () => null,
    getChildHostContext: (parentHostContext) => parentHostContext,
    finalizeInitialChildren(instance) {
      var _instance$__r3f2;
      const localState = (_instance$__r3f2 = instance == null ? void 0 : instance.__r3f) != null ? _instance$__r3f2 : {};
      return Boolean(localState.handlers);
    },
    prepareUpdate(instance, _type, oldProps, newProps) {
      var _instance$__r3f3;
      const localState = (_instance$__r3f3 = instance == null ? void 0 : instance.__r3f) != null ? _instance$__r3f3 : {};
      if (localState.primitive && newProps.object && newProps.object !== instance) {
        return [true];
      } else {
        const {
          args: argsNew = [],
          children: cN,
          ...restNew
        } = newProps;
        const {
          args: argsOld = [],
          children: cO,
          ...restOld
        } = oldProps;
        if (!Array.isArray(argsNew)) throw new Error("R3F: the args prop must be an array!");
        if (argsNew.some((value, index) => value !== argsOld[index])) return [true];
        const diff = diffProps(instance, restNew, restOld, true);
        if (diff.changes.length) return [false, diff];
        return null;
      }
    },
    commitUpdate(instance, [reconstruct, diff], type, _oldProps, newProps, fiber) {
      if (reconstruct) switchInstance(instance, type, newProps, fiber);
      else applyProps$1(instance, diff);
    },
    commitMount(instance, _type, _props, _int) {
      var _instance$__r3f4;
      const localState = (_instance$__r3f4 = instance.__r3f) != null ? _instance$__r3f4 : {};
      if (instance.raycast && localState.handlers && localState.eventCount) {
        findInitialRoot(instance).getState().internal.interaction.push(instance);
      }
    },
    getPublicInstance: (instance) => instance,
    prepareForCommit: () => null,
    preparePortalMount: (container) => prepare(container.getState().scene),
    resetAfterCommit: () => {
    },
    shouldSetTextContent: () => false,
    clearContainer: () => false,
    hideInstance(instance) {
      var _instance$__r3f5;
      const {
        attach: type,
        parent
      } = (_instance$__r3f5 = instance.__r3f) != null ? _instance$__r3f5 : {};
      if (type && parent) detach(parent, instance, type);
      if (instance.isObject3D) instance.visible = false;
      invalidateInstance(instance);
    },
    unhideInstance(instance, props) {
      var _instance$__r3f6;
      const {
        attach: type,
        parent
      } = (_instance$__r3f6 = instance.__r3f) != null ? _instance$__r3f6 : {};
      if (type && parent) attach(parent, instance, type);
      if (instance.isObject3D && props.visible == null || props.visible) instance.visible = true;
      invalidateInstance(instance);
    },
    createTextInstance: handleTextInstance,
    hideTextInstance: handleTextInstance,
    unhideTextInstance: handleTextInstance,
    // https://github.com/pmndrs/react-three-fiber/pull/2360#discussion_r916356874
    // @ts-expect-error
    getCurrentEventPriority: () => _getEventPriority ? _getEventPriority() : constantsExports.DefaultEventPriority,
    beforeActiveInstanceBlur: () => {
    },
    afterActiveInstanceBlur: () => {
    },
    detachDeletedInstance: () => {
    },
    now: typeof performance !== "undefined" && is.fun(performance.now) ? performance.now : is.fun(Date.now) ? Date.now : () => 0,
    // https://github.com/pmndrs/react-three-fiber/pull/2360#discussion_r920883503
    scheduleTimeout: is.fun(setTimeout) ? setTimeout : void 0,
    cancelTimeout: is.fun(clearTimeout) ? clearTimeout : void 0
  });
  return {
    reconciler: reconciler2,
    applyProps: applyProps$1
  };
}
var _window$document, _window$navigator;
const hasColorSpace = (object) => "colorSpace" in object || "outputColorSpace" in object;
const getColorManagement = () => {
  var _ColorManagement;
  return (_ColorManagement = catalogue.ColorManagement) != null ? _ColorManagement : null;
};
const isOrthographicCamera = (def) => def && def.isOrthographicCamera;
const isRef = (obj) => obj && obj.hasOwnProperty("current");
const useIsomorphicLayoutEffect = typeof window !== "undefined" && ((_window$document = window.document) != null && _window$document.createElement || ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.product) === "ReactNative") ? reactExports.useLayoutEffect : reactExports.useEffect;
function useMutableCallback(fn) {
  const ref = reactExports.useRef(fn);
  useIsomorphicLayoutEffect(() => void (ref.current = fn), [fn]);
  return ref;
}
function Block({
  set
}) {
  useIsomorphicLayoutEffect(() => {
    set(new Promise(() => null));
    return () => set(false);
  }, [set]);
  return null;
}
class ErrorBoundary extends reactExports.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      error: false
    };
  }
  componentDidCatch(err) {
    this.props.set(err);
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
}
ErrorBoundary.getDerivedStateFromError = () => ({
  error: true
});
const DEFAULT = "__default";
const DEFAULTS = /* @__PURE__ */ new Map();
const isDiffSet = (def) => def && !!def.memoized && !!def.changes;
function calculateDpr(dpr) {
  var _window$devicePixelRa;
  const target = typeof window !== "undefined" ? (_window$devicePixelRa = window.devicePixelRatio) != null ? _window$devicePixelRa : 2 : 1;
  return Array.isArray(dpr) ? Math.min(Math.max(dpr[0], target), dpr[1]) : dpr;
}
const getRootState = (obj) => {
  var _r3f;
  return (_r3f = obj.__r3f) == null ? void 0 : _r3f.root.getState();
};
function findInitialRoot(child) {
  let root = child.__r3f.root;
  while (root.getState().previousRoot) root = root.getState().previousRoot;
  return root;
}
const is = {
  obj: (a) => a === Object(a) && !is.arr(a) && typeof a !== "function",
  fun: (a) => typeof a === "function",
  str: (a) => typeof a === "string",
  num: (a) => typeof a === "number",
  boo: (a) => typeof a === "boolean",
  und: (a) => a === void 0,
  arr: (a) => Array.isArray(a),
  equ(a, b, {
    arrays = "shallow",
    objects = "reference",
    strict = true
  } = {}) {
    if (typeof a !== typeof b || !!a !== !!b) return false;
    if (is.str(a) || is.num(a) || is.boo(a)) return a === b;
    const isObj = is.obj(a);
    if (isObj && objects === "reference") return a === b;
    const isArr = is.arr(a);
    if (isArr && arrays === "reference") return a === b;
    if ((isArr || isObj) && a === b) return true;
    let i2;
    for (i2 in a) if (!(i2 in b)) return false;
    if (isObj && arrays === "shallow" && objects === "shallow") {
      for (i2 in strict ? b : a) if (!is.equ(a[i2], b[i2], {
        strict,
        objects: "reference"
      })) return false;
    } else {
      for (i2 in strict ? b : a) if (a[i2] !== b[i2]) return false;
    }
    if (is.und(i2)) {
      if (isArr && a.length === 0 && b.length === 0) return true;
      if (isObj && Object.keys(a).length === 0 && Object.keys(b).length === 0) return true;
      if (a !== b) return false;
    }
    return true;
  }
};
function buildGraph(object) {
  const data = {
    nodes: {},
    materials: {}
  };
  if (object) {
    object.traverse((obj) => {
      if (obj.name) data.nodes[obj.name] = obj;
      if (obj.material && !data.materials[obj.material.name]) data.materials[obj.material.name] = obj.material;
    });
  }
  return data;
}
function dispose(obj) {
  if (obj.dispose && obj.type !== "Scene") obj.dispose();
  for (const p in obj) {
    p.dispose == null ? void 0 : p.dispose();
    delete obj[p];
  }
}
function prepare(object, state) {
  const instance = object;
  instance.__r3f = {
    type: "",
    root: null,
    previousAttach: null,
    memoizedProps: {},
    eventCount: 0,
    handlers: {},
    objects: [],
    parent: null,
    ...state
  };
  return object;
}
function resolve(instance, key) {
  let target = instance;
  if (key.includes("-")) {
    const entries = key.split("-");
    const last = entries.pop();
    target = entries.reduce((acc, key2) => acc[key2], instance);
    return {
      target,
      key: last
    };
  } else return {
    target,
    key
  };
}
const INDEX_REGEX = /-\d+$/;
function attach(parent, child, type) {
  if (is.str(type)) {
    if (INDEX_REGEX.test(type)) {
      const root = type.replace(INDEX_REGEX, "");
      const {
        target: target2,
        key: key2
      } = resolve(parent, root);
      if (!Array.isArray(target2[key2])) target2[key2] = [];
    }
    const {
      target,
      key
    } = resolve(parent, type);
    child.__r3f.previousAttach = target[key];
    target[key] = child;
  } else child.__r3f.previousAttach = type(parent, child);
}
function detach(parent, child, type) {
  var _child$__r3f, _child$__r3f2;
  if (is.str(type)) {
    const {
      target,
      key
    } = resolve(parent, type);
    const previous = child.__r3f.previousAttach;
    if (previous === void 0) delete target[key];
    else target[key] = previous;
  } else (_child$__r3f = child.__r3f) == null ? void 0 : _child$__r3f.previousAttach == null ? void 0 : _child$__r3f.previousAttach(parent, child);
  (_child$__r3f2 = child.__r3f) == null ? true : delete _child$__r3f2.previousAttach;
}
function diffProps(instance, {
  children: cN,
  key: kN,
  ref: rN,
  ...props
}, {
  children: cP,
  key: kP,
  ref: rP,
  ...previous
} = {}, remove = false) {
  const localState = instance.__r3f;
  const entries = Object.entries(props);
  const changes = [];
  if (remove) {
    const previousKeys = Object.keys(previous);
    for (let i2 = 0; i2 < previousKeys.length; i2++) {
      if (!props.hasOwnProperty(previousKeys[i2])) entries.unshift([previousKeys[i2], DEFAULT + "remove"]);
    }
  }
  entries.forEach(([key, value]) => {
    var _instance$__r3f;
    if ((_instance$__r3f = instance.__r3f) != null && _instance$__r3f.primitive && key === "object") return;
    if (is.equ(value, previous[key])) return;
    if (/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/.test(key)) return changes.push([key, value, true, []]);
    let entries2 = [];
    if (key.includes("-")) entries2 = key.split("-");
    changes.push([key, value, false, entries2]);
    for (const prop in props) {
      const value2 = props[prop];
      if (prop.startsWith(`${key}-`)) changes.push([prop, value2, false, prop.split("-")]);
    }
  });
  const memoized = {
    ...props
  };
  if (localState != null && localState.memoizedProps && localState != null && localState.memoizedProps.args) memoized.args = localState.memoizedProps.args;
  if (localState != null && localState.memoizedProps && localState != null && localState.memoizedProps.attach) memoized.attach = localState.memoizedProps.attach;
  return {
    memoized,
    changes
  };
}
function applyProps$1(instance, data) {
  var _instance$__r3f2;
  const localState = instance.__r3f;
  const root = localState == null ? void 0 : localState.root;
  const rootState = root == null ? void 0 : root.getState == null ? void 0 : root.getState();
  const {
    memoized,
    changes
  } = isDiffSet(data) ? data : diffProps(instance, data);
  const prevHandlers = localState == null ? void 0 : localState.eventCount;
  if (instance.__r3f) instance.__r3f.memoizedProps = memoized;
  for (let i2 = 0; i2 < changes.length; i2++) {
    let [key, value, isEvent, keys2] = changes[i2];
    if (hasColorSpace(instance)) {
      const sRGBEncoding = 3001;
      const SRGBColorSpace = "srgb";
      const LinearSRGBColorSpace = "srgb-linear";
      if (key === "encoding") {
        key = "colorSpace";
        value = value === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
      } else if (key === "outputEncoding") {
        key = "outputColorSpace";
        value = value === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
      }
    }
    let currentInstance = instance;
    let targetProp = currentInstance[key];
    if (keys2.length) {
      targetProp = keys2.reduce((acc, key2) => acc[key2], instance);
      if (!(targetProp && targetProp.set)) {
        const [name, ...reverseEntries] = keys2.reverse();
        currentInstance = reverseEntries.reverse().reduce((acc, key2) => acc[key2], instance);
        key = name;
      }
    }
    if (value === DEFAULT + "remove") {
      if (currentInstance.constructor) {
        let ctor = DEFAULTS.get(currentInstance.constructor);
        if (!ctor) {
          ctor = new currentInstance.constructor();
          DEFAULTS.set(currentInstance.constructor, ctor);
        }
        value = ctor[key];
      } else {
        value = 0;
      }
    }
    if (isEvent && localState) {
      if (value) localState.handlers[key] = value;
      else delete localState.handlers[key];
      localState.eventCount = Object.keys(localState.handlers).length;
    } else if (targetProp && targetProp.set && (targetProp.copy || targetProp instanceof Layers)) {
      if (Array.isArray(value)) {
        if (targetProp.fromArray) targetProp.fromArray(value);
        else targetProp.set(...value);
      } else if (targetProp.copy && value && value.constructor && // Some environments may break strict identity checks by duplicating versions of three.js.
      // Loosen to unminified names, ignoring descendents.
      // https://github.com/pmndrs/react-three-fiber/issues/2856
      // TODO: fix upstream and remove in v9
      targetProp.constructor === value.constructor) {
        targetProp.copy(value);
      } else if (value !== void 0) {
        const isColor = targetProp instanceof Color;
        if (!isColor && targetProp.setScalar) targetProp.setScalar(value);
        else if (targetProp instanceof Layers && value instanceof Layers) targetProp.mask = value.mask;
        else targetProp.set(value);
        if (!getColorManagement() && rootState && !rootState.linear && isColor) targetProp.convertSRGBToLinear();
      }
    } else {
      currentInstance[key] = value;
      if (currentInstance[key] instanceof Texture && // sRGB textures must be RGBA8 since r137 https://github.com/mrdoob/three.js/pull/23129
      currentInstance[key].format === RGBAFormat && currentInstance[key].type === UnsignedByteType && rootState) {
        const texture = currentInstance[key];
        if (hasColorSpace(texture) && hasColorSpace(rootState.gl)) texture.colorSpace = rootState.gl.outputColorSpace;
        else texture.encoding = rootState.gl.outputEncoding;
      }
    }
    invalidateInstance(instance);
  }
  if (localState && localState.parent && instance.raycast && prevHandlers !== localState.eventCount) {
    const internal = findInitialRoot(instance).getState().internal;
    const index = internal.interaction.indexOf(instance);
    if (index > -1) internal.interaction.splice(index, 1);
    if (localState.eventCount) internal.interaction.push(instance);
  }
  const isCircular = changes.length === 1 && changes[0][0] === "onUpdate";
  if (!isCircular && changes.length && (_instance$__r3f2 = instance.__r3f) != null && _instance$__r3f2.parent) updateInstance(instance);
  return instance;
}
function invalidateInstance(instance) {
  var _instance$__r3f3, _instance$__r3f3$root;
  const state = (_instance$__r3f3 = instance.__r3f) == null ? void 0 : (_instance$__r3f3$root = _instance$__r3f3.root) == null ? void 0 : _instance$__r3f3$root.getState == null ? void 0 : _instance$__r3f3$root.getState();
  if (state && state.internal.frames === 0) state.invalidate();
}
function updateInstance(instance) {
  instance.onUpdate == null ? void 0 : instance.onUpdate(instance);
}
function updateCamera(camera, size) {
  if (!camera.manual) {
    if (isOrthographicCamera(camera)) {
      camera.left = size.width / -2;
      camera.right = size.width / 2;
      camera.top = size.height / 2;
      camera.bottom = size.height / -2;
    } else {
      camera.aspect = size.width / size.height;
    }
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }
}
function makeId(event) {
  return (event.eventObject || event.object).uuid + "/" + event.index + event.instanceId;
}
function getEventPriority() {
  var _globalScope$event;
  const globalScope = typeof self !== "undefined" && self || typeof window !== "undefined" && window;
  if (!globalScope) return constantsExports.DefaultEventPriority;
  const name = (_globalScope$event = globalScope.event) == null ? void 0 : _globalScope$event.type;
  switch (name) {
    case "click":
    case "contextmenu":
    case "dblclick":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
      return constantsExports.DiscreteEventPriority;
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "pointerenter":
    case "pointerleave":
    case "wheel":
      return constantsExports.ContinuousEventPriority;
    default:
      return constantsExports.DefaultEventPriority;
  }
}
function releaseInternalPointerCapture(capturedMap, obj, captures, pointerId) {
  const captureData = captures.get(obj);
  if (captureData) {
    captures.delete(obj);
    if (captures.size === 0) {
      capturedMap.delete(pointerId);
      captureData.target.releasePointerCapture(pointerId);
    }
  }
}
function removeInteractivity(store, object) {
  const {
    internal
  } = store.getState();
  internal.interaction = internal.interaction.filter((o) => o !== object);
  internal.initialHits = internal.initialHits.filter((o) => o !== object);
  internal.hovered.forEach((value, key) => {
    if (value.eventObject === object || value.object === object) {
      internal.hovered.delete(key);
    }
  });
  internal.capturedMap.forEach((captures, pointerId) => {
    releaseInternalPointerCapture(internal.capturedMap, object, captures, pointerId);
  });
}
function createEvents(store) {
  function calculateDistance(event) {
    const {
      internal
    } = store.getState();
    const dx = event.offsetX - internal.initialClick[0];
    const dy = event.offsetY - internal.initialClick[1];
    return Math.round(Math.sqrt(dx * dx + dy * dy));
  }
  function filterPointerEvents(objects) {
    return objects.filter((obj) => ["Move", "Over", "Enter", "Out", "Leave"].some((name) => {
      var _r3f;
      return (_r3f = obj.__r3f) == null ? void 0 : _r3f.handlers["onPointer" + name];
    }));
  }
  function intersect(event, filter) {
    const state = store.getState();
    const duplicates = /* @__PURE__ */ new Set();
    const intersections = [];
    const eventsObjects = filter ? filter(state.internal.interaction) : state.internal.interaction;
    for (let i2 = 0; i2 < eventsObjects.length; i2++) {
      const state2 = getRootState(eventsObjects[i2]);
      if (state2) {
        state2.raycaster.camera = void 0;
      }
    }
    if (!state.previousRoot) {
      state.events.compute == null ? void 0 : state.events.compute(event, state);
    }
    function handleRaycast(obj) {
      const state2 = getRootState(obj);
      if (!state2 || !state2.events.enabled || state2.raycaster.camera === null) return [];
      if (state2.raycaster.camera === void 0) {
        var _state$previousRoot;
        state2.events.compute == null ? void 0 : state2.events.compute(event, state2, (_state$previousRoot = state2.previousRoot) == null ? void 0 : _state$previousRoot.getState());
        if (state2.raycaster.camera === void 0) state2.raycaster.camera = null;
      }
      return state2.raycaster.camera ? state2.raycaster.intersectObject(obj, true) : [];
    }
    let hits = eventsObjects.flatMap(handleRaycast).sort((a, b) => {
      const aState = getRootState(a.object);
      const bState = getRootState(b.object);
      if (!aState || !bState) return a.distance - b.distance;
      return bState.events.priority - aState.events.priority || a.distance - b.distance;
    }).filter((item) => {
      const id = makeId(item);
      if (duplicates.has(id)) return false;
      duplicates.add(id);
      return true;
    });
    if (state.events.filter) hits = state.events.filter(hits, state);
    for (const hit of hits) {
      let eventObject = hit.object;
      while (eventObject) {
        var _r3f2;
        if ((_r3f2 = eventObject.__r3f) != null && _r3f2.eventCount) intersections.push({
          ...hit,
          eventObject
        });
        eventObject = eventObject.parent;
      }
    }
    if ("pointerId" in event && state.internal.capturedMap.has(event.pointerId)) {
      for (let captureData of state.internal.capturedMap.get(event.pointerId).values()) {
        if (!duplicates.has(makeId(captureData.intersection))) intersections.push(captureData.intersection);
      }
    }
    return intersections;
  }
  function handleIntersects(intersections, event, delta, callback) {
    const rootState = store.getState();
    if (intersections.length) {
      const localState = {
        stopped: false
      };
      for (const hit of intersections) {
        const state = getRootState(hit.object) || rootState;
        const {
          raycaster,
          pointer,
          camera,
          internal
        } = state;
        const unprojectedPoint = new Vector3(pointer.x, pointer.y, 0).unproject(camera);
        const hasPointerCapture = (id) => {
          var _internal$capturedMap, _internal$capturedMap2;
          return (_internal$capturedMap = (_internal$capturedMap2 = internal.capturedMap.get(id)) == null ? void 0 : _internal$capturedMap2.has(hit.eventObject)) != null ? _internal$capturedMap : false;
        };
        const setPointerCapture = (id) => {
          const captureData = {
            intersection: hit,
            target: event.target
          };
          if (internal.capturedMap.has(id)) {
            internal.capturedMap.get(id).set(hit.eventObject, captureData);
          } else {
            internal.capturedMap.set(id, /* @__PURE__ */ new Map([[hit.eventObject, captureData]]));
          }
          event.target.setPointerCapture(id);
        };
        const releasePointerCapture = (id) => {
          const captures = internal.capturedMap.get(id);
          if (captures) {
            releaseInternalPointerCapture(internal.capturedMap, hit.eventObject, captures, id);
          }
        };
        let extractEventProps = {};
        for (let prop in event) {
          let property = event[prop];
          if (typeof property !== "function") extractEventProps[prop] = property;
        }
        let raycastEvent = {
          ...hit,
          ...extractEventProps,
          pointer,
          intersections,
          stopped: localState.stopped,
          delta,
          unprojectedPoint,
          ray: raycaster.ray,
          camera,
          // Hijack stopPropagation, which just sets a flag
          stopPropagation() {
            const capturesForPointer = "pointerId" in event && internal.capturedMap.get(event.pointerId);
            if (
              // ...if this pointer hasn't been captured
              !capturesForPointer || // ... or if the hit object is capturing the pointer
              capturesForPointer.has(hit.eventObject)
            ) {
              raycastEvent.stopped = localState.stopped = true;
              if (internal.hovered.size && Array.from(internal.hovered.values()).find((i2) => i2.eventObject === hit.eventObject)) {
                const higher = intersections.slice(0, intersections.indexOf(hit));
                cancelPointer([...higher, hit]);
              }
            }
          },
          // there should be a distinction between target and currentTarget
          target: {
            hasPointerCapture,
            setPointerCapture,
            releasePointerCapture
          },
          currentTarget: {
            hasPointerCapture,
            setPointerCapture,
            releasePointerCapture
          },
          nativeEvent: event
        };
        callback(raycastEvent);
        if (localState.stopped === true) break;
      }
    }
    return intersections;
  }
  function cancelPointer(intersections) {
    const {
      internal
    } = store.getState();
    for (const hoveredObj of internal.hovered.values()) {
      if (!intersections.length || !intersections.find((hit) => hit.object === hoveredObj.object && hit.index === hoveredObj.index && hit.instanceId === hoveredObj.instanceId)) {
        const eventObject = hoveredObj.eventObject;
        const instance = eventObject.__r3f;
        const handlers = instance == null ? void 0 : instance.handlers;
        internal.hovered.delete(makeId(hoveredObj));
        if (instance != null && instance.eventCount) {
          const data = {
            ...hoveredObj,
            intersections
          };
          handlers.onPointerOut == null ? void 0 : handlers.onPointerOut(data);
          handlers.onPointerLeave == null ? void 0 : handlers.onPointerLeave(data);
        }
      }
    }
  }
  function pointerMissed(event, objects) {
    for (let i2 = 0; i2 < objects.length; i2++) {
      const instance = objects[i2].__r3f;
      instance == null ? void 0 : instance.handlers.onPointerMissed == null ? void 0 : instance.handlers.onPointerMissed(event);
    }
  }
  function handlePointer(name) {
    switch (name) {
      case "onPointerLeave":
      case "onPointerCancel":
        return () => cancelPointer([]);
      case "onLostPointerCapture":
        return (event) => {
          const {
            internal
          } = store.getState();
          if ("pointerId" in event && internal.capturedMap.has(event.pointerId)) {
            requestAnimationFrame(() => {
              if (internal.capturedMap.has(event.pointerId)) {
                internal.capturedMap.delete(event.pointerId);
                cancelPointer([]);
              }
            });
          }
        };
    }
    return function handleEvent(event) {
      const {
        onPointerMissed,
        internal
      } = store.getState();
      internal.lastEvent.current = event;
      const isPointerMove = name === "onPointerMove";
      const isClickEvent = name === "onClick" || name === "onContextMenu" || name === "onDoubleClick";
      const filter = isPointerMove ? filterPointerEvents : void 0;
      const hits = intersect(event, filter);
      const delta = isClickEvent ? calculateDistance(event) : 0;
      if (name === "onPointerDown") {
        internal.initialClick = [event.offsetX, event.offsetY];
        internal.initialHits = hits.map((hit) => hit.eventObject);
      }
      if (isClickEvent && !hits.length) {
        if (delta <= 2) {
          pointerMissed(event, internal.interaction);
          if (onPointerMissed) onPointerMissed(event);
        }
      }
      if (isPointerMove) cancelPointer(hits);
      function onIntersect(data) {
        const eventObject = data.eventObject;
        const instance = eventObject.__r3f;
        const handlers = instance == null ? void 0 : instance.handlers;
        if (!(instance != null && instance.eventCount)) return;
        if (isPointerMove) {
          if (handlers.onPointerOver || handlers.onPointerEnter || handlers.onPointerOut || handlers.onPointerLeave) {
            const id = makeId(data);
            const hoveredItem = internal.hovered.get(id);
            if (!hoveredItem) {
              internal.hovered.set(id, data);
              handlers.onPointerOver == null ? void 0 : handlers.onPointerOver(data);
              handlers.onPointerEnter == null ? void 0 : handlers.onPointerEnter(data);
            } else if (hoveredItem.stopped) {
              data.stopPropagation();
            }
          }
          handlers.onPointerMove == null ? void 0 : handlers.onPointerMove(data);
        } else {
          const handler = handlers[name];
          if (handler) {
            if (!isClickEvent || internal.initialHits.includes(eventObject)) {
              pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
              handler(data);
            }
          } else {
            if (isClickEvent && internal.initialHits.includes(eventObject)) {
              pointerMissed(event, internal.interaction.filter((object) => !internal.initialHits.includes(object)));
            }
          }
        }
      }
      handleIntersects(hits, event, delta, onIntersect);
    };
  }
  return {
    handlePointer
  };
}
const privateKeys = ["set", "get", "setSize", "setFrameloop", "setDpr", "events", "invalidate", "advance", "size", "viewport"];
const isRenderer = (def) => !!(def != null && def.render);
const context = /* @__PURE__ */ reactExports.createContext(null);
const createStore = (invalidate2, advance2) => {
  const rootState = create((set, get) => {
    const position = new Vector3();
    const defaultTarget = new Vector3();
    const tempTarget = new Vector3();
    function getCurrentViewport(camera = get().camera, target = defaultTarget, size = get().size) {
      const {
        width,
        height,
        top,
        left
      } = size;
      const aspect = width / height;
      if (target instanceof Vector3) tempTarget.copy(target);
      else tempTarget.set(...target);
      const distance = camera.getWorldPosition(position).distanceTo(tempTarget);
      if (isOrthographicCamera(camera)) {
        return {
          width: width / camera.zoom,
          height: height / camera.zoom,
          top,
          left,
          factor: 1,
          distance,
          aspect
        };
      } else {
        const fov = camera.fov * Math.PI / 180;
        const h = 2 * Math.tan(fov / 2) * distance;
        const w = h * (width / height);
        return {
          width: w,
          height: h,
          top,
          left,
          factor: width / w,
          distance,
          aspect
        };
      }
    }
    let performanceTimeout = void 0;
    const setPerformanceCurrent = (current) => set((state2) => ({
      performance: {
        ...state2.performance,
        current
      }
    }));
    const pointer = new Vector2();
    const rootState2 = {
      set,
      get,
      // Mock objects that have to be configured
      gl: null,
      camera: null,
      raycaster: null,
      events: {
        priority: 1,
        enabled: true,
        connected: false
      },
      xr: null,
      scene: null,
      invalidate: (frames = 1) => invalidate2(get(), frames),
      advance: (timestamp, runGlobalEffects) => advance2(timestamp, runGlobalEffects, get()),
      legacy: false,
      linear: false,
      flat: false,
      controls: null,
      clock: new Clock(),
      pointer,
      mouse: pointer,
      frameloop: "always",
      onPointerMissed: void 0,
      performance: {
        current: 1,
        min: 0.5,
        max: 1,
        debounce: 200,
        regress: () => {
          const state2 = get();
          if (performanceTimeout) clearTimeout(performanceTimeout);
          if (state2.performance.current !== state2.performance.min) setPerformanceCurrent(state2.performance.min);
          performanceTimeout = setTimeout(() => setPerformanceCurrent(get().performance.max), state2.performance.debounce);
        }
      },
      size: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        updateStyle: false
      },
      viewport: {
        initialDpr: 0,
        dpr: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        aspect: 0,
        distance: 0,
        factor: 0,
        getCurrentViewport
      },
      setEvents: (events) => set((state2) => ({
        ...state2,
        events: {
          ...state2.events,
          ...events
        }
      })),
      setSize: (width, height, updateStyle, top, left) => {
        const camera = get().camera;
        const size = {
          width,
          height,
          top: top || 0,
          left: left || 0,
          updateStyle
        };
        set((state2) => ({
          size,
          viewport: {
            ...state2.viewport,
            ...getCurrentViewport(camera, defaultTarget, size)
          }
        }));
      },
      setDpr: (dpr) => set((state2) => {
        const resolved = calculateDpr(dpr);
        return {
          viewport: {
            ...state2.viewport,
            dpr: resolved,
            initialDpr: state2.viewport.initialDpr || resolved
          }
        };
      }),
      setFrameloop: (frameloop = "always") => {
        const clock = get().clock;
        clock.stop();
        clock.elapsedTime = 0;
        if (frameloop !== "never") {
          clock.start();
          clock.elapsedTime = 0;
        }
        set(() => ({
          frameloop
        }));
      },
      previousRoot: void 0,
      internal: {
        active: false,
        priority: 0,
        frames: 0,
        lastEvent: /* @__PURE__ */ reactExports.createRef(),
        interaction: [],
        hovered: /* @__PURE__ */ new Map(),
        subscribers: [],
        initialClick: [0, 0],
        initialHits: [],
        capturedMap: /* @__PURE__ */ new Map(),
        subscribe: (ref, priority, store) => {
          const internal = get().internal;
          internal.priority = internal.priority + (priority > 0 ? 1 : 0);
          internal.subscribers.push({
            ref,
            priority,
            store
          });
          internal.subscribers = internal.subscribers.sort((a, b) => a.priority - b.priority);
          return () => {
            const internal2 = get().internal;
            if (internal2 != null && internal2.subscribers) {
              internal2.priority = internal2.priority - (priority > 0 ? 1 : 0);
              internal2.subscribers = internal2.subscribers.filter((s) => s.ref !== ref);
            }
          };
        }
      }
    };
    return rootState2;
  });
  const state = rootState.getState();
  let oldSize = state.size;
  let oldDpr = state.viewport.dpr;
  let oldCamera = state.camera;
  rootState.subscribe(() => {
    const {
      camera,
      size,
      viewport,
      gl,
      set
    } = rootState.getState();
    if (size.width !== oldSize.width || size.height !== oldSize.height || viewport.dpr !== oldDpr) {
      var _size$updateStyle;
      oldSize = size;
      oldDpr = viewport.dpr;
      updateCamera(camera, size);
      gl.setPixelRatio(viewport.dpr);
      const updateStyle = (_size$updateStyle = size.updateStyle) != null ? _size$updateStyle : typeof HTMLCanvasElement !== "undefined" && gl.domElement instanceof HTMLCanvasElement;
      gl.setSize(size.width, size.height, updateStyle);
    }
    if (camera !== oldCamera) {
      oldCamera = camera;
      set((state2) => ({
        viewport: {
          ...state2.viewport,
          ...state2.viewport.getCurrentViewport(camera)
        }
      }));
    }
  });
  rootState.subscribe((state2) => invalidate2(state2));
  return rootState;
};
let i;
let globalEffects = /* @__PURE__ */ new Set();
let globalAfterEffects = /* @__PURE__ */ new Set();
let globalTailEffects = /* @__PURE__ */ new Set();
function run(effects, timestamp) {
  if (!effects.size) return;
  for (const {
    callback
  } of effects.values()) {
    callback(timestamp);
  }
}
function flushGlobalEffects(type, timestamp) {
  switch (type) {
    case "before":
      return run(globalEffects, timestamp);
    case "after":
      return run(globalAfterEffects, timestamp);
    case "tail":
      return run(globalTailEffects, timestamp);
  }
}
let subscribers;
let subscription;
function render$1(timestamp, state, frame) {
  let delta = state.clock.getDelta();
  if (state.frameloop === "never" && typeof timestamp === "number") {
    delta = timestamp - state.clock.elapsedTime;
    state.clock.oldTime = state.clock.elapsedTime;
    state.clock.elapsedTime = timestamp;
  }
  subscribers = state.internal.subscribers;
  for (i = 0; i < subscribers.length; i++) {
    subscription = subscribers[i];
    subscription.ref.current(subscription.store.getState(), delta, frame);
  }
  if (!state.internal.priority && state.gl.render) state.gl.render(state.scene, state.camera);
  state.internal.frames = Math.max(0, state.internal.frames - 1);
  return state.frameloop === "always" ? 1 : state.internal.frames;
}
function createLoop(roots2) {
  let running = false;
  let useFrameInProgress = false;
  let repeat;
  let frame;
  let state;
  function loop(timestamp) {
    frame = requestAnimationFrame(loop);
    running = true;
    repeat = 0;
    flushGlobalEffects("before", timestamp);
    useFrameInProgress = true;
    for (const root of roots2.values()) {
      var _state$gl$xr;
      state = root.store.getState();
      if (state.internal.active && (state.frameloop === "always" || state.internal.frames > 0) && !((_state$gl$xr = state.gl.xr) != null && _state$gl$xr.isPresenting)) {
        repeat += render$1(timestamp, state);
      }
    }
    useFrameInProgress = false;
    flushGlobalEffects("after", timestamp);
    if (repeat === 0) {
      flushGlobalEffects("tail", timestamp);
      running = false;
      return cancelAnimationFrame(frame);
    }
  }
  function invalidate2(state2, frames = 1) {
    var _state$gl$xr2;
    if (!state2) return roots2.forEach((root) => invalidate2(root.store.getState(), frames));
    if ((_state$gl$xr2 = state2.gl.xr) != null && _state$gl$xr2.isPresenting || !state2.internal.active || state2.frameloop === "never") return;
    if (frames > 1) {
      state2.internal.frames = Math.min(60, state2.internal.frames + frames);
    } else {
      if (useFrameInProgress) {
        state2.internal.frames = 2;
      } else {
        state2.internal.frames = 1;
      }
    }
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }
  function advance2(timestamp, runGlobalEffects = true, state2, frame2) {
    if (runGlobalEffects) flushGlobalEffects("before", timestamp);
    if (!state2) for (const root of roots2.values()) render$1(timestamp, root.store.getState());
    else render$1(timestamp, state2, frame2);
    if (runGlobalEffects) flushGlobalEffects("after", timestamp);
  }
  return {
    loop,
    invalidate: invalidate2,
    advance: advance2
  };
}
function useStore() {
  const store = reactExports.useContext(context);
  if (!store) throw new Error("R3F: Hooks can only be used within the Canvas component!");
  return store;
}
function useThree(selector = (state) => state, equalityFn) {
  return useStore()(selector, equalityFn);
}
function useFrame(callback, renderPriority = 0) {
  const store = useStore();
  const subscribe = store.getState().internal.subscribe;
  const ref = useMutableCallback(callback);
  useIsomorphicLayoutEffect(() => subscribe(ref, renderPriority, store), [renderPriority, subscribe, store]);
  return null;
}
const memoizedLoaders = /* @__PURE__ */ new WeakMap();
function loadingFn(extensions, onProgress) {
  return function(Proto, ...input) {
    let loader = memoizedLoaders.get(Proto);
    if (!loader) {
      loader = new Proto();
      memoizedLoaders.set(Proto, loader);
    }
    if (extensions) extensions(loader);
    return Promise.all(input.map((input2) => new Promise((res, reject) => loader.load(input2, (data) => {
      if (data.scene) Object.assign(data, buildGraph(data.scene));
      res(data);
    }, onProgress, (error) => reject(new Error(`Could not load ${input2}: ${error == null ? void 0 : error.message}`))))));
  };
}
function useLoader(Proto, input, extensions, onProgress) {
  const keys2 = Array.isArray(input) ? input : [input];
  const results = suspend(loadingFn(extensions, onProgress), [Proto, ...keys2], {
    equal: is.equ
  });
  return Array.isArray(input) ? results : results[0];
}
useLoader.preload = function(Proto, input, extensions) {
  const keys2 = Array.isArray(input) ? input : [input];
  return preload(loadingFn(extensions), [Proto, ...keys2]);
};
useLoader.clear = function(Proto, input) {
  const keys2 = Array.isArray(input) ? input : [input];
  return clear([Proto, ...keys2]);
};
const roots = /* @__PURE__ */ new Map();
const {
  invalidate,
  advance
} = createLoop(roots);
const {
  reconciler,
  applyProps
} = createRenderer(roots, getEventPriority);
const shallowLoose = {
  objects: "shallow",
  strict: false
};
const createRendererInstance = (gl, canvas) => {
  const customRenderer = typeof gl === "function" ? gl(canvas) : gl;
  if (isRenderer(customRenderer)) return customRenderer;
  else return new WebGLRenderer({
    powerPreference: "high-performance",
    canvas,
    antialias: true,
    alpha: true,
    ...gl
  });
};
function computeInitialSize(canvas, defaultSize) {
  const defaultStyle = typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement;
  if (defaultSize) {
    const {
      width,
      height,
      top,
      left,
      updateStyle = defaultStyle
    } = defaultSize;
    return {
      width,
      height,
      top,
      left,
      updateStyle
    };
  } else if (typeof HTMLCanvasElement !== "undefined" && canvas instanceof HTMLCanvasElement && canvas.parentElement) {
    const {
      width,
      height,
      top,
      left
    } = canvas.parentElement.getBoundingClientRect();
    return {
      width,
      height,
      top,
      left,
      updateStyle: defaultStyle
    };
  } else if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return {
      width: canvas.width,
      height: canvas.height,
      top: 0,
      left: 0,
      updateStyle: defaultStyle
    };
  }
  return {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  };
}
function createRoot(canvas) {
  const prevRoot = roots.get(canvas);
  const prevFiber = prevRoot == null ? void 0 : prevRoot.fiber;
  const prevStore = prevRoot == null ? void 0 : prevRoot.store;
  if (prevRoot) console.warn("R3F.createRoot should only be called once!");
  const logRecoverableError = typeof reportError === "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : (
    // In older browsers and test environments, fallback to console.error.
    console.error
  );
  const store = prevStore || createStore(invalidate, advance);
  const fiber = prevFiber || reconciler.createContainer(store, constantsExports.ConcurrentRoot, null, false, null, "", logRecoverableError, null);
  if (!prevRoot) roots.set(canvas, {
    fiber,
    store
  });
  let onCreated;
  let configured = false;
  let lastCamera;
  return {
    configure(props = {}) {
      let {
        gl: glConfig,
        size: propsSize,
        scene: sceneOptions,
        events,
        onCreated: onCreatedCallback,
        shadows = false,
        linear = false,
        flat = false,
        legacy = false,
        orthographic = false,
        frameloop = "always",
        dpr = [1, 2],
        performance: performance2,
        raycaster: raycastOptions,
        camera: cameraOptions,
        onPointerMissed
      } = props;
      let state = store.getState();
      let gl = state.gl;
      if (!state.gl) state.set({
        gl: gl = createRendererInstance(glConfig, canvas)
      });
      let raycaster = state.raycaster;
      if (!raycaster) state.set({
        raycaster: raycaster = new Raycaster()
      });
      const {
        params,
        ...options
      } = raycastOptions || {};
      if (!is.equ(options, raycaster, shallowLoose)) applyProps(raycaster, {
        ...options
      });
      if (!is.equ(params, raycaster.params, shallowLoose)) applyProps(raycaster, {
        params: {
          ...raycaster.params,
          ...params
        }
      });
      if (!state.camera || state.camera === lastCamera && !is.equ(lastCamera, cameraOptions, shallowLoose)) {
        lastCamera = cameraOptions;
        const isCamera = cameraOptions instanceof Camera;
        const camera = isCamera ? cameraOptions : orthographic ? new OrthographicCamera(0, 0, 0, 0, 0.1, 1e3) : new PerspectiveCamera(75, 0, 0.1, 1e3);
        if (!isCamera) {
          camera.position.z = 5;
          if (cameraOptions) {
            applyProps(camera, cameraOptions);
            if ("aspect" in cameraOptions || "left" in cameraOptions || "right" in cameraOptions || "bottom" in cameraOptions || "top" in cameraOptions) {
              camera.manual = true;
              camera.updateProjectionMatrix();
            }
          }
          if (!state.camera && !(cameraOptions != null && cameraOptions.rotation)) camera.lookAt(0, 0, 0);
        }
        state.set({
          camera
        });
        raycaster.camera = camera;
      }
      if (!state.scene) {
        let scene;
        if (sceneOptions instanceof Scene) {
          scene = sceneOptions;
        } else {
          scene = new Scene();
          if (sceneOptions) applyProps(scene, sceneOptions);
        }
        state.set({
          scene: prepare(scene)
        });
      }
      if (!state.xr) {
        var _gl$xr;
        const handleXRFrame = (timestamp, frame) => {
          const state2 = store.getState();
          if (state2.frameloop === "never") return;
          advance(timestamp, true, state2, frame);
        };
        const handleSessionChange = () => {
          const state2 = store.getState();
          state2.gl.xr.enabled = state2.gl.xr.isPresenting;
          state2.gl.xr.setAnimationLoop(state2.gl.xr.isPresenting ? handleXRFrame : null);
          if (!state2.gl.xr.isPresenting) invalidate(state2);
        };
        const xr = {
          connect() {
            const gl2 = store.getState().gl;
            gl2.xr.addEventListener("sessionstart", handleSessionChange);
            gl2.xr.addEventListener("sessionend", handleSessionChange);
          },
          disconnect() {
            const gl2 = store.getState().gl;
            gl2.xr.removeEventListener("sessionstart", handleSessionChange);
            gl2.xr.removeEventListener("sessionend", handleSessionChange);
          }
        };
        if (typeof ((_gl$xr = gl.xr) == null ? void 0 : _gl$xr.addEventListener) === "function") xr.connect();
        state.set({
          xr
        });
      }
      if (gl.shadowMap) {
        const oldEnabled = gl.shadowMap.enabled;
        const oldType = gl.shadowMap.type;
        gl.shadowMap.enabled = !!shadows;
        if (is.boo(shadows)) {
          gl.shadowMap.type = PCFSoftShadowMap;
        } else if (is.str(shadows)) {
          var _types$shadows;
          const types = {
            basic: BasicShadowMap,
            percentage: PCFShadowMap,
            soft: PCFSoftShadowMap,
            variance: VSMShadowMap
          };
          gl.shadowMap.type = (_types$shadows = types[shadows]) != null ? _types$shadows : PCFSoftShadowMap;
        } else if (is.obj(shadows)) {
          Object.assign(gl.shadowMap, shadows);
        }
        if (oldEnabled !== gl.shadowMap.enabled || oldType !== gl.shadowMap.type) gl.shadowMap.needsUpdate = true;
      }
      const ColorManagement = getColorManagement();
      if (ColorManagement) {
        if ("enabled" in ColorManagement) ColorManagement.enabled = !legacy;
        else if ("legacyMode" in ColorManagement) ColorManagement.legacyMode = legacy;
      }
      if (!configured) {
        const LinearEncoding = 3e3;
        const sRGBEncoding = 3001;
        applyProps(gl, {
          outputEncoding: linear ? LinearEncoding : sRGBEncoding,
          toneMapping: flat ? NoToneMapping : ACESFilmicToneMapping
        });
      }
      if (state.legacy !== legacy) state.set(() => ({
        legacy
      }));
      if (state.linear !== linear) state.set(() => ({
        linear
      }));
      if (state.flat !== flat) state.set(() => ({
        flat
      }));
      if (glConfig && !is.fun(glConfig) && !isRenderer(glConfig) && !is.equ(glConfig, gl, shallowLoose)) applyProps(gl, glConfig);
      if (events && !state.events.handlers) state.set({
        events: events(store)
      });
      const size = computeInitialSize(canvas, propsSize);
      if (!is.equ(size, state.size, shallowLoose)) {
        state.setSize(size.width, size.height, size.updateStyle, size.top, size.left);
      }
      if (dpr && state.viewport.dpr !== calculateDpr(dpr)) state.setDpr(dpr);
      if (state.frameloop !== frameloop) state.setFrameloop(frameloop);
      if (!state.onPointerMissed) state.set({
        onPointerMissed
      });
      if (performance2 && !is.equ(performance2, state.performance, shallowLoose)) state.set((state2) => ({
        performance: {
          ...state2.performance,
          ...performance2
        }
      }));
      onCreated = onCreatedCallback;
      configured = true;
      return this;
    },
    render(children) {
      if (!configured) this.configure();
      reconciler.updateContainer(/* @__PURE__ */ jsxRuntimeExports.jsx(Provider, {
        store,
        children,
        onCreated,
        rootElement: canvas
      }), fiber, null, () => void 0);
      return store;
    },
    unmount() {
      unmountComponentAtNode(canvas);
    }
  };
}
function Provider({
  store,
  children,
  onCreated,
  rootElement
}) {
  useIsomorphicLayoutEffect(() => {
    const state = store.getState();
    state.set((state2) => ({
      internal: {
        ...state2.internal,
        active: true
      }
    }));
    if (onCreated) onCreated(state);
    if (!store.getState().events.connected) state.events.connect == null ? void 0 : state.events.connect(rootElement);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(context.Provider, {
    value: store,
    children
  });
}
function unmountComponentAtNode(canvas, callback) {
  const root = roots.get(canvas);
  const fiber = root == null ? void 0 : root.fiber;
  if (fiber) {
    const state = root == null ? void 0 : root.store.getState();
    if (state) state.internal.active = false;
    reconciler.updateContainer(null, fiber, null, () => {
      if (state) {
        setTimeout(() => {
          try {
            var _state$gl, _state$gl$renderLists, _state$gl2, _state$gl3;
            state.events.disconnect == null ? void 0 : state.events.disconnect();
            (_state$gl = state.gl) == null ? void 0 : (_state$gl$renderLists = _state$gl.renderLists) == null ? void 0 : _state$gl$renderLists.dispose == null ? void 0 : _state$gl$renderLists.dispose();
            (_state$gl2 = state.gl) == null ? void 0 : _state$gl2.forceContextLoss == null ? void 0 : _state$gl2.forceContextLoss();
            if ((_state$gl3 = state.gl) != null && _state$gl3.xr) state.xr.disconnect();
            dispose(state);
            roots.delete(canvas);
            if (callback) ;
          } catch (e) {
          }
        }, 500);
      }
    });
  }
}
function createPortal(children, container, state) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, {
    children,
    container,
    state
  }, container.uuid);
}
function Portal({
  state = {},
  children,
  container
}) {
  const {
    events,
    size,
    ...rest
  } = state;
  const previousRoot = useStore();
  const [raycaster] = reactExports.useState(() => new Raycaster());
  const [pointer] = reactExports.useState(() => new Vector2());
  const inject = reactExports.useCallback(
    (rootState, injectState) => {
      const intersect = {
        ...rootState
      };
      Object.keys(rootState).forEach((key) => {
        if (
          // Some props should be off-limits
          privateKeys.includes(key) || // Otherwise filter out the props that are different and let the inject layer take precedence
          // Unless the inject layer props is undefined, then we keep the root layer
          rootState[key] !== injectState[key] && injectState[key]
        ) {
          delete intersect[key];
        }
      });
      let viewport = void 0;
      if (injectState && size) {
        const camera = injectState.camera;
        viewport = rootState.viewport.getCurrentViewport(camera, new Vector3(), size);
        if (camera !== rootState.camera) updateCamera(camera, size);
      }
      return {
        // The intersect consists of the previous root state
        ...intersect,
        // Portals have their own scene, which forms the root, a raycaster and a pointer
        scene: container,
        raycaster,
        pointer,
        mouse: pointer,
        // Their previous root is the layer before it
        previousRoot,
        // Events, size and viewport can be overridden by the inject layer
        events: {
          ...rootState.events,
          ...injectState == null ? void 0 : injectState.events,
          ...events
        },
        size: {
          ...rootState.size,
          ...size
        },
        viewport: {
          ...rootState.viewport,
          ...viewport
        },
        ...rest
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
  const [usePortalStore] = reactExports.useState(() => {
    const previousState = previousRoot.getState();
    const store = create((set, get) => ({
      ...previousState,
      scene: container,
      raycaster,
      pointer,
      mouse: pointer,
      previousRoot,
      events: {
        ...previousState.events,
        ...events
      },
      size: {
        ...previousState.size,
        ...size
      },
      ...rest,
      // Set and get refer to this root-state
      set,
      get,
      // Layers are allowed to override events
      setEvents: (events2) => set((state2) => ({
        ...state2,
        events: {
          ...state2.events,
          ...events2
        }
      }))
    }));
    return store;
  });
  reactExports.useEffect(() => {
    const unsub = previousRoot.subscribe((prev) => usePortalStore.setState((state2) => inject(prev, state2)));
    return () => {
      unsub();
    };
  }, [inject]);
  reactExports.useEffect(() => {
    usePortalStore.setState((injectState) => inject(previousRoot.getState(), injectState));
  }, [inject]);
  reactExports.useEffect(() => {
    return () => {
      usePortalStore.destroy();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
    children: reconciler.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(context.Provider, {
      value: usePortalStore,
      children
    }), usePortalStore, null)
  });
}
reconciler.injectIntoDevTools({
  bundleType: 0,
  rendererPackageName: "@react-three/fiber",
  version: reactExports.version
});
const DOM_EVENTS = {
  onClick: ["click", false],
  onContextMenu: ["contextmenu", false],
  onDoubleClick: ["dblclick", false],
  onWheel: ["wheel", true],
  onPointerDown: ["pointerdown", true],
  onPointerUp: ["pointerup", true],
  onPointerLeave: ["pointerleave", true],
  onPointerMove: ["pointermove", true],
  onPointerCancel: ["pointercancel", true],
  onLostPointerCapture: ["lostpointercapture", true]
};
function createPointerEvents(store) {
  const {
    handlePointer
  } = createEvents(store);
  return {
    priority: 1,
    enabled: true,
    compute(event, state, previous) {
      state.pointer.set(event.offsetX / state.size.width * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, state.camera);
    },
    connected: void 0,
    handlers: Object.keys(DOM_EVENTS).reduce((acc, key) => ({
      ...acc,
      [key]: handlePointer(key)
    }), {}),
    update: () => {
      var _internal$lastEvent;
      const {
        events,
        internal
      } = store.getState();
      if ((_internal$lastEvent = internal.lastEvent) != null && _internal$lastEvent.current && events.handlers) events.handlers.onPointerMove(internal.lastEvent.current);
    },
    connect: (target) => {
      var _events$handlers;
      const {
        set,
        events
      } = store.getState();
      events.disconnect == null ? void 0 : events.disconnect();
      set((state) => ({
        events: {
          ...state.events,
          connected: target
        }
      }));
      Object.entries((_events$handlers = events.handlers) != null ? _events$handlers : []).forEach(([name, event]) => {
        const [eventName, passive] = DOM_EVENTS[name];
        target.addEventListener(eventName, event, {
          passive
        });
      });
    },
    disconnect: () => {
      const {
        set,
        events
      } = store.getState();
      if (events.connected) {
        var _events$handlers2;
        Object.entries((_events$handlers2 = events.handlers) != null ? _events$handlers2 : []).forEach(([name, event]) => {
          if (events && events.connected instanceof HTMLElement) {
            const [eventName] = DOM_EVENTS[name];
            events.connected.removeEventListener(eventName, event);
          }
        });
        set((state) => ({
          events: {
            ...state.events,
            connected: void 0
          }
        }));
      }
    }
  };
}
function useMeasure({
  debounce,
  scroll,
  polyfill,
  offsetSize
} = {
  debounce: 0,
  scroll: false,
  offsetSize: false
}) {
  const ResizeObserver = polyfill || typeof window !== "undefined" && window.ResizeObserver;
  const [bounds, set] = reactExports.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0
  });
  if (!ResizeObserver) {
    bounds.width = 1280;
    bounds.height = 800;
    return [() => {
    }, bounds, () => {
    }];
  }
  const state = reactExports.useRef({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: bounds,
    orientationHandler: null
  });
  const scrollDebounce = debounce ? typeof debounce === "number" ? debounce : debounce.scroll : null;
  const resizeDebounce = debounce ? typeof debounce === "number" ? debounce : debounce.resize : null;
  const mounted = reactExports.useRef(false);
  reactExports.useEffect(() => {
    mounted.current = true;
    return () => void (mounted.current = false);
  });
  const [forceRefresh, resizeChange, scrollChange] = reactExports.useMemo(() => {
    const callback = () => {
      if (!state.current.element) return;
      const {
        left,
        top,
        width,
        height,
        bottom,
        right,
        x,
        y
      } = state.current.element.getBoundingClientRect();
      const size = {
        left,
        top,
        width,
        height,
        bottom,
        right,
        x,
        y
      };
      if (state.current.element instanceof HTMLElement && offsetSize) {
        size.height = state.current.element.offsetHeight;
        size.width = state.current.element.offsetWidth;
      }
      Object.freeze(size);
      if (mounted.current && !areBoundsEqual(state.current.lastBounds, size)) set(state.current.lastBounds = size);
    };
    return [callback, resizeDebounce ? createDebounce(callback, resizeDebounce) : callback, scrollDebounce ? createDebounce(callback, scrollDebounce) : callback];
  }, [set, offsetSize, scrollDebounce, resizeDebounce]);
  function removeListeners() {
    if (state.current.scrollContainers) {
      state.current.scrollContainers.forEach((element) => element.removeEventListener("scroll", scrollChange, true));
      state.current.scrollContainers = null;
    }
    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect();
      state.current.resizeObserver = null;
    }
    if (state.current.orientationHandler) {
      if ("orientation" in screen && "removeEventListener" in screen.orientation) {
        screen.orientation.removeEventListener("change", state.current.orientationHandler);
      } else if ("onorientationchange" in window) {
        window.removeEventListener("orientationchange", state.current.orientationHandler);
      }
    }
  }
  function addListeners() {
    var _state$current$resize;
    if (!state.current.element) return;
    state.current.resizeObserver = new ResizeObserver(resizeChange);
    (_state$current$resize = state.current.resizeObserver) == null ? void 0 : _state$current$resize.observe(state.current.element);
    if (scroll && state.current.scrollContainers) {
      state.current.scrollContainers.forEach((scrollContainer) => scrollContainer.addEventListener("scroll", scrollChange, {
        capture: true,
        passive: true
      }));
    }
    state.current.orientationHandler = () => {
      scrollChange();
    };
    if ("orientation" in screen && "addEventListener" in screen.orientation) {
      screen.orientation.addEventListener("change", state.current.orientationHandler);
    } else if ("onorientationchange" in window) {
      window.addEventListener("orientationchange", state.current.orientationHandler);
    }
  }
  const ref = (node) => {
    if (!node || node === state.current.element) return;
    removeListeners();
    state.current.element = node;
    state.current.scrollContainers = findScrollContainers(node);
    addListeners();
  };
  useOnWindowScroll(scrollChange, Boolean(scroll));
  useOnWindowResize(resizeChange);
  reactExports.useEffect(() => {
    removeListeners();
    addListeners();
  }, [scroll, scrollChange, resizeChange]);
  reactExports.useEffect(() => removeListeners, []);
  return [ref, bounds, forceRefresh];
}
function useOnWindowResize(onWindowResize) {
  reactExports.useEffect(() => {
    const cb = onWindowResize;
    window.addEventListener("resize", cb);
    return () => void window.removeEventListener("resize", cb);
  }, [onWindowResize]);
}
function useOnWindowScroll(onScroll, enabled) {
  reactExports.useEffect(() => {
    if (enabled) {
      const cb = onScroll;
      window.addEventListener("scroll", cb, {
        capture: true,
        passive: true
      });
      return () => void window.removeEventListener("scroll", cb, true);
    }
  }, [onScroll, enabled]);
}
function findScrollContainers(element) {
  const result = [];
  if (!element || element === document.body) return result;
  const {
    overflow,
    overflowX,
    overflowY
  } = window.getComputedStyle(element);
  if ([overflow, overflowX, overflowY].some((prop) => prop === "auto" || prop === "scroll")) result.push(element);
  return [...result, ...findScrollContainers(element.parentElement)];
}
const keys = ["x", "y", "top", "bottom", "left", "right", "width", "height"];
const areBoundsEqual = (a, b) => keys.every((key) => a[key] === b[key]);
const CanvasImpl = /* @__PURE__ */ reactExports.forwardRef(function Canvas({
  children,
  fallback,
  resize,
  style,
  gl,
  events = createPointerEvents,
  eventSource,
  eventPrefix,
  shadows,
  linear,
  flat,
  legacy,
  orthographic,
  frameloop,
  dpr,
  performance: performance2,
  raycaster,
  camera,
  scene,
  onPointerMissed,
  onCreated,
  ...props
}, forwardedRef) {
  reactExports.useMemo(() => extend(THREE), []);
  const Bridge = useContextBridge();
  const [containerRef, containerRect] = useMeasure({
    scroll: true,
    debounce: {
      scroll: 50,
      resize: 0
    },
    ...resize
  });
  const canvasRef = reactExports.useRef(null);
  const divRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(forwardedRef, () => canvasRef.current);
  const handlePointerMissed = useMutableCallback(onPointerMissed);
  const [block, setBlock] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  if (block) throw block;
  if (error) throw error;
  const root = reactExports.useRef(null);
  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (containerRect.width > 0 && containerRect.height > 0 && canvas) {
      if (!root.current) root.current = createRoot(canvas);
      root.current.configure({
        gl,
        events,
        shadows,
        linear,
        flat,
        legacy,
        orthographic,
        frameloop,
        dpr,
        performance: performance2,
        raycaster,
        camera,
        scene,
        size: containerRect,
        // Pass mutable reference to onPointerMissed so it's free to update
        onPointerMissed: (...args) => handlePointerMissed.current == null ? void 0 : handlePointerMissed.current(...args),
        onCreated: (state) => {
          state.events.connect == null ? void 0 : state.events.connect(eventSource ? isRef(eventSource) ? eventSource.current : eventSource : divRef.current);
          if (eventPrefix) {
            state.setEvents({
              compute: (event, state2) => {
                const x = event[eventPrefix + "X"];
                const y = event[eventPrefix + "Y"];
                state2.pointer.set(x / state2.size.width * 2 - 1, -(y / state2.size.height) * 2 + 1);
                state2.raycaster.setFromCamera(state2.pointer, state2.camera);
              }
            });
          }
          onCreated == null ? void 0 : onCreated(state);
        }
      });
      root.current.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Bridge, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, {
          set: setError,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, {
            fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Block, {
              set: setBlock
            }),
            children
          })
        })
      }));
    }
  });
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) return () => unmountComponentAtNode(canvas);
  }, []);
  const pointerEvents = eventSource ? "none" : "auto";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
    ref: divRef,
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      pointerEvents,
      ...style
    },
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      ref: containerRef,
      style: {
        width: "100%",
        height: "100%"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("canvas", {
        ref: canvasRef,
        style: {
          display: "block"
        },
        children: fallback
      })
    })
  });
});
const Canvas2 = /* @__PURE__ */ reactExports.forwardRef(function CanvasWrapper(props, ref) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FiberProvider, {
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CanvasImpl, {
      ...props,
      ref
    })
  });
});
export {
  Canvas2 as C,
  useFrame as a,
  useLoader as b,
  createPortal as c,
  applyProps as d,
  extend as e,
  useThree as u
};
