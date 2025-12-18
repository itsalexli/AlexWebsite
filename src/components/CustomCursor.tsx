"use client";

import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isHoveringExperience, setIsHoveringExperience] = useState(false);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [showProjectText, setShowProjectText] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateMousePosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleExperienceHover = (e: CustomEvent) => {
      if (e.detail.isHovering) {
        setIsHoveringExperience(true);
        setIsTransitioning(true);
      } else {
        setIsHoveringExperience(false);
        setIsTransitioning(false);
      }
    };

    const handleProjectHover = (e: CustomEvent) => {
      if (e.detail.isHovering) {
        setIsHoveringProject(true);
        setShowProjectText(false);
        // Show text after animation completes (200ms transition)
        setTimeout(() => {
          setShowProjectText(true);
        }, 100);
      } else {
        setIsHoveringProject(false);
        setShowProjectText(false);
      }
    };

    document.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });
    document.addEventListener(
      "experienceHover",
      handleExperienceHover as EventListener
    );
    document.addEventListener(
      "projectHover",
      handleProjectHover as EventListener
    );

    // Track hover states for interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, svg, [role="button"]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener(
        "experienceHover",
        handleExperienceHover as EventListener
      );
      document.removeEventListener(
        "projectHover",
        handleProjectHover as EventListener
      );
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isClient]);

  if (!isClient || isHoveringExperience) {
    return null;
  }

  // Calculate size based on transition state
  const baseSize = isHovering ? 30 : 14;
  const targetSize = isTransitioning ? 14 : baseSize;

  // Project hover state overrides
  if (isHoveringProject) {
    const width = 120;
    const height = 40;

    return (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "white",
          border: "none",
          borderRadius: "0px",
          pointerEvents: "none",
          zIndex: 9999,
          transform: `translate3d(${cursorPosition.x - width / 2}px, ${
            cursorPosition.y - height / 2
          }px, 0)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontFamily:
            '"Crimson Text", "Times New Roman", "Georgia", "Playfair Display", serif',
          color: "black",
          fontWeight: "500",
          transition: "width 0.15s ease, height 0.15s ease",
          willChange: "transform",
        }}
      >
        {showProjectText && "View Project"}
      </div>
    );
  }

  const size = isHovering && !isTransitioning ? baseSize : targetSize;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: "#ffffff",
        border: "2px solid #ffffff",
        borderRadius: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translate3d(${cursorPosition.x - size / 2}px, ${
          cursorPosition.y - size / 2
        }px, 0)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontFamily:
          '"Crimson Text", "Times New Roman", "Georgia", "Playfair Display", serif',
        color: "black",
        fontWeight: "500",
        opacity: 1,
        transition: "width 0.15s ease, height 0.15s ease",
        willChange: "transform",
      }}
    ></div>
  );
};
export default CustomCursor;
