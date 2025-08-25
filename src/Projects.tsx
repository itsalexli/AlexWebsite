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
      image: "/project1.jpg", // You'll need to add these images
      link: "/projects/shadow",
    },
    {
      id: 2,
      title: "Vercel",
      year: "2025",
      description: "Building v0, the full-stack vibe coding platform",
      image: "/project2.jpg",
      link: "/projects/vercel",
    },
    {
      id: 3,
      title: "Health Analytics",
      year: "2024",
      description: "AI-powered health data visualization and insights platform",
      image: "/project3.jpg",
      link: "/projects/health-analytics",
    },
    {
      id: 4,
      title: "Music Visualizer",
      year: "2024",
      description: "Real-time audio visualization with WebGL and Three.js",
      image: "/project4.jpg",
      link: "/projects/music-visualizer",
    },
    {
      id: 5,
      title: "Task Manager",
      year: "2023",
      description: "Collaborative project management with real-time updates",
      image: "/project5.jpg",
      link: "/projects/task-manager",
    },
    {
      id: 6,
      title: "Portfolio Site",
      year: "2023",
      description:
        "Interactive portfolio with dynamic animations and fog effects",
      image: "/project6.jpg",
      link: "/projects/portfolio",
    },
  ];

  return (
    <div
      style={{
        padding: "60px 40px",
        maxWidth: "1400px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: "40px",
          height: "1200px",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => {
              // Will navigate to project page when implemented
              console.log(`Navigate to ${project.link}`);
            }}
            style={{
              position: "relative",
              backgroundColor: "rgba(26, 26, 26, 0.8)",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform:
                hoveredProject === index ? "translateY(-5px)" : "translateY(0)",
              boxShadow:
                hoveredProject === index
                  ? "0 20px 40px rgba(0, 0, 0, 0.3)"
                  : "0 5px 15px rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Project Image/Background */}
            <div
              style={{
                width: "100%",
                height: "60%",
                backgroundColor: "rgba(42, 42, 42, 0.6)",
                backgroundImage: `linear-gradient(135deg, rgba(42, 42, 42, 0.6) 0%, rgba(26, 26, 26, 0.6) 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Placeholder for actual project image */}
              <div
                style={{
                  width: "80%",
                  height: "80%",
                  backgroundColor: "#3a3a3a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                />
              </div>

              {/* Year badge */}
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: "500",
                }}
              >
                {project.year}
              </div>
            </div>

            {/* Project Info */}
            <div
              style={{
                padding: "20px",
                height: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "white",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginBottom: "8px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Hover indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "0.8rem",
                  }}
                >
                  View Project
                </span>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor:
                      hoveredProject === index
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(255, 255, 255, 0.1)",
                    transition: "background-color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "white", fontSize: "0.7rem" }}>→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
