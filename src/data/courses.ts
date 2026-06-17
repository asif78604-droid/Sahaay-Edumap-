export interface Course {
  id: number;
  title: string;
  category: "competitive" | "skill" | "guidance" | "higher-education";
  icon: string;
  description: string;
  duration: string;
  eligibility: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "JEE and NEET Coaching",
    category: "competitive",
    icon: "fa-solid fa-flask-vial",
    description: "Rigorous academic coaching led by expert faculty with comprehensive study materials and real-time simulator mock exams.",
    duration: "1 or 2 Years Program",
    eligibility: "Class 11/12 Students & Repeaters"
  },
  {
    id: 2,
    title: "SSC and Banking Exams",
    category: "competitive",
    icon: "fa-solid fa-landmark",
    description: "Systematic preparation covering quantitative aptitude, reasoning, and General Awareness with weekly performance tracking.",
    duration: "6 Months Program",
    eligibility: "Any Graduate / Final Year Students"
  },
  {
    id: 3,
    title: "English Communication Skills",
    category: "skill",
    icon: "fa-solid fa-comments",
    description: "Polishing overall language proficiency, fluent spoken skills, public speaking confidence, and professional business English.",
    duration: "3 Months Certificate",
    eligibility: "Open to Students & Professionals"
  },
  {
    id: 4,
    title: "Career Counseling Program",
    category: "guidance",
    icon: "fa-solid fa-map-signs",
    description: "Scientific psychometric testing and individualized counselor mentorship sessions to discover your ideal educational pathways.",
    duration: "Custom Sessions",
    eligibility: "Class 8 to graduation students"
  },
  {
    id: 5,
    title: "College Admission Guidance",
    category: "higher-education",
    icon: "fa-solid fa-graduation-cap",
    description: "Complete advisory services covering university selection, documentation support, SOP drafting, and interview preparations.",
    duration: "End-to-End Counseling",
    eligibility: "Class 12 & Undergraduate Students"
  },
  {
    id: 6,
    title: "Personality and Leadership Development",
    category: "skill",
    icon: "fa-solid fa-chess-queen",
    description: "Nurturing modern soft skills, emotional EQ, team management capability, critical thinking, and impactful presentation styles.",
    duration: "2 Months Intensive",
    eligibility: "High School & College Students"
  }
];
