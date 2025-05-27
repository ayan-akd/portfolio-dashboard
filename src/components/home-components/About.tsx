"use client";
import { motion } from "framer-motion";
import { FaCode, FaPalette, FaLayerGroup } from "react-icons/fa";
const services = [
  {
    id: 1,
    title: "Web Design",
    description:
      "As a web designer, I combine creativity and technical skills to craft visually appealing and user-friendly websites. I can convert any psd or Figma file into mobile or tab responsive web application.",
    icon: <FaPalette className="text-4xl text-pinky" />,
  },
  {
    id: 2,
    title: "Frontend Web Development",
    description:
      "As a frontend web developer, I specialize in building robust and interactive websites that seamlessly integrate functionality and aesthetics.",
    icon: <FaCode className="text-4xl text-pinky" />,
  },
  {
    id: 3,
    title: "Full Stack Development",
    description:
      "Along with the Frontend I am skilled in Node JS, Express, JWT. Proficient in implementing Mongo DB database. More than 1 year of experience with Full Stack development.",
    icon: <FaLayerGroup className="text-4xl text-pinky" />,
  },
];

export default function About() {
  const getAge = () => {
    const birthDate = new Date("2001-06-22");
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };
  return (
    <div className="overflow-hidden">
      {/* about section  */}
      <div>
        <motion.h1
          initial={{ opacity: 0, scale: 0, x: -500 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="text-5xl mt-16 lg:mb-0 mb-5 font-bold md:text-start text-center"
        >
          About Me
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
        <motion.p
          initial={{ opacity: 0, scale: 0, x: -500 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className=" md:text-start text-center"
        >
          I&apos;m passionate about developing web applications that meet
          technical requirements and deliver delightful user experiences.
          Proficient in HTML, CSS, React.js, Next.js, Redux, MongoDB, Mongoose,
          Tailwind CSS, Firebase Authentication, NextAuth, and JWT. Experienced
          in writing clean and maintainable code, working in a collaborative
          environment, and agile methodologies. Committed to staying up-to-date
          with the latest developments and best practices in the field.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 500 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.5 }}
          className="space-y-2 mb-5"
        >
          <h3>Name: Ayan Kumar Das</h3>
          <hr />
          <h3>
            Email:{" "}
            <a className="text-blue-400" href="mailto:ayankumar.akd@gmail.com">
              ayankumar.akd@gmail.com
            </a>
          </h3>
          <hr />
          <h3>Age: {getAge()}</h3>
          <hr />
          <h3>Education:</h3>
          <h3>
            {" "}
            B.Sc in Computer Science and Engineering (CSE) (2020-Present)
            <br />
            Rangpur Engineering College, Rangpur
          </h3>
          <h3>SSC and HSC : Cantonment Public School and College, Rangpur</h3>
          <hr />
          <h3>Phone: (+88) 01686509495</h3>
          <hr />
          <h3>Location: Rangpur, Bangladesh</h3>
          <hr />
        </motion.div>
      </div>
      {/* services section  */}
      <div>
        <div>
          <motion.h1
            initial={{ opacity: 0, scale: 0, y: -200 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-5xl mt-16 mb-10 font-bold md:text-start text-center"
          >
            Services I provide
          </motion.h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              initial={{ opacity: 0, scale: 0, y: 200 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              key={service.id}
              className="p-8 rounded-2xl text-center bg-slate-200 dark:bg-black shadow-xl backdrop-blur-sm hover:shadow-pinky/20 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-2xl mb-4 font-bold text-pinky">
                {service.title}
              </h3>
              <p className="">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
