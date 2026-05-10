import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { HiArrowUpRight } from "react-icons/hi2";
import { logout } from "../Redux/Slices/AuthSlice";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, role, data } = useSelector((s) => s.auth);

  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  const initial = (data?.fullName || data?.email || "?")[0]?.toUpperCase();

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 dark:bg-ink-950/80 backdrop-blur-xl border-b border-ink-950/8 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-[68px] md:h-[76px] flex items-center justify-between gap-6">
        {/* Brand */}
        <BrandLogo to="/" />


        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 font-jakarta text-sm font-medium">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-ink-950/[0.06] dark:bg-white/10 text-ink-950 dark:text-cream"
                      : "text-ink-950/70 dark:text-cream/70 hover:text-ink-950 dark:hover:text-cream hover:bg-ink-950/[0.04] dark:hover:bg-white/5"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setDarkMode((p) => !p)}
            aria-label="Toggle theme"
            className="h-10 w-10 rounded-full ring-1 ring-ink-950/10 dark:ring-white/10 flex items-center justify-center text-ink-950 dark:text-cream hover:bg-ink-950/[0.04] dark:hover:bg-white/5 transition"
          >
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/user/profile"
                className="h-10 w-10 rounded-full bg-yellow-400 text-ink-950 font-fraunces text-base font-semibold flex items-center justify-center ring-1 ring-ink-950/10 hover:scale-[1.04] transition"
                title={data?.fullName || data?.email}
              >
                {data?.avatar?.secure_url ? (
                  <img
                    src={data.avatar.secure_url}
                    alt=""
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  initial
                )}
              </Link>
              {role === "ADMIN" && (
                <Link
                  to="/admin/dashboard"
                  className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-jakarta font-semibold uppercase tracking-wider bg-ink-950/[0.06] dark:bg-white/10 text-ink-950 dark:text-cream"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={onLogout}
                className="text-sm font-jakarta font-medium text-ink-950/70 dark:text-cream/70 hover:text-ink-950 dark:hover:text-cream px-3 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-full font-jakarta text-sm font-medium text-ink-950/80 dark:text-cream/80 hover:text-ink-950 dark:hover:text-cream"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 font-jakarta text-sm font-semibold transition hover:scale-[1.03]"
              >
                Get started
                <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          )}

          {/* Mobile hamburger — toggles the same drawer in Sidebar.jsx */}
          <label
            htmlFor="my-drawer"
            className="md:hidden h-10 w-10 rounded-full ring-1 ring-ink-950/10 dark:ring-white/10 flex items-center justify-center text-ink-950 dark:text-cream cursor-pointer hover:bg-ink-950/[0.04] dark:hover:bg-white/5"
            aria-label="Open menu"
          >
            <FiMenu size={18} />
          </label>
        </div>
      </div>
    </nav>
  );
}
