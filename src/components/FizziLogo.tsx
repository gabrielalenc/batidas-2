import Image from "next/image";

type FizziLogoProps = {
  className?: string;
};

export function FizziLogo({ className }: FizziLogoProps) {
  return (
    <Image
      src="/logo_salencar.png"
      alt="Salençar"
      width={669}
      height={373}
      unoptimized
      className={`block object-contain ${className ?? ""}`}
    />
  );
}
