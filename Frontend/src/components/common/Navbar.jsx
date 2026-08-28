import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Work", path: "/work" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* =========================
          NAVBAR
      ========================== */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-[100]
          transition-all duration-500
          ${isScrolled ? "py-3 sm:py-3.5" : "py-5 sm:py-6"}
        `}
      >
        <div
          className={`
            max-w-[1400px]
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            transition-all duration-500
          `}
        >
          <div
            className={`
              relative
              flex
              items-center
              justify-between
              h-14
              sm:h-15
              px-4
              sm:px-5
              rounded-full
              border
              transition-all
              duration-500
              ${
                isScrolled
                  ? "bg-[#0C0C0C]/85 border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
                  : "bg-black/20 border-white/5 backdrop-blur-md"
              }
            `}
          >
            {/* =========================
                LOGO
            ========================== */}
            <Link
              href="/"
              className="
                relative
                z-[110]
                flex
                items-center
                shrink-0
                group
              "
              aria-label="CoreCraft Home"
              data-entrance-nav
            >
              <img
                src="/logo.png"
                alt="CoreCraft"
                className="
                  h-8
                  sm:h-9
                  md:h-10
                  w-auto
                  object-contain
                  brightness-110
                  transition-transform
                  duration-500
                  group-hover:scale-[1.04]
                "
              />
            </Link>

            {/* =========================
                DESKTOP NAV
            ========================== */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    data-entrance-nav
                    href={link.path}
                    className={`
                      group
                      relative
                      flex
                      items-center
                      gap-1.5
                      font-dm
                      text-[10px]
                      lg:text-[11px]
                      uppercase
                      tracking-[0.18em]
                      transition-colors
                      duration-300
                      ${
                        isActive
                          ? "text-teal"
                          : "text-white/60 hover:text-white"
                      }
                    `}
                  >
                    <span>{link.name}</span>

                    <span
                      className={`
                        absolute
                        -bottom-2
                        left-0
                        h-px
                        bg-teal
                        transition-all
                        duration-300
                        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                      `}
                    />
                  </Link>
                );
              })}
            </div>

            {/* =========================
                DESKTOP CTA
            ========================== */}
            <Link
              href="/contact"
              data-entrance-nav
              data-magnetic
              className="
                hidden
                md:inline-flex
                items-center
                gap-2
                px-4
                lg:px-5
                py-2.5
                rounded-full
                border
                border-teal/70
                text-teal
                font-dm
                text-[10px]
                lg:text-[11px]
                font-medium
                uppercase
                tracking-[0.15em]
                transition-all
                duration-300
                hover:bg-teal
                hover:text-black
                hover:border-teal
                hover:shadow-[0_0_25px_rgba(0,168,150,0.2)]
              "
            >
              <span data-magnetic-text>Start a Project</span>
              <ArrowUpRight size={13} />
            </Link>

            {/* =========================
                MOBILE MENU BUTTON
            ========================== */}
            <button
              type="button"
              data-entrance-nav
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="
                md:hidden
                relative
                z-[110]
                flex
                items-center
                gap-2
                text-white
                font-dm
                text-[10px]
                uppercase
                tracking-[0.18em]
                px-3
                py-2
                rounded-full
                border
                border-white/10
                bg-white/5
                hover:bg-white/10
                transition-all
                duration-300
              "
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>

              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                    }}
                  >
                    <X size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                    }}
                  >
                    <Menu size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              fixed
              inset-0
              z-[90]
              bg-[#0C0C0C]
              overflow-hidden
              md:hidden
            "
          >
            {/* Background glow */}
            <div
              className="
                absolute
                top-[20%]
                left-1/2
                -translate-x-1/2
                w-[280px]
                h-[280px]
                rounded-full
                bg-teal/10
                blur-[120px]
                pointer-events-none
              "
            />

            {/* Menu content */}
            <div
              className="
                relative
                w-full
                h-full
                flex
                flex-col
                justify-center
                px-6
                sm:px-10
              "
            >
              {/* Small label */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                }}
                className="
                  absolute
                  top-24
                  left-6
                  sm:left-10
                  font-dm
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-white/30
                "
              >
                Navigation
              </motion.div>

              {/* Links */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {NAV_LINKS.map((link, index) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <motion.div
                      key={link.name}
                      initial={{
                        opacity: 0,
                        x: -30,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.15 + index * 0.07,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.path}
                        className={`
                          group
                          flex
                          items-baseline
                          gap-4
                          sm:gap-5
                          font-syne
                          text-[2.5rem]
                          sm:text-5xl
                          font-bold
                          uppercase
                          tracking-tight
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? "text-teal"
                              : "text-white hover:text-teal"
                          }
                        `}
                      >
                        <span
                          className="
                            font-dm
                            text-[9px]
                            sm:text-[10px]
                            tracking-widest
                            text-white/25
                            font-normal
                          "
                        >
                          0{index + 1}
                        </span>

                        <span>{link.name}</span>

                        {isActive && (
                          <span
                            className="
                              w-2
                              h-2
                              rounded-full
                              bg-teal
                              inline-block
                              mb-2
                            "
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.55,
                  duration: 0.4,
                }}
                className="mt-10"
              >
                <Link
                  href="/contact"
                    data-magnetic
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-6
                    py-3.5
                    rounded-full
                    bg-teal
                    text-black
                    font-dm
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    transition-all
                    duration-300
                    hover:bg-white
                  "
                >
                    <span data-magnetic-text>Start a Project</span>
                  <ArrowUpRight size={14} />
                </Link>
              </motion.div>

              {/* Bottom information */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.7,
                }}
                className="
                  absolute
                  bottom-8
                  left-6
                  right-6
                  sm:left-10
                  sm:right-10
                  flex
                  items-center
                  justify-between
                  font-dm
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-white/25
                "
              >
                <span>CoreCraft Agency</span>

                <span>Available for projects</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
