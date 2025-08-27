"use client";

export default function About() {
  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily:
          '"Crimson Text", "Times New Roman", "Georgia", "Playfair Display", serif',
      }}
      className="about-container"
    >
      {/* Mobile: Name and Definition Side by Side */}
      <div className="about-mobile-layout">
        <div className="about-name-section">
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "600",
              lineHeight: "1.1",
              color: "black",
              marginBottom: "10px",
              letterSpacing: "-0.02em",
            }}
            className="about-name"
          >
            <span
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              Alex 李
              <span
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "8px",
                  right: "-8px",
                  height: "-3px",
                  backgroundColor: "#1f2937",
                  borderRadius: "2px",
                }}
              />
            </span>{" "}
            <span
              style={{
                color: "black",
                fontStyle: "italic",
                fontWeight: "400",
              }}
            >
              (noun)
            </span>
          </h1>
        </div>

        <div className="about-definition-section">
          {/* Definition */}
          <div
            style={{
              fontSize: "1.3rem",
              fontWeight: "400",
              lineHeight: "1.3",
              color: "black",
              fontStyle: "italic",
            }}
            className="about-definition"
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
      </div>
    </div>
  );
}
