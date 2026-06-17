import React, { useState } from "react";
import styles from "./ContactForm.module.css";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof ContactErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: ContactErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Your name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Your email address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please input a valid email address.";
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, "");
      if (cleanPhone.length < 10) {
        newErrors.phone = "Phone number must be at least 10 digits.";
      }
      if (/[^\d\s\-\+\(\)]/.test(formData.phone)) {
        newErrors.phone = "Phone number must contain numbers only.";
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a message.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrors((prev) => ({ ...prev, email: "Please input a valid email address." }));
        return; // Abort submission
      }
      setSubmitting(true);
      setSubmitError(null);
      try {
        const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/xvznnwgz"; // safe fallback
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            _to: "asiftan78604@gmail.com",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            course: "General Inquiry",
            qualification: "N/A",
            message: formData.message,
            _subject: `New Sahaay Edumap Contact Message - ${formData.name}`,
            _replyto: formData.email,
            autoresponder_message: `Thank you for contacting Sahaay Edumap. We have successfully received your inquiry regarding our academic coaching programs. Our admissions team is currently reviewing your eligibility criteria and profile details. A senior academic counselor will reach out to you within the next 24 hours to schedule your 1-on-1 counseling session. We appreciate your interest in trusting your future with Sahaay Edumap.`
          }),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          const data = await response.json().catch(() => ({}));
          setSubmitError(data.error || "The submission was not accepted by the form endpoint.");
        }
      } catch (err) {
        console.error("Formspree contact submission error:", err);
        setSubmitError("There was a connection issue. Please check your internet connection.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.successBox}>
          <i className={`fa-solid fa-envelope-circle-check ${styles.successIcon}`} />
          <h2 className={styles.successTitle}>Message Sent!</h2>
          <p className={styles.successText}>
            Thank you for contacting Sahaay Edumap. We have successfully received your inquiry regarding our academic coaching programs. Our admissions team is currently reviewing your eligibility criteria and profile details. A senior academic counselor will reach out to you within the next 24 hours to schedule your 1-on-1 counseling session. We appreciate your interest in trusting your future with Sahaay Edumap.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Send Us a Message</h2>
      <p className={styles.subtitle}>Have some general questions? Send them over and get immediate assistance.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact-name">Full Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        {/* Email Address */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact-email">Email Address *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact-phone">Phone Number *</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
            placeholder="9876543210 (Minimum 10 digits)"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>

        {/* Message */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="contact-message">Your Message *</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
            placeholder="How can we assist you with your professional educational goals?"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        </div>

        {/* Full-width Navy Submit Button */}
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? "Sending Message..." : "Send Message"}
        </button>
        {submitError && (
          <div style={{ color: "#e53e3e", fontSize: "0.875rem", fontWeight: 500, textAlign: "center", marginTop: "0.5rem" }}>
            {submitError}
          </div>
        )}
      </form>
    </div>
  );
}
