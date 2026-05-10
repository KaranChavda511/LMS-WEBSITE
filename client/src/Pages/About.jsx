import React from "react";
import { Link } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import aboutMainImage from "../assets/images/about.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../Layout/Layout";

const pillars = [
  {
    k: "01",
    h: "Empower",
    b: "Aspiring teachers and creators get a simple stage to share what they actually know.",
  },
  {
    k: "02",
    h: "Equip",
    b: "Students get courses built by people doing the work — not just teaching it.",
  },
  {
    k: "03",
    h: "Elevate",
    b: "Together we contribute to the growth and wellness of mankind, one lesson at a time.",
  },
];

function AboutUs() {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 700,
    fade: true,
    pauseOnHover: true,
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream dark:bg-ink-950 text-ink-950 dark:text-cream">
        <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-40 h-[420px] w-[420px] rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-rose-400/15 dark:bg-violet-500/15 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-14 md:pt-24 pb-20">
          <div className="flex items-center gap-4 mb-10 animate-fade-up">
            <span className="text-[11px] uppercase tracking-[0.25em] font-jakarta font-semibold text-yellow-600 dark:text-yellow-400">
              About us
            </span>
            <span className="h-px w-24 bg-ink-950/15 dark:bg-cream/15" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="animate-fade-up delay-1 lg:pt-4">
              <h1 className="font-fraunces font-light leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,6vw,4.75rem)]">
                Quality education,
                <br />
                <span className="italic font-normal text-yellow-500">unfairly affordable.</span>
              </h1>
              <p className="font-jakarta mt-8 text-lg max-w-xl text-ink-950/65 dark:text-cream/65 leading-relaxed">
                We&rsquo;re building the platform we wish existed when we were
                learning &mdash; a place where practitioners share what they
                actually know, without the gatekeeping, and at a price the rest
                of us can pay.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <div className="font-fraunces text-3xl font-medium tracking-tight">12k+</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-950/50 dark:text-cream/50 mt-1.5 font-jakarta font-medium">learners</div>
                </div>
                <div>
                  <div className="font-fraunces text-3xl font-medium tracking-tight">240+</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-950/50 dark:text-cream/50 mt-1.5 font-jakarta font-medium">courses</div>
                </div>
                <div>
                  <div className="font-fraunces text-3xl font-medium tracking-tight">42</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-950/50 dark:text-cream/50 mt-1.5 font-jakarta font-medium">countries</div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/courses"
                  className="group inline-flex items-center gap-2 bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 px-5 py-3 rounded-full font-jakarta font-semibold text-sm transition hover:scale-[1.03]"
                >
                  Browse the library
                  <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full ring-1 ring-ink-950/15 dark:ring-white/15 text-ink-950 dark:text-cream font-jakarta font-semibold text-sm hover:bg-ink-950/[0.04] dark:hover:bg-white/5 transition"
                >
                  Talk to the team
                </Link>
              </div>
            </div>

            <div className="animate-fade-up delay-2 max-w-md lg:max-w-none mx-auto w-full">
              <div className="relative aspect-[5/4] rounded-[2rem] overflow-hidden bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 ring-1 ring-ink-950/10 dark:ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
                <div className="absolute inset-0 bg-grid-light opacity-30" />
                <img
                  src={aboutMainImage}
                  alt="about illustration"
                  className="absolute inset-0 w-full h-full object-contain p-6"
                />
                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-ink-950/90 backdrop-blur text-cream font-jakarta text-sm font-semibold shadow-lg animate-float-a">
                  est. 2024
                </div>
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white/95 dark:bg-ink-900/90 backdrop-blur ring-1 ring-ink-950/10 dark:ring-white/10 shadow-lg font-jakarta text-sm font-semibold text-ink-950 dark:text-cream animate-float-b">
                  from <span className="text-yellow-600 dark:text-yellow-500">42</span> countries
                </div>
              </div>

              <figure className="mt-8 p-5 rounded-2xl bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/8 dark:ring-white/10 flex items-center gap-4">
                <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center font-fraunces text-ink-950 font-semibold text-base ring-1 ring-ink-950/10">
                  L
                </span>
                <div className="min-w-0">
                  <p className="font-fraunces italic text-[15px] text-ink-950/80 dark:text-cream/80 leading-snug">
                    &ldquo;Less hand-holding, more building.&rdquo;
                  </p>
                  <p className="mt-1 font-jakarta text-[12px] text-ink-950/55 dark:text-cream/55">
                    <span className="text-ink-950 dark:text-cream font-semibold">Lina W.</span> · ML engineer
                  </p>
                </div>
              </figure>
            </div>
          </div>

          <div className="mt-20 grid sm:grid-cols-3 gap-px bg-ink-950/10 dark:bg-white/10 rounded-3xl overflow-hidden ring-1 ring-ink-950/10 dark:ring-white/10 animate-fade-up delay-3">
            {pillars.map((p) => (
              <div key={p.k} className="bg-cream dark:bg-ink-950 p-8">
                <div className="font-fraunces text-yellow-500 text-4xl font-light">{p.k}</div>
                <h3 className="font-fraunces text-2xl mt-4">{p.h}</h3>
                <p className="font-jakarta mt-3 text-sm text-ink-950/65 dark:text-cream/65 leading-relaxed">
                  {p.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES CAROUSEL */}
      <section className="relative bg-cream dark:bg-ink-950 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-[11px] uppercase tracking-[0.25em] font-jakarta font-semibold text-yellow-600 dark:text-yellow-400">
              In their words
            </span>
            <h2 className="font-fraunces font-light text-4xl md:text-5xl mt-3 leading-[1.05] tracking-tight text-ink-950 dark:text-cream">
              Voices that shape <em className="italic">how we learn.</em>
            </h2>
          </div>

          <div className="relative rounded-3xl bg-ink-950 dark:bg-white/[0.04] ring-1 ring-ink-950/10 dark:ring-white/10 px-6 md:px-12 py-10 md:py-14 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-yellow-500/25 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px] pointer-events-none" />
            <Slider {...settings}>
              {celebrities.map((d, i) => (
                <CarouselSlide details={d} key={i} />
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutUs;
