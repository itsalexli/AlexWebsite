"use client";

import React, { useEffect, useRef, ReactNode, useState } from "react";
import Image from "next/image";
import VantaFog from "../components/VantaFog";
import CustomCursor from "../components/CustomCursor";
import Info from "./info";
import About from "./About";
import Projects from "@/Projects";

// Main HomePage Component
const HomePage: React.FC = () => {
  return (
    <div>
      <VantaFog>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            gap: "40px",
            paddingTop: "100px",
            paddingLeft: "20px",
            paddingRight: "20px",
            maxWidth: "1400px",
            margin: "0 auto",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <About />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Info />
          </div>
        </div>

        <Projects />
      </VantaFog>
      <CustomCursor />
    </div>
  );
};

export default HomePage;
