import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Environment, Grid } from '@react-three/drei';

function AbstractGeometry() {
  const groupRef = useRef();
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center piece */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, 0, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial 
            color="#6c5ce7"
            roughness={0.1}
            metalness={0.8}
            transmission={0.9}
            thickness={1.5}
            clearcoat={1}
            wireframe={true}
          />
        </mesh>
      </Float>
      
      {/* Orbiting shapes */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[-3, 1.5, -2]}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#a29bfe"
            roughness={0.1}
            metalness={0.9}
            transmission={0.5}
            thickness={0.5}
          />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={3} floatIntensity={2}>
        <mesh position={[4, -2, -3]}>
          <torusGeometry args={[0.5, 0.1, 16, 100]} />
          <meshPhysicalMaterial
            color="#5a4bd1"
            roughness={0}
            metalness={1}
            clearcoat={1}
            wireframe={true}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Ground() {
  return (
    <Grid 
      position={[0, -3, 0]} 
      args={[100, 100]} 
      cellSize={1} 
      cellThickness={1} 
      cellColor="#6c5ce7" 
      sectionSize={5} 
      sectionThickness={1.5} 
      sectionColor="#a29bfe" 
      fadeDistance={30} 
      fadeStrength={1} 
    />
  );
}

function ParticleSystem() {
  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={2} />;
}

export default function Hero3DScene() {
  return (
    <div className="fixed inset-0 z-[-1] bg-transparent opacity-80 mix-blend-screen pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={['#0b0b10', 5, 30]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#6c5ce7" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a29bfe" />
        
        <AbstractGeometry />
        <Ground />
        <ParticleSystem />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
