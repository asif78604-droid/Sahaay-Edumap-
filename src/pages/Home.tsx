import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import StatsBar from "../components/StatsBar/StatsBar";
import CourseCard from "../components/CourseCard/CourseCard";
import TestimonialSlider from "../components/TestimonialSlider/TestimonialSlider";

// Import core data
import { courses } from "../data/courses";
import { services } from "../data/services";

import styles from "./Home.module.css";

// Transition configuration for the entire page
const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

// Grid stagger animate configuration
const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  // First 3 courses for Home page preview
  const featuredCourses = courses.slice(0, 3);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={styles.homePage}
    >
      {/* 1. Hero Section (Includes floating particles & Typewriter) */}
      <Hero />

      {/* 2. Stats Bar Section */}
      <StatsBar />

      {/* 3. About Preview Section */}
      <section className={styles.aboutSection}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.aboutImageCol}>
            {/* Image Placeholder */}
            <div className={styles.imagePlaceholder} />
          </div>

          <div className={styles.aboutContentCol}>
            <span className="section-label">Who We Are</span>
            <h2 className={styles.aboutTitle}>
              Pioneers in <span className="italic-highlight">Structured Learning</span>
            </h2>
            <div
              className="gold-line"
              style={{ margin: "0.5rem 0 1.5rem 0", alignSelf: "flex-start" }}
            />
            
            <p className={styles.aboutText}>
              Sahaay Edumap is a premier professional educational coaching academy. Over the years, we have nurtured academic dreamers into peak industry achievers through a systemized pathway of academic training, scientific career diagnostics, and high-level skill programs.
            </p>
            <p className={styles.aboutTextMuted}>
              Our comprehensive methodology centers individual learning styles, offering high-level faculty support, robust mock testing simulations, and continuous tracking milestones to ensure no student lags behind.
            </p>

            <Link to="/about" className="btn-primary" style={{ marginTop: "1rem" }}>
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Courses Preview Section */}
      <section className={styles.coursesSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-label font-bold">Programs Overview</span>
            <h2>
              Top Recommended <span className="italic-highlight">Batches</span>
            </h2>
            <div className="gold-line" />
          </div>

          {/* Stagger grid items on scroll */}
          <motion.div
            className={styles.coursesGrid}
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {featuredCourses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>

          <div className={styles.viewMoreRow}>
            <Link to="/courses" className="btn-primary">
              View All Course Offerings
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Career Guidance Section */}
      <section className={styles.guidanceSection}>
        <div className="container">
          <div className={styles.guidanceHeader}>
            <span className="section-label">Future Advisory</span>
            <h2>
              Unlocking <span className="italic-highlight">New Pathways</span>
            </h2>
            <div className="gold-line" />
          </div>

          {/* Service items grid staggered on scroll */}
          <motion.div
            className={styles.guidanceGrid}
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className={styles.customGlassCard}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <i className={`${service.icon} ${styles.glassIcon}`} aria-hidden="true" />
                  <span className={styles.serviceLabel}>Sahaay Pro</span>
                </div>
                <h3 className={styles.glassTitle}>{service.title}</h3>
                <p className={styles.glassDesc}>{service.description}</p>
                <Link
                  to="/career-guidance"
                  style={{
                    color: "var(--gold)",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  Explore Advisory <i className="fa-solid fa-arrow-right-long" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Testimonial Slider Section */}
      <TestimonialSlider />

      {/* 7. Bottom Gold CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaWrapper}`}>
          <h2 className={styles.ctaTitle}>
            Ready to Scale Your <span className="italic-highlight" style={{ color: "var(--navy-dark)" }}>Academic Pathway</span>?
          </h2>
          <p className={styles.ctaText}>
            Admissions are open for our upcoming premium batches. Register your counselor call today.
          </p>
          <Link to="/admissions" className={`btn-primary ${styles.ctaBtn}`}>
            Proceed with Admissions
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
