import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import logoUrl from "@/assets/high_quality_logo.svg";

const BCLogo = ({ hovered }: { hovered: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const logoRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const logoTexture = useLoader(THREE.TextureLoader, logoUrl);

  // Create materials
  const logoMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      metalness: 0.95,
      roughness: 0.15,
      emissive: new THREE.Color("#8a6d1b"),
      emissiveIntensity: 0.2,
      transparent: true,
      alphaTest: 0.1,
    });
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    return mat;
  }, [logoTexture]);

  const goldEdgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c9a44a"),
        metalness: 0.95,
        roughness: 0.15,
        emissive: new THREE.Color("#8a6d1b"),
        emissiveIntensity: 0.15,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.12;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * (hovered ? 0.8 : 0.3);
      ringRef1.current.rotation.x = t * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * (hovered ? 0.6 : 0.2);
      ringRef2.current.rotation.y = t * 0.15;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x = t * (hovered ? 0.5 : 0.15);
      ringRef3.current.rotation.z = t * 0.08;
    }
    if (glowRef.current) {
      glowRef.current.intensity = hovered
        ? 3 + Math.sin(t * 3) * 1.5
        : 1.5 + Math.sin(t) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Logo as 3D textured object with depth */}
      <group ref={logoRef}>
        {/* Front face with logo texture */}
        <mesh material={logoMaterial}>
          <planeGeometry args={[2.2, 2.2]} />
        </mesh>
        {/* Back face with logo texture (mirrored) */}
        <mesh rotation={[0, Math.PI, 0]} position={[0, 0, -0.12]}>
          <planeGeometry args={[2.2, 2.2]} />
          <meshStandardMaterial
            map={logoTexture}
            metalness={0.95}
            roughness={0.15}
            emissive={new THREE.Color("#8a6d1b")}
            emissiveIntensity={0.2}
            transparent
            alphaTest={0.1}
          />
        </mesh>
        {/* Gold edge ring to give depth/bevel appearance */}
        <mesh position={[0, 0, -0.06]} material={goldEdgeMaterial}>
          <cylinderGeometry args={[1.15, 1.15, 0.12, 64, 1, true]} />
        </mesh>
        {/* Outer gold frame ring */}
        <mesh position={[0, 0, -0.06]} material={goldEdgeMaterial}>
          <torusGeometry args={[1.15, 0.04, 16, 64]} />
        </mesh>
        <mesh position={[0, 0, -0.12]} material={goldEdgeMaterial}>
          <torusGeometry args={[1.15, 0.04, 16, 64]} />
        </mesh>
      </group>

      {/* Orbital Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#c9a44a" emissive="#8a6d1b" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.1, 0.01, 16, 100]} />
        <meshStandardMaterial color="#c9a44a" emissive="#8a6d1b" emissiveIntensity={0.3} metalness={0.9} roughness={0.1} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ringRef3} rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.4, 0.008, 16, 100]} />
        <meshStandardMaterial color="#c9a44a" emissive="#8a6d1b" emissiveIntensity={0.2} metalness={0.9} roughness={0.1} transparent opacity={0.4} />
      </mesh>

      {/* Glow light */}
      <pointLight ref={glowRef} color="#c9a44a" intensity={1.5} distance={8} />
    </group>
  );
};

export default BCLogo;
