"use client";

import { useState } from "react";
import WorkHero from "../components/work/WorkHero";
import FilterBar from "../components/work/FilterBar";
import ProjectsGrid from "../components/work/ProjectsGrid";

const projects = [
  { id: 1, name: "Sooti Mehal", category: "E-commerce Platform", tag: "E-commerce Platform", desc: "A premium handcrafted home decor e-commerce website with modern design and seamless shopping experience.", image: "/project1.webp", w: 1906, h: 943, isFeatured: true, link: "https://sootimehal.com/", tags: ["React", "Node.js", "MongoDB", "Stripe"] },
  { id: 2, name: "Malik Enterprises", category: "Business Management", tag: "Business Platform", desc: "Custom business management application with inventory tracking and client management features.", image: "/project2.webp", w: 1903, h: 941, isFeatured: false, link: "https://malikenterprices.com/", tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"] },
  { id: 3, name: "Iqra Roadmap", category: "Education Platform", tag: "Learning Platform", desc: "Interactive education roadmap platform for students to track their learning journey.", image: "/project3.webp", w: 1905, h: 942, isFeatured: false, link: "https://6a19fe709f2390c597b29f72--stellar-dodol-606588.netlify.app/", tags: ["React", "Firebase", "Framer Motion", "GSAP"] },
  { id: 4, name: "Aurora", category: "Restaurant Website", tag: "Restaurant Website", desc: "Elegant restaurant website with online ordering and reservation system.", image: "/project4.webp", w: 1902, h: 948, isFeatured: true, link: "https://aurora-ten-delta.vercel.app/", tags: ["Next.js", "MongoDB", "Resend API", "Vercel"] },
  { id: 5, name: "Educore OS", category: "School Management", tag: "Learning platform", desc: "A modern school management system that simplifies student administration, attendance, academics, fee tracking, and parent-teacher communication through an intuitive dashboard.", image: "/project6.webp", w: 1909, h: 939, isFeatured: false, link: "https://educore-liard.vercel.app/", tags: ["React", "Node.js", "Express", "MySQL"] },
];

export default function Work() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter);
  return <div className="bg-black"><WorkHero /><FilterBar categories={categories} filter={filter} setFilter={setFilter} /><ProjectsGrid filteredProjects={filteredProjects} filter={filter} /></div>;
}
