import { useState } from "react";
import { notify } from "../Helpers/notify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Layout from "../Layout/Layout";
import { login } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";

const stats = [
  ["12k+", "active learners"],
  ["240+", "expert courses"],
  ["4.9★", "average rating"],
];

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      notify.error("Please fill all the details");
      return;
    }
    setIsLoading(true);
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      setLoginData({ email: "", password: "" });
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <Layout hideFooter>
      <section className="relative overflow-hidden bg-cream dark:bg-ink-950 text-ink-950 dark:text-cream min-h-[calc(100vh-76px)]">
        <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — narrative */}
          <div className="hidden lg:block animate-fade-up lg:pt-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-jakarta font-semibold text-yellow-600 dark:text-yellow-400">
              Welcome back
            </span>
            <h1 className="font-fraunces font-light text-[clamp(2.5rem,4.5vw,4rem)] leading-[0.95] tracking-tight mt-5">
              Pick up
              <br />
              <em className="italic text-yellow-500">right where</em>
              <br />
              you left off.
            </h1>
            <p className="font-jakarta mt-6 max-w-md text-lg text-ink-950/65 dark:text-cream/65 leading-relaxed">
              Your half-finished modules, saved playlists, and bookmarked
              lectures are waiting.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {stats.map(([n, l]) => (
                <div key={l}>
                  <div className="font-fraunces text-3xl font-medium tracking-tight">{n}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-950/50 dark:text-cream/50 mt-1.5 font-jakarta font-medium">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <figure className="mt-10 max-w-md p-5 rounded-2xl bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/8 dark:ring-white/10 flex items-center gap-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center font-fraunces text-ink-950 font-semibold text-base ring-1 ring-ink-950/10">
                M
              </span>
              <div className="min-w-0">
                <p className="font-fraunces italic text-[15px] text-ink-950/80 dark:text-cream/80 leading-snug line-clamp-2">
                  &ldquo;The first course I actually finished.&rdquo;
                </p>
                <p className="mt-1 font-jakarta text-[12px] text-ink-950/55 dark:text-cream/55">
                  <span className="text-ink-950 dark:text-cream font-semibold">Maya R.</span> · backend engineer
                </p>
              </div>
            </figure>
          </div>

          {/* Right — form */}
          <div className="relative animate-fade-up delay-1 w-full">
            <form
              onSubmit={onLogin}
              autoComplete="off"
              noValidate
              className="relative bg-white dark:bg-white/[0.04] backdrop-blur-xl rounded-3xl ring-1 ring-ink-950/10 dark:ring-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)] p-7 md:p-10 w-full"
            >
              <span className="hidden lg:inline-flex absolute top-6 right-6 px-3 py-1 rounded-full bg-ink-950 dark:bg-cream text-cream dark:text-ink-950 font-jakarta text-[10px] uppercase tracking-[0.2em] font-semibold">
                Sign in
              </span>
              <h2 className="lg:hidden font-fraunces font-light text-4xl leading-tight">
                Welcome <em className="italic text-yellow-500">back.</em>
              </h2>
              <h2 className="hidden lg:block font-fraunces font-light text-3xl leading-tight">
                Sign in to <span className="not-italic">Learn</span>
                <em className="text-yellow-500">·</em>
                <em className="italic">India</em>
              </h2>
              <p className="font-jakarta text-sm text-ink-950/60 dark:text-cream/60 mt-2">
                Enter your details to continue.
              </p>

              <div className="space-y-4 mt-7">
                <InputBox
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleUserInput}
                  value={loginData.email}
                />
                <InputBox
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleUserInput}
                  value={loginData.password}
                />
                <div className="flex justify-end">
                  <Link
                    to="/user/profile/reset-password"
                    className="text-xs font-jakarta font-medium text-ink-950/60 dark:text-cream/60 hover:text-yellow-500 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group mt-6 w-full inline-flex items-center justify-center gap-2 bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 px-6 py-3.5 rounded-full font-jakarta font-semibold transition hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
              >
                {isLoading ? "Signing in…" : "Sign in"}
                {!isLoading && (
                  <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </button>

              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-ink-950/10 dark:border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-[11px] uppercase tracking-[0.22em]">
                  <span className="bg-white dark:bg-ink-950 px-3 text-ink-950/45 dark:text-cream/45 font-jakarta font-semibold">
                    or
                  </span>
                </div>
              </div>

              <p className="text-center font-jakarta text-sm text-ink-950/65 dark:text-cream/65">
                New to LearnIndia?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-ink-950 dark:text-cream underline decoration-yellow-500 underline-offset-4 decoration-2 hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  Create an account
                </Link>
              </p>

              <p className="mt-5 text-center font-jakarta text-[11px] text-ink-950/45 dark:text-cream/45 leading-relaxed">
                By signing in, you agree to our{" "}
                <Link to="/" className="underline decoration-ink-950/20 dark:decoration-cream/30 underline-offset-2 hover:text-ink-950/65 dark:hover:text-cream/65">terms</Link>{" "}
                and{" "}
                <Link to="/" className="underline decoration-ink-950/20 dark:decoration-cream/30 underline-offset-2 hover:text-ink-950/65 dark:hover:text-cream/65">privacy policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
