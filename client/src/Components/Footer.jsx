import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { HiArrowUpRight } from "react-icons/hi2";
import BrandLogo from "./BrandLogo";

const cols = [
  {
    head: "Learn",
    items: [
      { to: "/courses", label: "All courses" },
      { to: "/courses", label: "Categories" },
      { to: "/courses", label: "Cohorts" },
      { to: "/courses", label: "Free lessons" },
    ],
  },
  {
    head: "Company",
    items: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/", label: "Careers" },
      { to: "/", label: "Press" },
    ],
  },
  {
    head: "Support",
    items: [
      { to: "/contact", label: "Help center" },
      { to: "/", label: "Refund policy" },
      { to: "/", label: "Privacy" },
      { to: "/", label: "Terms" },
    ],
  },
];

const socials = [
  { Icon: BsFacebook, href: "#" },
  { Icon: BsInstagram, href: "#" },
  { Icon: BsLinkedin, href: "#" },
  { Icon: BsTwitter, href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-950 text-cream overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[460px] w-[680px] rounded-full bg-yellow-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-light opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        {/* CTA strip */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-14 border-b border-white/10">
          <h2 className="font-fraunces font-light text-4xl md:text-6xl leading-[0.95] tracking-tight max-w-3xl">
            Learn the things
            <br />
            <em className="italic text-yellow-400">that compound.</em>
          </h2>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 self-start md:self-end bg-yellow-400 text-ink-950 px-6 py-3.5 rounded-full font-jakarta font-semibold transition hover:scale-[1.03] shrink-0"
          >
            Start learning free
            <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Link grid */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 py-14">
          <div className="md:col-span-4">
            <BrandLogo to="/" tone="footer" size="lg" />
            <p className="font-jakarta text-cream/60 text-sm leading-relaxed mt-5 max-w-xs">
              India&rsquo;s home for practitioner-led courses across
              engineering, design, and business — without the gatekeeping.
            </p>
            <div className="flex items-center gap-3 mt-7">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="h-10 w-10 rounded-full ring-1 ring-white/15 flex items-center justify-center text-cream/80 hover:text-yellow-400 hover:ring-yellow-400/40 transition"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.head} className="md:col-span-2">
              <p className="text-[11px] uppercase tracking-[0.22em] text-yellow-400 font-jakarta font-semibold">
                {col.head}
              </p>
              <ul className="space-y-3 mt-5">
                {col.items.map((it) => (
                  <li key={it.label}>
                    <Link
                      to={it.to}
                      className="font-jakarta text-sm text-cream/75 hover:text-cream transition"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-yellow-400 font-jakarta font-semibold">
              Newsletter
            </p>
            <p className="font-jakarta text-sm text-cream/65 mt-5">
              One thoughtful email a week. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center bg-white/5 ring-1 ring-white/10 rounded-full p-1 focus-within:ring-yellow-400/40 transition"
            >
              <input
                type="email"
                placeholder="you@email.com"
                className="bg-transparent flex-1 px-3 py-1.5 text-sm font-jakarta text-cream placeholder:text-cream/40 outline-none min-w-0"
              />
              <button className="bg-yellow-400 text-ink-950 rounded-full h-8 w-8 flex items-center justify-center shrink-0 hover:scale-105 transition">
                <HiArrowUpRight size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between pt-8 border-t border-white/10">
          <span className="font-jakarta text-xs text-cream/55">
            © {year} LearnIndia. Crafted in India with care. All rights reserved.
          </span>
          <span className="font-jakarta text-xs text-cream/55 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
