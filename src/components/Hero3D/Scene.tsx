import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import BCLogo from "./BCLogo";
import Particles from "./Particles";

/* CAMERA RIG */
const CameraRig = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const startTime = useRef(Date.now());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000;
    const zoomProgress = Math.min(elapsed / 2, 1);
    const eased = 1 - Math.pow(1 - zoomProgress, 3);
    const targetZ = 8 - eased * 2.5;

    target.current.x += (mouse.current.x * 0.5 - target.current.x) * 0.05;
    target.current.y += (-mouse.current.y * 0.3 - target.current.y) * 0.05;

    camera.position.x = target.current.x;
    camera.position.y = target.current.y + 0.5;
    camera.position.z = targetZ;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* LIGHTING */
const Lighting = () => {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <>
      <ambientLight intensity={isDark ? 0.15 : 0.4} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.8 : 0.6}
        color="#fff5d4"
      />

      <directionalLight
        position={[-3, 3, -5]}
        intensity={isDark ? 0.3 : 0.2}
        color="#c9a44a"
      />

      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={isDark ? 1.2 : 0.8}
        color="#c9a44a"
      />

      <pointLight
        position={[0, -3, 0]}
        intensity={isDark ? 0.5 : 0.2}
        color="#8a6d1b"
      />
    </>
  );
};

/* REFLECTION FLOOR (FIXED) */
const ReflectionFloor = () => {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color={isDark ? "#0a0a0a" : "#ffffff"}
        metalness={isDark ? 0.8 : 0.2}
        roughness={isDark ? 0.3 : 0.6}
        transparent
        opacity={isDark ? 0.5 : 0.15}
      />
    </mesh>
  );
};

/* FLOATING SHAPES */
const FloatingShapes = () => {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  const ref3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (ref1.current) {
      ref1.current.position.y = Math.sin(t * 0.4) * 0.3 + 2;
      ref1.current.rotation.x = t * 0.2;
    }

    if (ref2.current) {
      ref2.current.position.y = Math.cos(t * 0.3) * 0.4 - 1.5;
      ref2.current.rotation.z = t * 0.15;
    }

    if (ref3.current) {
      ref3.current.position.x = Math.sin(t * 0.2) * 0.3 + 4;
      ref3.current.rotation.y = t * 0.1;
    }
  });

  return (
    <>
      <mesh ref={ref1} position={[-4, 2, -3]}>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial
          color="#c9a44a"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>

      <mesh ref={ref2} position={[3.5, -1.5, -2]}>
        <icosahedronGeometry args={[0.2]} />
        <meshStandardMaterial
          color="#c9a44a"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh ref={ref3} position={[4, 1, -4]}>
        <dodecahedronGeometry args={[0.25]} />
        <meshStandardMaterial
          color="#c9a44a"
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </>
  );
};

/* MAIN SCENE */
const Hero3DScene = () => {
  const [hovered, setHovered] = useState(false);
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.5, 8], fov: 45 }}
        style={{ background: "transparent" }}
      >
        {/* FIXED FOG */}
        <fog attach="fog" args={[isDark ? "#050505" : "#ffffff", 10, 30]} />

        <Suspense fallback={null}>
          <CameraRig />
          <Lighting />
          <BCLogo hovered={hovered} />
          <Particles count={150} />
          <FloatingShapes />
          <ReflectionFloor />
          <Environment preset={isDark ? "night" : "sunset"} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;