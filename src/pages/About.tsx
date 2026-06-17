import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

const timelineContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const timelineItemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function About() {
  const features = [
    {
      id: 1,
      icon: "fa-solid fa-chalkboard-user",
      title: "Expert Faculty",
      desc: "Our teaching staff features IIT/IIM alumni and industry-recognized academic mentors with decades of combined training experience.",
    },
    {
      id: 2,
      icon: "fa-solid fa-bullseye",
      title: "Personalized Approach",
      desc: "We offer tailored classroom batches, dynamic doubt-clearing sessions, and targeted remedial courses for comprehensive pacing and review.",
    },
    {
      id: 3,
      icon: "fa-solid fa-square-poll-vertical",
      title: "Proven Results",
      desc: "Year over year, Sahaay aspirants secure high ranks, leading university enrollments, and professional skill placements with outstanding grades.",
    },
  ];

  const faculty = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      initials: "RK",
      role: "Senior Physics Faculty",
      bio: "An IIT Delhi doctoral alumnus with 15+ years of intensive JEE and NEET test preparation coaching expertise.",
    },
    {
      id: 2,
      name: "Prof. Siddharth Mehta",
      initials: "SM",
      role: "Head of Quantitative Aptitude",
      bio: "Fmr Bank Executive, mentoring government exam candidates on short-cut techniques and logical analytical speed.",
    },
    {
      id: 3,
      name: "Ms. Anjali Patel",
      initials: "AP",
      role: "English Mastery Coach",
      bio: "Certified IELTS trainer specializing in advanced verbal communications, accent polish, and interview presence coaching.",
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Founded Sahaay Edumap",
      desc: "Started with a core vision to build a premier academy bridging core academic preparations with scientific high-level career advisory.",
    },
    {
      year: "2020",
      title: "Reached 100 Students Milestone",
      desc: "Expanded batches swiftly as our competitive simulator testing frameworks and micro-group sizes gained high ranker recognition.",
    },
    {
      year: "2022",
      title: "Launched 30 Comprehensive Courses",
      desc: "Introduced tailored government test-preps, certified english fluency badges, and executive personality modules.",
    },
    {
      year: "2024",
      title: "Guided 500+ Qualified Aspirants",
      desc: "Established secondary mentorship wings helping students transition into top national tier institutions and executive jobs.",
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
          About Our <span className="italic-highlight">Institute</span>
        </h1>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>About Us</span>
        </div>
      </section>

      {/* 2. Overview Section */}
      <section className={styles.overviewSection}>
        <div className={`container ${styles.overviewGrid}`}>
          <div className={styles.imageCol}>
            <div className={styles.placeholderImage} />
          </div>

          <div className={styles.contentCol}>
            <span className="section-label">Our Foundation</span>
            <h2 className={styles.sectionHeadline}>Inspiring <span className="italic-highlight">Academic Excellence</span></h2>
            <div className="gold-line" style={{ margin: "0.5rem 0 1.5rem 0", alignSelf: "flex-start" }} />
            
            <p className={styles.overviewText}>
              Sahaay Edumap was established on the core philosophy that true education goes beyond textbooks. We believe every student holds unique prospective talents, and specialized guidance determines whether they transition into exceptional leaders or remain basic learners.
            </p>

            <div className={styles.missionBox}>
              <blockquote className={styles.missionQuote}>
                "Our mission is to nurture creative potential, establish robust logical methodologies inside candidates, and map scientific career roadmaps so no student feels left behind in a competitive global landscape."
              </blockquote>
              <span className={styles.missionLabel}>- Sahaay Academic Council Mission</span>
            </div>

            <p className={styles.overviewText}>
              Our vision is to transform the traditional coaching landscape. We replace generic, memory-based rote practice with deep conceptual modeling, rigorous progress metrics, real-time mock exams, and critical self-assessment modules.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Three Feature Cards Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Core Pillars</span>
            <h2>Why Students <span className="italic-highlight">Trust Sahaay</span></h2>
            <div className="gold-line" />
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feat) => (
              <div key={feat.id} className={styles.featureCard}>
                <div className={styles.featureIconCircle}>
                  <i className={feat.icon} />
                </div>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureDescription}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Faculty Display Section */}
      <section className={styles.facultySection}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Master Mentors</span>
            <h2>Meet Our <span className="italic-highlight">Expert Faculty</span></h2>
            <div className="gold-line" />
          </div>

          <div className={styles.facultyGrid}>
            {faculty.map((member) => (
              <div key={member.id} className={styles.facultyCard}>
                <div className={styles.avatarCircle}>{member.initials}</div>
                <h3 className={styles.facultyName}>{member.name}</h3>
                <span className={styles.facultyRole}>{member.role}</span>
                <p className={styles.facultyBio}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Achievements Timeline */}
      <section className={styles.timelineSection}>
        <div className="container">
          <div className={styles.timelineHeader}>
            <span className="section-label">Our Journey</span>
            <h2>Evolutionary <span className="italic-highlight">Milestones</span></h2>
            <div className="gold-line" />
          </div>

          <div className={styles.timelineContainer}>
            {/* Timeline Line element (centered) */}
            <div className={styles.timelineLine} />

            {/* Timelines list */}
            <motion.div
              variants={timelineContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {milestones.map((stone, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={stone.year}
                    className={`${styles.timelineItem} ${isLeft ? styles.leftItem : styles.rightItem}`}
                    variants={timelineItemVariants}
                  >
                    {/* Timeline Center Bullet Ring */}
                    <div className={styles.timelineDot} />

                    <div className={styles.timelineContent}>
                      <span className={styles.timelineYear}>{stone.year}</span>
                      <h3 className={styles.timelineTitle}>{stone.title}</h3>
                      <p className={styles.timelineDesc}>{stone.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
