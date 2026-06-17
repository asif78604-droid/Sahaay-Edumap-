import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

interface ParticleData {
  id: number;
  top: string;
  left: string;
  size: string;
  color: string;
  duration: string;
  delay: string;
}

export default function Hero() {
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [typedText, setTypedText] = useState("");

  const phrases = [
    "JEE and NEET Coaching",
    "Career Counseling",
    "Skill Development",
    "Higher Education Guidance",
  ];

  // 1. Particle Generation
  useEffect(() => {
    const generated: ParticleData[] = [];
    const colors = ["var(--gold)", "var(--white)"];
    
    for (let i = 0; i < 25; i++) {
      const topNum = Math.random() * 100;
      const leftNum = Math.random() * 100;
      const sizeNum = Math.floor(Math.random() * 4) + 2; // 2px to 5px
      const colorRandom = colors[Math.floor(Math.random() * colors.length)];
      const durationRandom = (Math.random() * 15 + 15).toFixed(2); // 15s to 30s
      const delayRandom = (Math.random() * -10).toFixed(2); // Negative delay so particles start midway

      generated.push({
        id: i,
        top: `${topNum}%`,
        left: `${leftNum}%`,
        size: `${sizeNum}px`,
        color: colorRandom,
        duration: `${durationRandom}s`,
        delay: `${delayRandom}s`,
      });
    }
    setParticles(generated);
  }, []);

  // 2. Clear & Robust Typewriter Effect
  useEffect(() => {
    let timerId: any;
    let charIndex = 0;
    let isDeletingLocal = false;
    let currentPhraseIndex = 0;

    const tick = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (!isDeletingLocal) {
        charIndex++;
        setTypedText(currentPhrase.substring(0, charIndex));
        
        if (charIndex >= currentPhrase.length) {
          isDeletingLocal = true;
          timerId = setTimeout(tick, 1800); // Wait on complete phrase
          return;
        }
        timerId = setTimeout(tick, 100); // Speed for typing
      } else {
        charIndex--;
        setTypedText(currentPhrase.substring(0, charIndex));
        
        if (charIndex <= 0) {
          isDeletingLocal = false;
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
          timerId = setTimeout(tick, 400); // Pause before next phrase
          return;
        }
        timerId = setTimeout(tick, 50); // Speed for deleting
      }
    };

    tick();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background Floating Particles */}
      <div className={styles.particleContainer}>
        {particles.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: Math.random() * 0.1 + 0.2, // 20% to 30%
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className={`container ${styles.containerWrapper}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className={styles.tagline}>Expert Educational Coaching</span>
          
          <h1 className={styles.title}>
            Empowering Your <br />
            <span className={styles.italicHighlight}>Academic Journey</span>
          </h1>

          <div className={styles.typewriterRow}>
            <span>{typedText}</span>
            <span className={styles.cursor} />
          </div>

          <p className={styles.description}>
            We provide expert competitive coaching, world-class career pathways counseling, 
            and essential skill programs to transform talented minds into tomorrow's leaders.
          </p>

          <div className={styles.buttonRow}>
            <Link to="/courses" className={`btn-primary ${styles.heroBtn}`}>
              Explore Courses
            </Link>
            <Link to="/admissions" className={`btn-outline ${styles.heroBtn}`}>
              Apply Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
