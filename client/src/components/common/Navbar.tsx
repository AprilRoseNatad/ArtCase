import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import artcaseLogo from "@/assets/images/artcaseLogo.png";

export default function Navbar() {
  const [isDarkBg, setIsDarkBg] = useState(false);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const featuresSection = document.getElementById("features");
    if (!featuresSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkBg(entry.isIntersecting);
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    observer.observe(featuresSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 shadow-[0_2px_15px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors duration-300">
      <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo & Name */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left focus:outline-none"
        >
          <img
            src={artcaseLogo}
            alt="ArtCase Logo"
            className="h-8 w-auto object-contain"
          />
          <span
            className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
              isDarkBg ? "text-white" : "text-foreground"
            }`}
          >
            ArtCase
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href.replace("#", ""));
              }}
              className={`group relative py-1 transition-colors duration-300 ${
                isDarkBg
                  ? "text-white/90 hover:text-white"
                  : "text-foreground hover:text-indigo-600"
              }`}
            >
              {item.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 ease-out group-hover:w-full ${
                  isDarkBg
                    ? "bg-white"
                    : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Auth Action Buttons */}
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link
            to="/login"
            className={`px-5 py-2 font-semibold transition-all duration-200 hover:scale-105 ${
              isDarkBg
                ? "text-white/90 hover:text-white"
                : "text-foreground hover:text-indigo-600"
            }`}
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-5 py-2 font-semibold text-white shadow-md transition-all duration-100 hover:scale-105 hover:shadow-[0_0_25px_rgba(124,58,237,.35)]"
          >
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
            />
            <span className="relative">Sign Up</span>
          </Link>
        </div>
      </div>
    </header>
  );
}