"use client";

import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    // Use requestAnimationFrame for smoother mouse tracking
    let rafId: number;
    const updateMousePosition = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
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

    document.addEventListener("mousemove", updateMousePosition);
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
      if (rafId) cancelAnimationFrame(rafId);
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
    const width = "120px";
    const height = "40px";

    return (
      <div
        style={{
          position: "fixed",
          left: mousePosition.x - 60,
          top: mousePosition.y - 20,
          width: width,
          height: height,
          backgroundColor: "black",
          border: "none",
          borderRadius: "0px",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate3d(0, 0, 0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          color: "white",
          fontWeight: "500",
          transition: "all 0.1s ease",
        }}
      >
        {showProjectText && "View Project"}
      </div>
    );
  }

  const width =
    isHovering && !isTransitioning ? `${baseSize}px` : `${targetSize}px`;
  const height =
    isHovering && !isTransitioning ? `${baseSize}px` : `${targetSize}px`;

  return (
    <div
      style={{
        position: "fixed",
        left:
          isHovering && !isTransitioning
            ? mousePosition.x - baseSize / 2
            : mousePosition.x - targetSize / 2,
        top:
          isHovering && !isTransitioning
            ? mousePosition.y - baseSize / 2
            : mousePosition.y - targetSize / 2,
        width: width,
        height: height,
        backgroundColor: "#0f1118ff",
        border: "none",
        borderRadius: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate3d(0, 0, 0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        color: "white",
        fontWeight: "500",
        opacity: isTransitioning ? 0 : 1,
      }}
    ></div>
  );
};

export default CustomCursor;
