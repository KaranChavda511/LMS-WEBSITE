import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";

export default function CourseCard({ data }) {
  const navigate = useNavigate();
  const lectures = data?.numberOfLectures || data?.numberoflectures || 0;

  return (
    <article
      onClick={() => navigate("/courses/description/", { state: { ...data } })}
      className="group cursor-pointer bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/8 dark:ring-white/10 rounded-3xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)] hover:ring-ink-950/15 dark:hover:ring-white/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400">
        {data?.thumbnail?.secure_url && (
          <img
            src={data.thumbnail.secure_url}
            alt={data?.title || "course thumbnail"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-yellow-400 text-ink-950 text-[10px] uppercase tracking-[0.2em] font-jakarta font-bold ring-1 ring-ink-950/15 shadow-md">
          {data?.category || "course"}
        </span>
        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-ink-950/75 backdrop-blur-sm text-cream font-jakarta text-[11px] font-semibold">
          {lectures} lecture{lectures === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-fraunces text-xl md:text-2xl font-medium leading-tight text-ink-950 dark:text-cream line-clamp-2">
          {data?.title}
        </h3>
        <p className="font-jakarta mt-2 text-sm text-ink-950/65 dark:text-cream/65 line-clamp-2 leading-relaxed">
          {data?.description}
        </p>

        <div className="mt-auto pt-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 ring-1 ring-ink-950/10 dark:ring-white/15 flex items-center justify-center font-fraunces text-ink-950 font-semibold text-sm shrink-0">
              {(data?.createdBy || "?")[0]?.toUpperCase()}
            </span>
            <span className="font-jakarta text-xs text-ink-950/70 dark:text-cream/70 truncate">
              {data?.createdBy || "Unknown"}
            </span>
          </div>
          <span className="h-9 w-9 rounded-full bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 flex items-center justify-center transition-transform group-hover:rotate-45">
            <HiArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}
