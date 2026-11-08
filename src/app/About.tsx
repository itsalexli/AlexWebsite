"use client";

import { useEffect, useRef, useState } from "react";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "../components/ContactIcons";

const contactLinks = [
  { label: "email", href: "mailto:alex.liyou@gmail.com", icon: <MailIcon /> },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/alexyouli/",
    icon: <LinkedInIcon />,
  },
  { label: "github", href: "https://github.com/itsalexli", icon: <GitHubIcon /> },
];

// Tell the custom cursor to hide while an icon popup is showing
const setCursorHidden = (hidden: boolean) =>
  document.dispatchEvent(
    new CustomEvent("experienceHover", { detail: { isHovering: hidden } })
  );

// Dictionary-style intro, modeled on a search-result definition card.
export default function About() {
  // Hover popup for contact links: same grow/shrink behaviour as company logos
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const handleLinkEnter = (index: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsClosing(false);
    setHoveredLink(index);
    setCursorHidden(true);
  };

  const handleLinkLeave = () => {
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      setHoveredLink(null);
      setIsClosing(false);
      setCursorHidden(false);
    }, 150);
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily:
          '"Crimson Text", "Times New Roman", "Georgia", "Playfair Display", serif',
      }}
      className="about-container"
    >
      {hoveredLink !== null && (
        <div
          style={{
            position: "fixed",
            left: mouse.x - 25,
            top: mouse.y - 25,
            width: "50px",
            height: "50px",
            pointerEvents: "none",
            zIndex: 9999,
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transformOrigin: "center",
            animation: isClosing
              ? "logoShrink 0.15s ease-in forwards"
              : "logoGrow 0.15s ease-out",
          }}
        >
          {contactLinks[hoveredLink].icon}
        </div>
      )}
      <div className="about-mobile-layout">
        <div className="about-name-section">
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "700",
              lineHeight: "1.1",
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
            className="about-name"
          >
            Alex 李{" "}
            <span style={{ fontStyle: "italic", fontWeight: "400" }}>
              (noun)
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#9aa0a6",
              marginTop: "6px",
            }}
            className="about-pronunciation"
          >
            /ˈaləks ˈlē/
            <span style={{ marginLeft: "8px" }} className="about-links">
              {contactLinks.map((link, i) => (
                <span key={link.label}>
                  {i > 0 && " / "}
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="about-link"
                    onMouseEnter={() => handleLinkEnter(i)}
                    onMouseLeave={handleLinkLeave}
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className="about-definition-section">
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: "400",
              lineHeight: "1.5",
              color: "#e8eaed",
              fontStyle: "italic",
              marginTop: "12px",
            }}
            className="about-definition"
          >
            <strong>1.</strong>{" "}
            <mark className="about-highlight">
              CS &amp; Business student at Western/Ivey passionate about
              software and product
            </mark>
            . <strong>2.</strong>{" "}
            <mark className="about-highlight">
              Currently organizing Hack Western, running tech events, shooting
              hoops
            </mark>
            .{" "}
            <a
              href="https://www.linkedin.com/in/alexyouli/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-source"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <circle cx="8" cy="8" r="8" fill="#81c995" />
                <path
                  d="M4.5 8.2l2.3 2.3 4.7-4.9"
                  fill="none"
                  stroke="#0d3b1e"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              LinkedIn +2
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
