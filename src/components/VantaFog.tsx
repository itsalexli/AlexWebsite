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
  speed?: number;
  zoom?: number;
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
            highlightColor: 0xffffff,
            midtoneColor: 0xfffdfd,
            lowlightColor: 0x393939,
            baseColor: 0xffffff,
            blurFactor: 0.35,
            speed: 1.0,
            zoom: 0.7,
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
    </div>
  );
};

export default VantaFog;
