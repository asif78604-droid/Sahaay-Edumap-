import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TestimonialSlider from "../components/TestimonialSlider/TestimonialSlider";
import StatsBar from "../components/StatsBar/StatsBar";
import styles from "./Testimonials.module.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

export default function Testimonials() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* 1. Page Hero Banner */}
      <section className={styles.heroBanner}>
        <h1 className={styles.title}>
          Student <span className="italic-highlight">Testimonials</span>
        </h1>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Testimonials</span>
        </div>
      </section>

      {/* 2. Full Testimonials Slider */}
      <TestimonialSlider />

      {/* 3. Stats Section Below slider */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-label">Performance Indicators</span>
            <h2>Our Numbers <span className="italic-highlight">Don't Lie</span></h2>
            <div className="gold-line" />
          </div>
        </div>
        <StatsBar />
      </section>
    </motion.div>
  );
}
