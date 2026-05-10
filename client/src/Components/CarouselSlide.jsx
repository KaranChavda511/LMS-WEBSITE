import React from "react";
import { BsQuote } from "react-icons/bs";

export default function CarouselSlide({ details }) {
  return (
    <div className="md:w-auto w-full flex md:flex-row flex-col gap-8 md:gap-12 mx-auto md:h-[330px] h-[540px] overflow-hidden items-center">
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-2xl" />
        <img
          src={details.image}
          alt={details.title}
          className="relative md:h-[260px] h-[200px] w-[200px] md:w-[200px] object-cover rounded-full ring-1 ring-white/20 bg-gradient-to-br from-yellow-300/80 to-amber-500/80 p-1.5"
        />
      </div>

      <div className="flex flex-col gap-5 md:gap-7 md:items-start items-center md:text-left text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] font-jakarta font-semibold text-yellow-400">
          Voice 0{(details.title?.length % 5) + 1}
        </span>

        <h2 className="font-fraunces font-light md:text-5xl text-3xl tracking-tight text-cream leading-[1.05]">
          {details.title}
        </h2>

        <div className="relative max-w-2xl">
          <BsQuote
            size={38}
            className="text-yellow-400/80 absolute -top-2 -left-1 -translate-x-2"
          />
          <p className="font-fraunces italic md:text-2xl text-lg font-light text-cream/80 leading-relaxed pl-8">
            {details.description}
          </p>
        </div>
      </div>
    </div>
  );
}
