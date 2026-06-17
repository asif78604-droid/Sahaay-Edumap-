import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm/ContactForm";
import styles from "./Contact.module.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

export default function Contact() {
  const details = [
    {
      icon: "fa-solid fa-location-dot",
      label: "Our Campus",
      value: "Sahaay Tower, Sector-V, Bidhannagar, Kolkata, India",
      link: null,
    },
    {
      icon: "fa-solid fa-phone",
      label: "Hotline Phone",
      value: "+91 98765 43210 / +91 33 2345 6789",
      link: "tel:+919876543210",
    },
    {
      icon: "fa-solid fa-envelope",
      label: "Electronic Support",
      value: "info@sahaayedumap.com / care@sahaayedumap.com",
      link: "mailto:info@sahaayedumap.com",
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
          Contact Our <span className="italic-highlight">Campus</span>
        </h1>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </div>
      </section>

      {/* 2. Three Columns Section (Info, Form, Map) */}
      <section className={styles.mainContact}>
        <div className={`container ${styles.grid}`}>
          {/* Column 1: Info Column */}
          <div className={styles.infoCol}>
            <div className={styles.infoBlockHeader}>
              <span className="section-label">Connect Today</span>
              <h2 className={styles.sectionHeading}>Get In <span className="italic-highlight">Touch</span></h2>
              <p className={styles.introText}>
                Have general questions regarding admission batches or counseling schedules? Reach out and we will respond within 24 hours.
              </p>
            </div>

            {/* Icons List */}
            <div className={styles.detailsList}>
              {details.map((item, idx) => (
                <div key={idx} className={styles.detailItem}>
                  <div className={styles.iconCircle}>
                    <i className={item.icon} aria-hidden="true" />
                  </div>
                  <div className={styles.detailBody}>
                    <span className={styles.itemLabel}>{item.label}</span>
                    <span className={styles.itemValue}>
                      {item.link ? (
                        <a href={item.link}>{item.value}</a>
                      ) : (
                        <span>{item.value}</span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social section inside info Column */}
            <div className={styles.socialSection}>
              <span className={styles.socialLabel}>Follow our handles</span>
              <div className={styles.socialRow}>
                <a href="https://facebook.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f" />
                </a>
                <a href="https://instagram.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fa-brands fa-instagram" />
                </a>
                <a href="https://linkedin.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in" />
                </a>
                <a href="https://youtube.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="fa-brands fa-youtube" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Controlled Form */}
          <div className={styles.formCol}>
            <ContactForm />
          </div>

          {/* Column 3: Google Maps Frame */}
          <div className={styles.mapsCol}>
            <iframe
              className={styles.mapIframe}
              title="Sahaay Edumap Sector V Campus Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1481075727937!2d88.4285145759364!3d22.5735313330366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275af02bc3bb5%3A0x63384f5068a735bc!2sSector%20V%2C%20Salt%20Lake%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
