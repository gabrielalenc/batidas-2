import React from "react";
import { FizziLogo } from "./FizziLogo";

const currentYear = new Date().getFullYear();

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
];

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="contato"
      className="bg-[#173D2B] text-[#FFF4DB] border-t border-[#28583D]"
      aria-label="Rodapé Salençar Batidas"
    >
      {/* ── Main grid ──────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <FizziLogo className="h-16 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-[#FFF4DB]/80">
              Sabores artesanais que combinam tradição, qualidade e muita
              criatividade em cada garrafa.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#FFD66B]">
              Feito com carinho, servido com estilo.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-widest text-[#FFD66B]">
              Navegação
            </h3>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-[#FFF4DB]/80 transition-colors duration-200 hover:text-[#F28B30]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Col 3 — Atendimento */}
          <div
            id="localizacao"
            className="flex flex-col gap-3"
          >
            <h3 className="mb-1 text-sm font-bold uppercase tracking-widest text-[#FFD66B]">
              Atendimento
            </h3>
            <p className="text-sm text-[#FFF4DB]/80">
              📍 Endereço a confirmar
            </p>
            <p className="text-sm text-[#FFF4DB]/80">
              🕐 Horário a confirmar
            </p>
            {/* WhatsApp — descomentar e preencher quando o número estiver disponível */}
            {/*
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-green-600/20 px-3 py-2 text-sm font-semibold text-green-400 transition-colors duration-200 hover:bg-green-600/30"
              aria-label="Fale pelo WhatsApp"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            */}
            <p className="mt-1 text-xs text-[#FFF4DB]/60">
              📧 contato@salencar.com.br
            </p>
          </div>

          {/* Col 4 — Social */}
          <div className="flex flex-col gap-3">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-widest text-[#FFD66B]">
              Redes Sociais
            </h3>
            <p className="text-xs text-[#FFF4DB]/60">
              Links disponíveis em breve.
            </p>
            {/* Instagram — descomentar quando o perfil estiver disponível */}
            {/*
            <a
              href="https://instagram.com/salencar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 text-sm text-[#FFF4DB]/80 transition-colors duration-200 hover:text-[#F28B30]"
            >
              <InstagramIcon />
              @salencar
            </a>
            */}

            {/* Placeholder visual enquanto links não estão disponíveis */}
            <div className="flex gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#28583D] text-[#FFF4DB]/70 transition-colors hover:border-[#F28B30] hover:text-[#F28B30]">
                <InstagramIcon />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#28583D] text-[#FFF4DB]/70 transition-colors hover:border-[#F28B30] hover:text-[#F28B30]">
                <WhatsAppIcon />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────── */}
      <div className="border-t border-[#28583D]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-[#FFF4DB]/60 sm:flex-row md:px-6">
          <p>
            © {currentYear} Salençar Batidas. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="/privacidade"
              className="transition-colors hover:text-[#FFD66B]"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos"
              className="transition-colors hover:text-[#FFD66B]"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
