import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText = (_props: BigTextProps): JSX.Element => {
  // Keep the existing navbar destination without rendering the removed callout.
  return <span id="servicos" className="sr-only" aria-hidden="true" />;
};

export default BigText;
