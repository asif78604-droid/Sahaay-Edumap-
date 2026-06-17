import { Link } from "react-router-dom";
import { Course } from "../../data/courses";
import styles from "./CourseCard.module.css";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className={styles.card} id={`course-card-${course.id}`}>
      {/* Dark Navy Band with white centered icon */}
      <div className={styles.navyBand}>
        <i className={`${course.icon} ${styles.icon}`} aria-hidden="true" />
      </div>

      {/* Main card body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>

        {/* Badges container */}
        <div className={styles.tagContainer}>
          <span className={styles.tag}>
            <i className="fa-solid fa-clock" /> {course.duration}
          </span>
          <span className={styles.tag}>
            <i className="fa-solid fa-graduation-cap" /> {course.eligibility}
          </span>
        </div>

        {/* View details arrow Link */}
        <Link to="/admissions" className={styles.detailsLink}>
          <span>View Details</span>
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
