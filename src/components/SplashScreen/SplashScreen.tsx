import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SplashScreen.module.css";

interface SplashScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 2.5 seconds total
    const duration = 2500;
    const intervalTime = 25; // 100 steps
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Call onComplete after the splash overlay finishes (adding extra buffer for exit transitions)
    const completionTimeout = setTimeout(() => {
      onComplete();
    }, duration + 300);

    return () => {
      clearInterval(timer);
      clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  // Letters of Sahaay
  const word1 = "Sahaay".split("");
  // Letters of Edumap
  const word2 = "Edumap".split("");

  // Container motion variant for stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className={styles.contentWrapper}>
        {/* Animated Text */}
        <motion.div
          className={styles.textContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {word1.map((char, index) => (
            <motion.span
              key={`w1-${index}`}
              className={styles.letter}
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
          {/* Space between words */}
          <span style={{ width: "0.25em" }} />
          {word2.map((char, index) => (
            <motion.span
              key={`w2-${index}`}
              className={`${styles.letter} ${styles.goldLetter}`}
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Sweeping Gold Line */}
        <motion.div
          className={styles.line}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
        />
        
        {/* Fill Counter Info */}
        <div className={styles.percentage}>
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${Math.min(progress, 100)}%`, transition: "width 0.025s linear" }}
        />
      </div>
    </motion.div>
  );
}
