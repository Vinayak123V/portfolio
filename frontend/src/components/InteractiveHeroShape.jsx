import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows } from '@react-three/drei';

function ComplexShape() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
      meshRef.current.rotation.z = t / 5;
      meshRef.current.position.y = Math.sin(t / 1.5) / 5;
      meshRef.current.position.x = 2 + Math.sin(t / 2) / 2;
      meshRef.current.position.z = 1.5;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={0.7}>
      <torusKnotGeometry args={[1.2, 0.4, 256, 32]} />
      <meshPhysicalMaterial
        color="#ffffff"
        roughness={0.1}
        metalness={0.8}
        transmission={1}
        ior={1.5}
        thickness={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        attenuationColor="#a29bfe"
        attenuationDistance={2}
      />
    </mesh>
  );
}

export default function InteractiveHeroShape() {
  return (
    <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <ComplexShape />
        </PresentationControls>
        
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#6c5ce7" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
