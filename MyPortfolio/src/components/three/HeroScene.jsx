import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/*
  3D scene behind the hero memoji:
  - a liquid-chrome blob that slowly morphs
  - four glossy shapes floating around it
  The whole scene leans toward the mouse and drifts as you scroll.
  Lighting is built in code (Lightformers), so nothing is downloaded.
*/

// Mouse position shared with the scene (-1..1), read every frame.
const pointer = { x: 0, y: 0 };

function Rig({ children }) {
  const group = useRef();
  useFrame((_, dt) => {
    const g = group.current;
    const k = 1 - Math.pow(0.002, dt); // smooth, frame-rate independent easing
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.x * 0.35, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.25, k);
    g.position.x = THREE.MathUtils.lerp(g.position.x, pointer.x * 0.3, k);
    g.position.y = THREE.MathUtils.lerp(g.position.y, window.scrollY * 0.004, k);
  });
  return <group ref={group}>{children}</group>;
}

function Blob({ scale }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.15;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });
  return (
    <mesh ref={mesh} scale={scale} position={[0, -0.2, -1]}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial
        color="#8a3ffc"
        metalness={1}
        roughness={0.12}
        distort={0.42}
        speed={1.6}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function Shape({ position, color, children, speed = 1, spin = 0.4 }) {
  const mesh = useRef();
  useFrame((_, dt) => {
    mesh.current.rotation.x += dt * spin;
    mesh.current.rotation.y += dt * spin * 0.7;
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} position={position}>
        {children}
        <meshPhysicalMaterial color={color} metalness={0.2} roughness={0.15} clearcoat={1} clearcoatRoughness={0.1} />
      </mesh>
    </Float>
  );
}

function Scene() {
  // Spread the shapes to fit the screen width.
  const { viewport } = useThree();
  const w = viewport.width / 2;
  const small = viewport.width < 6;
  const s = small ? 0.65 : 1;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, 2]} intensity={40} color="#ff2d9a" />
      <pointLight position={[4, 2, 2]} intensity={30} color="#22d3ee" />

      <Rig>
        <Blob scale={small ? 1.5 : 2.1} />

        <Shape position={[-w * 0.72, -0.3, 0]} color="#ff5a6e" speed={1.1}>
          <torusGeometry args={[0.42 * s, 0.17 * s, 32, 64]} />
        </Shape>
        <Shape position={[w * 0.74, 0.1, 0]} color="#4a63ff" speed={0.9} spin={0.3}>
          <RoundedBox args={[0.75 * s, 0.75 * s, 0.75 * s]} radius={0.16 * s} smoothness={6} />
        </Shape>
        <Shape position={[w * 0.42, 1.5, -0.5]} color="#c77dff" speed={1.3} spin={0.5}>
          <torusGeometry args={[0.34 * s, 0.07 * s, 24, 64]} />
        </Shape>
        <Shape position={[-w * 0.45, 1.6, -0.3]} color="#3ed16a" speed={1.6} spin={0.6}>
          <icosahedronGeometry args={[0.24 * s, 0]} />
        </Shape>
      </Rig>

      {/* Studio lighting made of glowing panels: gives the chrome its pink/purple/cyan reflections */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} color="#ff2d9a" position={[-5, 2, -2]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={3} color="#22d3ee" position={[5, -1, -2]} scale={[4, 6, 1]} />
        <Lightformer form="ring" intensity={4} color="#ff8a2b" position={[0, 5, -3]} scale={3} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 0, 6]} scale={[6, 2, 1]} />
      </Environment>
    </>
  );
}

export default function HeroScene() {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);

    // Stop rendering when the hero is scrolled out of view.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrap} className="hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : visible ? "always" : "never"}
        style={{ pointerEvents: "none" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
