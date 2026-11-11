"use client";

import Image from "next/image";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import styles from "../agely/agely.module.css";
import diagram from "@/components/diagram.module.css";

const GITHUB = "https://github.com/itsalexli/Vibe-Compose";
const DEMO = "https://www.youtube.com/watch?v=hml_W2O7lKw";

const tools = ["Next.js", "React", "TypeScript", "Tailwind CSS", "abcjs", "DeepSeek API", "jsPDF"];

const pillars = [
  {
    title: "AI co-pilot",
    body: "Describe what you want, like “a melancholic melody in D minor”, and get a playable score back.",
  },
  {
    title: "Live notation editor",
    body: "Edit the music directly in ABC notation, with syntax highlighting for notes and bar lines.",
  },
  {
    title: "Sheet music in real time",
    body: "Every change re-renders the score instantly, with audio playback to hear what you wrote.",
  },
  {
    title: "PDF export",
    body: "Download a clean, high-resolution score, ready to print or share.",
  },
];

const details = [
  "Each request sends the current score along with the prompt, so the AI refines your music instead of starting over.",
  "The prompt keeps the AI to valid ABC notation with sensible line lengths, and empty or failed responses never overwrite your work.",
  "AI output and manual edits flow into the same score, so the rest of the app doesn’t care where a change came from.",
  "The editor layers highlighted text under a transparent text box, giving a code-editor feel without a heavy editor library.",
  "PDF export runs fully in the browser, rendering the score at 3× resolution for sharp prints.",
];

export default function VibeComposePage() {
  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.topLink}>
            ← Back
          </Link>
          <div className={styles.topLinks}>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={styles.topLink}>
              GitHub ↗
            </a>
            <a href={DEMO} target="_blank" rel="noopener noreferrer" className={styles.topLink}>
              Demo ↗
            </a>
          </div>
        </header>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Vibe Compose</h1>
          <p className={styles.subtitle}>Open-source project, 2025</p>
        </div>

        <div className={styles.hero}>
          <Image
            src="/VibeCompose.jpg"
            alt="Vibe Compose editor with ABC notation next to rendered sheet music"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className={styles.vignette} />
        </div>

        <section id="why" className={styles.why}>
          <h2 className={styles.sectionTitle}>Why I built it</h2>
          <p className={styles.body}>
            Music has been part of my life for as long as I can remember. I&apos;ve played{" "}
            <strong>piano for 14 years, cello for 9 and guitar for 6</strong>, and some of my favourite
            moments have been writing my own songs.
          </p>
          <p className={styles.body}>
            Composing is a joy, but writing music down is hard to get into without years of theory. I
            wanted to <strong>share that feeling with everybody</strong>: a tool where anyone can
            describe an idea and see it become real sheet music.
          </p>
        </section>

        <div className={styles.meta}>
          <div>
            <h3 className={styles.metaLabel}>Type</h3>
            <p className={styles.metaText}>Open-source project</p>

            <h3 className={styles.metaLabel}>Tools</h3>
            <ul className={styles.metaList}>
              {tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.metaLabel}>Overview</h3>
            <p className={styles.metaText}>
              An AI code editor for classical music. Chat with a composing co-pilot, edit the notation
              yourself, and watch it turn into sheet music in real time.
            </p>
            <p className={styles.metaText}>
              Built with Next.js and abcjs, with playback and PDF export right in the browser.
            </p>
          </div>
        </div>

        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.body}>
            Vibe Compose works like a <strong>code editor, but for music</strong>. Instead of code, you
            write in <strong>ABC notation</strong>, a simple text format for sheet music, and an AI
            co-pilot helps you write and revise it.
          </p>

          <div className={styles.pillars}>
            {pillars.map((p) => (
              <div key={p.title}>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarBody}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" className={styles.section}>
          <h2 className={styles.sectionTitle}>Demo</h2>
          <div className={styles.embed}>
            <iframe
              src="https://www.youtube-nocookie.com/embed/hml_W2O7lKw"
              title="Vibe Compose demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.body}>
            Everything runs in the browser except the AI. Your prompt and the current score go to the{" "}
            <strong>AI model</strong>, which sends back ABC notation. That feeds a{" "}
            <strong>single shared score</strong>, which the editor, the sheet music and the export all
            read from.
          </p>

          {/* Rough, high-level architecture */}
          <div className={diagram.diagram} role="img" aria-label="Rough architecture diagram">
            <div className={diagram.tier}>
              <p className={diagram.tierLabel}>Vibe Compose, in the browser</p>
              <div className={diagram.row}>
                <div className={diagram.box}>Chat co-pilot</div>
                <div className={diagram.box}>Notation editor</div>
                <div className={diagram.box}>Sheet music + playback</div>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓ prompt + current score</span>
            </div>

            <div className={diagram.row}>
              <div className={`${diagram.box} ${diagram.boxAccent}`}>
                AI model
                <span className={diagram.boxSub}>DeepSeek, returns ABC notation</span>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓</span>
            </div>

            <div className={diagram.row}>
              <div className={diagram.box}>
                Shared score
                <span className={diagram.boxSub}>one source of truth for AI and manual edits</span>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓</span>
              <span>↓</span>
            </div>

            <div className={diagram.row}>
              <div className={diagram.box}>
                Renderer
                <span className={diagram.boxSub}>abcjs draws the score and plays audio</span>
              </div>
              <div className={diagram.box}>
                PDF export
                <span className={diagram.boxSub}>high-resolution score, made in the browser</span>
              </div>
            </div>
          </div>

          <h3 className={styles.subheading}>Details I&apos;m proud of</h3>
          <ul className={styles.bulletList}>
            {details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <Link href="/" className={styles.topLink}>
            ← Back to home
          </Link>
        </footer>
      </main>
    </div>
  );
}
