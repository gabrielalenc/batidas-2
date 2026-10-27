import { type Metadata } from "next";

import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  // <SliceZone> renders the page's slices.
  return <SliceZone slices={home.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Salençar Batidas | Batidas Artesanais e Bebidas Premium",
    description:
      "Descubra o sabor autêntico das batidas artesanais Salençar. Frutas selecionadas, cremosidade inconfundível e o verdadeiro frescor tropical em cada garrafa.",
    openGraph: {
      title: "Salençar Batidas | Batidas Artesanais e Bebidas Premium",
      description:
        "Descubra o sabor autêntico das batidas artesanais Salençar. Frutas selecionadas, cremosidade inconfundível e o verdadeiro frescor tropical.",
    },
  };
}
