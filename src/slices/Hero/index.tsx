"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";


import { Bounded } from "@/components/Bounded";
import { TextSplitter } from "@/components/TextSplitter";

import Button from "@/components/Button";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { JSX } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";


gsap.registerPlugin(useGSAP, ScrollTrigger);


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;


      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        .from(
          ".hero-subheading",
          {
            opacity: 0,
            y: 30,
          },
          "+=.8",
        )
        .from(".hero-body", {
          opacity: 0,
          y: 10,
        })
        .from(".hero-button", {
          opacity: 0,
          y: 10,
          duration: 0.6,
        });


      const scrollTl = gsap.timeline({
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
        .fromTo("body", {
          backgroundColor: "#173D2B",
        },
          {
            backgroundColor: "#D9F99D",
            overwrite: "auto",
            ease: "none",
          },
          1,
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "none",
          duration: 0.5,
        })
        .from(".text-side-body", {
          y: 20,
          opacity: 0,
          ease: "none",
        });
    },
    { dependencies: [ready, isDesktop] }
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="inicio"
      className="opacity-0 hero pt-[72px]"
    >

      {isDesktop && (
        <View className="sticky top-[72px] z-50 pointer-events-none hero-scene -mt-[calc(100vh-72px)] hidden h-[calc(100vh-72px)] w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid text-center auto-rows-min place-items-center">
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-[#F28B30] md:text-[9rem]">
              <TextSplitter
                text="SABOR VIBRANTE"
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>

            <div className="mt-12 text-5xl font-semibold hero-subheading text-[#FFF4DB] lg:text-6xl">
              <p>Batidas Artesanais Premium</p>
            </div>

            <div className="text-2xl font-normal hero-body text-[#FFF4DB] max-w-xl mx-auto">
              <p>Feitas com frutas frescas selecionadas, cremosidade irresistível e receita exclusiva. O sabor do verão o ano inteiro.</p>
            </div>

            <Button
              buttonLink={slice.primary.button_link}
              buttonText="Experimente Já"
              classname="mt-12 hero-button"
            />
          </div>
        </div>
        <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage
            className="w-full md:hidden"
            field={slice.primary.cans_image}
            alt="Linha completa de batidas artesanais Salençar"
          />

          <div>
            <h2 className="text-6xl font-black uppercase text-side-heading text-balance text-[#173D2B] lg:text-8xl">
              <TextSplitter text="DESCUBRA NOSSOS SABORES" />
            </h2>

            <div className="max-w-xl mt-4 text-xl font-normal text-side-body text-balance text-[#243126]">
              <p>Nossas batidas combinam polpa de frutas de verdade com ingredientes nobres para uma cremosidade inconfundível. Encontre sua favorita e celebre cada brinde com Salençar!</p>
            </div>
          </div>

        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
