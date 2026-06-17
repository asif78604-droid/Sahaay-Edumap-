import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubsubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubsubscribed(true);
      setEmail("");
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Courses", path: "/courses" },
    { name: "Career Guidance", path: "/career-guidance" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Admissions", path: "/admissions" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Column 1: Brand & Socials */}
        <div className={styles.column}>
          <Link to="/" className={styles.brandLogo}>
            <span className={styles.logoSahaay}>Sahaay</span>
            <span className={styles.logoEdumap}>Edumap</span>
          </Link>
          <span className={styles.tagline}>Empowering Students, Shaping Futures</span>
          <p className={styles.description}>
            Sahaay Edumap is a professional educational institute committed to excellence. 
            We mentor students for high-competitive entrance examinations, assist in careers, and build practical modern soft skills.
          </p>
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

        {/* Column 2: Quick Links */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <ul className={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className={styles.linkItem}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Stay Informed</h3>
          <p className={styles.newsletterText}>
            Subscribe to our newsletter to receive academic tips, career roadmaps, and information on upcoming batches.
          </p>
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <div className={styles.newsletterInputWrapper}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className={`btn-primary ${styles.newsletterBtn}`}>
                Subscribe
              </button>
            </div>
            {subscribed && (
              <div className={styles.successMsg}>
                Thank you! You have successfully subscribed to our newsletter.
              </div>
            )}
          </form>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className="container">
        <p className={styles.copyright}>
          <span>&copy; {new Date().getFullYear()} Sahaay Edumap Institute. All Rights Reserved. Designed with absolute craftsmanship.</span>
          <Link to="/privacy-policy" className={styles.privacyLink}>
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
