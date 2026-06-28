import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase/firebase";
import { menuData } from "../data/menuData";

import Hamburger from "./navbar/Hamburger";
import MobileMenu from "./navbar/MobileMenu";
import ThemeToggle from "./ThemeToggle";

import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // AUTH STATE
  useEffect(() => {
  const unsub = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser({
        ...currentUser,
        displayName:
          currentUser.displayName?.split(" ")[0] || "Student",
        photoURL:
          currentUser.photoURL ||
          "https://i.ibb.co/4pDNDk1/avatar.png",
      });
    } else {
      setUser(null);
    }
  });

  return () => unsub();
}, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        darkMode ? "bg-[#190b0b]" : "bg-orange-500"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={darkMode ? logoDark : logoLight}
            className="h-12 w-auto"
            alt="Chitro Academy"
          />

          {!user && (
  <span
    className="hidden md:block text-3xl font-bold text-white"
    style={{ fontFamily: "var(--font-heading)" }}
  >
    Chitro Academy
  </span>
)}
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 text-white md:flex">
          {menuData
  .filter((item) => {
    if (!user && (item.title === "Dashboard" || item.title === "Blog")) {
      return false;
    }
    return true;
  })
  .map((item, index) =>
            !item.children ? (
              <Link
                key={index}
                to={item.path}
                className="hover:text-yellow-300 transition"
              >
                {item.title}
              </Link>
            ) : (
              <div key={index} className="relative group">
                <button className="hover:text-yellow-300 transition">
                  {item.title}
                </button>

                <div className="absolute left-0 top-6 hidden group-hover:block bg-white text-black rounded-md shadow-lg min-w-[180px]">
                  {item.children.map((child, i) => (
                    <Link
                      key={i}
                      to={child.path}
                      className="block px-4 py-2 hover:bg-orange-100"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* AUTH SECTION (DESKTOP) */}
          <div className="hidden md:flex items-center gap-3">

            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-8 h-8 rounded-full"
                  alt="user"
                />

                <button
                  onClick={async () => {
                    await signOut(auth);
                    navigate("/login");
                  }}
                  className="text-white hover:text-yellow-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-xl border border-white px-5 py-2 text-white hover:bg-white hover:text-orange-500 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="rounded-xl bg-white px-5 py-2 font-semibold text-orange-500 hover:scale-105 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* MOBILE AUTH + MENU */}
          <div className="flex md:hidden items-center gap-2">

            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  className="w-8 h-8 rounded-full"
                  alt="user"
                />

                <button
                  onClick={async () => {
                    await signOut(auth);
                    navigate("/login");
                  }}
                  className="text-white text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-xl border border-white px-3 py-1 text-white text-sm"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="rounded-xl bg-white px-3 py-1 text-orange-500 text-sm font-semibold"
                >
                  Register
                </button>
              </>
            )}

            <Hamburger
              open={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </div>
        </div>

        {/* MOBILE MENU */}
        <MobileMenu
  open={mobileOpen}
  onClose={() => setMobileOpen(false)}
  user={user}
/>
      </div>
    </header>
  );
}