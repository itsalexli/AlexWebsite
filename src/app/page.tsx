"use client";

import React from "react";
import CustomCursor from "../components/CustomCursor";
import Info from "./info";
import About from "./About";
import Projects from "@/Projects";

// Main HomePage Component
const HomePage: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: "40px",
          paddingTop: "120px",
          paddingLeft: "20px",
          paddingRight: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
          alignItems: "flex-start",
          paddingBottom: "0px",
        }}
        className="main-layout"
      >
        <div style={{ flex: 1, minWidth: 0 }} className="about-column">
          <About />
        </div>
        <div style={{ flex: 1, minWidth: 0 }} className="info-column intro-fade">
          <Info />
        </div>
      </div>

      <div
        style={{ paddingTop: "0px", paddingBottom: "50px" }}
        className="projects-section intro-fade"
      >
        <Projects />
      </div>
      <CustomCursor />
    </div>
  );
};

export default HomePage;
