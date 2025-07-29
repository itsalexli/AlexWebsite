"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function Info() {
  const [messages, setMessages] = useState([
    {
      text: "Click the button below to learn more about me!",
      sender: "bot",
    },
  ]);
  const [aboutMeShown, setAboutMeShown] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredWindow, setHoveredWindow] = useState<string | null>(null);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aboutMeText = [
    "Hi, I'm Alex — a software engineer and student at Western University passionate about building thoughtful, user-focused products. My experience spans from large-scale systems at CIBC to fast-paced startups like Autumn, where I've worked across the full stack with tools like React, Node.js, Swift, and AI integrations.",
    "Outside of coding, I help lead Western's largest tech and business club, run events that connect hundreds of students with industry, and sometimes find time for basketball, piano, or a good bowl of ramen in downtown Toronto.",
    "Right now, I'm focused on crafting tools that make life easier and more intuitive — and always open to building cool things with great people. Let's connect!",
  ];

  const handleSend = () => {
    if (!aboutMeShown) {
      setIsTyping(true);

      // Add typing indicator
      setMessages((prev) => [
        ...prev,
        { text: "", sender: "bot", isTyping: true },
      ]);

      // Simulate typing delay then show the full message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev.slice(0, -1), // Remove typing indicator
          { text: aboutMeText, sender: "bot" },
        ]);
        setIsTyping(false);
        setAboutMeShown(true);
      }, 2000); // 2 second typing animation
    }
  };

  const experiences = [
    {
      company: "CIBC",
      role: "Software Engineer Intern",
      description:
        "Mobile engineering building automated money feature scaled for $6B+ in transaction volume (piloting for 2027).",
      date: "May 2025 - August 2025",
      location: "Remote",
      logo: "/cibc.png",
    },
    {
      company: "Autumn",
      role: "Software Engineer Intern",
      description:
        "Fullstack engineering building RAG pipeline and scraper application using Typescript and Python for 1,200+ users.",
      date: "January 2025 - April 2025",
      location: "Toronto, Canada",
      logo: "/autumn.png",
    },
    {
      company: "WAI",
      role: "Software Engineer",
      description:
        "Designed and built university events landing pages with ReactJS, NodeJS, and MongoDB for 500+ users",
      date: "September 2024 - December 2024",
      location: "Toronto, Canada",
      logo: "/wta.png",
    },
  ];

  // Style constants for windows
  const getWindowStyle = (windowType: string) => ({
    backgroundColor:
      hoveredWindow === windowType ? "rgba(30, 30, 50, 1)" : "rgba(0, 0, 0, 1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    height: windowType === "experience" ? "auto" : "80vh",
    width: "100%",
    minHeight: windowType === "experience" ? "400px" : "auto",
    transition: "background-color 0.3s ease",
  });

  const headerStyle = {
    padding: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const contentStyle = {
    flex: 1,
    overflowY: "auto" as const,
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          animation: "typing 1.4s infinite ease-in-out",
          animationDelay: "0s",
        }}
      ></div>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          animation: "typing 1.4s infinite ease-in-out",
          animationDelay: "0.2s",
        }}
      ></div>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          animation: "typing 1.4s infinite ease-in-out",
          animationDelay: "0.4s",
        }}
      ></div>
      <style>
        {`
          @keyframes typing {
            0%, 60%, 100% {
              transform: translateY(0);
              opacity: 0.4;
            }
            30% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );

  return (
    <div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#000",
          padding: "40px 80px",
          gap: "40px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* Left Column - Chat Window */}
        <div
          style={{
            width: "35%",
            maxWidth: "450px",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseEnter={() => setHoveredWindow("chat")}
          onMouseLeave={() => setHoveredWindow(null)}
        >
          <div style={getWindowStyle("chat")}>
            {/* Chat header */}
            <div style={headerStyle}>
              <div style={dotStyle("#ff5f56")} />
              <div style={dotStyle("#ffbd2e")} />
              <div style={dotStyle("#27c93f")} />
              <div
                style={{
                  marginLeft: "10px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.9rem",
                }}
              >
                <p>Alex Li</p>
              </div>
            </div>

            {/* Messages container */}
            <div style={{ ...contentStyle, gap: "15px" }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf:
                      message.sender === "bot" ? "flex-start" : "flex-end",
                    maxWidth: "90%",
                    padding: "15px",
                    borderRadius:
                      message.sender === "bot"
                        ? "18px 18px 18px 4px"
                        : "18px 18px 4px 18px",
                    backgroundColor:
                      message.sender === "bot"
                        ? "rgba(22, 33, 62, 0.8)"
                        : "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    fontSize: "0.95rem",
                    lineHeight: "1.5",
                    animation: "fadeIn 0.3s ease-out",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {message.isTyping ? (
                    <TypingIndicator />
                  ) : Array.isArray(message.text) ? (
                    (message.text as string[]).map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        style={{
                          margin: pIndex === 0 ? "0 0 15px 0" : "15px 0",
                          ...(pIndex ===
                            (message.text as string[]).length - 1 && {
                            marginBottom: 0,
                          }),
                        }}
                      >
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    message.text
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              style={{
                padding: "15px 20px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleSend}
                disabled={aboutMeShown || isTyping}
                style={buttonStyle(aboutMeShown || isTyping)}
                onMouseEnter={(e) =>
                  handleButtonHover(e, aboutMeShown || isTyping)
                }
                onMouseLeave={(e) =>
                  handleButtonLeave(e, aboutMeShown || isTyping)
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22 11 13 2 9 22 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Single Experience Window */}
        <div
          style={{
            width: "50%",
            maxWidth: "600px",
            minWidth: "400px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={getWindowStyle("experience")}>
            <div style={headerStyle}>
              <div style={dotStyle("#ff5f56")} />
              <div style={dotStyle("#ffbd2e")} />
              <div style={dotStyle("#27c93f")} />
              <div
                style={{
                  marginLeft: "10px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.9rem",
                }}
              >
                <p>Experience</p>
              </div>
            </div>
            <div style={contentStyle}>
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredExperience(index)}
                  onMouseLeave={() => setHoveredExperience(null)}
                  style={{
                    padding: "15px",
                    borderRadius: "8px",
                    borderBottom:
                      index === experiences.length - 1
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    gap: "20px",
                    position: "relative",
                    backgroundColor:
                      hoveredExperience === index
                        ? "rgba(30, 30, 50, 0.8)"
                        : "transparent",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {/* Text Content */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        color: "white",
                        marginBottom: "8px",
                        fontSize: "1.1rem",
                      }}
                    >
                      {exp.company}
                    </h3>
                    <p
                      style={{
                        color: "white",
                        marginBottom: "8px",
                        fontWeight: "500",
                      }}
                    >
                      {exp.role}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "10px",
                        lineHeight: "1.5",
                      }}
                    >
                      {exp.description}
                    </p>
                    <div style={{ display: "flex", gap: "15px" }}>
                      {exp.date && (
                        <span
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {exp.date}
                        </span>
                      )}
                      {exp.location && (
                        <span
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company Logo */}
                  {exp.logo && (
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={52}
                        height={52}
                        style={{
                          objectFit: "contain",
                          padding: "8px",
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://via.placeholder.com/100?text=Logo";
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components and functions
const dotStyle = (color: string) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: color,
});

const buttonStyle = (disabled: boolean) => ({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "all 0.3s ease",
  opacity: disabled ? 0.5 : 1,
});

const handleButtonHover = (
  e: React.MouseEvent<HTMLButtonElement>,
  disabled: boolean
) => {
  if (!disabled) {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 255, 255, 0.2)";
  }
};

const handleButtonLeave = (
  e: React.MouseEvent<HTMLButtonElement>,
  disabled: boolean
) => {
  if (!disabled) {
    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }
};
