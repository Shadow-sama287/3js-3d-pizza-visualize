import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { usePizzaStore } from "../../store/pizzaStore";

// ─── Seeded Random for consistent positions ───
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// Generate scattered positions on the pizza surface
function scatterPositions(
  count: number,
  seed: number,
  minR: number = 0.2,
  maxR: number = 1.5,
): [number, number, number][] {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const angle = seededRandom(seed + i * 7) * Math.PI * 2;
    const radius = minR + seededRandom(seed + i * 13 + 100) * (maxR - minR);
    positions.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
  }
  return positions;
}

// ─── BASE CONFIGS ───
const BASE_CONFIGS: Record<
  string,
  { color: string; height: number; edgeHeight: number; edgeColor: string }
> = {
  "Thin Crust": {
    color: "#e8c888",
    height: 0.06,
    edgeHeight: 0.08,
    edgeColor: "#d4a84b",
  },
  "Classic Hand-Tossed": {
    color: "#deb76b",
    height: 0.12,
    edgeHeight: 0.18,
    edgeColor: "#c9973e",
  },
  "Stuffed Crust": {
    color: "#d4a04a",
    height: 0.14,
    edgeHeight: 0.25,
    edgeColor: "#b8842e",
  },
  "Whole Wheat": {
    color: "#a07840",
    height: 0.1,
    edgeHeight: 0.14,
    edgeColor: "#8b6530",
  },
  "Gluten-Free": {
    color: "#c8b080",
    height: 0.08,
    edgeHeight: 0.1,
    edgeColor: "#b09862",
  },
};

// ─── SAUCE CONFIGS ───
const SAUCE_COLORS: Record<string, string> = {
  Marinara: "#8B1A1A",
  Alfredo: "#f5e6c8",
  BBQ: "#4a1c0a",
  Pesto: "#3d6b35",
  "Hot Honey": "#d4890a",
};

// ─── CHEESE CONFIGS ───
const CHEESE_COLORS: Record<string, { primary: string; secondary: string }> = {
  Mozzarella: { primary: "#faf0d0", secondary: "#f5e8b8" },
  Cheddar: { primary: "#f0a830", secondary: "#e89520" },
  Parmesan: { primary: "#f5e8a0", secondary: "#e8d880" },
};

// ─── VEGGIE CONFIGS ───
const VEGGIE_CONFIGS: Record<
  string,
  { color: string; shape: "ring" | "cube" | "wedge" | "sphere"; count: number }
> = {
  "Bell Pepper": { color: "#d42020", shape: "ring", count: 18 },
  Onion: { color: "#e8d0e0", shape: "ring", count: 17 },
  Mushroom: { color: "#c8a878", shape: "wedge", count: 16 },
  Jalapeño: { color: "#38a832", shape: "ring", count: 18 },
  "Black Olive": { color: "#1a1a1a", shape: "ring", count: 17 },
};

// ─── PROTEIN CONFIGS ───
const PROTEIN_CONFIGS: Record<
  string,
  { color: string; shape: "disc" | "cube" | "sphere"; count: number }
> = {
  Pepperoni: { color: "#a02020", shape: "disc", count: 19 },
  "Chicken Tikka": { color: "#c86830", shape: "cube", count: 16 },
  "Grilled Chicken": { color: "#d4a860", shape: "cube", count: 16 },
  "Paneer Chunks": { color: "#f5f0e0", shape: "cube", count: 17 },
};

// ─── Individual Components ───

const PizzaBase: React.FC<{ name: string }> = ({ name }) => {
  const config = BASE_CONFIGS[name] || BASE_CONFIGS["Classic Hand-Tossed"];
  return (
    <group>
      {/* Main dough disc */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.9, 2, config.height, 64]} />
        <meshStandardMaterial color={config.color} roughness={0.85} />
      </mesh>
      {/* Raised crust edge (ring) */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.95, 0.12, 12, 64]} />
        <meshStandardMaterial color={config.edgeColor} roughness={0.75} />
      </mesh>
    </group>
  );
};

const SauceLayer: React.FC<{ name: string }> = ({ name }) => {
  const color = SAUCE_COLORS[name] || "#8B1A1A";
  return (
    <mesh position={[0, -0.02, 0]}>
      <cylinderGeometry args={[1.75, 1.75, 0.03, 64]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.05} />
    </mesh>
  );
};

const CheeseLayer: React.FC<{ name: string }> = ({ name }) => {
  const colors = CHEESE_COLORS[name] || CHEESE_COLORS["Mozzarella"];

  // Generate scattered cheese shreds instead of a thick cylinder
  const shreds = useMemo(() => {
    const positions: {
      pos: [number, number, number];
      scaleX: number;
      scaleZ: number;
      rot: number;
    }[] = [];
    for (let i = 0; i < 99; i++) {
      const angle = seededRandom(i * 17 + 3) * Math.PI * 2;
      const radius = seededRandom(i * 23 + 7) * 1.6;
      positions.push({
        pos: [Math.cos(angle) * radius, 0.01, Math.sin(angle) * radius],
        scaleX: 0.08 + seededRandom(i * 31) * 0.15,
        scaleZ: 0.08 + seededRandom(i * 37) * 0.15,
        rot: seededRandom(i * 41) * Math.PI,
      });
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Thin base cheese layer */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.72, 1.72, 0.04, 64]} />
        <meshStandardMaterial
          color={colors.primary}
          roughness={0.35}
          metalness={0.05}
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Scattered cheese shred blobs */}
      {shreds.map((s, i) => (
        <mesh
          key={`shred-${i}`}
          position={s.pos as unknown as THREE.Vector3Tuple}
          rotation={[0, s.rot, 0]}
        >
          <boxGeometry args={[s.scaleX, 0.025, s.scaleZ]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? colors.secondary : colors.primary}
            roughness={0.3}
            metalness={0.08}
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
};

// ─── Topping shape renderers ───

const ToppingRing: React.FC<{
  position: [number, number, number];
  color: string;
  scale?: number;
}> = ({ position, color, scale = 1 }) => (
  <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[0.08 * scale, 0.03 * scale, 8, 16]} />
    <meshStandardMaterial color={color} roughness={0.6} />
  </mesh>
);

const ToppingCube: React.FC<{
  position: [number, number, number];
  color: string;
  scale?: number;
}> = ({ position, color, scale = 1 }) => (
  <mesh
    position={position}
    rotation={[0, seededRandom(position[0] * 100) * Math.PI, 0]}
  >
    <boxGeometry args={[0.12 * scale, 0.06 * scale, 0.12 * scale]} />
    <meshStandardMaterial color={color} roughness={0.7} />
  </mesh>
);

const ToppingWedge: React.FC<{
  position: [number, number, number];
  color: string;
  scale?: number;
}> = ({ position, color, scale = 1 }) => {
  // Mushroom-like half sphere
  return (
    <group position={position}>
      {/* Cap */}
      <mesh rotation={[0, seededRandom(position[2] * 50) * Math.PI, 0]}>
        <sphereGeometry
          args={[0.07 * scale, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.02 * scale, 0.03 * scale, 0.04, 6]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.6} />
      </mesh>
    </group>
  );
};

const ToppingSphere: React.FC<{
  position: [number, number, number];
  color: string;
  scale?: number;
}> = ({ position, color, scale = 1 }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.06 * scale, 12, 8]} />
    <meshStandardMaterial color={color} roughness={0.6} />
  </mesh>
);

const ToppingDisc: React.FC<{
  position: [number, number, number];
  color: string;
  scale?: number;
}> = ({ position, color, scale = 1 }) => (
  <mesh position={position}>
    <cylinderGeometry args={[0.1 * scale, 0.1 * scale, 0.02, 16]} />
    <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
  </mesh>
);

// Shape factory
const SHAPE_MAP: Record<
  string,
  React.FC<{
    position: [number, number, number];
    color: string;
    scale?: number;
  }>
> = {
  ring: ToppingRing,
  cube: ToppingCube,
  wedge: ToppingWedge,
  sphere: ToppingSphere,
  disc: ToppingDisc,
};

// ─── Main Pizza Model ───

const PizzaModel = () => {
  const { base, sauce, cheese, selectedVeggies, selectedProteins } =
    usePizzaStore();

  return (
    <group>
      {/* 1. Base */}
      {base && <PizzaBase name={base.name} />}

      {/* 2. Sauce */}
      {sauce && <SauceLayer name={sauce.name} />}

      {/* 3. Cheese */}
      {cheese && <CheeseLayer name={cheese.name} />}

      {/* 4. Veggies — multiple pieces per topping */}
      {selectedVeggies.map((veggie, vegIndex) => {
        const config = VEGGIE_CONFIGS[veggie.name] || {
          color: "#2e8b57",
          shape: "sphere" as const,
          count: 5,
        };
        const ShapeComponent = SHAPE_MAP[config.shape];
        const positions = scatterPositions(config.count, vegIndex * 100 + 1);
        return positions.map((pos, i) => (
          <ShapeComponent
            key={`veg-${veggie.id}-${i}`}
            position={[pos[0], 0.06 + i * 0.002, pos[2]]}
            color={config.color}
            scale={0.8 + seededRandom(vegIndex * 50 + i) * 0.4}
          />
        ));
      })}

      {/* 5. Proteins — multiple pieces per topping */}
      {selectedProteins.map((protein, protIndex) => {
        const config = PROTEIN_CONFIGS[protein.name] || {
          color: "#d4a55a",
          shape: "cube" as const,
          count: 5,
        };
        const ShapeComponent = SHAPE_MAP[config.shape];
        const positions = scatterPositions(
          config.count,
          protIndex * 200 + 500,
          0.3,
          1.55,
        );
        return positions.map((pos, i) => (
          <ShapeComponent
            key={`prot-${protein.id}-${i}`}
            position={[pos[0], 0.07 + i * 0.002, pos[2]]}
            color={config.color}
            scale={0.9 + seededRandom(protIndex * 70 + i) * 0.3}
          />
        ));
      })}
    </group>
  );
};

// ─── Canvas Wrapper ───

const PizzaCanvas: React.FC = () => {
  return (
    <div
      className="w-full h-full rounded-lg shadow-inner bg-gradient-to-b from-gray-100 to-gray-300"
    >
      <Canvas camera={{ position: [0, 3, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight
          position={[5, 8, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1.2}
          castShadow
        />
        <directionalLight position={[-3, 5, -3]} intensity={0.4} />

        <Environment preset="city" />

        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={0.2}
          minDistance={3}
          maxDistance={8}
        />

        <Suspense fallback={null}>
          <PizzaModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PizzaCanvas;
