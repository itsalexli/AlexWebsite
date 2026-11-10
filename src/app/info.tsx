"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeader from "../components/SectionHeader";

export default function Info() {
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  // True while the logo popup is shrinking away after the mouse leaves
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsClosing(false);
    setHoveredExperience(index);
    // Hide custom cursor component
    document.dispatchEvent(
      new CustomEvent("experienceHover", {
        detail: { isHovering: true },
      })
    );
  };

  const handleExperienceLeave = () => {
    // Let the logo shrink first, then hand back to the custom cursor
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      setHoveredExperience(null);
      setIsClosing(false);
      document.dispatchEvent(
        new CustomEvent("experienceHover", {
          detail: { isHovering: false },
        })
      );
    }, 150);
  };

  const experiences = [
    {
      company: "IBM",
      year: "2026",
      role: "AI Engineer Intern",
      description: "Digital product engineering for enterprise clients.",
      logo: "/ibm.png",
    },
    {
      company: "Turing",
      year: "2026",
      role: "Software Engineer Intern",
      description: "AI internal tooling development, QA & loss analysis.",
      logo: "/turinglogo.png",
    },
    {
      company: "CIBC",
      year: "2025",
      role: "Software Engineer Intern",
      description: "Automated money movement for high-volume transfers.",
      logo: "/cibclogo.png",
    },
  ];

  return (
    <div
      className="info-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        fontFamily: "var(--font-body)",
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
          className="cursor-follower"
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
            transformOrigin: "center",
            animation: isClosing
              ? "logoShrink 0.15s ease-in forwards"
              : "logoGrow 0.15s ease-out",
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

      <div
        style={{ width: "100%", maxWidth: "560px", margin: "0 auto" }}
      >
        <SectionHeader label="experience" />
      </div>

      {experiences.map((exp, index) => (
        <div
          key={index}
          onMouseEnter={() => handleExperienceEnter(index)}
          onMouseLeave={() => handleExperienceLeave()}
          style={{
            padding: "12px 4px",
            // Thin divider between entries (not above the first)
            borderTop:
              index > 0 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
            width: "100%",
            maxWidth: "560px",
            margin: "0 auto",
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
                color: "white",
                fontSize: "1rem",
                fontWeight: 500,
                minWidth: 0,
                paddingLeft: "20px",
              }}
            >
              {exp.company}
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.35)",
                  margin: "0 10px",
                }}
              >
                |
              </span>
              <span style={{ fontWeight: 400, color: "rgba(255, 255, 255, 0.75)" }}>
                {exp.role}
              </span>
            </span>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.55)",
                fontSize: "0.875rem",
                textAlign: "right",
                flex: 1,
                flexShrink: 0,
                paddingRight: "20px",
              }}
            >
              {exp.year}
            </span>
          </div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "4px",
              padding: "0 20px",
              fontFamily: "var(--font-body)",
              lineHeight: "1.5",
              fontSize: "0.875rem",
            }}
          >
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
}
