"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
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

// Things that open in the preview modal: either an embedded site/file
// (`src` is embedded, `href` opens in a new tab) or a set of photos
// `thumb` is the image shown in the hover card for sites
type Preview =
  | { kind: "site"; label: string; src: string; href: string; thumb?: string }
  | { kind: "photos"; label: string; images: { src: string; alt: string }[] };

const HACK_WESTERN: Preview = {
  kind: "site",
  label: "hackwestern.com",
  src: "https://www.hackwestern.com/#about",
  href: "https://www.hackwestern.com/#about",
  // Tall screenshot that slowly scrolls while the hover card is open
  thumb: "/hackwestern-preview.jpg",
};

const RESUME = {
  kind: "site",
  label: "Resume",
  src: "https://drive.google.com/file/d/1U7dKCAM_Z0UPll5qTfGnNhBpXXAlNV2v/preview",
  href: "https://drive.google.com/file/d/1U7dKCAM_Z0UPll5qTfGnNhBpXXAlNV2v/view?usp=sharing",
  // Saved copy of Drive's thumbnail of the PDF (Drive won't serve it to
  // other sites); re-save it when the resume changes
  thumb: "/resume-preview.jpg",
} satisfies Preview;

const TECH_EVENTS: Preview = {
  kind: "photos",
  label: "Tech events",
  images: [
    { src: "/tech-events-1.webp", alt: "Organizing team at Founders Cafe" },
    { src: "/tech-events-2.webp", alt: "Audience at a founder talk" },
  ],
};

const WESTERN: Preview = {
  kind: "photos",
  label: "Western University",
  images: [{ src: "/western.webp", alt: "University College tower at sunset" }],
};

const IVEY: Preview = {
  kind: "photos",
  label: "Ivey Business School",
  images: [{ src: "/ivey.jpg", alt: "Ivey HBA class photo in the atrium" }],
};

const CARD_WIDTH = 288;

const previewThumb = (p: Preview) =>
  p.kind === "photos" ? p.images[0].src : p.thumb;

const previewFavicon = (p: Preview) =>
  p.kind === "site"
    ? `https://www.google.com/s2/favicons?domain=${new URL(p.href).hostname}&sz=64`
    : null;

// Hover card shared by the highlights and the resume chip: on hover a small
// card with a thumbnail floats above the element, following the mouse
// sideways and leaning with its movement. Spread `handlers` onto the element,
// attach `ref`, and render `card` next to it.
function useHoverCard<T extends HTMLElement>(preview: Preview) {
  const ref = useRef<T>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, below: false });
  const [lean, setLean] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const lastX = useRef<number | null>(null);
  const leanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (leanTimer.current) clearTimeout(leanTimer.current);
    };
  }, []);

  const place = (mouseX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const half = CARD_WIDTH / 2 + 8;
    const x = Math.min(Math.max(mouseX, half), window.innerWidth - half);
    // Flip below the text when there's no room above
    const below = r.top < 240;
    setPos({ x, y: below ? r.bottom + 8 : r.top - 8, below });
  };

  const handlers = {
    onMouseEnter: (e: React.MouseEvent) => {
      lastX.current = e.clientX;
      place(e.clientX);
      setOpen(true);
    },
    onMouseMove: (e: React.MouseEvent) => {
      place(e.clientX);
      if (lastX.current !== null) {
        const dx = e.clientX - lastX.current;
        setLean(Math.max(-6, Math.min(6, dx * 0.4)));
        if (leanTimer.current) clearTimeout(leanTimer.current);
        leanTimer.current = setTimeout(() => setLean(0), 120);
      }
      lastX.current = e.clientX;
    },
    onMouseLeave: () => {
      setOpen(false);
      setLean(0);
      lastX.current = null;
    },
  };

  const thumb = previewThumb(preview);
  const favicon = previewFavicon(preview);

  const card =
    mounted &&
    createPortal(
      <div
        role="tooltip"
        aria-hidden={!open}
        className="hover-card"
        data-open={open || undefined}
        data-placement={pos.below ? "below" : "above"}
        style={{
          width: CARD_WIDTH,
          left: pos.x,
          ...(pos.below
            ? { top: pos.y }
            : { bottom: window.innerHeight - pos.y }),
        }}
      >
        <div
          className="hover-card-inner"
          style={{ "--lean": `${lean}deg` } as React.CSSProperties}
        >
          <div className="hover-card-shot-wrap">
            {thumb && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumb}
                alt=""
                className="hover-card-shot"
                data-loaded={loaded || undefined}
                onLoad={() => setLoaded(true)}
              />
            )}
          </div>
          <div className="hover-card-footer">
            <span className="hover-card-label">
              {favicon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={favicon} alt="" className="hover-card-favicon" />
              )}
              <span>{preview.label}</span>
            </span>
            <svg
              className="hover-card-arrow"
              width="14"
              height="14"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 11L11 4M11 4H6M11 4V9"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>,
      document.body
    );

  return { ref, open, close: () => setOpen(false), handlers, card };
}

// Highlighted phrase that opens a preview when clicked, with an underline
// sweep and hover card on hover.
// data-cursor-plain keeps the custom cursor from growing over it.
function PreviewHighlight({
  preview,
  onOpen,
  children,
}: {
  preview: Preview;
  onOpen: () => void;
  children: ReactNode;
}) {
  const { ref, open, close, handlers, card } = useHoverCard<HTMLElement>(preview);

  return (
    <>
      <mark
        ref={ref}
        className="about-highlight about-highlight-link"
        role="button"
        tabIndex={0}
        data-cursor-plain
        data-open={open || undefined}
        onClick={() => {
          close();
          onOpen();
        }}
        {...handlers}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
      >
        {children}
      </mark>
      {card}
    </>
  );
}

// The "Resume +2" chip: previews the resume on click, with a hover card.
// Cmd/ctrl/shift-click still opens it in a new tab.
function ResumeChip({ onOpen }: { onOpen: () => void }) {
  const { ref, close, handlers, card } = useHoverCard<HTMLAnchorElement>(RESUME);

  return (
    <>
      <a
        ref={ref}
        href={RESUME.href}
        target="_blank"
        rel="noopener noreferrer"
        className="about-source"
        data-cursor-plain
        {...handlers}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          close();
          onOpen();
        }}
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
      {card}
    </>
  );
}

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

  // Site/file preview (iframe modal)
  const [preview, setPreview] = useState<Preview | null>(null);
  const previewOpen = preview !== null;
  const closePreview = () => setPreview(null);

  useEffect(() => {
    if (!previewOpen) return;
    // Use the native cursor inside the modal; the custom one can't follow into the iframe
    setCursorHidden(true);
    document.documentElement.dataset.preview = "open";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.documentElement.dataset.preview;
      setCursorHidden(false);
    };
  }, [previewOpen]);

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "var(--font-body)",
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
      {preview && (
        <div className="site-preview-backdrop" onClick={closePreview}>
          <div
            className="site-preview"
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.label} preview`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="site-preview-bar">
              <span className="site-preview-url">{preview.label}</span>
              {preview.kind === "site" && (
                <a
                  href={preview.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-preview-action"
                >
                  Open ↗
                </a>
              )}
              <button
                type="button"
                className="site-preview-action"
                onClick={closePreview}
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>
            {preview.kind === "site" ? (
              <iframe
                src={preview.src}
                title={preview.label}
                className="site-preview-frame"
              />
            ) : (
              <div className="photo-preview">
                {preview.images.map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={img.src} src={img.src} alt={img.alt} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="about-mobile-layout">
        <div className="about-name-section">
          <h1
            style={{
              fontSize: "4.5rem",
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
            className="about-pronunciation font-subheading intro-fade"
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
              fontSize: "1.05rem",
              fontWeight: "400",
              lineHeight: "1.6",
              color: "#e8eaed",
              marginTop: "16px",
            }}
            className="about-definition"
          >
            <strong>1.</strong>{" "}
            Dual degree CS &amp; Business student at{" "}
            <PreviewHighlight
              preview={WESTERN}
              onOpen={() => setPreview(WESTERN)}
            >
              Western University
            </PreviewHighlight>{" "}
            &amp;{" "}
            <PreviewHighlight
              preview={IVEY}
              onOpen={() => setPreview(IVEY)}
            >
              Ivey Business School
            </PreviewHighlight>
            .
            <br />
            <strong>2.</strong> Passionate about{" "}
            building cool software and
            impactful products.
            <br />
            <strong>3.</strong> Currently organizing{" "}
            <PreviewHighlight
              preview={HACK_WESTERN}
              onOpen={() => setPreview(HACK_WESTERN)}
            >
              Hack Western
            </PreviewHighlight>
            , running{" "}
            <PreviewHighlight
              preview={TECH_EVENTS}
              onOpen={() => setPreview(TECH_EVENTS)}
            >
              tech events
            </PreviewHighlight>
            , shooting hoops.{" "}
            <ResumeChip onOpen={() => setPreview(RESUME)} />
          </p>

        </div>
      </div>
    </div>
  );
}
