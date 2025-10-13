"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectsShowcase() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Agely",
      description:
        "the Cursor + Midjourney for 3D modeling. Create beautiful 3D assets from your roughest sketches in seconds. 3M+ views, 1,600+ stars.",
      image: "agely.png",
      tags: [
        "Python",
        "FastAPI",
        "React",
        "Next.js",
        "Three.js",
        "TypeScript",
        "Google Cloud Platform",
      ],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 2,
      title: "Neural Canvas",
      description:
        "AI-powered digital art generator that transforms text prompts into stunning visual artwork. Built with advanced diffusion models and real-time rendering.",
      image:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop&crop=entropy&auto=format",
      tags: ["Python", "TensorFlow", "React", "Node.js", "WebGL"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 3,
      title: "CloudSync Pro",
      description:
        "Enterprise-grade file synchronization platform with real-time collaboration features. Handles 100TB+ of data across global infrastructure.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=entropy&auto=format",
      tags: ["Go", "Kubernetes", "React", "PostgreSQL", "AWS"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 4,
      title: "QuantumChat",
      description:
        "End-to-end encrypted messaging platform with quantum-resistant cryptography. Secure communication for the post-quantum era.",
      image:
        "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=600&fit=crop&crop=entropy&auto=format",
      tags: ["Rust", "WebAssembly", "React Native", "Cryptography"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 5,
      title: "DataFlow Studio",
      description:
        "Visual data pipeline builder for machine learning workflows. Drag-and-drop interface for complex data transformations and model training.",
      image:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=entropy&auto=format",
      tags: ["Python", "Apache Spark", "Vue.js", "D3.js", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
    {
      id: 6,
      title: "EcoTracker",
      description:
        "Sustainability analytics platform that helps companies track and reduce their carbon footprint. Real-time environmental impact monitoring.",
      image:
        "https://images.unsplash.com/photo-1569163139394-de44cb73ec2f?w=800&h=600&fit=crop&crop=entropy&auto=format",
      tags: ["TypeScript", "Next.js", "Prisma", "Chart.js", "Vercel"],
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        padding: "80px 60px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 80px auto",
          textAlign: "center",
        }}
      ></div>

      {/* Projects Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(550px, 1fr))",
          gap: "40px",
          justifyItems: "center",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              width: "100%",
              maxWidth: "550px",
              backgroundColor:
                hoveredCard === index
                  ? "rgba(25, 25, 35, 0.9)"
                  : "rgba(15, 15, 20, 0.8)",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              transform:
                hoveredCard === index
                  ? "translateY(-8px) scale(1.02)"
                  : "translateY(0) scale(1)",
              boxShadow:
                hoveredCard === index
                  ? "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  : "0 10px 30px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
          >
            {/* Project Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "280px",
                overflow: "hidden",
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredCard === index ? "scale(1.1)" : "scale(1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0.7)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "44px",
                    height: "44px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0.7)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                    <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Project Content */}
            <div
              style={{
                padding: "32px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "16px",
                  letterSpacing: "-0.01em",
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: "1rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: "1.6",
                  marginBottom: "24px",
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    style={{
                      padding: "6px 14px",
                      fontSize: "0.85rem",
                      fontWeight: "500",
                      color: "rgba(255, 255, 255, 0.9)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
