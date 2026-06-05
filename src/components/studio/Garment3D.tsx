import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  frontUrl: string;
  backUrl: string;
  designUrl?: string | null;
  designPlacement?: { x: number; y: number; w: number } | null; // front-only placement %
  designOnBack?: { x: number; y: number; w: number } | null;
  colorHex: string;
  autoRotate: boolean;
  hd: boolean;
  background: "studio" | "warm" | "noir";
  aspect: number; // width/height ratio (≈0.78 tee)
};

const BG = {
  studio: { color: "#F4F3F0", env: "studio" as const },
  warm:   { color: "#EAE2D3", env: "apartment" as const },
  noir:   { color: "#141414", env: "warehouse" as const },
};

function GarmentMesh({
  frontUrl, backUrl, designUrl, designPlacement, designOnBack,
  colorHex, autoRotate, hd, aspect,
}: Omit<Props, "background">) {
  const group = useRef<THREE.Group>(null);
  const [frontTex, backTex] = useLoader(THREE.TextureLoader, [frontUrl, backUrl]);
  const designTex = useLoader(THREE.TextureLoader, designUrl || frontUrl); // dummy fallback

  // sRGB color space for textures
  [frontTex, backTex, designTex].forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = hd ? 16 : 4;
  });

  // Garment plane size — based on aspect (width/height)
  const W = 2.4;
  const H = W / aspect;

  useFrame((_, dt) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += dt * 0.45;
    }
  });

  // Slight inward curve via segment count + custom shader is heavy — use rounded plane via geometry
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(W, H, 32, 32);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      // gentle curve toward viewer for front face — barrel
      const z = -Math.pow(x / (W / 2), 2) * 0.08;
      pos.setZ(i, z);
    }
    g.computeVertexNormals();
    return g;
  }, [W, H]);

  const color = useMemo(() => new THREE.Color(colorHex), [colorHex]);

  // Design overlay plane size based on placement %
  const overlay = (placement: { x: number; y: number; w: number } | null | undefined, isBack: boolean) => {
    if (!placement || !designUrl) return null;
    const ow = (placement.w / 100) * W;
    const ratio = designTex.image ? designTex.image.height / designTex.image.width : 1;
    const oh = ow * ratio;
    // map placement % (origin top-left) to centered local coords
    const lx = (placement.x / 100 - 0.5) * W * (isBack ? -1 : 1);
    const ly = -(placement.y / 100 - 0.5) * H;
    return (
      <mesh position={[lx, ly, isBack ? -0.012 : 0.012]} rotation={[0, isBack ? Math.PI : 0, 0]}>
        <planeGeometry args={[ow, oh]} />
        <meshStandardMaterial
          map={designTex}
          transparent
          blending={THREE.MultiplyBlending}
          depthWrite={false}
          roughness={0.95}
          toneMapped={false}
        />
      </mesh>
    );
  };

  return (
    <group ref={group}>
      {/* Front face */}
      <mesh geometry={geo} position={[0, 0, 0.01]}>
        <meshStandardMaterial
          map={frontTex}
          color={color}
          roughness={hd ? 0.85 : 1}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Back face — mirrored geometry */}
      <mesh geometry={geo} rotation={[0, Math.PI, 0]} position={[0, 0, -0.01]}>
        <meshStandardMaterial
          map={backTex}
          color={color}
          roughness={hd ? 0.85 : 1}
          metalness={0}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Design overlays */}
      {overlay(designPlacement, false)}
      {overlay(designOnBack, true)}
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/60">
        Rendering Atelier ·
      </div>
    </Html>
  );
}

export default function Garment3D(props: Props) {
  const bg = BG[props.background];
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 32 }}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
      style={{ background: bg.color }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} />
      <Suspense fallback={<Loader />}>
        <GarmentMesh {...props} />
        {props.hd && <Environment preset={bg.env} background={false} />}
        <ContactShadows position={[0, -1.6, 0]} opacity={0.35} scale={6} blur={2.4} far={3} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3.2}
        maxDistance={6.5}
        autoRotate={false}
        rotateSpeed={0.9}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
