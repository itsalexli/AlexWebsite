"use client";

import { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "",
      year: "2025",
      description:
        "Open-source background coding agent and interface (1000+ stars)",
      image: "/VibeCompose.jpg", // Using available images
      link: "https://github.com/itsalexli/vibecompoz",
    },
    {
      id: 2,
      title: "Vercel",
      year: "2025",
      description: "Building v0, the full-stack vibe coding platform",
      image: "/Agely.jpg",
      link: "https://devpost.com/software/agely",
    },
    {
      id: 3,
      title: "Health Analytics",
      year: "2024",
      description: "AI-powered health data visualization and insights platform",
      image: "/CIBC3.jpg",
      link: "https://apps.apple.com/ca/app/cibc-mobile-banking/id351448953",
    },
    {
      id: 4,
      title: "Music Visualizer",
      year: "2024",
      description: "Real-time audio visualization with WebGL and Three.js",
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
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "30px",
        }}
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
              backgroundColor: "white",
              borderRadius: "0px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              opacity: hoveredProject === index ? 0.7 : 1,
            }}
          >
            {/* Project Image - Full card */}
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                minHeight: "500px",
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
