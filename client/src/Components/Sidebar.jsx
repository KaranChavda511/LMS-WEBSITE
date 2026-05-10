import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaHome,
  FaUserCircle,
  FaPlus,
  FaList,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";

const closeDrawer = () => {
  const cb = document.getElementById("my-drawer");
  if (cb) cb.checked = false;
};

export default function Sidebar({ hideBar = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, role, data } = useSelector((s) => s.auth);

  const onLogout = async () => {
    closeDrawer();
    await dispatch(logout());
    navigate("/");
  };

  if (hideBar) return null;

  const initial = (data?.fullName || data?.email || "?")[0]?.toUpperCase();

  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/courses", label: "All courses", icon: <FaList /> },
    { to: "/about", label: "About us", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaPhone /> },
  ];

  return (
    <div className="drawer absolute left-0 top-0 z-50 w-fit">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" aria-label="Close menu" />
        <aside className="relative h-full min-h-screen w-[300px] max-w-[85vw] bg-cream dark:bg-ink-950 ring-1 ring-ink-950/10 dark:ring-white/10 shadow-2xl flex flex-col">
          {/* Decorative orb */}
          <div className="absolute -top-24 -right-20 h-56 w-56 rounded-full bg-yellow-400/25 blur-[80px] pointer-events-none" />

          {/* Header */}
          <div className="relative px-6 pt-6 pb-5 border-b border-ink-950/10 dark:border-white/10 flex items-center justify-between">
            <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-xl bg-ink-950 dark:bg-yellow-400 text-yellow-400 dark:text-ink-950 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M12 2 14.39 8.26 21 9 16.18 13.49 17.55 20 12 16.77 6.45 20l1.37-6.51L3 9l6.61-.74Z" />
                </svg>
              </span>
              <span className="font-fraunces text-2xl text-ink-950 dark:text-cream leading-none">
                lumen<span className="text-yellow-500">.</span>
              </span>
            </Link>
            <button
              onClick={closeDrawer}
              className="h-9 w-9 rounded-full ring-1 ring-ink-950/10 dark:ring-white/10 flex items-center justify-center text-ink-950 dark:text-cream hover:bg-ink-950/[0.04] dark:hover:bg-white/5"
              aria-label="Close"
            >
              <AiOutlineClose size={16} />
            </button>
          </div>

          {/* Profile snapshot */}
          {isLoggedIn && (
            <div className="relative mx-5 mt-5 mb-3 p-4 rounded-2xl bg-white dark:bg-white/[0.04] ring-1 ring-ink-950/8 dark:ring-white/10 flex items-center gap-3">
              <span className="h-11 w-11 rounded-full bg-yellow-400 text-ink-950 flex items-center justify-center font-fraunces text-lg font-semibold ring-1 ring-ink-950/10">
                {data?.avatar?.secure_url ? (
                  <img src={data.avatar.secure_url} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  initial
                )}
              </span>
              <div className="min-w-0">
                <div className="font-jakarta font-semibold text-sm text-ink-950 dark:text-cream truncate capitalize">
                  {data?.fullName || "Learner"}
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-950/55 dark:text-cream/55 mt-0.5">
                  {role || "Member"}
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="relative flex-1 overflow-y-auto px-3 py-2">
            <p className="px-3 mt-3 mb-2 text-[11px] uppercase tracking-[0.22em] text-ink-950/45 dark:text-cream/45 font-jakarta font-semibold">
              Browse
            </p>
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={closeDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-ink-950/80 dark:text-cream/80 hover:bg-ink-950/[0.05] dark:hover:bg-white/5 hover:text-ink-950 dark:hover:text-cream font-jakarta text-[15px] transition"
                  >
                    <span className="h-8 w-8 rounded-lg bg-ink-950/[0.04] dark:bg-white/5 flex items-center justify-center text-yellow-500 text-[13px]">
                      {l.icon}
                    </span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {role === "ADMIN" && (
              <>
                <p className="px-3 mt-6 mb-2 text-[11px] uppercase tracking-[0.22em] text-ink-950/45 dark:text-cream/45 font-jakarta font-semibold">
                  Admin
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/admin/dashboard"
                      onClick={closeDrawer}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-ink-950/80 dark:text-cream/80 hover:bg-ink-950/[0.05] dark:hover:bg-white/5 font-jakarta text-[15px]"
                    >
                      <span className="h-8 w-8 rounded-lg bg-ink-950/[0.04] dark:bg-white/5 flex items-center justify-center text-yellow-500 text-[13px]">
                        <FaUserCircle />
                      </span>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/course/create"
                      onClick={closeDrawer}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-ink-950/80 dark:text-cream/80 hover:bg-ink-950/[0.05] dark:hover:bg-white/5 font-jakarta text-[15px]"
                    >
                      <span className="h-8 w-8 rounded-lg bg-ink-950/[0.04] dark:bg-white/5 flex items-center justify-center text-yellow-500 text-[13px]">
                        <FaPlus />
                      </span>
                      Create course
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </nav>

          {/* Footer actions */}
          <div className="relative p-5 border-t border-ink-950/10 dark:border-white/10">
            {isLoggedIn ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/user/profile"
                  onClick={closeDrawer}
                  className="text-center px-3 py-2.5 rounded-full bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 font-jakarta font-semibold text-sm"
                >
                  Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="px-3 py-2.5 rounded-full ring-1 ring-ink-950/15 dark:ring-white/15 text-ink-950 dark:text-cream font-jakarta font-semibold text-sm hover:bg-ink-950/[0.04] dark:hover:bg-white/5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={closeDrawer}
                  className="text-center px-3 py-2.5 rounded-full ring-1 ring-ink-950/15 dark:ring-white/15 text-ink-950 dark:text-cream font-jakarta font-semibold text-sm"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={closeDrawer}
                  className="text-center px-3 py-2.5 rounded-full bg-ink-950 dark:bg-yellow-400 text-cream dark:text-ink-950 font-jakarta font-semibold text-sm"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
