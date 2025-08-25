"use client";

import React from "react";

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

export default NavigationBar;
