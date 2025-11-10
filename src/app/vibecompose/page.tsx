"use client";

import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";

export default function VibeCompose() {
  return (
    <>
      <CustomCursor />
      <div style={{ paddingTop: "80px" }}>
        <div className="flex justify-center items-center">
          <Image
            src="/VibeCompose.jpg"
            alt="Vibe Compose"
            width={1920}
            height={1080}
            className="w-1/2 h-auto"
            priority
          />
        </div>

        <div className="flex h-screen">
          {/* Left Column */}
          <div className="flex-1 bg-amber-100">
            <h1>Vibe Compose</h1>
          </div>
          {/* Right Column */}
          <div className="flex-1 bg-amber-500"></div>
        </div>
      </div>
    </>
  );
}
