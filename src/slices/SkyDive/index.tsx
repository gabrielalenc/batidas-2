"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `SkyDive`.
 */
export type SkyDiveProps = SliceComponentProps<Content.SkyDiveSlice>;

/**
 * SkyDive — animação das nuvens removida por decisão de design.
 * O slice continua registrado para compatibilidade com o Prismic CMS,
 * mas não renderiza nada na página.
 */
const SkyDive = (_props: SkyDiveProps): JSX.Element | null => {
  return null;
};

export default SkyDive;