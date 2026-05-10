import React from "react";

export default function InputBox({
  label,
  name,
  type,
  placeholder,
  value,
  onChange = () => {},
  disabled = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.2em] font-jakarta font-semibold text-ink-950/55 dark:text-cream/55"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="bg-white dark:bg-white/[0.04] text-base font-jakarta px-4 py-3 rounded-xl ring-1 ring-ink-950/10 dark:ring-white/10 text-ink-950 dark:text-cream placeholder:text-ink-950/35 dark:placeholder:text-cream/35 focus:ring-2 focus:ring-yellow-400/60 focus:bg-white dark:focus:bg-white/[0.06] outline-none transition"
        onChange={onChange}
        value={value || ""}
        disabled={disabled}
      />
    </div>
  );
}
