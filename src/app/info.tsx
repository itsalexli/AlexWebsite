"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Info() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const smoothUpdateMousePosition = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    document.addEventListener("mousemove", smoothUpdateMousePosition);

    return () => {
      document.removeEventListener("mousemove", smoothUpdateMousePosition);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClient]);

  const handleExperienceEnter = (index: number) => {
    setHoveredExperience(index);
    setLogoVisible(true); // Show immediately
    // Dispatch event to start custom cursor transition
    document.dispatchEvent(
      new CustomEvent("experienceHover", {
        detail: { isHovering: true },
      })
    );
  };

  const handleExperienceLeave = () => {
    setLogoVisible(false);
    setHoveredExperience(null);
    // Dispatch event to show custom cursor
    document.dispatchEvent(
      new CustomEvent("experienceHover", {
        detail: { isHovering: false },
      })
    );
  };

  const experiences = [
    {
      company: "CIBC",
      role: "Software Engineer Intern",
      description:
        "Mobile engineering building automated money feature scaled for $6B+ in transaction volume (piloting for 2027).",
      date: "2025",
      logo: "/cibc.png",
    },
    {
      company: "Autumn",
      role: "Software Engineer Intern",
      description:
        "Fullstack engineering building RAG pipeline and scraper application using Typescript and Python for 1,200+ users.",
      date: "2025",
      logo: "/autumn.png",
    },
    {
      company: "WAI",
      role: "Software Engineer",
      description:
        "Designed and built university events landing pages with ReactJS, NodeJS, and MongoDB for 500+ users",
      date: "2024",
      logo: "/wta.png",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Company Logo Cursor - Only shows when hovering over experience cards */}
      {isClient && hoveredExperience !== null && logoVisible && (
        <div
          style={{
            position: "fixed",
            left: mousePosition.x - 45, // Center the 50px wide cursor
            top: mousePosition.y - 35, // Center the 50px tall cursor
            width: "50px",
            height: "50px",
            pointerEvents: "none",
            zIndex: 9999,
            backgroundColor: "#333333",
            borderRadius: "50%",
            border: "2px solid #7b9bff",
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
            borderRadius: "8px",
            width: "600px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            backgroundColor:
              hoveredExperience === index
                ? "rgba(176, 196, 255, 0.35)"
                : "transparent",
            transition: "background-color 0.3s ease",
            cursor: "none",
          }}
        >
          {/* Text Content */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "black",
                marginBottom: "4px",
                fontSize: "0.95rem",
              }}
            >
              {exp.company}
            </h3>
            <p
              style={{
                color: "black",
                marginBottom: "6px",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              {exp.role} | {exp.date}
            </p>
            <p
              style={{
                color: "rgba(0, 0, 0, 0.7)",
                marginBottom: "8px",
                lineHeight: "1.4",
                fontSize: "0.85rem",
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

// Helper components and functions
const dotStyle = (color: string) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: color,
});

const buttonStyle = (disabled: boolean) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "all 0.3s ease",
  opacity: disabled ? 0.5 : 1,
});

const handleButtonHover = (
  e: React.MouseEvent<HTMLButtonElement>,
  disabled: boolean
) => {
  if (!disabled) {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 255, 255, 0.2)";
  }
};

const handleButtonLeave = (
  e: React.MouseEvent<HTMLButtonElement>,
  disabled: boolean
) => {
  if (!disabled) {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }
};
