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
      company: "IBM",
      role: "AI Engineer Intern",
      description: "Computer vision + ML, digital product engineering.",
      date: "2026",
      logo: "/ibm.png",
    },
    {
      company: "Turing",
      role: "Software Engineer Intern (QA)",
      description: "AI internal tooling development, QA & loss analysis.",
      date: "2026",
      logo: "/turing.png",
    },
    {
      company: "CIBC",
      role: "Software Engineer Intern",
      description: "Automated money movement supporting high-volume transfers.",
      date: "2025",
      logo: "/cibclogo.png",
    },
    {
      company: "Autumn",
      role: "Product Engineer Intern",
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
            width={
              experiences[hoveredExperience].company === "IBM" ? 32 : 40
            }
            height={
              experiences[hoveredExperience].company === "IBM" ? 32 : 40
            }
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
            padding: "14px 4px",
            width: "100%",
            maxWidth: "560px",
            margin: "0 auto",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor:
              hoveredExperience === index
                ? "rgba(255, 255, 255, 0.05)"
                : "transparent",
            transition: "background-color 0.3s ease",
            cursor: "none",
            boxSizing: "border-box",
          }}
          className="info-experience-card"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "16px",
            }}
          >
            <span
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "1rem",
                flexShrink: 0,
                width: "48px",
              }}
            >
              {exp.date}
            </span>
            <span
              style={{
                color: "white",
                fontSize: "1.1rem",
                flexShrink: 0,
              }}
            >
              {exp.company}
            </span>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "1rem",
                textAlign: "right",
                flex: 1,
              }}
            >
              {exp.role}
            </span>
          </div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "6px",
              marginLeft: "64px",
              lineHeight: "1.4",
              fontSize: "0.95rem",
            }}
          >
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
}
