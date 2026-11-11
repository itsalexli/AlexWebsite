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

    // Grow over links and buttons, except inside [data-cursor-plain]
    // (e.g. the resume chip and company rows). Checked on every mouseover
    // so it stays right when elements are added or re-rendered.
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest('button, a, svg, [role="button"]');
      setIsHovering(!!interactive && !interactive.closest("[data-cursor-plain]"));
    };

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

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

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
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isClient]);

  if (!isClient || isHoveringExperience) {
    return null;
  }

  // Calculate size based on transition state
  const baseSize = isHovering ? 24 : 11;
  const targetSize = isTransitioning ? 11 : baseSize;
  const size = isHovering && !isTransitioning ? baseSize : targetSize;

  // Over a project the square stretches into a "View Project" label
  const width = isHoveringProject ? 120 : size;
  const height = isHoveringProject ? 40 : size;

  // The outer layer follows the mouse; the inner box is centered on that
  // point, so size changes grow and shrink from the middle.
  return (
    <div
      className="cursor-follower"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`,
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: `${width}px`,
          height: `${height}px`,
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ffffff",
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: "12px",
          fontFamily: "var(--font-body)",
          color: "black",
          fontWeight: "500",
          transition: "width 0.15s ease, height 0.15s ease",
        }}
      >
        {isHoveringProject && showProjectText && "View Project"}
      </div>
    </div>
  );
};
export default CustomCursor;
