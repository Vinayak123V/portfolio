import { motion } from "framer-motion";
import { FaAward, FaDownload } from "react-icons/fa";
import { useState } from "react";

export default function Certificate() {
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
      style={{
        padding: "100px 5%",
        background:
          "linear-gradient(135deg, #F6E4E1, #EAF6EF, #E1F0FB)",
        textAlign: "center"
      }}
    >
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "10px",
          color: "#111"
        }}
      >
        Certifications
      </h2>

      <div
        style={{
          width: "80px",
          height: "4px",
          background: "#2563EB",
          margin: "0 auto 60px",
          borderRadius: "2px"
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px"
        }}
      >
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "2px solid #3B82F6",
              borderRadius: "20px",
              padding: "40px 30px",
              backdropFilter: "blur(8px)",
              minHeight: "350px"
            }}
          >
            <FaAward
              size={50}
              color="#3B82F6"
              style={{ marginBottom: "20px" }}
            />

            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                marginBottom: "10px",
                color: "#111"
              }}
            >
              {cert.title}
            </h3>

            <p style={{ color: "#555", marginBottom: "30px" }}>
              {cert.org}
            </p>

            <button
              onClick={() => handleDownload(cert.file, index)}
              disabled={downloadingIndex === index}
              style={{
                padding: "15px",
                background: "#000",
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
              <FaDownload />
              {downloadingIndex === index
                ? `Downloading ${progress}%`
                : "View Certificate"}
            </button>

            {downloadingIndex === index && (
              <div
                style={{
                  marginTop: "15px",
                  height: "8px",
                  background: "#ddd",
                  borderRadius: "10px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: "#3B82F6",
                    transition: "width 0.2s"
                  }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
