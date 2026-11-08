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
// Intro animation: type the name, pause, type "(noun)", then fade in the rest
const NAME = "Alex 李";
const NOUN = "(noun)";

// Wrap Chinese characters so they can use a thinner CJK font than the Latin name
const renderName = (text: string) =>
  text.split(/([\u4e00-\u9fff]+)/).map((part, i) =>
    /[\u4e00-\u9fff]/.test(part) ? (
      <span key={i} className="name-cjk">
        {part}
      </span>
    ) : (
      part
    )
  );

export default function About() {
  const [nameCount, setNameCount] = useState(0);
  const [nounCount, setNounCount] = useState(0);
  const typing = nounCount < NOUN.length;

  useEffect(() => {
    const reveal = () => {
      document.documentElement.dataset.intro = "done";
    };
    // Skip the animation for people who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNameCount(NAME.length);
      setNounCount(NOUN.length);
      reveal();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 150;
    for (let i = 1; i <= NAME.length; i++) {
      t += 60;
      timers.push(setTimeout(() => setNameCount(i), t));
    }
    t += 220; // short pause before "(noun)"
    for (let i = 1; i <= NOUN.length; i++) {
      t += 40;
      timers.push(setTimeout(() => setNounCount(i), t));
    }
    timers.push(setTimeout(reveal, t + 80));
    return () => timers.forEach(clearTimeout);
  }, []);

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
          className="cursor-follower"
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
              fontWeight: "500",
              lineHeight: "1.1",
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
            className="about-name font-title"
          >
            {/* Typed part is visible; the rest is invisible so the layout never jumps */}
            <span className={typing ? "type-caret" : undefined}>
              {renderName(NAME.slice(0, nameCount))}
              {nameCount >= NAME.length && (
                <>
                  {" "}
                  <span className="font-title" style={{ fontWeight: "400" }}>
                    {NOUN.slice(0, nounCount)}
                  </span>
                </>
              )}
            </span>
            <span style={{ visibility: "hidden" }} aria-hidden="true">
              {renderName(NAME.slice(nameCount))}
              {nameCount < NAME.length && " "}
              <span className="font-title" style={{ fontWeight: "400" }}>
                {nameCount >= NAME.length ? NOUN.slice(nounCount) : NOUN}
              </span>
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#9aa0a6",
              marginTop: "6px",
            }}
            className="about-pronunciation intro-fade"
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

        <div className="about-definition-section intro-fade">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.2rem",
              fontWeight: "400",
              lineHeight: "1.6",
              color: "#e8eaed",
              marginTop: "16px",
            }}
            className="about-definition"
          >
            <strong>1.</strong>{" "}
            <mark className="about-highlight">
              Dual degree CS &amp; Business
            </mark>{" "}
            student at Western University &amp; Ivey Business School.{" "}
            <strong>2.</strong> Passionate about{" "}
            <mark className="about-highlight">building cool software</mark> and
            products. <strong>3.</strong> Currently organizing{" "}
            <mark className="about-highlight">Hack Western</mark>, running tech
            events, shooting hoops.{" "}
            <a
              href="https://drive.google.com/file/d/1U7dKCAM_Z0UPll5qTfGnNhBpXXAlNV2v/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="about-source"
              data-cursor-plain
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
              Resume +2
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
