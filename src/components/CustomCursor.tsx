"use client";

import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isHoveringExperience, setIsHoveringExperience] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleExperienceHover = (e: CustomEvent) => {
      setIsHoveringExperience(e.detail.isHovering);
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
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isClient]);

  if (!isClient || isHoveringExperience) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        left: isHovering ? mousePosition.x - 30 : mousePosition.x - 10,
        top: isHovering ? mousePosition.y - 15 : mousePosition.y - 10,
        width: isHovering ? "60px" : "20px",
        height: isHovering ? "30px" : "20px",
        backgroundColor: isHovering ? "#7b9bff" : "transparent",
        border: isHovering ? "none" : "2px solid #7b9bff",
        borderRadius: isHovering ? "15px" : "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        color: "white",
        fontWeight: "500",
      }}
    >
      {isHovering && "CLICK"}
    </div>
  );
};

export default CustomCursor;
