"use client";

import Image from "next/image";

type Experience = {
  company: string;
  role: string;
  // Company website, opened in a new tab when the row is clicked
  url: string;
  logo: string;
  // Tile colour behind the logo
  tileColor: string;
  // Space around the logo inside the tile (0 = logo fills the tile)
  logoPadding: number;
  // Recolour a dark logo to white so it reads on a coloured tile
  whiteLogo?: boolean;
};

const experiences: Experience[] = [
  {
    company: "IBM",
    role: "AI Engineer Intern",
    url: "https://www.ibm.com",
    logo: "/ibm-tile.png",
    tileColor: "#ffffff",
    logoPadding: 0,
  },
  {
    company: "Turing",
    role: "Software Engineer Intern",
    url: "https://www.turing.com",
    logo: "/turing-tile.png",
    tileColor: "#000000",
    logoPadding: 0,
  },
  {
    company: "CIBC",
    role: "Software Engineer Intern",
    url: "https://www.cibc.com",
    logo: "/cibc-tile.png",
    tileColor: "#f2f2f2",
    logoPadding: 0,
  },
  {
    company: "Autumn",
    role: "Product Engineer Intern",
    url: "https://www.autumn.co",
    logo: "/autumnlogo1.png",
    tileColor: "#f7f5ef",
    logoPadding: 0,
  },
];

export default function Info() {
  return (
    <div
      className="info-container"
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-body)",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0 0 40px 0",
        boxSizing: "border-box",
      }}
    >
      {/* Logo tile + company + role, one row per company */}
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {experiences.map((exp) => (
          <a
            key={exp.company}
            href={exp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="company-row"
            data-cursor-plain
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              className="company-tile"
              style={{
                position: "relative",
                width: "44px",
                height: "44px",
                flexShrink: 0,
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: exp.tileColor,
              }}
            >
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                fill
                sizes="44px"
                style={{
                  objectFit: "contain",
                  padding: `${exp.logoPadding}px`,
                  filter: exp.whiteLogo ? "brightness(0) invert(1)" : undefined,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                lineHeight: 1.375,
              }}
            >
              <span style={{ color: "#e4e4e7", fontSize: "1rem", fontWeight: 600 }}>
                {exp.company}
              </span>
              <span style={{ color: "#a1a1aa", fontSize: "0.875rem" }}>
                {exp.role}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
