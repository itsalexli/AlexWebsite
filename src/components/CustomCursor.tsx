"use client";

import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isHoveringExperience, setIsHoveringExperience] = useState(false);
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

    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener(
      "experienceHover",
      handleExperienceHover as EventListener
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
  const baseSize = isHovering ? 60 : 20;
  const targetSize = isTransitioning ? 50 : baseSize;
  const width = isHovering && !isTransitioning ? "60px" : `${targetSize}px`;
  const height = isHovering && !isTransitioning ? "30px" : `${targetSize}px`;

  return (
    <div
      style={{
        position: "fixed",
        left:
          isHovering && !isTransitioning
            ? mousePosition.x - 30
            : mousePosition.x - targetSize / 2,
        top:
          isHovering && !isTransitioning
            ? mousePosition.y - 15
            : mousePosition.y - targetSize / 2,
        width: width,
        height: height,
        backgroundColor:
          isHovering && !isTransitioning ? "#7b9bff" : "transparent",
        border: isHovering && !isTransitioning ? "none" : "2px solid #7b9bff",
        borderRadius: isHovering && !isTransitioning ? "15px" : "50%",
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
    >
      {isHovering && !isTransitioning && "CLICK"}
    </div>
  );
};

export default CustomCursor;
