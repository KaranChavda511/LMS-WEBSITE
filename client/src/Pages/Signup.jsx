import { useState } from "react";
import { notify } from "../Helpers/notify";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";
import Layout from "../Layout/Layout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";

const benefits = [
  { t: "Lifetime access", d: "Buy once, learn forever. No surprise renewals." },
  { t: "Practitioner-led", d: "Courses by people doing the work, not full-time educators." },
  { t: "Ship a portfolio", d: "Every course leaves you with something to show, not just a cert." },
  { t: "Honest pricing", d: "One fair price. No upsells, no premium tiers." },
];

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  }

  function getImage(event) {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setSignupData({ ...signupData, avatar: uploadedImage });
      const fr = new FileReader();
      fr.readAsDataURL(uploadedImage);
      fr.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.fullName) {
      notify.error("Please fill all the details");
      return;
    }
    if (signupData.fullName.length < 3) {
      notify.error("Name should be at least 3 characters");
      return;
    }
    if (!signupData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      notify.error("Invalid email id");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) {
      setSignupData({ fullName: "", email: "", password: "", avatar: "" });
      setPreviewImage("");
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <Layout hideFooter>
      <section className="relative overflow-hidden bg-cream dark:bg-ink-950 text-ink-950 dark:text-cream min-h-[calc(100vh-76px)]">
        <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-emerald-400/15 dark:bg-violet-500/15 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — narrative */}
          <div className="hidden lg:block animate-fade-up lg:pt-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-jakarta font-semibold text-yellow-600 dark:text-yellow-400">
              Create your account
            </span>
            <h1 className="font-fraunces font-light text-[clamp(2.5rem,4.5vw,4rem)] leading-[0.95] tracking-tight mt-5">
              Start building
              <br />
              <em className="italic text-yellow-500">something</em>
              <br />
              real.
            </h1>
            <p className="font-jakarta mt-6 max-w-md text-lg text-ink-950/65 dark:text-cream/65 leading-relaxed">
              Join thousands of learners who finished what they started — and
              shipped portfolio work to prove it.
            </p>

            <ul className="mt-10 space-y-4 max-w-md">
              {benefits.map((b, i) => (
                <li key={b.t} className="flex gap-4">
                  <span className="font-fraunces text-yellow-500 text-2xl font-light leading-none mt-0.5">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-jakarta font-semibold text-ink-950 dark:text-cream">
                      {b.t}
                    </p>
                    <p className="font-jakarta text-sm text-ink-950/60 dark:text-cream/60 mt-0.5">
                      {b.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="relative animate-fade-up delay-1 w-full">
            <form
              onSubmit={createNewAccount}
              autoComplete="off"
              noValidate
              className="relative bg-white dark:bg-white/[0.04] backdrop-blur-xl rounded-3xl ring-1 ring-ink-950/10 dark:ring-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)] p-7 md:p-10 w-full"
            >
              <span className="hidden lg:inline-flex absolute top-6 right-6 px-3 py-1 rounded-full bg-ink-950 dark:bg-cream text-cream dark:text-ink-950 font-jakarta text-[10px] uppercase tracking-[0.2em] font-semibold">
                New here
              </span>
              <h2 className="lg:hidden font-fraunces font-light text-4xl leading-tight">
                Get <em className="italic text-yellow-500">started.</em>
              </h2>
              <h2 className="hidden lg:block font-fraunces font-light text-3xl leading-tight">
                Create your account
              </h2>
              <p className="font-jakarta text-sm text-ink-950/60 dark:text-cream/60 mt-2">
                Free to start, no credit card required.
              </p>

              <div className="space-y-4 mt-7">
                <InputBox
                  label="Full name"
                  name="fullName"
                  type="text"
                  placeholder="Jane Doe"
                  onChange={handleUserInput}
                  value={signupData.fullName}
                />
                <InputBox
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleUserInput}
                  value={signupData.email}
                />
                <InputBox
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="At least 4 characters"
                  onChange={handleUserInput}
                  value={signupData.password}
                />

                {/* Avatar */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-[0.2em] font-jakarta font-semibold text-ink-950/55 dark:text-cream/55">
                    Avatar <span className="opacity-60 normal-case tracking-normal">(optional)</span>
                  </label>
                  <label
                    htmlFor="image_uploads"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl ring-1 ring-ink-950/10 dark:ring-white/10 bg-white dark:bg-white/[0.04] cursor-pointer hover:ring-yellow-400/40 transition"
                  >
                    {previewImage ? (
                      <img
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-yellow-400/40"
                        src={previewImage}
                        alt=""
                      />
                    ) : (
                      <span className="w-11 h-11 rounded-full bg-ink-950/[0.05] dark:bg-white/5 flex items-center justify-center text-ink-950/40 dark:text-cream/40">
                        <BsPersonCircle size={28} />
                      </span>
                    )}
                    <span className="font-jakarta text-sm text-ink-950/65 dark:text-cream/65">
                      {previewImage ? "Change photo" : "Upload a profile photo"}
                    </span>
                    <input
                      onChange={getImage}
                      type="file"
                      name="image_uploads"
                      id="image_uploads"
                      accept=".jpg,.jpeg,.png,image/*"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group mt-6 w-full inline-flex items-center justify-center gap-2 bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 px-6 py-3.5 rounded-full font-jakarta font-semibold transition hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
              >
                {isLoading ? "Creating account…" : "Create account"}
                {!isLoading && (
                  <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </button>

              <p className="text-center font-jakarta text-sm text-ink-950/65 dark:text-cream/65 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-ink-950 dark:text-cream underline decoration-yellow-500 underline-offset-4 decoration-2 hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
