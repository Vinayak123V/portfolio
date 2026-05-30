import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CardStack } from "./ui/card-stack";

// Tech stack showcase items for CardStack - Individual technology cards with official logos
const techStackItems = [
  {
    id: 1,
    title: "HTML",
    description: "HyperText Markup Language - Structure of the Web",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    id: 2,
    title: "CSS",
    description: "Cascading Style Sheets - Styling & Design",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    id: 3,
    title: "JavaScript",
    description: "Dynamic Programming Language for Web",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    id: 4,
    title: "Python",
    description: "Versatile High-Level Programming Language",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    href: "https://www.python.org/",
  },
  {
    id: 5,
    title: "Java",
    description: "Object-Oriented Enterprise Programming",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    href: "https://www.java.com/",
  },
  {
    id: 6,
    title: "C Programming",
    description: "Foundation of System Programming",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    href: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    id: 7,
    title: "C++",
    description: "High-Performance Object-Oriented Language",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    href: "https://isocpp.org/",
  },
  {
    id: 8,
    title: "PHP",
    description: "Server-Side Scripting Language",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    href: "https://www.php.net/",
  },
  {
    id: 9,
    title: "SQL",
    description: "Structured Query Language for Databases",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    href: "https://www.w3schools.com/sql/",
  },
  {
    id: 10,
    title: "MySQL",
    description: "Popular Open-Source Relational Database",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
    href: "https://www.mysql.com/",
  },
  {
    id: 11,
    title: "Relational Databases",
    description: "Structured Data Management Systems",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    href: "https://en.wikipedia.org/wiki/Relational_database",
  },
  {
    id: 12,
    title: "XAMPP",
    description: "Local Development Server Environment",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
    href: "https://www.apachefriends.org/",
  },
  {
    id: 13,
    title: "Visual Studio",
    description: "Integrated Development Environment",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
    href: "https://visualstudio.microsoft.com/",
  },
  {
    id: 14,
    title: "Jupyter Notebook",
    description: "Interactive Computing & Data Science",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg",
    href: "https://jupyter.org/",
  },
  {
    id: 15,
    title: "Turbo C",
    description: "Classic C/C++ Compiler & IDE",
    imageSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-line.svg",
    href: "https://en.wikipedia.org/wiki/Turbo_C",
  },
  {
    id: 16,
    title: "Microsoft Word",
    description: "Document Processing & Creation",
    imageSrc: "https://img.icons8.com/color/480/microsoft-word-2019--v2.png",
    href: "https://www.microsoft.com/en-us/microsoft-365/word",
  },
  {
    id: 17,
    title: "Microsoft PowerPoint",
    description: "Presentation Design & Delivery",
    imageSrc: "https://img.icons8.com/color/480/microsoft-powerpoint-2019--v1.png",
    href: "https://www.microsoft.com/en-us/microsoft-365/powerpoint",
  },
  {
    id: 18,
    title: "Microsoft Excel",
    description: "Spreadsheet Analysis & Data Management",
    imageSrc: "https://img.icons8.com/color/480/microsoft-excel-2019--v1.png",
    href: "https://www.microsoft.com/en-us/microsoft-365/excel",
  },
];

export default function Skills3D() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} id="about" className="relative min-h-screen py-24 flex flex-col items-center justify-center bg-transparent overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="z-10 text-center mb-16"
      >
        <h2 className="text-5xl lg:text-7xl font-display font-bold tracking-tight">
          Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00d2d3]">Arsenal</span>
        </h2>
        <p className="mt-4 text-foreground/60 text-lg">
          Swipe or click to explore the technologies I work with
        </p>
      </motion.div>

      {/* Tech Stack Showcase with CardStack */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto px-4 z-10"
      >
        <CardStack
          items={techStackItems}
          initialIndex={0}
          autoAdvance
          intervalMs={2000}
          pauseOnHover={false}
          showDots
          cardWidth={480}
          cardHeight={300}
          maxVisible={7}
          overlap={0.5}
          spreadDeg={45}
        />
      </motion.div>
    </section>
  );
}
