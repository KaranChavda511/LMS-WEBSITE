import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import heroPng from "../assets/images/hero.png";
import { HiArrowUpRight } from "react-icons/hi2";
import { BsStars } from "react-icons/bs";
import { FiPlus, FiMinus } from "react-icons/fi";

const stats = [
  ["12k+", "active learners"],
  ["240+", "expert courses"],
  ["4.9", "average rating"],
  ["95%", "completion rate"],
];

const categories = [
  "Engineering", "Product Design", "Data Science", "ML / AI",
  "Marketing", "Business", "Leadership", "Mobile Dev", "Web3",
];

const pillars = [
  {
    n: "01",
    t: "Practitioner-taught",
    d: "Every course is built and delivered by someone shipping work in the field — not by full-time educators.",
  },
  {
    n: "02",
    t: "Project-first",
    d: "Watch less, build more. You leave each course with something for your portfolio, not just a certificate.",
  },
  {
    n: "03",
    t: "Honest pricing",
    d: "One fair price. No upsells, no premium tiers hidden behind paywalls. Lifetime access, full stop.",
  },
];

const testimonials = [
  {
    q: "The first online course I actually finished. I was shipping production code in week two.",
    name: "Maya Rodriguez",
    role: "Backend engineer · Stripe",
    initial: "M",
  },
  {
    q: "Less hand-holding, more building. Exactly what I needed after two abandoned bootcamps.",
    name: "Adesh Patil",
    role: "Designer turned PM · Razorpay",
    initial: "A",
  },
  {
    q: "I came for one course and stayed for the community. The cohort kept me accountable.",
    name: "Lina Wang",
    role: "ML engineer · Independent",
    initial: "L",
  },
  {
    q: "Honest pricing was the dealbreaker. No upsells, just teaching that respects my time.",
    name: "Tomás Becker",
    role: "Senior dev · Mercado Libre",
    initial: "T",
  },
];

const faqs = [
  {
    q: "Do I need any prior experience to start?",
    a: "Most courses assume working familiarity with the field but each one lists its prerequisites up front. If you're brand new, start with the foundational tracks — they're labelled clearly.",
  },
  {
    q: "How does lifetime access work?",
    a: "You buy a course once and own it. New videos, downloads, and updates land in your library at no extra cost. No renewals, no expiry.",
  },
  {
    q: "Are there cohorts and live sessions?",
    a: "Yes. Most flagship courses run 4–6 week cohorts with live Q&A, group reviews, and instructor office hours. Self-paced versions are always available too.",
  },
  {
    q: "What's your refund policy?",
    a: "Seven full days, no questions asked. If a course isn't right for you, write to us within a week of purchase and we'll refund you in full.",
  },
  {
    q: "Do you issue certificates?",
    a: "Every completed course comes with a verified certificate. More importantly, you'll have a portfolio project to show — that's what hiring managers actually care about.",
  },
];

function FaqItem({ q, a, open, onClick }) {
  return (
    <div className="border-b border-ink-950/10 dark:border-white/10 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between gap-6 text-left group"
      >
        <span className="font-fraunces text-lg md:text-xl text-ink-950 dark:text-cream group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition">
          {q}
        </span>
        <span className="shrink-0 h-9 w-9 rounded-full ring-1 ring-ink-950/15 dark:ring-white/15 flex items-center justify-center text-ink-950 dark:text-cream bg-cream dark:bg-ink-950">
          {open ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="font-jakarta text-ink-950/65 dark:text-cream/65 leading-relaxed max-w-3xl">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream dark:bg-ink-950 text-ink-950 dark:text-cream">
        <div className="absolute inset-0 bg-grid-light opacity-70 pointer-events-none" />
        <div className="absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-yellow-400/30 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-400/20 dark:bg-violet-500/20 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-ink-950/[0.04] dark:bg-white/10 ring-1 ring-ink-950/10 dark:ring-white/15 text-[11px] font-jakarta font-medium tracking-[0.18em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              New cohort enrolling
            </span>
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            {/* Copy column */}
            <div className="lg:col-span-7 space-y-7 lg:pt-2">
              <h1 className="font-fraunces font-light tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,5.25rem)] leading-[0.95] animate-fade-up delay-1">
                Learn what
                <br />
                <span className="italic font-normal text-yellow-500">actually</span> matters,
                <br />
                taught by people
                <br />
                who <em className="italic font-normal">do</em> it.
              </h1>

              <p className="font-jakarta max-w-xl text-lg md:text-xl text-ink-950/65 dark:text-cream/65 leading-relaxed animate-fade-up delay-2">
                A library of practitioner-led courses across engineering, design,
                and business — at a price that actually makes sense.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 animate-fade-up delay-3">
                <Link to="/courses">
                  <button className="group inline-flex items-center gap-2 bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 px-6 py-3.5 rounded-full font-jakarta font-semibold text-base transition-transform hover:scale-[1.02]">
                    Explore courses
                    <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="inline-flex items-center gap-2 border border-ink-950/15 dark:border-white/20 text-ink-950 dark:text-cream px-6 py-3.5 rounded-full font-jakarta font-semibold text-base transition hover:bg-ink-950/[0.04] dark:hover:bg-white/[0.06]">
                    Talk to us
                  </button>
                </Link>
              </div>

              <p className="text-sm text-ink-950/50 dark:text-cream/50 font-jakarta animate-fade-up delay-3">
                No credit card required &nbsp;·&nbsp; 7-day refund window
              </p>
            </div>

            {/* Visual column */}
            <div className="lg:col-span-5 relative animate-fade-up delay-2">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 ring-1 ring-ink-950/10 dark:ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 bg-grid-light opacity-30" />
                <img
                  src={heroPng}
                  alt="learning illustration"
                  className="absolute inset-0 w-full h-full object-contain p-6"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-orange-500/20 to-transparent" />

                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-white/95 dark:bg-ink-900/90 backdrop-blur ring-1 ring-ink-950/10 dark:ring-white/10 shadow-lg font-jakarta text-sm font-semibold text-ink-950 dark:text-cream animate-float-a">
                  <BsStars className="inline mr-1.5 -mt-0.5 text-yellow-500" />
                  Project-based
                </div>
                <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-ink-950/90 backdrop-blur text-cream font-jakarta text-sm font-semibold shadow-lg animate-float-b">
                  Lifetime access
                </div>
                <div className="hidden md:block absolute top-[42%] right-4 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-ink-900/90 backdrop-blur ring-1 ring-ink-950/10 dark:ring-white/10 shadow-lg font-jakarta animate-float-c">
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm leading-tight">+312%</div>
                  <div className="text-[11px] text-ink-950/55 dark:text-cream/55">avg salary lift</div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-width stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 pt-10 mt-14 lg:mt-20 border-t border-ink-950/10 dark:border-white/10 animate-fade-up delay-4">
            {stats.map(([num, label]) => (
              <div key={label}>
                <div className="font-fraunces text-3xl md:text-4xl font-medium tracking-tight">{num}</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-950/50 dark:text-cream/50 mt-1.5 font-jakarta font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY MARQUEE */}
      <section className="border-y border-ink-950/10 dark:border-white/10 bg-cream dark:bg-ink-950 py-7 overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex gap-12 shrink-0">
              {categories.map((c) => (
                <span
                  key={`${dup}-${c}`}
                  className="font-fraunces italic text-3xl md:text-4xl text-ink-950/65 dark:text-cream/65 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                >
                  {c} <span className="text-yellow-500 not-italic">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-cream dark:bg-ink-950 px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] uppercase tracking-[0.22em] text-yellow-600 dark:text-yellow-400 font-jakarta font-semibold">
              why us
            </span>
            <h2 className="font-fraunces text-4xl md:text-5xl font-light mt-4 leading-[1.05] tracking-tight text-ink-950 dark:text-cream">
              Built for people who actually <em className="italic">finish</em> what they start.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((c, i) => (
              <div
                key={c.n}
                className={`relative p-8 rounded-3xl bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/[0.08] dark:ring-white/10 backdrop-blur-sm transition hover:-translate-y-1 ${
                  i === 1 ? "md:translate-y-8" : ""
                }`}
              >
                <div className="font-fraunces text-yellow-500 text-5xl font-light">{c.n}</div>
                <h3 className="font-fraunces text-2xl mt-6 text-ink-950 dark:text-cream">
                  {c.t}
                </h3>
                <p className="font-jakarta mt-3 text-ink-950/65 dark:text-cream/65 leading-relaxed">
                  {c.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-cream dark:bg-ink-950 px-6 md:px-12 py-20 md:py-24 border-t border-ink-950/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.22em] text-yellow-600 dark:text-yellow-400 font-jakarta font-semibold">
                Loved by learners
              </span>
              <h2 className="font-fraunces text-4xl md:text-5xl font-light mt-4 leading-[1.05] tracking-tight text-ink-950 dark:text-cream">
                Real people, real <em className="italic">portfolio work.</em>
              </h2>
            </div>
            <p className="font-jakarta text-sm text-ink-950/55 dark:text-cream/55 max-w-xs">
              Pulled from <span className="text-ink-950 dark:text-cream font-semibold">2,400+</span> reviews collected across courses launched in the last 12 months.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={`relative bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/8 dark:ring-white/10 rounded-3xl p-6 flex flex-col ${
                  i % 2 === 1 ? "lg:translate-y-6" : ""
                }`}
              >
                <span className="font-fraunces text-5xl text-yellow-400 leading-none -mt-2">&ldquo;</span>
                <blockquote className="font-fraunces italic text-base md:text-lg text-ink-950/85 dark:text-cream/85 leading-relaxed mt-1">
                  {t.q}
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-ink-950/10 dark:border-white/10 flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center font-fraunces text-ink-950 font-semibold text-sm">
                    {t.initial}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-jakarta font-semibold text-sm text-ink-950 dark:text-cream truncate">
                      {t.name}
                    </span>
                    <span className="block font-jakarta text-xs text-ink-950/55 dark:text-cream/55 truncate">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream dark:bg-ink-950 px-6 md:px-12 py-20 md:py-24 border-t border-ink-950/10 dark:border-white/10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.22em] text-yellow-600 dark:text-yellow-400 font-jakarta font-semibold">
              FAQ
            </span>
            <h2 className="font-fraunces text-4xl md:text-5xl font-light mt-4 leading-[1.05] tracking-tight text-ink-950 dark:text-cream">
              Questions we hear <em className="italic">often.</em>
            </h2>
            <p className="font-jakarta mt-5 text-ink-950/60 dark:text-cream/60 leading-relaxed">
              Still curious?{" "}
              <Link to="/contact" className="text-ink-950 dark:text-cream font-semibold underline decoration-yellow-500 decoration-2 underline-offset-4 hover:text-yellow-500 dark:hover:text-yellow-400">
                Drop us a note
              </Link>
              .
            </p>
          </div>
          <div className="md:col-span-8">
            {faqs.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
