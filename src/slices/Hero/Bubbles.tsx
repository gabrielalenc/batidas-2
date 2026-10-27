"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

// Customizations in case you want to use this in other scenes.
export function Bubbles({
    count = 300,
    speed = 5,
    bubbleSize = 0.05,
    opacity = 0.5,
    repeat = true,
}) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const transform = useMemo(() => new THREE.Object3D(), []);
    const lastBodyColor = useRef("");

    // An array that holds all of our bubbles' speeds
    const bubbleSpeed = useMemo(() => new Float32Array(count), [count]);
    const minSpeed = speed * 0.001;
    const maxSpeed = speed * 0.005;

    // Create geometry and material for our mesh
    const geometry = useMemo(
        () => new THREE.SphereGeometry(bubbleSize, 16, 16),
        [bubbleSize],
    );
    const material = useMemo(
        () => new THREE.MeshStandardMaterial({ transparent: true, opacity }),
        [opacity],
    );

    // Runs once to create and place our bubbles
    useEffect(() => {
        // Access the instanced mesh
        const mesh = meshRef.current;
        if (!mesh) {
            return;
        }

        // Create {count} number of bubbles in random locations
        for (let i = 0; i < count; i++) {
            transform.position.set(
                gsap.utils.random(-4, 4),
                gsap.utils.random(-4, 4),
                gsap.utils.random(-4, 4),
            );

            // Update matrix so that the position is applied
            transform.updateMatrix();
            // Apply the updated matrix from Object3D to the mesh at index i.
            mesh.setMatrixAt(i, transform.matrix);

            // Set a random bubble speed
            bubbleSpeed[i] = gsap.utils.random(minSpeed, maxSpeed);
        }

        mesh.instanceMatrix.needsUpdate = true;
    }, [count, minSpeed, maxSpeed, bubbleSpeed, transform]);

    useEffect(() => {
        lastBodyColor.current = "";
        return () => {
            geometry.dispose();
            material.dispose();
        };
    }, [geometry, material]);

    // useFrame runs on every animation frame
    useFrame((_state, delta) => {
        const mesh = meshRef.current;
        if (!mesh) {
            return;
        }

        const bodyColor = document.body.style.backgroundColor;
        if (bodyColor && bodyColor !== lastBodyColor.current) {
            material.color.set(bodyColor);
            lastBodyColor.current = bodyColor;
        }

        // Preserve the existing speed at 60 FPS while keeping motion frame-rate independent.
        const frameScale = Math.min(delta, 0.05) * 60;

        for (let i = 0; i < count; i++) {
            mesh.getMatrixAt(i, transform.matrix);
            transform.position.setFromMatrixPosition(transform.matrix);
            // Move bubble upwards by its speed
            transform.position.y += bubbleSpeed[i] * frameScale;

            // Reset bubble position if it moves off the top of the screen
            if (transform.position.y > 4 && repeat) {
                transform.position.y = -2; // Reset to bottom
                transform.position.x = gsap.utils.random(-4, 4);
                transform.position.z = gsap.utils.random(0, 8);
            }

            transform.updateMatrix();
            mesh.setMatrixAt(i, transform.matrix);
        }

        // Mark the instance matrix as needing an update, so the new positions of the bubbles are rendered.
        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, count]}
            position={[0, 0, 0]}
            material={material}
            geometry={geometry}
        ></instancedMesh>
    );
}
