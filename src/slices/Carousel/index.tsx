"use client";

import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Center, Environment, useGLTF, View } from "@react-three/drei";
import { JSX, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 2;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  model?: SodaCanProps["model"];
  color: string;
  name: string;
}[] = [
    { flavor: "blackCherry", color: "#710523", name: "Cereja Tropical" },
    { flavor: "grape", color: "#572981", name: "Uva Cremosa" },
    { flavor: "lemonLime", color: "#164405", name: "Limão Refrescante" },
    {
      flavor: "strawberryLemonade",
      color: "#690B3D",
      name: "Morango Especial",
    },
    { flavor: "passionFruit", color: "#A99A32", name: "Maracujá Artesanal" },
    { flavor: "watermelon", color: "#4B7002", name: "Melancia Tropical" },
    {
      flavor: "strawberryLemonade",
      model: "morango2",
      color: "#D84F57",
      name: "Morango 2",
    },
  ];
const INITIAL_FLAVOR_INDEX = FLAVORS.findIndex(
  ({ flavor }) => flavor === "strawberryLemonade",
);

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(INITIAL_FLAVOR_INDEX);
  const carouselRef = useRef<HTMLElement>(null);
  const sodaCanRef = useRef<Group>(null);
  const currentIndexRef = useRef(INITIAL_FLAVOR_INDEX);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = carouselRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      useGLTF.preload("/garrafa_salencar_maracuja.glb");
      observer.disconnect();
    }, { rootMargin: "200px" });

    observer.observe(section);
    return () => {
      observer.disconnect();
      timelineRef.current?.kill();
    };
  }, []);

  function changeFlavor(direction: -1 | 1) {
    if (!sodaCanRef.current) return;

    const nextIndex = (currentIndexRef.current + direction + FLAVORS.length) % FLAVORS.length;
    currentIndexRef.current = nextIndex;
    timelineRef.current?.kill();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(
      sodaCanRef.current.rotation,
      {
        y: `+=${direction * Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section
      ref={carouselRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#690B3D] opacity-50" />

      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#690B3D]" />

      <h2 className="relative text-5xl font-bold text-center text-white">
        Escolha Seu Sabor
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(-1)}
          direction="left"
          label="Sabor anterior"
        />
        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center
            position={[0, 0, 1.5]}
            cacheKey={FLAVORS[currentFlavorIndex].model ?? FLAVORS[currentFlavorIndex].flavor}
          >
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
              model={FLAVORS[currentFlavorIndex].model}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        {/* Right */}
        <ArrowButton
          onClick={() => changeFlavor(1)}
          direction="right"
          label="Próximo sabor"
        />
      </div>

      <div className="relative mx-auto text-center text-area">
        <div className="text-4xl font-bold text-wrapper text-white">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90 text-white">
          <p>Garrafa 500ml — Pronta para Servir</p>
        </div>
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-3 border-2 border-white rounded-full size-12 bg-white/10 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20 transition-all hover:scale-105 active:scale-95"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
