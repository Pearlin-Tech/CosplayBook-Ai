import { _ as _extends } from "./babel__runtime.mjs";
import { r as reactExports } from "./react.mjs";
import { c as clientExports } from "./react-dom.mjs";
import { D as DoubleSide, d as Vector3, c as Vector2, P as PerspectiveCamera, O as OrthographicCamera, j as CubeReflectionMapping, E as EquirectangularReflectionMapping, k as CubeTextureLoader, S as Scene, l as WebGLCubeRenderTarget, H as HalfFloatType, m as WebGLRenderTarget, n as PlaneGeometry, o as Mesh, p as MeshDepthMaterial, h as Color, q as ShaderMaterial } from "./three.mjs";
import { u as useThree, a as useFrame, b as useLoader, e as extend, c as createPortal, d as applyProps } from "./react-three__fiber.mjs";
import { O as OrbitControls$1, R as RGBELoader, E as EXRLoader, G as GroundProjectedEnv, H as HorizontalBlurShader, V as VerticalBlurShader } from "./three-stdlib.mjs";
import { H as HDRJPGLoader, G as GainMapLoader } from "./monogrid__gainmap-js.mjs";
const v1 = /* @__PURE__ */ new Vector3();
const v2 = /* @__PURE__ */ new Vector3();
const v3 = /* @__PURE__ */ new Vector3();
const v4 = /* @__PURE__ */ new Vector2();
function defaultCalculatePosition(el, camera, size) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  objectPos.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf];
}
function isObjectBehindCamera(el, camera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
  const deltaCamObj = objectPos.sub(cameraPos);
  const camDir = camera.getWorldDirection(v3);
  return deltaCamObj.angleTo(camDir) > Math.PI / 2;
}
function isObjectVisible(el, camera, raycaster, occlude) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld);
  const screenPos = elPos.clone();
  screenPos.project(camera);
  v4.set(screenPos.x, screenPos.y);
  raycaster.setFromCamera(v4, camera);
  const intersects = raycaster.intersectObjects(occlude, true);
  if (intersects.length) {
    const intersectionDistance = intersects[0].distance;
    const pointDistance = elPos.distanceTo(raycaster.ray.origin);
    return pointDistance < intersectionDistance;
  }
  return true;
}
function objectScale(el, camera) {
  if (camera instanceof OrthographicCamera) {
    return camera.zoom;
  } else if (camera instanceof PerspectiveCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const vFOV = camera.fov * Math.PI / 180;
    const dist = objectPos.distanceTo(cameraPos);
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist;
    return 1 / scaleFOV;
  } else {
    return 1;
  }
}
function objectZIndex(el, camera, zIndexRange) {
  if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const dist = objectPos.distanceTo(cameraPos);
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near);
    const B = zIndexRange[1] - A * camera.far;
    return Math.round(A * dist + B);
  }
  return void 0;
}
const epsilon = (value) => Math.abs(value) < 1e-10 ? 0 : value;
function getCSSMatrix(matrix, multipliers, prepend = "") {
  let matrix3d = "matrix3d(";
  for (let i = 0; i !== 16; i++) {
    matrix3d += epsilon(multipliers[i] * matrix.elements[i]) + (i !== 15 ? "," : ")");
  }
  return prepend + matrix3d;
}
const getCameraCSSMatrix = /* @__PURE__ */ ((multipliers) => {
  return (matrix) => getCSSMatrix(matrix, multipliers);
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]);
const getObjectCSSMatrix = /* @__PURE__ */ ((scaleMultipliers) => {
  return (matrix, factor) => getCSSMatrix(matrix, scaleMultipliers(factor), "translate(-50%,-50%)");
})((f) => [1 / f, 1 / f, 1 / f, 1, -1 / f, -1 / f, -1 / f, -1, 1 / f, 1 / f, 1 / f, 1, 1, 1, 1, 1]);
function isRefObject(ref) {
  return ref && typeof ref === "object" && "current" in ref;
}
const Html = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  eps = 1e-3,
  style,
  className,
  prepend,
  center,
  fullscreen,
  portal,
  distanceFactor,
  sprite = false,
  transform = false,
  occlude,
  onOcclude,
  castShadow,
  receiveShadow,
  material,
  geometry,
  zIndexRange = [16777271, 0],
  calculatePosition = defaultCalculatePosition,
  as = "div",
  wrapperClass,
  pointerEvents = "auto",
  ...props
}, ref) => {
  const {
    gl,
    camera,
    scene,
    size,
    raycaster,
    events,
    viewport
  } = useThree();
  const [el] = reactExports.useState(() => document.createElement(as));
  const root = reactExports.useRef();
  const group = reactExports.useRef(null);
  const oldZoom = reactExports.useRef(0);
  const oldPosition = reactExports.useRef([0, 0]);
  const transformOuterRef = reactExports.useRef(null);
  const transformInnerRef = reactExports.useRef(null);
  const target = (portal == null ? void 0 : portal.current) || events.connected || gl.domElement.parentNode;
  const occlusionMeshRef = reactExports.useRef(null);
  const isMeshSizeSet = reactExports.useRef(false);
  const isRayCastOcclusion = reactExports.useMemo(() => {
    return occlude && occlude !== "blending" || Array.isArray(occlude) && occlude.length && isRefObject(occlude[0]);
  }, [occlude]);
  reactExports.useLayoutEffect(() => {
    const el2 = gl.domElement;
    if (occlude && occlude === "blending") {
      el2.style.zIndex = `${Math.floor(zIndexRange[0] / 2)}`;
      el2.style.position = "absolute";
      el2.style.pointerEvents = "none";
    } else {
      el2.style.zIndex = null;
      el2.style.position = null;
      el2.style.pointerEvents = null;
    }
  }, [occlude]);
  reactExports.useLayoutEffect(() => {
    if (group.current) {
      const currentRoot = root.current = clientExports.createRoot(el);
      scene.updateMatrixWorld();
      if (transform) {
        el.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;
      } else {
        const vec = calculatePosition(group.current, camera, size);
        el.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vec[0]}px,${vec[1]}px,0);transform-origin:0 0;`;
      }
      if (target) {
        if (prepend) target.prepend(el);
        else target.appendChild(el);
      }
      return () => {
        if (target) target.removeChild(el);
        currentRoot.unmount();
      };
    }
  }, [target, transform]);
  reactExports.useLayoutEffect(() => {
    if (wrapperClass) el.className = wrapperClass;
  }, [wrapperClass]);
  const styles = reactExports.useMemo(() => {
    if (transform) {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        width: size.width,
        height: size.height,
        transformStyle: "preserve-3d",
        pointerEvents: "none"
      };
    } else {
      return {
        position: "absolute",
        transform: center ? "translate3d(-50%,-50%,0)" : "none",
        ...fullscreen && {
          top: -size.height / 2,
          left: -size.width / 2,
          width: size.width,
          height: size.height
        },
        ...style
      };
    }
  }, [style, center, fullscreen, size, transform]);
  const transformInnerStyles = reactExports.useMemo(() => ({
    position: "absolute",
    pointerEvents
  }), [pointerEvents]);
  reactExports.useLayoutEffect(() => {
    isMeshSizeSet.current = false;
    if (transform) {
      var _root$current;
      (_root$current = root.current) == null || _root$current.render(/* @__PURE__ */ reactExports.createElement("div", {
        ref: transformOuterRef,
        style: styles
      }, /* @__PURE__ */ reactExports.createElement("div", {
        ref: transformInnerRef,
        style: transformInnerStyles
      }, /* @__PURE__ */ reactExports.createElement("div", {
        ref,
        className,
        style,
        children
      }))));
    } else {
      var _root$current2;
      (_root$current2 = root.current) == null || _root$current2.render(/* @__PURE__ */ reactExports.createElement("div", {
        ref,
        style: styles,
        className,
        children
      }));
    }
  });
  const visible = reactExports.useRef(true);
  useFrame((gl2) => {
    if (group.current) {
      camera.updateMatrixWorld();
      group.current.updateWorldMatrix(true, false);
      const vec = transform ? oldPosition.current : calculatePosition(group.current, camera, size);
      if (transform || Math.abs(oldZoom.current - camera.zoom) > eps || Math.abs(oldPosition.current[0] - vec[0]) > eps || Math.abs(oldPosition.current[1] - vec[1]) > eps) {
        const isBehindCamera = isObjectBehindCamera(group.current, camera);
        let raytraceTarget = false;
        if (isRayCastOcclusion) {
          if (Array.isArray(occlude)) {
            raytraceTarget = occlude.map((item) => item.current);
          } else if (occlude !== "blending") {
            raytraceTarget = [scene];
          }
        }
        const previouslyVisible = visible.current;
        if (raytraceTarget) {
          const isvisible = isObjectVisible(group.current, camera, raycaster, raytraceTarget);
          visible.current = isvisible && !isBehindCamera;
        } else {
          visible.current = !isBehindCamera;
        }
        if (previouslyVisible !== visible.current) {
          if (onOcclude) onOcclude(!visible.current);
          else el.style.display = visible.current ? "block" : "none";
        }
        const halfRange = Math.floor(zIndexRange[0] / 2);
        const zRange = occlude ? isRayCastOcclusion ? [zIndexRange[0], halfRange] : [halfRange - 1, 0] : zIndexRange;
        el.style.zIndex = `${objectZIndex(group.current, camera, zRange)}`;
        if (transform) {
          const [widthHalf, heightHalf] = [size.width / 2, size.height / 2];
          const fov = camera.projectionMatrix.elements[5] * heightHalf;
          const {
            isOrthographicCamera,
            top,
            left,
            bottom,
            right
          } = camera;
          const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse);
          const cameraTransform = isOrthographicCamera ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)` : `translateZ(${fov}px)`;
          let matrix = group.current.matrixWorld;
          if (sprite) {
            matrix = camera.matrixWorldInverse.clone().transpose().copyPosition(matrix).scale(group.current.scale);
            matrix.elements[3] = matrix.elements[7] = matrix.elements[11] = 0;
            matrix.elements[15] = 1;
          }
          el.style.width = size.width + "px";
          el.style.height = size.height + "px";
          el.style.perspective = isOrthographicCamera ? "" : `${fov}px`;
          if (transformOuterRef.current && transformInnerRef.current) {
            transformOuterRef.current.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`;
            transformInnerRef.current.style.transform = getObjectCSSMatrix(matrix, 1 / ((distanceFactor || 10) / 400));
          }
        } else {
          const scale = distanceFactor === void 0 ? 1 : objectScale(group.current, camera) * distanceFactor;
          el.style.transform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale})`;
        }
        oldPosition.current = vec;
        oldZoom.current = camera.zoom;
      }
    }
    if (!isRayCastOcclusion && occlusionMeshRef.current && !isMeshSizeSet.current) {
      if (transform) {
        if (transformOuterRef.current) {
          const el2 = transformOuterRef.current.children[0];
          if (el2 != null && el2.clientWidth && el2 != null && el2.clientHeight) {
            const {
              isOrthographicCamera
            } = camera;
            if (isOrthographicCamera || geometry) {
              if (props.scale) {
                if (!Array.isArray(props.scale)) {
                  occlusionMeshRef.current.scale.setScalar(1 / props.scale);
                } else if (props.scale instanceof Vector3) {
                  occlusionMeshRef.current.scale.copy(props.scale.clone().divideScalar(1));
                } else {
                  occlusionMeshRef.current.scale.set(1 / props.scale[0], 1 / props.scale[1], 1 / props.scale[2]);
                }
              }
            } else {
              const ratio = (distanceFactor || 10) / 400;
              const w = el2.clientWidth * ratio;
              const h = el2.clientHeight * ratio;
              occlusionMeshRef.current.scale.set(w, h, 1);
            }
            isMeshSizeSet.current = true;
          }
        }
      } else {
        const ele = el.children[0];
        if (ele != null && ele.clientWidth && ele != null && ele.clientHeight) {
          const ratio = 1 / viewport.factor;
          const w = ele.clientWidth * ratio;
          const h = ele.clientHeight * ratio;
          occlusionMeshRef.current.scale.set(w, h, 1);
          isMeshSizeSet.current = true;
        }
        occlusionMeshRef.current.lookAt(gl2.camera.position);
      }
    }
  });
  const shaders = reactExports.useMemo(() => ({
    vertexShader: !transform ? (
      /* glsl */
      `
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `
    ) : void 0,
    fragmentShader: (
      /* glsl */
      `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `
    )
  }), [transform]);
  return /* @__PURE__ */ reactExports.createElement("group", _extends({}, props, {
    ref: group
  }), occlude && !isRayCastOcclusion && /* @__PURE__ */ reactExports.createElement("mesh", {
    castShadow,
    receiveShadow,
    ref: occlusionMeshRef
  }, geometry || /* @__PURE__ */ reactExports.createElement("planeGeometry", null), material || /* @__PURE__ */ reactExports.createElement("shaderMaterial", {
    side: DoubleSide,
    vertexShader: shaders.vertexShader,
    fragmentShader: shaders.fragmentShader
  })));
});
const OrbitControls = /* @__PURE__ */ reactExports.forwardRef(({
  makeDefault,
  camera,
  regress,
  domElement,
  enableDamping = true,
  keyEvents = false,
  onChange,
  onStart,
  onEnd,
  ...restProps
}, ref) => {
  const invalidate = useThree((state) => state.invalidate);
  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const setEvents = useThree((state) => state.setEvents);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const performance = useThree((state) => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = reactExports.useMemo(() => new OrbitControls$1(explCamera), [explCamera]);
  useFrame(() => {
    if (controls.enabled) controls.update();
  }, -1);
  reactExports.useEffect(() => {
    if (keyEvents) {
      controls.connect(keyEvents === true ? explDomElement : keyEvents);
    }
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [keyEvents, explDomElement, regress, controls, invalidate]);
  reactExports.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (regress) performance.regress();
      if (onChange) onChange(e);
    };
    const onStartCb = (e) => {
      if (onStart) onStart(e);
    };
    const onEndCb = (e) => {
      if (onEnd) onEnd(e);
    };
    controls.addEventListener("change", callback);
    controls.addEventListener("start", onStartCb);
    controls.addEventListener("end", onEndCb);
    return () => {
      controls.removeEventListener("start", onStartCb);
      controls.removeEventListener("end", onEndCb);
      controls.removeEventListener("change", callback);
    };
  }, [onChange, onStart, onEnd, controls, invalidate, setEvents]);
  reactExports.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    ref,
    object: controls,
    enableDamping
  }, restProps));
});
const LinearEncoding = 3e3;
const sRGBEncoding = 3001;
const presetsObj = {
  apartment: "lebombo_1k.hdr",
  city: "potsdamer_platz_1k.hdr",
  dawn: "kiara_1_dawn_1k.hdr",
  forest: "forest_slope_1k.hdr",
  lobby: "st_fagans_interior_1k.hdr",
  night: "dikhololo_night_1k.hdr",
  park: "rooitou_park_1k.hdr",
  studio: "studio_small_03_1k.hdr",
  sunset: "venice_sunset_1k.hdr",
  warehouse: "empty_warehouse_01_1k.hdr"
};
const CUBEMAP_ROOT = "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/";
const isArray = (arr) => Array.isArray(arr);
const defaultFiles = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"];
function useEnvironment({
  files = defaultFiles,
  path = "",
  preset = void 0,
  encoding = void 0,
  extensions
} = {}) {
  let loader = null;
  let multiFile = false;
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
    path = CUBEMAP_ROOT;
  }
  multiFile = isArray(files);
  const {
    extension,
    isCubemap
  } = getExtension(files);
  loader = getLoader(extension);
  if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  const gl = useThree((state) => state.gl);
  reactExports.useLayoutEffect(() => {
    if (extension !== "webp" && extension !== "jpg" && extension !== "jpeg") return;
    function clearGainmapTexture() {
      useLoader.clear(
        // @ts-expect-error
        loader,
        multiFile ? [files] : files
      );
    }
    gl.domElement.addEventListener("webglcontextlost", clearGainmapTexture, {
      once: true
    });
  }, [files, gl.domElement]);
  const loaderResult = useLoader(
    // @ts-expect-error
    loader,
    multiFile ? [files] : files,
    (loader2) => {
      if (extension === "webp" || extension === "jpg" || extension === "jpeg") {
        loader2.setRenderer(gl);
      }
      loader2.setPath == null || loader2.setPath(path);
      if (extensions) extensions(loader2);
    }
  );
  let texture = multiFile ? (
    // @ts-ignore
    loaderResult[0]
  ) : loaderResult;
  if (extension === "jpg" || extension === "jpeg" || extension === "webp") {
    var _renderTarget;
    texture = (_renderTarget = texture.renderTarget) == null ? void 0 : _renderTarget.texture;
  }
  texture.mapping = isCubemap ? CubeReflectionMapping : EquirectangularReflectionMapping;
  if ("colorSpace" in texture) texture.colorSpace = (encoding !== null && encoding !== void 0 ? encoding : isCubemap) ? "srgb" : "srgb-linear";
  else texture.encoding = (encoding !== null && encoding !== void 0 ? encoding : isCubemap) ? sRGBEncoding : LinearEncoding;
  return texture;
}
const preloadDefaultOptions = {
  files: defaultFiles,
  path: "",
  preset: void 0,
  extensions: void 0
};
useEnvironment.preload = (preloadOptions) => {
  const options = {
    ...preloadDefaultOptions,
    ...preloadOptions
  };
  let {
    files,
    path = ""
  } = options;
  const {
    preset,
    extensions
  } = options;
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
    path = CUBEMAP_ROOT;
  }
  const {
    extension
  } = getExtension(files);
  if (extension === "webp" || extension === "jpg" || extension === "jpeg") {
    throw new Error("useEnvironment: Preloading gainmaps is not supported");
  }
  const loader = getLoader(extension);
  if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  useLoader.preload(
    // @ts-expect-error
    loader,
    isArray(files) ? [files] : files,
    (loader2) => {
      loader2.setPath == null || loader2.setPath(path);
      if (extensions) extensions(loader2);
    }
  );
};
const clearDefaultOptins = {
  files: defaultFiles,
  preset: void 0
};
useEnvironment.clear = (clearOptions) => {
  const options = {
    ...clearDefaultOptins,
    ...clearOptions
  };
  let {
    files
  } = options;
  const {
    preset
  } = options;
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
  }
  const {
    extension
  } = getExtension(files);
  const loader = getLoader(extension);
  if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  useLoader.clear(
    // @ts-expect-error
    loader,
    isArray(files) ? [files] : files
  );
};
function validatePreset(preset) {
  if (!(preset in presetsObj)) throw new Error("Preset must be one of: " + Object.keys(presetsObj).join(", "));
}
function getExtension(files) {
  var _firstEntry$split$pop;
  const isCubemap = isArray(files) && files.length === 6;
  const isGainmap = isArray(files) && files.length === 3 && files.some((file) => file.endsWith("json"));
  const firstEntry = isArray(files) ? files[0] : files;
  const extension = isCubemap ? "cube" : isGainmap ? "webp" : firstEntry.startsWith("data:application/exr") ? "exr" : firstEntry.startsWith("data:application/hdr") ? "hdr" : firstEntry.startsWith("data:image/jpeg") ? "jpg" : (_firstEntry$split$pop = firstEntry.split(".").pop()) == null || (_firstEntry$split$pop = _firstEntry$split$pop.split("?")) == null || (_firstEntry$split$pop = _firstEntry$split$pop.shift()) == null ? void 0 : _firstEntry$split$pop.toLowerCase();
  return {
    extension,
    isCubemap,
    isGainmap
  };
}
function getLoader(extension) {
  const loader = extension === "cube" ? CubeTextureLoader : extension === "hdr" ? RGBELoader : extension === "exr" ? EXRLoader : extension === "jpg" || extension === "jpeg" ? HDRJPGLoader : extension === "webp" ? GainMapLoader : null;
  return loader;
}
const isRef = (obj) => obj.current && obj.current.isScene;
const resolveScene = (scene) => isRef(scene) ? scene.current : scene;
function setEnvProps(background, scene, defaultScene, texture, sceneProps = {}) {
  var _target$backgroundRot, _target$backgroundRot2, _target$environmentRo, _target$environmentRo2;
  sceneProps = {
    backgroundBlurriness: 0,
    backgroundIntensity: 1,
    backgroundRotation: [0, 0, 0],
    environmentIntensity: 1,
    environmentRotation: [0, 0, 0],
    ...sceneProps
  };
  const target = resolveScene(scene || defaultScene);
  const oldbg = target.background;
  const oldenv = target.environment;
  const oldSceneProps = {
    // @ts-ignore
    backgroundBlurriness: target.backgroundBlurriness,
    // @ts-ignore
    backgroundIntensity: target.backgroundIntensity,
    // @ts-ignore
    backgroundRotation: (_target$backgroundRot = (_target$backgroundRot2 = target.backgroundRotation) == null || _target$backgroundRot2.clone == null ? void 0 : _target$backgroundRot2.clone()) !== null && _target$backgroundRot !== void 0 ? _target$backgroundRot : [0, 0, 0],
    // @ts-ignore
    environmentIntensity: target.environmentIntensity,
    // @ts-ignore
    environmentRotation: (_target$environmentRo = (_target$environmentRo2 = target.environmentRotation) == null || _target$environmentRo2.clone == null ? void 0 : _target$environmentRo2.clone()) !== null && _target$environmentRo !== void 0 ? _target$environmentRo : [0, 0, 0]
  };
  if (background !== "only") target.environment = texture;
  if (background) target.background = texture;
  applyProps(target, sceneProps);
  return () => {
    if (background !== "only") target.environment = oldenv;
    if (background) target.background = oldbg;
    applyProps(target, oldSceneProps);
  };
}
function EnvironmentMap({
  scene,
  background = false,
  map,
  ...config
}) {
  const defaultScene = useThree((state) => state.scene);
  reactExports.useLayoutEffect(() => {
    if (map) return setEnvProps(background, scene, defaultScene, map, config);
  });
  return null;
}
function EnvironmentCube({
  background = false,
  scene,
  blur,
  backgroundBlurriness,
  backgroundIntensity,
  backgroundRotation,
  environmentIntensity,
  environmentRotation,
  ...rest
}) {
  const texture = useEnvironment(rest);
  const defaultScene = useThree((state) => state.scene);
  reactExports.useLayoutEffect(() => {
    return setEnvProps(background, scene, defaultScene, texture, {
      backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
      backgroundIntensity,
      backgroundRotation,
      environmentIntensity,
      environmentRotation
    });
  });
  reactExports.useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);
  return null;
}
function EnvironmentPortal({
  children,
  near = 0.1,
  far = 1e3,
  resolution = 256,
  frames = 1,
  map,
  background = false,
  blur,
  backgroundBlurriness,
  backgroundIntensity,
  backgroundRotation,
  environmentIntensity,
  environmentRotation,
  scene,
  files,
  path,
  preset = void 0,
  extensions
}) {
  const gl = useThree((state) => state.gl);
  const defaultScene = useThree((state) => state.scene);
  const camera = reactExports.useRef(null);
  const [virtualScene] = reactExports.useState(() => new Scene());
  const fbo = reactExports.useMemo(() => {
    const fbo2 = new WebGLCubeRenderTarget(resolution);
    fbo2.texture.type = HalfFloatType;
    return fbo2;
  }, [resolution]);
  reactExports.useEffect(() => {
    return () => {
      fbo.dispose();
    };
  }, [fbo]);
  reactExports.useLayoutEffect(() => {
    if (frames === 1) {
      const autoClear = gl.autoClear;
      gl.autoClear = true;
      camera.current.update(gl, virtualScene);
      gl.autoClear = autoClear;
    }
    return setEnvProps(background, scene, defaultScene, fbo.texture, {
      backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
      backgroundIntensity,
      backgroundRotation,
      environmentIntensity,
      environmentRotation
    });
  }, [children, virtualScene, fbo.texture, scene, defaultScene, background, frames, gl]);
  let count = 1;
  useFrame(() => {
    if (frames === Infinity || count < frames) {
      const autoClear = gl.autoClear;
      gl.autoClear = true;
      camera.current.update(gl, virtualScene);
      gl.autoClear = autoClear;
      count++;
    }
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, createPortal(/* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, children, /* @__PURE__ */ reactExports.createElement("cubeCamera", {
    ref: camera,
    args: [near, far, fbo]
  }), files || preset ? /* @__PURE__ */ reactExports.createElement(EnvironmentCube, {
    background: true,
    files,
    preset,
    path,
    extensions
  }) : map ? /* @__PURE__ */ reactExports.createElement(EnvironmentMap, {
    background: true,
    map,
    extensions
  }) : null), virtualScene));
}
function EnvironmentGround(props) {
  var _props$ground, _props$ground2, _scale, _props$ground3;
  const textureDefault = useEnvironment(props);
  const texture = props.map || textureDefault;
  reactExports.useMemo(() => extend({
    GroundProjectedEnvImpl: GroundProjectedEnv
  }), []);
  reactExports.useEffect(() => {
    return () => {
      textureDefault.dispose();
    };
  }, [textureDefault]);
  const args = reactExports.useMemo(() => [texture], [texture]);
  const height = (_props$ground = props.ground) == null ? void 0 : _props$ground.height;
  const radius = (_props$ground2 = props.ground) == null ? void 0 : _props$ground2.radius;
  const scale = (_scale = (_props$ground3 = props.ground) == null ? void 0 : _props$ground3.scale) !== null && _scale !== void 0 ? _scale : 1e3;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(EnvironmentMap, _extends({}, props, {
    map: texture
  })), /* @__PURE__ */ reactExports.createElement("groundProjectedEnvImpl", {
    args,
    scale,
    height,
    radius
  }));
}
function Environment(props) {
  return props.ground ? /* @__PURE__ */ reactExports.createElement(EnvironmentGround, props) : props.map ? /* @__PURE__ */ reactExports.createElement(EnvironmentMap, props) : props.children ? /* @__PURE__ */ reactExports.createElement(EnvironmentPortal, props) : /* @__PURE__ */ reactExports.createElement(EnvironmentCube, props);
}
const ContactShadows = /* @__PURE__ */ reactExports.forwardRef(({
  scale = 10,
  frames = Infinity,
  opacity = 1,
  width = 1,
  height = 1,
  blur = 1,
  near = 0,
  far = 10,
  resolution = 512,
  smooth = true,
  color = "#000000",
  depthWrite = false,
  renderOrder,
  ...props
}, fref) => {
  const ref = reactExports.useRef(null);
  const scene = useThree((state) => state.scene);
  const gl = useThree((state) => state.gl);
  const shadowCamera = reactExports.useRef(null);
  width = width * (Array.isArray(scale) ? scale[0] : scale || 1);
  height = height * (Array.isArray(scale) ? scale[1] : scale || 1);
  const [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur] = reactExports.useMemo(() => {
    const renderTarget2 = new WebGLRenderTarget(resolution, resolution);
    const renderTargetBlur2 = new WebGLRenderTarget(resolution, resolution);
    renderTargetBlur2.texture.generateMipmaps = renderTarget2.texture.generateMipmaps = false;
    const planeGeometry2 = new PlaneGeometry(width, height).rotateX(Math.PI / 2);
    const blurPlane2 = new Mesh(planeGeometry2);
    const depthMaterial2 = new MeshDepthMaterial();
    depthMaterial2.depthTest = depthMaterial2.depthWrite = false;
    depthMaterial2.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ucolor: {
          value: new Color(color)
        }
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        `void main() {`,
        //
        `uniform vec3 ucolor;
           void main() {
          `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4( vec3( 1.0 - fragCoordZ ), opacity );",
        // Colorize the shadow, multiply by the falloff so that the center can remain darker
        "vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );"
      );
    };
    const horizontalBlurMaterial2 = new ShaderMaterial(HorizontalBlurShader);
    const verticalBlurMaterial2 = new ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial2.depthTest = horizontalBlurMaterial2.depthTest = false;
    return [renderTarget2, planeGeometry2, depthMaterial2, blurPlane2, horizontalBlurMaterial2, verticalBlurMaterial2, renderTargetBlur2];
  }, [resolution, width, height, scale, color]);
  const blurShadows = (blur2) => {
    blurPlane.visible = true;
    blurPlane.material = horizontalBlurMaterial;
    horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
    horizontalBlurMaterial.uniforms.h.value = blur2 * 1 / 256;
    gl.setRenderTarget(renderTargetBlur);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.material = verticalBlurMaterial;
    verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture;
    verticalBlurMaterial.uniforms.v.value = blur2 * 1 / 256;
    gl.setRenderTarget(renderTarget);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.visible = false;
  };
  let count = 0;
  let initialBackground;
  let initialOverrideMaterial;
  useFrame(() => {
    if (shadowCamera.current && (frames === Infinity || count < frames)) {
      count++;
      initialBackground = scene.background;
      initialOverrideMaterial = scene.overrideMaterial;
      ref.current.visible = false;
      scene.background = null;
      scene.overrideMaterial = depthMaterial;
      gl.setRenderTarget(renderTarget);
      gl.render(scene, shadowCamera.current);
      blurShadows(blur);
      if (smooth) blurShadows(blur * 0.4);
      gl.setRenderTarget(null);
      ref.current.visible = true;
      scene.overrideMaterial = initialOverrideMaterial;
      scene.background = initialBackground;
    }
  });
  reactExports.useImperativeHandle(fref, () => ref.current, []);
  return /* @__PURE__ */ reactExports.createElement("group", _extends({
    "rotation-x": Math.PI / 2
  }, props, {
    ref
  }), /* @__PURE__ */ reactExports.createElement("mesh", {
    renderOrder,
    geometry: planeGeometry,
    scale: [1, -1, 1],
    rotation: [-Math.PI / 2, 0, 0]
  }, /* @__PURE__ */ reactExports.createElement("meshBasicMaterial", {
    transparent: true,
    map: renderTarget.texture,
    opacity,
    depthWrite
  })), /* @__PURE__ */ reactExports.createElement("orthographicCamera", {
    ref: shadowCamera,
    args: [-width / 2, width / 2, height / 2, -height / 2, near, far]
  }));
});
export {
  ContactShadows as C,
  Environment as E,
  Html as H,
  OrbitControls as O
};
