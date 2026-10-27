"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import { JSX } from "react";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

const SECTIONS = [
  {
    heading: "Receita Artesanal & Cremosidade Única",
    body: "Cada garrafa Salençar é preparada com ingredientes rigorosamente selecionados e uma receita artesanal exclusiva. Textura aveludada, cremosidade marcante e equilíbrio perfeito em cada gole.",
  },
  {
    heading: "Frutas Selecionadas, Sabor de Verdade",
    body: "Priorizamos polpa de fruta real e ingredientes naturais para oferecer um sabor intenso e autêntico. Sem aditivos desnecessários, apenas a energia e o frescor que você merece.",
  },
  {
    heading: "O Brinde Perfeito Para Toda Ocasião",
    body: "Seja no churrasco com os amigos, em momentos especiais com a família ou para relaxar no fim de semana: Salençar Batidas transforma qualquer celebração em uma experiência inesquecível.",
  },
];

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-[#FFA6B5] alternating-text-container text-[#243126]"
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="absolute top-0 left-0 w-full h-screen alternating-text-view">
            <Scene />
          </View>

          {SECTIONS.map((item, index) => (
            <div
              key={item.heading}
              className="grid h-screen alternating-section place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-2xl p-6 md:p-8 backdrop-blur-md bg-white/40 border border-white/40 shadow-xl text-[#243126]",
                )}
              >
                <h2 className="text-5xl md:text-6xl font-bold text-balance text-[#173D2B]">
                  {item.heading}
                </h2>
                <div className="mt-4 text-xl text-[#243126]/90 leading-relaxed">
                  <p>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;