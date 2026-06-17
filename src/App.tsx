import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Import layout components
import CursorEffect from "./components/CursorEffect/CursorEffect";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CareerGuidance from "./pages/CareerGuidance";
import Testimonials from "./pages/Testimonials";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      {/* 1. Custom Cursor always mounted (except on non-hover touch devices managed by CSS) */}
      <CursorEffect />

      <AnimatePresence mode="wait">
        {isLoading ? (
          /* Loading Splash overlay on mount */
          <SplashScreen key="splash" onComplete={() => setIsLoading(false)} />
        ) : (
          /* Entire website application frames */
          <MotionContainer key="app-wrapper">
            <ScrollToTop />
            <Navbar />

            {/* Transition Animators on Route changes */}
            <AnimatePresence mode="wait">
              <div key={location.pathname} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/career-guidance" element={<CareerGuidance />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/admissions" element={<Admissions />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Fallback rewrite to Home */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </div>
            </AnimatePresence>

            <Footer />
          </MotionContainer>
        )}
      </AnimatePresence>
    </>
  );
}

// Minimalist native local wrapper div to prevent any syntax issues or unused code
function MotionContainer({ children }: { children: React.ReactNode; key?: React.Key }) {
  return <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>{children}</div>;
}
