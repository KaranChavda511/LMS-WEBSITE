import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";

export default function CourseList() {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const categories = useMemo(() => {
    const set = new Set(coursesData?.map((c) => c?.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [coursesData]);

  const filtered = useMemo(() => {
    let list = coursesData || [];
    if (activeCat !== "All") list = list.filter((c) => c?.category === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c?.title?.toLowerCase().includes(q) ||
          c?.description?.toLowerCase().includes(q) ||
          c?.createdBy?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [coursesData, activeCat, query]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-cream dark:bg-ink-950 text-ink-950 dark:text-cream">
        <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-yellow-400/20 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8">
          <div className="flex items-center gap-4 mb-6 animate-fade-up">
            <span className="text-[11px] uppercase tracking-[0.25em] font-jakarta font-semibold text-yellow-600 dark:text-yellow-400">
              Library
            </span>
            <span className="h-px w-20 bg-ink-950/15 dark:bg-cream/15" />
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end animate-fade-up delay-1">
            <div className="lg:col-span-7">
              <h1 className="font-fraunces font-light leading-[0.95] tracking-tight text-[clamp(2.25rem,5vw,4rem)]">
                Every course,
                <br />
                <em className="italic text-yellow-500">one fair price.</em>
              </h1>
              <p className="font-jakarta mt-6 max-w-xl text-lg text-ink-950/65 dark:text-cream/65 leading-relaxed">
                Browse {coursesData?.length || 0} expert-led courses across
                engineering, design, business, and beyond.
              </p>
            </div>

            <div className="lg:col-span-5">
              <label className="relative block">
                <span className="sr-only">Search</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses, topics, instructors…"
                  className="w-full bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/10 dark:ring-white/10 rounded-full pl-5 pr-12 py-3.5 font-jakarta text-sm text-ink-950 dark:text-cream placeholder:text-ink-950/40 dark:placeholder:text-cream/40 focus:ring-2 focus:ring-yellow-400/50 outline-none transition"
                />
                <svg
                  viewBox="0 0 24 24"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-950/45 dark:text-cream/45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
              </label>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-10 flex flex-wrap items-center gap-2 animate-fade-up delay-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full font-jakarta text-sm font-medium transition ${
                  activeCat === c
                    ? "bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950"
                    : "bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/10 dark:ring-white/10 text-ink-950/75 dark:text-cream/75 hover:text-ink-950 dark:hover:text-cream hover:ring-ink-950/20 dark:hover:ring-white/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Course grid */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-24">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="font-fraunces text-5xl text-ink-950/20 dark:text-cream/20">∅</div>
              <p className="font-jakarta mt-4 text-ink-950/55 dark:text-cream/55">
                No courses match your search yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {filtered.map((c) => (
                <CourseCard key={c._id} data={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
