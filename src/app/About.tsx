"use client";

export default function About() {
  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "600",
            lineHeight: "1.1",
            color: "#2f314bff",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}
        >
          Alex 李{" "}
          <span
            style={{
              color: "#6b7280",
              fontStyle: "italic",
              fontWeight: "400",
            }}
          >
            (noun)
          </span>
        </h1>

        <div
          style={{
            fontSize: "1.8rem",
            fontWeight: "500",
            color: "#3b82f6",
            marginBottom: "20px",
            fontStyle: "italic",
          }}
        ></div>
      </div>

      {/* Definition */}
      <div
        style={{
          fontSize: "1.4rem",
          fontWeight: "400",
          lineHeight: "1.6",
          color: "#2c3e50",
          fontStyle: "italic",
        }}
      >
        <p style={{ marginBottom: "0.8em" }}>
          <strong>1.</strong> product engineer obsessed with building systems to
          improve lives happier, healthier, and efficient. <strong>2.</strong>{" "}
          writes a lot of code, jots a lot of notes, makes a lot of pretty
          pages. <strong>3.</strong> loves basketball + frisbee, classical music
          improv (piano, cello), and wellness psychology.
        </p>
      </div>
    </div>
  );
}
