"use client";

import { useRef } from "react";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/FloatingCan";
import { useStore } from "@/hooks/useStore";


gsap.registerPlugin(useGSAP, ScrollTrigger);


type Props = object;

export default function Scene({ }: Props) {
    const isReady = useStore((state) => state.isReady)

    const can1Ref = useRef<Group>(null)
    const can2Ref = useRef<Group>(null)
    const can3Ref = useRef<Group>(null)
    const can4Ref = useRef<Group>(null)
    const can5Ref = useRef<Group>(null)

    const can1GroupRef = useRef<Group>(null)
    const can2GroupRef = useRef<Group>(null)

    const groupRef = useRef<Group>(null)

    const FLOAT_SPEED = 1.5

    useGSAP(() => {
        if (
            !can1Ref.current ||
            !can2Ref.current ||
            !can3Ref.current ||
            !can4Ref.current ||
            !can5Ref.current ||
            !can1GroupRef.current ||
            !can2GroupRef.current ||
            !groupRef.current
        )
            return;

        isReady();

        // Set can starting location
        gsap.set(can1Ref.current.position, { x: -1.5 });
        gsap.set(can1Ref.current.rotation, { z: -0.5 });

        gsap.set(can2Ref.current.position, { x: 1.5 });
        gsap.set(can2Ref.current.rotation, { z: 0.5 });

        gsap.set(can3Ref.current.position, { x: 5, z: 2 });
        gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
        gsap.set(can5Ref.current.position, { y: -5 });

        const introTl = gsap.timeline({
            defaults: {
                duration: 3,
                ease: "back.out(1.4)"
            }
        })

        if (window.scrollY < 20) {
            introTl
                .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
                .from(can1GroupRef.current.position, { z: 3 }, 0)
                .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
                .from(can2GroupRef.current.position, { z: 5 }, 0);
        }

        const scrollTl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "none",
            },
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
                invalidateOnRefresh: true,
                fastScrollEnd: true,
            },
        });

        scrollTl
            // Rotate can group
            .to(groupRef.current.rotation, { y: Math.PI * 2 })

            // Can 1 - Batidas
            .to(can1Ref.current.position, { x: -0.85, y: -0.65, z: -0.2 }, 0)
            .to(can1Ref.current.rotation, { z: 0.22 }, 0)

            // Can 2 - Maracujá
            .to(can2Ref.current.position, { x: -0.4, y: 0.65, z: -0.2 }, 0)
            .to(can2Ref.current.rotation, { z: -0.12 }, 0)

            // Can 3 - Batidas
            .to(can3Ref.current.position, { x: 0.05, y: -0.65, z: -0.2 }, 0)
            .to(can3Ref.current.rotation, { z: 0.12 }, 0)

            // Can 4 - Morango 2
            .to(can4Ref.current.position, { x: 0.5, y: 0.65, z: -0.2 }, 0)
            .to(can4Ref.current.rotation, { z: -0.18 }, 0)

            // Can 5 - Maracujá
            .to(can5Ref.current.position, { x: 0.95, y: -0.65, z: -0.2 }, 0)
            .to(can5Ref.current.rotation, { z: 0.2 }, 0)
            // Slide group to the side — linear inside scrub for predictable reverse
            .to(
                groupRef.current.position,
                { x: 1, duration: 3 },
                1.3,
            );
    });

    return (
        <group ref={groupRef}>
            <group ref={can1GroupRef}>
                <FloatingCan
                    ref={can1Ref}
                    flavor="blackCherry"
                    model="batidas"
                    floatSpeed={FLOAT_SPEED} />
            </group>

            <group ref={can2GroupRef}>
                <FloatingCan
                    ref={can2Ref}
                    flavor="passionFruit"
                    model="maracuja"
                    floatSpeed={FLOAT_SPEED} />
            </group>

            <FloatingCan ref={can3Ref} flavor="grape" model="batidas" floatSpeed={FLOAT_SPEED} />

            <FloatingCan ref={can4Ref} flavor="strawberryLemonade" model="morango2" floatSpeed={FLOAT_SPEED} />

            <FloatingCan ref={can5Ref} flavor="watermelon" model="maracuja" floatSpeed={FLOAT_SPEED} />

            <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
        </group>
    )
}
