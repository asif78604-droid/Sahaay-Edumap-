import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import styles from "./CareerGuidance.module.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

export default function CareerGuidance() {
  const steps = [
    {
      num: "01",
      title: "Submit Inquiry",
      desc: "Complete our quick details check to supply your current academic scorecards and target career preferences.",
    },
    {
      num: "02",
      title: "Meet Your Counselor",
      desc: "Attend a detailed physical/virtual evaluation meeting built to understand your psychological learning strengths.",
    },
    {
      num: "03",
      title: "Start Your Journey",
      desc: "Unlock targeted counseling files and follow your elite competitive entrance coaching under senior guides.",
    },
  ];

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
          Career <span className="italic-highlight">Guidance</span>
        </h1>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Career Guidance</span>
        </div>
      </section>

      {/* 2. Four Services Glass Grid */}
      <section className={styles.glassCardsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="section-label">Tailored Counseling</span>
            <h2>Our Specialized <span className="italic-highlight">Advisory Services</span></h2>
            <div className="gold-line" />
          </div>

          <div className={styles.grid}>
            {services.map((item) => (
              <div key={item.id} className={`glass-card ${styles.customGlassCard}`} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <i className={`${item.icon} ${styles.glassIcon}`} />
                  <span className={styles.serviceLabel}>Advisory</span>
                </div>
                <h3 className={styles.glassCardTitle}>{item.title}</h3>
                <p className={styles.glassCardText}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Three Step How It Works Connector */}
      <section className={styles.howItWorksSection}>
        <div className="container" style={{ position: "relative" }}>
          <div className="section-header">
            <span className="section-label">Counseling Flow</span>
            <h2>How It <span className="italic-highlight">Works</span></h2>
            <div className="gold-line" />
          </div>

          <div className={styles.stepsContainer}>
            {/* Center connector line on Desktop */}
            <div className={styles.connectingLine} />

            {steps.map((step) => (
              <div key={step.num} className={styles.stepNode}>
                <div className={styles.numberCircle}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Gold Banner */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaWrapper}`}>
          <h2 className={styles.ctaTitle}>
            Empower Your Professional <span className="italic-highlight" style={{ color: "var(--navy-dark)" }}>Academic Future</span>
          </h2>
          <p className={styles.ctaText}>
            Our professional counselors are waiting. Reserve your psychometric profiling evaluation today.
          </p>
          <Link to="/admissions" className={`btn-primary ${styles.ctaBtn}`}>
            Register Counseling Slot
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
