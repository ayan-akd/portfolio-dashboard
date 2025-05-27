"use client";
import html from "@/assets/icons/html.png";
import css from "@/assets/icons/css.png";
import js from "@/assets/icons/js.png";
import react from "@/assets/icons/react.png";
import tailwind from "@/assets/icons/tailwind.png";
import node from "@/assets/icons/nodejs-logo.png";
import express from "@/assets/icons/express.png";
import firebase from "@/assets/icons/firebase.png";
import jwt from "@/assets/icons/jwt.png";
import github from "@/assets/icons/github.png";
import figma from "@/assets/icons/figma.png";
import netlify from "@/assets/icons/netlify.png";
import vercel from "@/assets/icons/logo-vercel.svg";
import vscode from "@/assets/icons/vscode.png";
import mongodb from "@/assets/icons/mongodb.png";
import git from "@/assets/icons/git.png";
import mysql from "@/assets/icons/mysql.png";
import next from "@/assets/icons/next.svg";
import lott from "@/assets/lottie.json";
import Image from "next/image";
import dynamic from "next/dynamic";
import redux from "@/assets/icons/redux.svg";
import typescript from "@/assets/icons/typescript.svg";
import postgres from "@/assets/icons/postgres.svg";
import postman from "@/assets/icons/postman.svg";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false, // This will disable server-side rendering for Lottie
});
import { motion } from "framer-motion";
const skills = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", src: html },
      { name: "CSS", src: css },
      { name: "JavaScript", src: js },
      { name: "TypeScript", src: typescript },
      { name: "React.js", src: react },
      { name: "Redux", src: redux },
      { name: "Next.js", src: next },
      { name: "Tailwind CSS", src: tailwind },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", src: node },
      { name: "Express", src: express },
      { name: "Firebase", src: firebase },
      { name: "JWT Authentication", src: jwt },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "GitHub", src: github },
      { name: "Figma", src: figma },
      { name: "Netlify", src: netlify },
      { name: "Vercel", src: vercel },
      { name: "Git", src: git },
      { name: "Postman", src: postman },
      { name: "VS Code", src: vscode },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MongoDB", src: mongodb },
      { name: "MySQL", src: mysql },
      { name: "PostgreSQL", src: postgres },
    ],
  },
];

export default function Skills() {
  return (
    <div className=" pt-20">
      <div className="flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Title & Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0, x: -500 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75 }}
          className="lg:w-4/12 flex flex-col justify-center items-center"
        >
          <h1 className="md:text-start text-center text-5xl mt-16 pb-12 font-bold">
            My Skills
          </h1>
          <div className="lg:w-auto md:w-2/4">
            <Lottie animationData={lott} />
          </div>
        </motion.div>

        {/* Right Side - Skill Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 500 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75 }}
          className="lg:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center pb-12"
        >
          {skills.map((section, index) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, scale: 0, x: 500 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.75, delay: index * 0.25 }}
              className="bg-slate-200 dark:bg-black p-5 rounded-lg shadow-lg text-center h-96 flex flex-col items-center justify-center"
            >
              <h3 className="text-2xl mb-5 text-pinky font-bold">
                {section.category}
              </h3>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                {section.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    className="flex items-center justify-center flex-col gap-1"
                  >
                    <Image
                      className={`w-8 ${
                        skill.name === "Next.js" ||
                        skill.name === "GitHub" ||
                        skill.name === "Vercel"
                          ? "dark:invert"
                          : ""
                      }`}
                      src={skill.src}
                      alt={skill.name}
                      width={64}
                      height={64}
                    />
                    <p>{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
