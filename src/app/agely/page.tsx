"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import styles from "./agely.module.css";
import diagram from "@/components/diagram.module.css";

const DEVPOST = "https://devpost.com/software/agely";
const GITHUB = "https://github.com/itsalexli/GentlePage";

const tools = ["Python", "FastAPI", "JavaScript", "Supabase"];

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
    title: "Simplify page",
    body: "One button turns a cluttered page into a clean, plain-language summary with clear headings and short lists.",
  },
  {
    title: "Built for seniors",
    body: "Large targets, short steps and a calm interface for people with lower digital literacy.",
  },
];

// Simplify page demo video. The recording has the tool's voice panel in the
// bottom-left corner while it's on screen (before 2.76s and from 11.92s), and
// the Simplify button in the bottom-right. During those stretches the frame
// zooms in on the bottom-right so the button shows and the panel doesn't;
// the rest of the time it shows (nearly) the whole page.
const PANEL_GONE_AT = 2.76;
// Leaves time for the 0.8s zoom (plus timeupdate's ~0.25s lag) before 11.92s
const ZOOM_BACK_IN_AT = 10.8;

function SimplifyDemo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [zoomed, setZoomed] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Reduced motion: stay zoomed in, so the panel never shows
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const t = v.currentTime;
      setZoomed(t < PANEL_GONE_AT || t >= ZOOM_BACK_IN_AT);
    };
    // timeupdate fires a few times a second, which is close enough here
    v.addEventListener("timeupdate", update);
    v.addEventListener("seeked", update);
    return () => {
      v.removeEventListener("timeupdate", update);
      v.removeEventListener("seeked", update);
    };
  }, []);

  return (
    <div className={styles.videoCrop}>
      <video
        ref={ref}
        src="/agely-simplify.mp4"
        autoPlay
        loop
        muted
        playsInline
        data-zoomed={zoomed || undefined}
        aria-label="Agely simplifying a dense insurance web page into a plain-language summary"
      />
    </div>
  );
}

export default function AgelyPage() {
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
            <a href={DEVPOST} target="_blank" rel="noopener noreferrer" className={styles.topLink}>
              Devpost ↗
            </a>
          </div>
        </header>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Agely</h1>
          <p className={styles.subtitle}>Startup pitch, 2025</p>
        </div>

        <div className={styles.hero}>
          <Image src="/Agely.jpg" alt="Agely highlighting a button in Google Docs" fill priority style={{ objectFit: "cover" }} />
          <div className={styles.vignette} />
        </div>

        <section id="why" className={styles.why}>
          <h2 className={styles.sectionTitle}>Why I built it</h2>
          <p className={styles.body}>
            I&apos;ve volunteered <strong>more than 100 hours at senior homes</strong>. Over and over, I
            watched residents get stuck on simple things online and have to hand the screen to someone
            else. Technology that&apos;s meant to make life easier was quietly{" "}
            <strong>stripping away their autonomy</strong>.
          </p>
          <p className={styles.body}>
            I wanted to do something about it: a tool that lets seniors{" "}
            <strong>get around the web on their own</strong>, with the answer shown right on the page.
          </p>
        </section>

        <div className={styles.meta}>
          <div>
            <h3 className={styles.metaLabel}>Event</h3>
            <p className={styles.metaText}>SpurHacks 2025, Startup Track</p>

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
              A tool that helps seniors get around the web. Ask a question and Agely
              highlights exactly where to click.
            </p>
            <p className={styles.metaText}>
              Won 1st Place AI and Best Startup Speakers, with a $4,500 grant to keep building.
            </p>

            <h3 className={styles.metaLabel}>Team</h3>
            <ul className={styles.metaList}>
              <li>Me and a friend</li>
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
            When you ask a question, Agely <strong>scrapes the current page and takes a screenshot</strong>.
            It picks out the key elements, such as buttons, links and input fields, along with where each
            one sits on screen.
          </p>
          <p className={styles.body}>
            The question and page data go to a <strong>FastAPI backend</strong>, which matches the request to
            the right element. Agely then draws a highlight over that spot, guiding the user straight to what
            they need without changing the site underneath.
          </p>

          {/* Rough, high-level architecture */}
          <div className={diagram.diagram} role="img" aria-label="Rough architecture diagram">
            <div className={diagram.tier}>
              <p className={diagram.tierLabel}>Agely, running on any web page</p>
              <div className={diagram.row}>
                <div className={diagram.box}>Ask + highlight</div>
                <div className={diagram.box}>Simplify page</div>
                <div className={diagram.box}>Voice guide</div>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓ question + page content</span>
            </div>

            <div className={diagram.row}>
              <div className={`${diagram.box} ${diagram.boxAccent}`}>
                Python backend
                <span className={diagram.boxSub}>FastAPI</span>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓</span>
              <span>↓</span>
            </div>

            <div className={diagram.row}>
              <div className={diagram.box}>
                Element matching
                <span className={diagram.boxSub}>finds the button, link or field to highlight</span>
              </div>
              <div className={diagram.box}>
                Page simplifier
                <span className={diagram.boxSub}>pulls out the main content, rewrites it plainly</span>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓</span>
            </div>

            <div className={diagram.row}>
              <div className={diagram.box}>
                LLM
                <span className={diagram.boxSub}>understands questions, rewrites text</span>
              </div>
              <div className={diagram.box}>
                Voice AI
                <span className={diagram.boxSub}>explains the page out loud</span>
              </div>
              <div className={diagram.box}>
                Supabase
                <span className={diagram.boxSub}>session state</span>
              </div>
            </div>
          </div>
          <p className={styles.body} style={{ marginTop: 16 }}>
            The answer comes back to the page as a highlight, a simplified page or a spoken
            explanation.
          </p>

          <h3 className={styles.subheading}>Simplify page</h3>
          <p className={styles.body}>
            Some pages are hard to read even when you know where to click. The{" "}
            <strong>Simplify page</strong> button rewrites a dense page, like an insurance product
            page, into a <strong>short, plain-language version</strong> with clear headings and bullet
            points.
          </p>
          <SimplifyDemo />
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
            The SpurHacks Startup Track works less like a typical hackathon and more like a{" "}
            <strong>startup incubator pitch</strong>: you build a product and pitch it as a business.
            Despite most teams having four people, <strong>we did it with two</strong>, so I got to
            work across every part of it, from <strong>design to engineering to QA</strong>. We took
            home{" "}
            <strong>1st Place AI</strong> and <strong>Best Startup Speakers</strong>, along with a{" "}
            <strong>$4,500 grant</strong> to keep building.
          </p>
          <p className={styles.body}>
            And we did keep building. Since the pitch we&apos;ve added features like Simplify page, and
            we&apos;re working on supporting more sites, faster and more accurate detection, voice
            prompts and larger highlights, to grow Agely into a broader accessibility toolkit for
            seniors.
          </p>

          <figure className={styles.photo}>
            <Image
              src="/agely-spur.webp"
              alt="Alex and a friend at the Spur Innovation Centre holding a SpurHacks card"
              width={1394}
              height={1858}
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption>My friend and me at the Spur Innovation Centre.</figcaption>
          </figure>
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
