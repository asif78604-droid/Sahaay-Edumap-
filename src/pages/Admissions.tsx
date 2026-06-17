import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InquiryForm from "../components/InquiryForm/InquiryForm";
import styles from "./Admissions.module.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

export default function Admissions() {
  const points = [
    {
      title: "Psychometric Evaluation",
      text: "Every counselor call initiates a thorough diagnostics test of learning profiles to tailor classroom batches.",
    },
    {
      title: "Interactive Demo Session",
      text: "Get free demo entries to actual live batches and experience our conceptual teaching methodology first-hand.",
    },
    {
      title: "Structured Batch Launch",
      text: "New batches launch every month with limited group cohorts (max 25 candidates per batch) for focus safety.",
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
          Institute <span className="italic-highlight">Admissions</span>
        </h1>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Admissions</span>
        </div>
      </section>

      {/* 2. Main Admissions Split Content */}
      <section className={styles.mainAdmissions}>
        <div className={`container ${styles.grid}`}>
          {/* Left Column (40% width) */}
          <div className={styles.leftCol}>
            <span className="section-label">Enrollment Kit</span>
            <h2 className={styles.sectionHeading}>Counselor <span className="italic-highlight">Booking</span></h2>
            <p className={styles.introText}>
              We welcome applications throughout the academic year. Follow a structured pathway of academic evaluations under top mentors and discover your genuine core potential.
            </p>

            {/* Bullet list with gold checks */}
            <div className={styles.bulletsList}>
              {points.map((pt, idx) => (
                <div key={idx} className={styles.bulletItem}>
                  <div className={styles.checkIconCircle}>
                    <i className="fa-solid fa-check" />
                  </div>
                  <div className={styles.bulletBody}>
                    <h3 className={styles.bulletTitle}>{pt.title}</h3>
                    <p className={styles.bulletText}>{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className={styles.colSeparator} />

            {/* Support details */}
            <div className={styles.contactBlock}>
              <h3 className={styles.contactTitle}>Admissions Helpdesk</h3>
              
              <div className={styles.contactRow}>
                <i className={`fa-solid fa-phone ${styles.bulletIcon}`} />
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>

              <div className={styles.contactRow}>
                <i className={`fa-solid fa-envelope ${styles.bulletIcon}`} />
                <a href="mailto:adm@sahaayedumap.com">adm@sahaayedumap.com</a>
              </div>

              <div className={styles.contactRow}>
                <i className={`fa-solid fa-clock ${styles.bulletIcon}`} />
                <span>Monday - Saturday (09:00 AM - 06:00 PM)</span>
              </div>
            </div>
          </div>

          {/* Right Column (60% width) */}
          <div className={styles.rightCol}>
            <InquiryForm />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
