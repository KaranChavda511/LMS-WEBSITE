import { useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Layout from "../Layout/Layout";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Layout hideFooter>
      <section className="relative min-h-[calc(100vh-76px)] bg-cream dark:bg-ink-950 text-ink-950 dark:text-cream flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[460px] w-[680px] rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />
        <div className="relative text-center max-w-2xl">
          <div className="font-fraunces text-[clamp(7rem,18vw,14rem)] leading-[0.85] tracking-tight italic text-yellow-500 select-none drop-shadow-[0_4px_30px_rgba(250,204,21,0.25)]">
            404
          </div>
          <h1 className="font-fraunces font-light text-3xl md:text-5xl mt-2 leading-tight tracking-tight">
            This page took an <em className="italic text-yellow-500">unscheduled break.</em>
          </h1>
          <p className="font-jakarta mt-5 text-ink-950/65 dark:text-cream/65">
            The link is broken, the page moved, or it never existed in the first place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-full ring-1 ring-ink-950/15 dark:ring-white/15 font-jakarta font-semibold hover:bg-ink-950/[0.04] dark:hover:bg-white/5 transition"
            >
              Go back
            </button>
            <button
              onClick={() => navigate("/")}
              className="group inline-flex items-center gap-2 bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 px-6 py-3 rounded-full font-jakarta font-semibold transition hover:scale-[1.03]"
            >
              Take me home
              <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default NotFound;
