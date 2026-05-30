import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AwardIcon, DownloadIcon } from "./SvgIcons";
import { useState } from "react";

export default function Certificate() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [downloadingIndex, setDownloadingIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  const certificates = [
    {
      title: "Learathon -2022 Courses",
      org: "ICT Academy: Learathon",
      file: "/learathon.pdf"
    },
    {
      title: "Innovating with IoT – Process Design & Development",
      org: "IobiT Solutions, Bengaluru",
      file: "/iot.pdf"
    },
    {
      title: "Employability Skills Training",
      org: "Rubicon LifeSkills",
      file: "/certificates/employability.pdf"
    },
    {
      title: "Research Methodologies and IPR",
      org: "VTU",
      file: "/VTU.pdf"
    }
  ];

  const handleDownload = (file, index) => {
    setDownloadingIndex(index);
    setProgress(0);

    let value = 0;

    const interval = setInterval(() => {
      value += 10;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        const link = document.createElement("a");
        link.href = file;
        link.download = file.split("/").pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          setDownloadingIndex(null);
          setProgress(0);
        }, 500);
      }
    }, 150);
  };

  return (
    <section
      id="certificate"
      ref={ref}
      style={{
        padding: "100px 5%",
        background: "transparent",
        textAlign: "center"
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "10px",
          color: "var(--text-primary)"
        }}
      >
        Certifications
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: 80 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        style={{
          height: "4px",
          background: "var(--accent-primary)",
          margin: "0 auto 60px",
          borderRadius: "2px"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px"
        }}
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.4 + index * 0.12, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "var(--bg-card)",
              border: "var(--gradient-modal-border)",
              boxShadow: "var(--shadow-card)",
              borderRadius: "20px",
              padding: "40px 30px",
              backdropFilter: "blur(8px)",
              minHeight: "350px"
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ rotate: 10, scale: 1.15 }}
            >
              <AwardIcon
                size={50}
                color="var(--accent-secondary)"
                style={{ marginBottom: "20px" }}
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.12, duration: 0.4 }}
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                marginBottom: "10px",
                color: "var(--text-primary)"
              }}
            >
              {cert.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.12, duration: 0.4 }}
              style={{ color: "var(--text-secondary)", marginBottom: "30px" }}
            >
              {cert.org}
            </motion.p>

            <motion.button
              onClick={() => handleDownload(cert.file, index)}
              disabled={downloadingIndex === index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "15px",
                background: "var(--gradient-btn-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "40px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                opacity: downloadingIndex === index ? 0.7 : 1
              }}
            >
              <DownloadIcon />
              {downloadingIndex === index
                ? `Downloading ${progress}%`
                : "View Certificate"}
            </motion.button>

            {downloadingIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: "15px",
                  height: "8px",
                  background: "#ddd",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
              >
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "linear" }}
                  style={{
                    height: "100%",
                    background: "var(--gradient-progress)",
                    borderRadius: "10px"
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
