"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Info() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updateMousePosition);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, [isClient]);

  const handleExperienceEnter = (index: number) => {
    setHoveredExperience(index);
    // Hide custom cursor component
    document.dispatchEvent(
      new CustomEvent("experienceHover", {
        detail: { isHovering: true },
      })
    );
  };

  const handleExperienceLeave = () => {
    setHoveredExperience(null);
    // Show custom cursor component
    document.dispatchEvent(
      new CustomEvent("experienceHover", {
        detail: { isHovering: false },
      })
    );
  };

  const experiences = [
    {
      company: "Turing",
      role: "Software QA Engineer Intern",
      description: "AL/ML loss analysis and internal tooling development.",
      date: "2025",
      logo: "/turing.png",
    },
    {
      company: "CIBC",
      role: "Software Engineer Intern",
      description:
        "Automated money feature supporting high-volume transfers for 10M transactions.",
      date: "2025",
      logo: "/cibclogo.png",
    },
    {
      company: "Autumn",
      role: "Software Engineer Intern",
      description:
        "Full-stack eng building GCP-powered data pipelines for price listings.",
      date: "2025",
      logo: "/autumnlogo1.png",
    },
  ];

  return (
    <div
      className="info-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        fontFamily:
          '"Crimson Text", "Times New Roman", "Georgia", "Playfair Display", serif',
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0 0 40px 0",
        boxSizing: "border-box",
      }}
    >
      {/* Company Logo Cursor - Only shows when hovering over experience cards */}
      {isClient && hoveredExperience !== null && (
        <div
          style={{
            position: "fixed",
            left: mousePosition.x - 25,
            top: mousePosition.y - 25,
            width: "50px",
            height: "50px",
            pointerEvents: "none",
            zIndex: 9999,
            backgroundColor: "#ffffff",
            borderRadius: "0",
            border: "2px solid #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            padding: "4px",
          }}
        >
          <Image
            src={experiences[hoveredExperience].logo}
            alt={`${experiences[hoveredExperience].company} logo`}
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </div>
      )}

      {experiences.map((exp, index) => (
        <div
          key={index}
          onMouseEnter={() => handleExperienceEnter(index)}
          onMouseLeave={() => handleExperienceLeave()}
          style={{
            padding: "12px",
            borderRadius: "0px",
            width: "100%",
            maxWidth: "560px",
            margin: "0 auto",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            backgroundColor:
              hoveredExperience === index
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            transition: "background-color 0.3s ease",
            cursor: "none",
            boxSizing: "border-box",
          }}
          className="info-experience-card"
        >
          {/* Text Content */}
          <div
            style={{
              flex: 1,
              minWidth: 0,
              wordWrap: "break-word",
              overflow: "hidden",
            }}
          >
            <h3
              style={{
                color: "white",
                marginBottom: "4px",
                fontSize: "1.1rem",
              }}
            >
              {exp.company}
            </h3>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "6px",
                fontWeight: "500",
                fontSize: "1.05rem",
              }}
            >
              {exp.role} | {exp.date}
            </p>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "8px",
                lineHeight: "1.4",
                fontSize: "1rem",
                wordWrap: "break-word",
                whiteSpace: "normal",
                overflow: "hidden",
              }}
            >
              {exp.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
