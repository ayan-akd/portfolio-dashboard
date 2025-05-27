"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectCard from "../projects-components/ProjectsCard";
import { TProjectExtended } from "@/app/(dashboardLayout)/dashboard/projects/page";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<TProjectExtended[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/projects", {
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        const data = await res.json();
        data.data.reverse();
        setProjects(data.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-[400px] animate-pulse bg-muted rounded-lg"></div>
          ))}
        </div>
      </section>
    );
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0, x: -500 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="text-5xl mt-16 lg:mb-0 mb-5 font-bold md:text-start text-center"
        >
          Featured Projects
        </motion.h1>
        <p className="text-muted-foreground mt-2 lg:mb-0 mb-5 font-bold md:text-start text-center">Check out some of my best work</p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {projects.map((project) => (
          <motion.div key={project._id} variants={item}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Link href="/projects">
          <Button effect={"shine"} size="lg" variant="default">
            View All Projects
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
