"use client";

import React, { useEffect, useRef, ReactNode, useState } from "react";

// Type declarations for Vanta and Three.js
declare global {
  interface Window {
    THREE?: unknown;
    VANTA?: {
      FOG: (options: VantaFogOptions) => VantaEffect;
    };
  }
}

interface VantaFogOptions {
  el: HTMLElement;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  highlightColor?: number;
  midtoneColor?: number;
  lowlightColor?: number;
  baseColor?: number;
  blurFactor?: number;
}

interface VantaEffect {
  destroy: () => void;
}

interface VantaFogProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const VantaFog: React.FC<VantaFogProps> = ({
  children,
  className = "",
  style = {},
}) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);
  const isInitialized = useRef(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring client-side only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initVanta = (): void => {
      if (
        window.VANTA &&
        window.THREE &&
        vantaRef.current &&
        !isInitialized.current
      ) {
        try {
          if (vantaEffect.current) {
            vantaEffect.current.destroy();
          }

          vantaEffect.current = window.VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0xf0f8ff,
            midtoneColor: 0xddeeff,
            lowlightColor: 0xb3d9ff,
            baseColor: 0xe6f2ff,
            blurFactor: 0.5,
          });

          isInitialized.current = true;
        } catch (error) {
          console.error("Failed to initialize Vanta fog effect:", error);
        }
      }
    };

    const loadScripts = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.THREE && window.VANTA) {
          resolve();
          return;
        }

        const threeScript = document.createElement("script");
        threeScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";

        threeScript.onload = () => {
          const vantaScript = document.createElement("script");
          vantaScript.src =
            "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.fog.min.js";

          vantaScript.onload = () => {
            setTimeout(() => resolve(), 100);
          };

          vantaScript.onerror = () => {
            reject(new Error("Failed to load Vanta.js"));
          };

          document.head.appendChild(vantaScript);
        };

        threeScript.onerror = () => {
          reject(new Error("Failed to load Three.js"));
        };

        document.head.appendChild(threeScript);
      });
    };

    loadScripts()
      .then(() => initVanta())
      .catch((error) => {
        console.error("Failed to load required scripts:", error);
      });

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (error) {
          console.error("Error destroying Vanta effect:", error);
        }
        vantaEffect.current = null;
      }
      isInitialized.current = false;
    };
  }, [isClient]);

  // Show loading or fallback during SSR
  if (!isClient) {
    return (
      <div
        className={`vanta-fog-container ${className}`}
        style={{
          position: "relative",
          minHeight: "200px",
          minWidth: "200px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          ...style,
        }}
      >
        {children}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.9) 70%, #ffffff 100%)",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={vantaRef}
      className={`vanta-fog-container ${className}`}
      style={{
        position: "relative",
        minHeight: "200px",
        minWidth: "200px",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
      {/* Fade to white overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.9) 70%, #ffffff 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </div>
  );
};

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

    // Track mouse movement
    document.addEventListener("mousemove", updateMousePosition);

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
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        style={{
          position: "fixed",
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          width: "8px",
          height: "8px",
          backgroundColor: "black",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "transform 0.1s ease",
          transform: isHovering ? "scale(0.5)" : "scale(1)",
          mixBlendMode: "difference",
        }}
      />

      {/* Outer ring */}
      <div
        style={{
          position: "fixed",
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
          width: "40px",
          height: "40px",
          border: "2px solid rgba(0,0,0,0.3)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "transform 0.2s ease, border-color 0.2s ease",
          transform: isHovering ? "scale(1.5)" : "scale(1)",
          borderColor: isHovering ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.3)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
};

const NavigationBar: React.FC = () => {
  const navItems = ["work", "play", "blogs"];

  const navItemStyle = {
    color: "black",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    textTransform: "lowercase" as const,
    letterSpacing: "0.5px",
  };

  const iconStyle = {
    width: "20px",
    height: "20px",
    fill: "black",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const handleNavHover = (
    e: React.MouseEvent<HTMLAnchorElement>,
    isHover: boolean
  ) => {
    if (isHover) {
      e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.15)";
      e.currentTarget.style.backdropFilter = "blur(10px)";
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.backdropFilter = "none";
    }
  };

  const handleIconHover = (
    e: React.MouseEvent<SVGElement>,
    isHover: boolean
  ) => {
    if (isHover) {
      e.currentTarget.style.stroke = "rgba(0,0,0,0.7)";
      e.currentTarget.style.fill = "rgba(0,0,0,0.7)";
      e.currentTarget.style.transform = "translateY(-2px)";
    } else {
      e.currentTarget.style.stroke = "black";
      e.currentTarget.style.fill = "black";
      e.currentTarget.style.transform = "translateY(0)";
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: "20px 40px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            color: "black",
            fontSize: "1.2rem",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          AL
        </div>

        {/* Navigation Items */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              style={navItemStyle}
              onMouseOver={(e) => handleNavHover(e, true)}
              onMouseOut={(e) => handleNavHover(e, false)}
            >
              {item}
            </a>
          ))}

          {/* Social Icons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            {/* Email */}
            <svg
              style={iconStyle}
              onMouseOver={(e) => handleIconHover(e, true)}
              onMouseOut={(e) => handleIconHover(e, false)}
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>

            {/* LinkedIn */}
            <svg
              style={iconStyle}
              onMouseOver={(e) => handleIconHover(e, true)}
              onMouseOut={(e) => handleIconHover(e, false)}
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>

            {/* X (formerly Twitter) */}
            <svg
              style={iconStyle}
              onMouseOver={(e) => handleIconHover(e, true)}
              onMouseOut={(e) => handleIconHover(e, false)}
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>

            {/* GitHub */}
            <svg
              style={iconStyle}
              onMouseOver={(e) => handleIconHover(e, true)}
              onMouseOut={(e) => handleIconHover(e, false)}
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Portfolio: React.FC = () => {
  const buttonStyle = {
    padding: "12px 30px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    color: "black",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    fontWeight: "500",
    border: "2px solid rgba(0,0,0,0.3)",
  };

  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isHover: boolean
  ) => {
    if (isHover) {
      e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.3)";
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
    } else {
      e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.2)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", cursor: "none" }}>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <NavigationBar />

      {/* Hero Section */}
      <VantaFog style={{ height: "100vh" }}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "bold",
              marginBottom: "1rem",
              textShadow: "2px 2px 4px rgba(255,255,255,0.5)",
              maxWidth: "800px",
              lineHeight: "1.2",
            }}
          >
            Alex Li
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              marginBottom: "2rem",
              opacity: 0.9,
              maxWidth: "600px",
              lineHeight: "1.6",
            }}
          >
            Builder | Software Engineer | Product
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
              onMouseOver={(e) => handleButtonHover(e, true)}
              onMouseOut={(e) => handleButtonHover(e, false)}
            >
              Get Started
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "transparent",
                border: "2px solid rgba(0,0,0,0.5)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </VantaFog>
    </div>
  );
};

export default Portfolio;
