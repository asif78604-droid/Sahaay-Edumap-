export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 1,
    icon: "fa-solid fa-map-signs",
    title: "Career Counseling",
    description: "Identify your true potential using advanced psychometric assessments. Our experts map personalized roadmaps for career achievement and satisfaction."
  },
  {
    id: 2,
    icon: "fa-solid fa-graduation-cap",
    title: "Higher Education Guidance",
    description: "Navigate complex college application processes with tailored expert advice. We assist with course selections, essay reviews, and dynamic university selections."
  },
  {
    id: 3,
    icon: "fa-solid fa-code-branch",
    title: "Skill Development Programs",
    description: "Equip yourself with practical public speaking, leadership, and analytical skillsets. We specialize in preparing modern pupils for elite practical professional environments."
  },
  {
    id: 4,
    icon: "fa-solid fa-people-carry-box",
    title: "Mentorship Services",
    description: "Foster continuous growth through reliable academic check-ins, focus building, and study design. Get mentored directly by proven professionals and alumni."
  }
];
