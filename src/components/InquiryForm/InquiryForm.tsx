import React, { useState } from "react";
import { courses } from "../../data/courses";
import styles from "./InquiryForm.module.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  qualification: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
  qualification?: string;
  message?: string;
}

export default function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    course: "",
    qualification: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for that field on user typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
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

    if (!formData.course) {
      newErrors.course = "Please select a course program.";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Please select your qualification.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
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
            course: formData.course,
            qualification: formData.qualification,
            message: formData.message,
            _subject: `New Sahaay Edumap Admission Inquiry - ${formData.name}`,
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
        console.error("Formspree submission error:", err);
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
          <i className={`fa-solid fa-circle-check ${styles.successIcon}`} />
          <h2 className={styles.successTitle}>Inquiry Sent Successfully!</h2>
          <p className={styles.successText}>
            Thank you for contacting Sahaay Edumap. We have successfully received your inquiry regarding our academic coaching programs. Our admissions team is currently reviewing your eligibility criteria and profile details. A senior academic counselor will reach out to you within the next 24 hours to schedule your 1-on-1 counseling session. We appreciate your interest in trusting your future with Sahaay Edumap.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Quick Admission Inquiry</h2>
      <p className={styles.subtitle}>Fill in your details below and secure your counselor slot today.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="inquiry-name">Student Full Name *</label>
          <input
            id="inquiry-name"
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
          <label className={styles.label} htmlFor="inquiry-email">Email Address *</label>
          <input
            id="inquiry-email"
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
          <label className={styles.label} htmlFor="inquiry-phone">Phone Number *</label>
          <input
            id="inquiry-phone"
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

        {/* Dynamic Courses Selection */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="inquiry-course">Select Academic Course *</label>
          <select
            id="inquiry-course"
            name="course"
            className={`${styles.select} ${errors.course ? styles.inputError : ""}`}
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a Program --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
          {errors.course && <span className={styles.errorText}>{errors.course}</span>}
        </div>

        {/* Qualification Selection */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="inquiry-qualification">Highest Qualification *</label>
          <select
            id="inquiry-qualification"
            name="qualification"
            className={`${styles.select} ${errors.qualification ? styles.inputError : ""}`}
            value={formData.qualification}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose a Option --</option>
            <option value="10th Pass">10th Pass</option>
            <option value="12th Pass">12th Pass</option>
            <option value="Graduate">Graduate</option>
            <option value="Other">Other</option>
          </select>
          {errors.qualification && <span className={styles.errorText}>{errors.qualification}</span>}
        </div>

        {/* Inquiry Message */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="inquiry-message">Inquiry Details *</label>
          <textarea
            id="inquiry-message"
            name="message"
            rows={4}
            className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
            placeholder="Describe your academic targets and any specific queries"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <span className={styles.errorText}>{errors.message}</span>}
        </div>

        {/* Full-width Navy Submit Button */}
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting ? "Submitting Inquiry..." : "Submit Admissions Inquiry"}
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
