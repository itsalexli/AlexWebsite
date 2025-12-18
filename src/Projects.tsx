"use client";

import { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Agely",
      year: "2025",
      description: "Virtual web agent for the elderly ($4,500 winner)",
      image: "/Agely.jpg",
      link: "https://devpost.com/software/agely",
    },

    {
      id: 2,
      title: "CIBC",
      year: "2025",
      description: "Building CIBC's mobile banking app with 9M+ users",
      image: "/CIBC3.jpg",
      link: "https://apps.apple.com/ca/app/cibc-mobile-banking/id351448953",
    },

    {
      id: 3,
      title: "Vibe Compose",
      year: "2025",
      description: "Open-source notation coding agent and interface",
      image: "/VibeCompose.jpg", // Using available images
      link: "https://github.com/itsalexli/vibecompoz",
    },
    {
      id: 4,
      title: "Autumn",
      year: "2024",
      description: "Fullstack product engineering for 600k VC-backed startup",
      image: "/autumnimage.jpg",
      link: "https://www.autumn.co/",
    },

    {
      id: 5,
      title: "SunLite",
      year: "2024",
      description: "Real-time trading platform for teens ",
      image: "/tradelite.jpg",
      link: "https://devpost.com/software/sunlight-eq78k5?_gl=1*guuck5*_gcl_au*MTkxODA5Njg5OS4xNzUwNjAxMjY5*_ga*MTg4MzUyMDk1Mi4xNzUwNjAxMjcx*_ga_0YHJK3Y10M*czE3NTYyMzMxNTUkbzI0JGcxJHQxNzU2MjMzMTY5JGo0NiRsMCRoMA..",
    },
  ];

  return (
    <div
      style={{
        padding: "0px 0px",
        maxWidth: "1500px",
        margin: "0 auto",
        fontFamily:
          '"Crimson Text", "Times New Roman", "Georgia", "Playfair Display", serif',
      }}
    >
      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: "30px",
          rowGap: "10px",
        }}
        className="projects-grid"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => {
              setHoveredProject(index);
              document.dispatchEvent(
                new CustomEvent("projectHover", {
                  detail: { isHovering: true },
                })
              );
            }}
            onMouseLeave={() => {
              setHoveredProject(null);
              document.dispatchEvent(
                new CustomEvent("projectHover", {
                  detail: { isHovering: false },
                })
              );
            }}
            onClick={() => {
              if (project.link.startsWith("http")) {
                // External link - open in new tab
                window.open(project.link, "_blank");
              } else {
                // Internal link - navigate normally
                window.location.href = project.link;
              }
            }}
            style={{
              backgroundColor: "transparent",
              borderRadius: "0px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "0px solid rgba(0, 0, 0, 0.05)",
              opacity: hoveredProject === index ? 0.7 : 1,
            }}
          >
            {/* Project Image - Full card */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                minHeight: "600px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  flex: 1,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "opacity 0.3s ease",
                  }}
                />
                {/* Vignette overlay - covering all edges */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    boxShadow: "inset 0 0 100px 40px rgba(0, 0, 0, 0.5)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Project Info */}
              <div
                style={{
                  padding: "10px 20px 40px 20px",
                  width: "100%",
                  textAlign: "left",
                }}
                className="project-info"
              >
                <p
                  style={{
                    fontSize: "1.4rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: "1.4",
                    margin: "0 0 6px 0",
                    fontWeight: "500",
                    textAlign: "left",
                  }}
                >
                  {project.description}
                </p>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "400",
                    color: "rgba(255, 255, 255, 0.5)",
                    margin: "0",
                    textAlign: "left",
                  }}
                >
                  {project.title || "Project"} • {project.year}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
