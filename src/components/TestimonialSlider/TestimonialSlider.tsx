import { useState, useEffect, useRef } from "react";
import { testimonials } from "../../data/testimonials";
import styles from "./TestimonialSlider.module.css";

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const playIntervalRef = useRef<any>(null);
  const length = testimonials.length;

  const startAutoPlay = () => {
    stopAutoPlay(); // safeguard
    playIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % length);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.section} id="testimonial-section">
      <div className="container">
        <div className={styles.titleWrapper}>
          <span className="section-label">Success Stories</span>
          <h2>Aspirant Appreciations</h2>
          <div className="gold-line" />
        </div>

        {/* Carousel Slider */}
        <div
          className={styles.sliderContainer}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* Previous Button */}
          <button
            className={`${styles.arrowBtn} ${styles.prevBtn}`}
            onClick={handlePrev}
            aria-label="Previous Testimonial"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          {/* Cards Stack */}
          <div className={styles.cardsWrapper}>
            {testimonials.map((test, index) => {
              // circular position calculation
              let transformStyle = "";
              let opacityStyle = 0;
              let zIndexVal = 1;
              let pointerEventsStyle: "auto" | "none" = "none";

              if (index === activeIndex) {
                transformStyle = "scale(1) translateX(0)";
                opacityStyle = 1;
                zIndexVal = 5;
                pointerEventsStyle = "auto";
              } else if (index === (activeIndex - 1 + length) % length) {
                transformStyle = "scale(0.9) translateX(-10%)";
                opacityStyle = 0.6;
                zIndexVal = 3;
                pointerEventsStyle = "none";
              } else if (index === (activeIndex + 1) % length) {
                transformStyle = "scale(0.9) translateX(10%)";
                opacityStyle = 0.6;
                zIndexVal = 3;
                pointerEventsStyle = "none";
              } else {
                transformStyle = "scale(0.8) translateX(0)";
                opacityStyle = 0;
                zIndexVal = 1;
                pointerEventsStyle = "none";
              }

              return (
                <div
                  key={test.id}
                  className={styles.slideCard}
                  style={{
                    transform: transformStyle,
                    opacity: opacityStyle,
                    zIndex: zIndexVal,
                    pointerEvents: pointerEventsStyle,
                  }}
                >
                  <div className={styles.headerInfo}>
                    <div className={styles.avatar}>{test.initials}</div>
                    <div className={styles.meta}>
                      <h4 className={styles.name}>{test.name}</h4>
                      <span className={styles.program}>{test.program}</span>
                    </div>
                  </div>

                  {/* Star Rating icons */}
                  <div className={styles.stars}>
                    {Array.from({ length: test.stars }).map((_, starIndex) => (
                      <i key={starIndex} className="fa-solid fa-star" />
                    ))}
                  </div>

                  <p className={styles.quoteText}>"{test.text}"</p>
                </div>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            className={`${styles.arrowBtn} ${styles.nextBtn}`}
            onClick={handleNext}
            aria-label="Next Testimonial"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>

        {/* Indicators Dots Row */}
        <div className={styles.dotsWrapper}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
