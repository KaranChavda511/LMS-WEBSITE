import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { HiArrowUpRight } from "react-icons/hi2";
import { axiosInstance } from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import InputBox from "../Components/InputBox/InputBox";
import TextArea from "../Components/InputBox/TextArea";
import Layout from "../Layout/Layout";

const channels = [
  { k: "Hello", v: "hello@lumen.school" },
  { k: "Press", v: "press@lumen.school" },
  { k: "Partnerships", v: "partners@lumen.school" },
];

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({ name: "", email: "", message: "" });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }
    setIsLoading(true);
    const loadingMessage = toast.loading("Sending message…");
    try {
      const res = await axiosInstance.post("/contact", userInput);
      toast.success(res?.data?.message, { id: loadingMessage });
      setUserInput({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Message sending failed. Try again.", { id: loadingMessage });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <section className="relative overflow-hidden bg-cream dark:bg-ink-950 text-ink-950 dark:text-cream min-h-[calc(100vh-76px)]">
        <div className="absolute inset-0 bg-grid-light opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5 animate-fade-up lg:pt-4">
            <span className="text-[11px] uppercase tracking-[0.25em] font-jakarta font-semibold text-yellow-600 dark:text-yellow-400">
              Contact us
            </span>
            <h1 className="font-fraunces font-light leading-[0.95] tracking-tight text-[clamp(2.5rem,5.5vw,4.5rem)] mt-5">
              Say <em className="italic text-yellow-500">hello</em>.
              <br />
              We read every note.
            </h1>
            <p className="font-jakarta mt-6 max-w-md text-lg text-ink-950/65 dark:text-cream/65 leading-relaxed">
              Course suggestions, partnerships, press, or just a quick thanks —
              the inbox is open.
            </p>

            <ul className="mt-10 space-y-4 max-w-md">
              {channels.map((c) => (
                <li
                  key={c.k}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/8 dark:ring-white/10"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] font-jakarta font-semibold text-ink-950/55 dark:text-cream/55">
                    {c.k}
                  </span>
                  <span className="font-fraunces text-base text-ink-950 dark:text-cream">
                    {c.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 animate-fade-up delay-1">
            <form
              onSubmit={onFormSubmit}
              autoComplete="off"
              noValidate
              className="relative bg-white dark:bg-white/[0.04] backdrop-blur-xl rounded-3xl ring-1 ring-ink-950/10 dark:ring-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)] p-7 md:p-10"
            >
              <h2 className="font-fraunces text-2xl md:text-3xl font-light text-ink-950 dark:text-cream">
                Drop us a note
              </h2>
              <p className="font-jakarta text-sm text-ink-950/60 dark:text-cream/60 mt-1">
                We typically reply within one business day.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-7">
                <InputBox
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  onChange={handleInputChange}
                  value={userInput.name}
                />
                <InputBox
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  onChange={handleInputChange}
                  value={userInput.email}
                />
              </div>

              <div className="mt-4">
                <TextArea
                  label="Message"
                  name="message"
                  rows={5}
                  placeholder="Tell us what you're thinking…"
                  onChange={handleInputChange}
                  value={userInput.message}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group mt-6 inline-flex items-center justify-center gap-2 bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 px-6 py-3.5 rounded-full font-jakarta font-semibold transition hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              >
                {isLoading ? "Sending…" : "Send message"}
                {!isLoading && (
                  <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
