"use client";

import React, { useState, useEffect } from "react";
import { FizziLogo } from "@/components/FizziLogo";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Localização", href: "#localizacao" },
  { label: "Contato", href: "#contato" },
];

function smoothScrollTo(id: string) {
  const target = document.querySelector(id);
  if (!target) return;
  const navHeight = 80;
  const top =
    target.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#173D2B]/95 backdrop-blur-md border-b border-[#28583D] shadow-lg shadow-black/25"
          : "bg-[#173D2B]/80 backdrop-blur-sm border-b border-[#28583D]/40"
      }`}
    >
      {/* ── Desktop & Tablet layout ─────────────────────── */}
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center px-4 md:px-6">

        {/* LEFT — Logo */}
        <div className="flex flex-1 items-center">
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("#inicio"); }}
            aria-label="Salençar Batidas — início"
          >
            <FizziLogo className="h-16 w-auto cursor-pointer transition-opacity duration-200 hover:opacity-85" />
          </a>
        </div>

        {/* CENTER — Navigation links (hidden on mobile) */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(link.href);
              }}
              className="rounded-lg px-4 py-2 text-base font-semibold text-[#FFF4DB] transition-all duration-200 hover:bg-[#28583D] hover:text-[#F28B30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F28B30]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* RIGHT — Icons */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* Account icon */}
          <a
            href="/login"
            aria-label="Minha conta"
            title="Minha conta (em breve)"
            className="group flex h-10 w-10 items-center justify-center rounded-full text-[#FFF4DB] transition-all duration-200 hover:bg-[#28583D] hover:text-[#F28B30]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>

          {/* Cart icon */}
          <a
            href="/carrinho"
            aria-label="Carrinho de compras"
            title="Carrinho (em breve)"
            className="group relative flex h-10 w-10 items-center justify-center rounded-full text-[#FFF4DB] transition-all duration-200 hover:bg-[#28583D] hover:text-[#F28B30]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full text-[#FFF4DB] transition-all duration-200 hover:bg-[#28583D] hover:text-[#F28B30] md:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`block h-[2px] w-5 rounded bg-current transition-transform duration-300 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-5 rounded bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-5 rounded bg-current transition-transform duration-300 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ──────────────────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-64 border-t border-[#28583D]" : "max-h-0"
        }`}
      >
        <nav
          className="flex flex-col bg-[#173D2B]/98 px-4 pb-4 pt-2 backdrop-blur-md"
          aria-label="Menu mobile"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(link.href);
                setMobileOpen(false);
              }}
              className="rounded-lg px-4 py-3 text-base font-semibold text-[#FFF4DB] transition-all duration-200 hover:bg-[#28583D] hover:text-[#F28B30]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
