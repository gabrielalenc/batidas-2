"use client";

import { Environment} from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = object;

export default function Scene({ }: Props) {
    const canRef = useRef<Group>(null);
    const passionFruitRef = useRef<Group>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)", true);

    const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

    useGSAP(
        () => {
            if (!canRef.current || !passionFruitRef.current) return;

            const sections = gsap.utils.toArray(".alternating-section");

            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".alternating-text-view",
                    endTrigger: ".alternating-text-container",
                    pin: true,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                },
            });

            sections.forEach((_, index) => {
                if (!canRef.current || !passionFruitRef.current) return;
                if (index === 0) return;

                const isOdd = index % 2 !== 0;

                const side = isOdd ? -1 : 1;
                const strawberryX = isDesktop ? side * 0.5 : -0.35;
                const passionFruitX = isDesktop ? side * 1.5 : 0.35;
                const yRotation = isDesktop
                    ? (isOdd ? 0.4 : -0.4)
                    : (isOdd ? 0.15 : -0.15);

                // NOTE: No ease on individual tweens inside a scrub timeline.
                // Eases on child tweens distort the scrub proportionality and
                // create jerky, non-reversible motion when scrolling back up.
                scrollTl
                    .to(canRef.current.position, {
                        x: strawberryX,
                        ease: "none",
                    })
                    .to(
                        passionFruitRef.current.position,
                        {
                            x: passionFruitX,
                            ease: "none",
                        },
                        "<",
                    )
                    .to(
                        canRef.current.rotation,
                        {
                            y: yRotation,
                            ease: "none",
                        },
                        "<",
                    )
                    .to(
                        passionFruitRef.current.rotation,
                        {
                            y: -yRotation,
                            ease: "none",
                        },
                        "<",
                    )
                    .to(".alternating-text-container", {
                        backgroundColor: gsap.utils.wrap(bgColors, index - 1),
                        ease: "none",
                    });
            });
        },
        { dependencies: [isDesktop] },
    );

    return (
        <group>
            <group
                ref={canRef}
                position-x={isDesktop ? 0.5 : -0.35}
                rotation-y={isDesktop ? -0.3 : -0.15}
            >
                <FloatingCan flavor="strawberryLemonade" />
            </group>
            <group
                ref={passionFruitRef}
                position-x={isDesktop ? 1.5 : 0.35}
                rotation-y={isDesktop ? 0.3 : 0.15}
            >
                <FloatingCan flavor="passionFruit" />
            </group>
            <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1.5} />
        </group>
    );
}
