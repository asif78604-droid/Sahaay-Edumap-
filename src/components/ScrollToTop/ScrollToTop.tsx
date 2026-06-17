import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ScrollToTop.module.css";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);

  // 1. Scroll reset on pathname transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Monitor scroll depth
  useEffect(() => {
    const handleScrollDistance = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScrollDistance);
    return () => {
      window.removeEventListener("scroll", handleScrollDistance);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          className={styles.btn}
          onClick={handleScrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.6 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          aria-label="Scroll back to top"
        >
          <i className="fa-solid fa-arrow-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
