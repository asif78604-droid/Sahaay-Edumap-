import { useInView } from "../../hooks/useInView";
import { useCountUp } from "../../hooks/useCountUp";
import styles from "./StatsBar.module.css";

export default function StatsBar() {
  // Use inView hook on the main wrapper
  const [ref, inView] = useInView(0.15);

  const studentsCount = useCountUp(500, 2000, inView);
  const coursesCount = useCountUp(30, 2000, inView);
  const yearsCount = useCountUp(5, 2000, inView);
  const successCount = useCountUp(95, 2000, inView);

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.statItem}>
          <div className={styles.numberText}>{studentsCount}+</div>
          <div className={styles.labelText}>Active Students</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.numberText}>{coursesCount}+</div>
          <div className={styles.labelText}>Modern Courses</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.numberText}>{yearsCount}+</div>
          <div className={styles.labelText}>Years of Excellence</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.numberText}>{successCount}%</div>
          <div className={styles.labelText}>Success Rate</div>
        </div>
      </div>
    </div>
  );
}
