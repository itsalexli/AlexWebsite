"use client";

import Image from "next/image";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import styles from "./agely.module.css";

const DEVPOST = "https://devpost.com/software/agely";

const tools = ["Python", "FastAPI", "JavaScript", "Supabase", "Chrome Extensions"];

const pillars = [
  {
    title: "Ask in plain words",
    body: "Type or speak a question like “Where do I click to continue?” No menus or settings to learn.",
  },
  {
    title: "See the answer",
    body: "Agely highlights the exact button, link or field on the page instead of describing where it is.",
  },
  {
    title: "Works on any site",
    body: "It reads the page as it is, so the website itself never has to change.",
  },
  {
    title: "Built for seniors",
    body: "Large targets, short steps and a calm interface for people with lower digital literacy.",
  },
];

export default function AgelyPage() {
  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.topLink}>
            ← Back
          </Link>
          <a href={DEVPOST} target="_blank" rel="noopener noreferrer" className={styles.topLink}>
            Devpost ↗
          </a>
        </header>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Agely</h1>
          <p className={styles.subtitle}>Hackathon, 2025</p>
        </div>

        <div className={styles.hero}>
          <Image src="/Agely.jpg" alt="Agely highlighting a button in Google Docs" fill priority style={{ objectFit: "cover" }} />
          <div className={styles.vignette} />
        </div>

        <div className={styles.meta}>
          <div>
            <h3 className={styles.metaLabel}>Event</h3>
            <p className={styles.metaText}>SpurHacks 2025</p>

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
              A Chrome extension that helps seniors get around the web. Ask a question and Agely
              highlights exactly where to click.
            </p>
            <p className={styles.metaText}>
              Won 1st Place AI and Best Startup Speakers in the Startup Track ($4,500).
            </p>

            <h3 className={styles.metaLabel}>Team</h3>
            <ul className={styles.metaList}>
              <li>Jason Deng</li>
              <li>Alex Li</li>
            </ul>
          </div>
        </div>

        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.body}>
            Modern websites are full of <strong>tiny buttons, dense layouts and hidden interactions</strong>.
            For seniors and anyone with lower digital literacy, even a simple task can feel overwhelming.
            Agely brings <strong>clarity and confidence</strong> back to browsing by pointing to the answer
            right on the page.
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

        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.body}>
            When you ask a question, the extension <strong>scrapes the current page and takes a screenshot</strong>.
            It picks out the key elements, such as buttons, links and input fields, along with where each
            one sits on screen.
          </p>
          <p className={styles.body}>
            The question and page data go to a <strong>FastAPI backend</strong>, which matches the request to
            the right element. Agely then draws a highlight over that spot, guiding the user straight to what
            they need without changing the site underneath.
          </p>

          <div className={styles.figure}>
            <Image src="/Agely1.png" alt="Agely popup with a text box and microphone button" fill style={{ objectFit: "cover" }} />
          </div>
        </section>

        <section id="challenges" className={styles.section}>
          <h2 className={styles.sectionTitle}>Challenges</h2>
          <ul className={styles.bulletList}>
            <li>Mapping natural-language questions to the correct element on screen.</li>
            <li>Lining up DOM element coordinates with the screenshot so highlights land precisely.</li>
            <li>Handling visual differences across websites and layouts.</li>
            <li>Keeping the experience simple for seniors despite complex backend logic.</li>
          </ul>
        </section>

        <section id="results" className={styles.section}>
          <h2 className={styles.sectionTitle}>Results</h2>
          <p className={styles.body}>
            We built a working accessibility tool in a weekend and took home{" "}
            <strong>1st Place AI</strong> and <strong>Best Startup Speakers</strong> in the SpurHacks Startup
            Track.
          </p>
          <p className={styles.body}>
            Next, we want to support more sites and UI patterns, improve detection speed and accuracy, add
            voice prompts and larger highlights, and grow Agely into a broader accessibility toolkit for seniors.
          </p>
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
