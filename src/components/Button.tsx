import { LinkField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx';

type Props = {
    buttonLink: LinkField;
    buttonText: string | null;
    classname?: string;
}

export default function Button({ buttonLink, buttonText, classname }: Props) {
    return (
        <PrismicNextLink
            className={clsx(
                "inline-flex items-center justify-center rounded-xl bg-[#F28B30] px-6 py-4 text-center text-lg font-bold uppercase tracking-wider text-[#243126] shadow-md shadow-[#F28B30]/20 transition-all duration-200 hover:bg-[#e07a22] hover:shadow-lg hover:shadow-[#F28B30]/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD66B] md:text-xl",
                classname,
            )}
            field={buttonLink}>
            {buttonText}
        </PrismicNextLink>
    )
}