import { r as reactExports } from "./react.mjs";
import "./use-sync-external-store.mjs";
function createStore(createState) {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
    console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
    let currentSlice = selector(state);
    function listenerToAdd() {
      const nextSlice = selector(state);
      if (!equalityFn(currentSlice, nextSlice)) {
        const previousSlice = currentSlice;
        listener(currentSlice = nextSlice, previousSlice);
      }
    }
    listeners.add(listenerToAdd);
    return () => listeners.delete(listenerToAdd);
  };
  const subscribe = (listener, selector, equalityFn) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(listener, selector, equalityFn);
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => listeners.clear();
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
}
const isSSR = typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
const useIsomorphicLayoutEffect = isSSR ? reactExports.useEffect : reactExports.useLayoutEffect;
function create(createState) {
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useStore = (selector = api.getState, equalityFn = Object.is) => {
    const [, forceUpdate] = reactExports.useReducer((c) => c + 1, 0);
    const state = api.getState();
    const stateRef = reactExports.useRef(state);
    const selectorRef = reactExports.useRef(selector);
    const equalityFnRef = reactExports.useRef(equalityFn);
    const erroredRef = reactExports.useRef(false);
    const currentSliceRef = reactExports.useRef();
    if (currentSliceRef.current === void 0) {
      currentSliceRef.current = selector(state);
    }
    let newStateSlice;
    let hasNewStateSlice = false;
    if (stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || erroredRef.current) {
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
    }
    useIsomorphicLayoutEffect(() => {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice;
      }
      stateRef.current = state;
      selectorRef.current = selector;
      equalityFnRef.current = equalityFn;
      erroredRef.current = false;
    });
    const stateBeforeSubscriptionRef = reactExports.useRef(state);
    useIsomorphicLayoutEffect(() => {
      const listener = () => {
        try {
          const nextState = api.getState();
          const nextStateSlice = selectorRef.current(nextState);
          if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
            stateRef.current = nextState;
            currentSliceRef.current = nextStateSlice;
            forceUpdate();
          }
        } catch (error) {
          erroredRef.current = true;
          forceUpdate();
        }
      };
      const unsubscribe = api.subscribe(listener);
      if (api.getState() !== stateBeforeSubscriptionRef.current) {
        listener();
      }
      return unsubscribe;
    }, []);
    const sliceToReturn = hasNewStateSlice ? newStateSlice : currentSliceRef.current;
    reactExports.useDebugValue(sliceToReturn);
    return sliceToReturn;
  };
  Object.assign(useStore, api);
  useStore[Symbol.iterator] = function() {
    console.warn("[useStore, api] = create() is deprecated and will be removed in v4");
    const items = [useStore, api];
    return {
      next() {
        const done = items.length <= 0;
        return { value: items.shift(), done };
      }
    };
  };
  return useStore;
}
export {
  create as c
};
