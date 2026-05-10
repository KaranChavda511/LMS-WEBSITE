import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

const Icon = ({ children, tone }) => (
  <span
    className={`shrink-0 mt-0.5 h-8 w-8 rounded-full flex items-center justify-center ring-1 ${tone}`}
  >
    {children}
  </span>
);

const TOAST_ICONS = {
  success: (
    <Icon tone="bg-emerald-500/12 ring-emerald-500/30">
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5l3 3 7-7" />
      </svg>
    </Icon>
  ),
  error: (
    <Icon tone="bg-rose-500/12 ring-rose-500/30">
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </Icon>
  ),
  warning: (
    <Icon tone="bg-amber-500/12 ring-amber-500/30">
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="currentColor">
        <path d="M8 1.6 14.5 13H1.5L8 1.6Zm0 4v4.4M8 11.5v.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    </Icon>
  ),
  info: (
    <Icon tone="bg-sky-500/12 ring-sky-500/30">
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-sky-600 dark:text-sky-400" fill="currentColor">
        <circle cx="8" cy="4.4" r="1.1" />
        <rect x="7" y="6.6" width="2" height="6.4" rx="0.8" />
      </svg>
    </Icon>
  ),
  loading: (
    <Icon tone="bg-yellow-500/15 ring-yellow-500/40">
      <svg viewBox="0 0 16 16" className="h-4 w-4 text-yellow-600 dark:text-yellow-400 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" />
      </svg>
    </Icon>
  ),
};

function ThemedToaster() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(html.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const baseToast =
    "group/toast pointer-events-auto relative w-[360px] max-w-[calc(100vw-32px)] " +
    "flex items-start gap-3 pl-5 pr-4 py-3.5 rounded-2xl overflow-hidden " +
    "bg-cream dark:bg-ink-900 ring-1 ring-ink-950/10 dark:ring-white/10 " +
    "shadow-[0_22px_60px_-22px_rgba(0,0,0,0.35)] " +
    "before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1";

  return (
    <Toaster
      theme={theme}
      position="top-center"
      offset={96}
      gap={10}
      expand
      duration={4000}
      visibleToasts={4}
      closeButton={false}
      icons={TOAST_ICONS}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: baseToast,
          success: "before:bg-emerald-500",
          error: "before:bg-rose-500",
          warning: "before:bg-amber-500",
          info: "before:bg-sky-500",
          loading: "before:bg-yellow-500",
          title:
            "font-fraunces text-[15px] font-medium tracking-tight text-ink-950 dark:text-cream leading-snug",
          description:
            "font-jakarta text-[12.5px] text-ink-950/60 dark:text-cream/60 mt-1 leading-snug",
          actionButton:
            "!bg-ink-950 dark:!bg-yellow-400 !text-cream dark:!text-ink-950 !rounded-full !px-3 !py-1.5 !font-jakarta !font-semibold !text-[12px]",
          cancelButton:
            "!bg-transparent !text-ink-950/65 dark:!text-cream/65 !rounded-full !px-3 !py-1.5 !font-jakarta !text-[12px]",
        },
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ThemedToaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
