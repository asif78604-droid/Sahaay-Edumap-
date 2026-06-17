export interface Testimonial {
  id: number;
  name: string;
  initials: string;
  program: string;
  text: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aarav Sharma",
    initials: "AS",
    program: "JEE Coaching",
    text: "Sahaay Edumap completely changed my preparation technique for JEE. The weekly simulator tests and one-on-one doubt clearing sessions with top-tier faculty kept me motivated. I highly recommend their structured curriculum as the key to my high percentile.",
    stars: 5
  },
  {
    id: 2,
    name: "Priya Patel",
    initials: "PP",
    program: "Career Counseling Program",
    text: "I was extremely confused between Computer Science and Humanities. The psychometric evaluation followed by thorough career guidance sessions gave me absolute clarity. I am now pursuing my dream course with full confidence and joy.",
    stars: 5
  },
  {
    id: 3,
    name: "Rohan Das",
    initials: "RD",
    program: "English Communication Skills",
    text: "My public speaking anxiety was a huge hurdle in my campus job interviews. The intensive skill program at Sahaay focused on interactive mock presentations, group discussions, and confidence-building. It completely unlocked my inner potential.",
    stars: 5
  },
  {
    id: 4,
    name: "Ananya Iyer",
    initials: "AI",
    program: "College Admission Guidance",
    text: "The application process for top universities seemed so overwhelming to navigate. The professional consultants at Sahaay Edumap guided me at every step from resume building to my statement of purpose. It was an extremely personalized premium experience.",
    stars: 5
  }
];
