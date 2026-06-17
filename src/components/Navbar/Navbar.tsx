import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Career Guidance", path: "/career-guidance" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Admissions", path: "/admissions" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolledHeader : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo */}
        <Link to="/" className={styles.logoLink} onClick={closeMobileMenu}>
          <span className={styles.logoSahaay}>Sahaay</span>
          <span className={styles.logoEdumap}>Edumap</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveLine"
                      className={styles.activeLine}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <Link to="/admissions" className={`btn-primary ${styles.ctaBtn}`}>
            Enroll Now
          </Link>
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          className={`${styles.hamburgerBtn} ${mobileOpen ? styles.hamburgerBtnActive : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className={`${styles.bar} ${styles.barOne}`} />
          <span className={`${styles.bar} ${styles.barTwo}`} />
          <span className={`${styles.bar} ${styles.barThree}`} />
        </button>
      </div>

      {/* Mobile Stencil Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/admissions"
              className="btn-primary"
              style={{ marginTop: "1rem" }}
              onClick={closeMobileMenu}
            >
              Enroll Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
