"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

useGLTF.preload("/garrafa_salencar_batidas.glb");
useGLTF.preload("/garrafa_salencar_maracuja.glb");
useGLTF.preload("/garrafa_salencar_morango_2.glb");

export type SodaCanModel = "batidas" | "maracuja" | "morango2";

const MODEL_PATHS: Record<SodaCanModel, string> = {
    batidas: "/garrafa_salencar_batidas.glb",
    maracuja: "/garrafa_salencar_maracuja.glb",
    morango2: "/garrafa_salencar_morango_2.glb",
};

const MODEL_SCALE_FACTORS: Record<SodaCanModel, number> = {
    batidas: 1,
    maracuja: 3.5,
    morango2: 3.5,
};

export type SodaCanProps = {
    flavor?: "lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon" | "passionFruit";
    model?: SodaCanModel;
    scale?: number;
};

export function SodaCan({
    flavor = "blackCherry",
    model: requestedModel,
    scale = 1.6,
    ...props
}: SodaCanProps) {
    const modelType = requestedModel ?? (flavor === "passionFruit" ? "maracuja" : "batidas");
    const modelPath = MODEL_PATHS[modelType];
    const { scene } = useGLTF(modelPath);
    const modelScene = useMemo(() => scene.clone(true), [scene]);
    const modelScale = scale * MODEL_SCALE_FACTORS[modelType];

    return (
        <group {...props} dispose={null} scale={modelScale}>
            <primitive key={modelPath} object={modelScene} />
        </group>
    );
}
