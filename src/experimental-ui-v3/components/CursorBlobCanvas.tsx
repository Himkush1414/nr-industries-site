import { MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import type { Mesh } from "three";
import { MathUtils } from "three";
import { usePrefersReducedMotion } from "@/experimental-ui-v3/lib/usePrefersReducedMotion";

/**
 * The hero's cursor-reactive blob: a noise-deformed sphere (drei's
 * MeshDistortMaterial) whose position is damped toward the pointer each
 * frame (frame-rate-independent exponential lerp — a lightweight stand-in
 * for a spring, no extra physics lib needed), then run through a heavy
 * mipmap bloom pass so it reads as a soft, blurred, organic glow rather than
 * a crisp 3D object. Colored from the palette's accent/highlight range.
 */
function Blob() {
  const meshRef = useRef<Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { pointer, viewport } = state;
    target.current.x = (pointer.x * viewport.width) / 2;
    target.current.y = (pointer.y * viewport.height) / 2;

    const mesh = meshRef.current;
    if (!mesh) return;
    const damping = 1 - Math.pow(0.001, delta);
    mesh.position.x = MathUtils.lerp(mesh.position.x, target.current.x, damping);
    mesh.position.y = MathUtils.lerp(mesh.position.y, target.current.y, damping);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.35, 64, 64]} />
      <MeshDistortMaterial
        color="#6b62b8"
        distort={0.45}
        speed={1.8}
        roughness={0.2}
        metalness={0.1}
        emissive="#564b96"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

/** Static CSS fallback under prefers-reduced-motion — same glow language,
 * zero animation, zero WebGL. */
function StaticGlowFallback() {
  return (
    <div className="v3-glow" style={{ inset: "10%", opacity: 0.9 }} aria-hidden="true" />
  );
}

export function CursorBlobCanvas({ className = "" }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div className={`relative ${className}`} aria-hidden="true">
        <StaticGlowFallback />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        dpr={[1, 1.75]}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 4]} intensity={1.1} color="#dfe0f3" />
        <Blob />
        <EffectComposer>
          <Bloom intensity={1.4} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur radius={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
