import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CourseCard from "../components/CourseCard/CourseCard";
import { courses } from "../data/courses";
import styles from "./Courses.module.css";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const pageTransition = {
  duration: 0.45,
  ease: "easeInOut",
};

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRowRef = useRef<HTMLDivElement>(null);

  const filters = [
    { title: "All Programs", value: "all" },
    { title: "Competitive Exams", value: "competitive" },
    { title: "Skill Development", value: "skill" },
    { title: "Higher Education", value: "higher-education" },
    { title: "Advisory/Guidance", value: "guidance" },
  ];

  // Recalculate slide indicators based on active button elements
  useEffect(() => {
    const recalibrateIndicator = () => {
      const activeElement = tabsRowRef.current?.querySelector(
        `[data-category="${activeFilter}"]`
      ) as HTMLButtonElement | null;

      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        });
      }
    };

    recalibrateIndicator();
    // Re-check after small timeout to ensure fonts and layout finish rendering
    const timer = setTimeout(recalibrateIndicator, 50);

    window.addEventListener("resize", recalibrateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", recalibrateIndicator);
    };
  }, [activeFilter]);

  // Filter computation
  const filteredCourses =
    activeFilter === "all"
      ? courses
      : courses.filter((course) => course.category === activeFilter);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <h1 className={styles.title}>
          Academic <span className="italic-highlight">Programs</span>
        </h1>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Courses</span>
        </div>
      </section>

      {/* Slide Underline Filtering Nav Row */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.tabsRow} ref={tabsRowRef}>
            {filters.map((f) => (
              <button
                key={f.value}
                data-category={f.value}
                className={`${styles.tabBtn} ${
                  activeFilter === f.value ? styles.activeTabBtn : ""
                }`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.title}
              </button>
            ))}

            {/* Absolute indicator element */}
            <div
              className={styles.activeIndicator}
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Batches Grid Section */}
      <section className={styles.coursesSection}>
        <div className="container">
          <AnimatePresence mode="popLayout">
            <motion.div layout className={styles.grid}>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
