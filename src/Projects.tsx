"use client";

import { useState } from "react";
import Image from "next/image";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Shadow",
      year: "2025",
      description:
        "Open-source background coding agent and interface (1000+ stars)",
      image: "/agely.png", // Using available images
      link: "/projects/shadow",
    },
    {
      id: 2,
      title: "Vercel",
      year: "2025",
      description: "Building v0, the full-stack vibe coding platform",
      image: "/cibc.png",
      link: "/projects/vercel",
    },
    {
      id: 3,
      title: "Health Analytics",
      year: "2024",
      description: "AI-powered health data visualization and insights platform",
      image: "/autumn.png",
      link: "/projects/health-analytics",
    },
    {
      id: 4,
      title: "Music Visualizer",
      year: "2024",
      description: "Real-time audio visualization with WebGL and Three.js",
      image: "/wta.png",
      link: "/projects/music-visualizer",
    },
  ];

  return (
    <div
      style={{
        padding: "60px 40px",
        maxWidth: "1200px",
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
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => {
              console.log(`Navigate to ${project.link}`);
            }}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform:
                hoveredProject === index
                  ? "translateY(-8px) scale(1.02)"
                  : "translateY(0) scale(1)",
              boxShadow:
                hoveredProject === index
                  ? "0 20px 40px rgba(0, 0, 0, 0.15)"
                  : "0 4px 20px rgba(0, 0, 0, 0.08)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Project Image */}
            <div
              style={{
                width: "100%",
                height: "240px",
                backgroundColor: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={120}
                height={120}
                style={{
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                  transform:
                    hoveredProject === index ? "scale(1.1)" : "scale(1)",
                }}
              />

              {/* Year badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  letterSpacing: "0.5px",
                }}
              >
                {project.year}
              </div>
            </div>

            {/* Project Info */}
            <div
              style={{
                padding: "24px",
              }}
            >
              <h3
                style={{
                  color: "#1a1a1a",
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.3",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  color: "#666666",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                {project.description}
              </p>

              {/* Call to action */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: hoveredProject === index ? "#007AFF" : "#999999",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    transition: "color 0.3s ease",
                  }}
                >
                  View Project
                </span>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      hoveredProject === index
                        ? "#007AFF"
                        : "rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform:
                      hoveredProject === index
                        ? "translateX(4px)"
                        : "translateX(0)",
                  }}
                >
                  <span
                    style={{
                      color: hoveredProject === index ? "white" : "#666666",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      transition: "color 0.3s ease",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
