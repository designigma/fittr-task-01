import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Parallax } from "react-parallax";

const counters = [
  { label: "Clients", value: 120 },
  { label: "Projects", value: 75 },
  { label: "Awards", value: 15 },
];

const stackedImages = [
  "https://images.unsplash.com/photo-1744697307482-0f55e2e0c1b6",
  "https://images.unsplash.com/photo-1744697309700-5cf74449db0d",
];

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionRefs.current;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section) {
          const top = section.offsetTop;
          const bottom = top + section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            current = i;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <main className="scroll-smooth">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50 p-4 flex justify-center gap-6 bg-[#FFFFF0]">
        {["Home", "Showcase", "Stats", "Parallax"].map((label, i) => (
          <a
            key={label}
            href={`#section${i + 1}`}
            className={`transition-colors font-medium ${
              activeSection === i
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>

      <Parallax
        bgImage="https://images.unsplash.com/photo-1744697313491-354bb68daa54"
        strength={500}
        bgImageStyle={{ objectFit: "cover", width: "100%", height: "100%" }}
      >
        <section
          id="section1"
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          className="h-screen flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center justify-center mt-[30rem]"
          >
            <h1 className="text-3xl md:text-6xl font-bold text-[#FFFFF0]">
              Wellbeing Reimagined
            </h1>
            <h3 className="md:text-4xl text-[#FFFFF0] mt-[7px]">
              powered by data and innovation
            </h3>
          </motion.div>
        </section>
      </Parallax>

      <section
        id="section2"
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="h-screen flex items-center justify-center px-4 bg-[#FFFFF0]"
      >
        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-screen-md">
          {stackedImages.map((src, idx) => (
            <motion.img
              key={src}
              src={src}
              alt={`smart-ring ${idx + 1}`}
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 60, delay: idx * 0.3 }}
              viewport={{ once: false, amount: 0.4 }}
              className="rounded-xl shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
            />
          ))}
        </div>
      </section>

      <section
        id="section3"
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className="h-screen flex flex-col items-center justify-center gap-6"
      >
        {counters.map(({ label, value }) => (
          <Counter key={label} label={label} value={value} />
        ))}
      </section>

      {/* Attempted this section without using react parallax */}
      <section
        id="section4"
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="h-screen bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb")',
        }}
      >
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-4xl md:text-6xl font-bold">
            Parallax Section
          </h2>
        </div>
      </section>
    </main>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      const duration = 1000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          start = end;
        }
        setCount(Math.round(start));
      }, 16);
    }
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold text-blue-600">{count}</div>
      <div className="text-xl text-gray-700">{label}</div>
    </div>
  );
}
