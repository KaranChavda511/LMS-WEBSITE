import React from "react";
import { Link } from "react-router-dom";

/**
 * BrandLogo — LearnIndia brand mark + wordmark.
 *
 * Mark: 8-spoke knowledge wheel (a simplified nod to the Ashoka Chakra).
 * Wordmark: "Learn" in regular Fraunces, "India" in italic Fraunces.
 *
 * Variants:
 *   tone="light"  — for cream / light backgrounds (dark disk + yellow wheel)
 *   tone="dark"   — for ink / dark backgrounds (yellow disk + ink wheel)
 *   tone="footer" — always-dark backdrop (yellow disk + ink wheel)
 *
 * size: "sm" (default, for navbar/sidebar) | "lg" (for footer)
 */
export default function BrandLogo({
  to = "/",
  tone = "auto",
  size = "sm",
  showWord = true,
  className = "",
}) {
  const dim = size === "lg" ? "h-10 w-10" : "h-9 w-9";
  const wordSize = size === "lg" ? "text-3xl" : "text-2xl";
  const innerSvg = size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]";

  const diskClass =
    tone === "footer"
      ? "bg-yellow-400 text-ink-950"
      : tone === "dark"
      ? "bg-yellow-400 text-ink-950"
      : tone === "light"
      ? "bg-ink-950 text-yellow-400"
      : "bg-ink-950 dark:bg-yellow-400 text-yellow-400 dark:text-ink-950";

  const accentClass =
    tone === "footer"
      ? "text-yellow-400"
      : "text-yellow-500 dark:text-yellow-400";

  const wordColorClass =
    tone === "footer"
      ? "text-cream"
      : "text-ink-950 dark:text-cream";

  const Mark = (
    <span
      aria-hidden
      className={`relative inline-flex items-center justify-center rounded-xl ${dim} ${diskClass} transition-transform group-hover:rotate-[-8deg]`}
    >
      <svg
        viewBox="0 0 24 24"
        className={innerSvg}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="8.5" />
        <line x1="12" y1="3.5" x2="12" y2="20.5" />
        <line x1="3.5" y1="12" x2="20.5" y2="12" />
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="6" y1="18" x2="18" y2="6" />
      </svg>
    </span>
  );

  const Word = showWord && (
    <span
      className={`font-fraunces ${wordSize} tracking-tight leading-none ${wordColorClass}`}
    >
      Learn
      <em className={`not-italic ${accentClass}`}>·</em>
      <span className="italic">India</span>
    </span>
  );

  const content = (
    <span className="flex items-center gap-2.5 group">
      {Mark}
      {Word}
    </span>
  );

  if (to === false || to === null) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link to={to} className={`shrink-0 ${className}`}>
      {content}
    </Link>
  );
}
