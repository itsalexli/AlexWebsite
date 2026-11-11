"use client";

import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import styles from "../agely/agely.module.css";
import diagram from "@/components/diagram.module.css";


const focus = ["0→1 product", "Generative AI", "UX"];

const booths = [
  {
    title: "Character Designer",
    body: "Kids sketch and write on a canvas, and their scribbles become animated, walking pixel-art characters.",
  },
  {
    title: "World Designer",
    body: "Describe a world in plain words, like a beach, a castle or outer space, and get a custom 2D map to explore.",
  },
  {
    title: "Sound Designer",
    body: "Describe a feeling, and Wundr picks an ambient chiptune soundtrack to match.",
  },
  {
    title: "Parent Portal",
    body: "Parents paste in study notes, and Wundr turns them into in-game Battle Challenges at the right difficulty.",
  },
];

export default function WundrPage() {
  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.topLink}>
            ← Back
          </Link>
          <a href="#demo" className={styles.topLink}>
            Demo ↓
          </a>
        </header>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Wundr</h1>
          <p className={styles.subtitle}>Hackathon, 2026</p>
        </div>

        <div className={styles.hero}>
          <video
            src="/wundr-hero-loop.mp4"
            poster="/wundr-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Wundr game world animation"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className={styles.vignette} />
        </div>

        <section id="why" className={styles.why}>
          <h2 className={styles.sectionTitle}>Why we built it</h2>
          <p className={styles.body}>
            The average middle schooler spends <strong>more than 5 hours online every day</strong>. The
            problem isn&apos;t the time, it&apos;s that most of it is <strong>passive</strong>: apps built
            to hold attention, not to spark creativity.
          </p>
          <p className={styles.body}>
            People value things more when they help make them. So instead of handing kids another game,
            we wanted them to <strong>build their own</strong>, and learn from their schoolwork along the
            way, together with their parents.
          </p>
        </section>

        <div className={styles.meta}>
          <div>
            <h3 className={styles.metaLabel}>Event</h3>
            <p className={styles.metaText}>UofTHacks 13</p>

            <h3 className={styles.metaLabel}>Team</h3>
            <p className={styles.metaText}>Team of 4</p>

            <h3 className={styles.metaLabel}>Focus</h3>
            <ul className={styles.metaList}>
              {focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={styles.metaLabel}>Overview</h3>
            <p className={styles.metaText}>
              An AI game design studio where parents and kids co-create educational 2D RPGs from real
              study material.
            </p>
            <p className={styles.metaText}>
              We built a working generative AI workflow and a multi-modal creative studio that turns kids
              from passive players into game creators.
            </p>
          </div>
        </div>

        <section id="demo" className={styles.section}>
          <h2 className={styles.sectionTitle}>Demo</h2>
          <video
            src="/wundr-demo.mp4"
            poster="/wundr-poster.webp"
            controls
            playsInline
            preload="metadata"
            className={styles.demoVideo}
          />
        </section>

        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.body}>
            The hackathon&apos;s theme was <strong>identity</strong>, and we kept coming back to how
            little of kids&apos; screen time is about expressing who they are. Two things stand in the
            way:
          </p>
          <ul className={styles.bulletList}>
            <li>
              <strong>Game engines are hard.</strong> Tools like Unity or Godot are far out of reach for a
              7-year-old.
            </li>
            <li>
              <strong>Parents lack the tools.</strong> It&apos;s tough to turn a static worksheet into
              something the whole family wants to do.
            </li>
          </ul>
          <p className={styles.body}>
            Wundr removes both. Kids design every part of their game in their own words, and parents turn
            homework into the challenges inside it.
          </p>

          <div className={styles.pillars}>
            {booths.map((b) => (
              <div key={b.title}>
                <h3 className={styles.pillarTitle}>{b.title}</h3>
                <p className={styles.pillarBody}>{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.body}>
            To avoid the &quot;blank page&quot; problem, kids move through{" "}
            <strong>three guided booths</strong>, each with speech-to-text so they can just say what they
            want. Meanwhile, parents add the learning through the <strong>Parent Portal</strong>.
          </p>

          {/* Rough flow of how a game comes together */}
          <div className={diagram.diagram} role="img" aria-label="How a Wundr game comes together">
            <div className={diagram.row}>
              <div className={diagram.tier} style={{ flex: 3 }}>
                <p className={diagram.tierLabel}>Kid, by voice, sketch or text</p>
                <div className={diagram.row}>
                  <div className={diagram.box}>Character</div>
                  <div className={diagram.box}>World</div>
                  <div className={diagram.box}>Sound</div>
                </div>
              </div>
              <div className={diagram.tier} style={{ flex: 1 }}>
                <p className={diagram.tierLabel}>Parent</p>
                <div className={diagram.row}>
                  <div className={diagram.box}>Study notes</div>
                </div>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓</span>
            </div>

            <div className={diagram.row}>
              <div className={`${diagram.box} ${diagram.boxAccent}`}>
                Generative AI
                <span className={diagram.boxSub}>
                  sprites, tilemaps, soundtrack and age-matched Battle Challenges
                </span>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓</span>
            </div>

            <div className={diagram.row}>
              <div className={diagram.box}>
                A playable 2D RPG
                <span className={diagram.boxSub}>answer challenges to move through the story</span>
              </div>
            </div>
          </div>
        </section>

        <section id="takeaways" className={styles.section}>
          <h2 className={styles.sectionTitle}>Takeaways</h2>
          <p className={styles.body}>
            Wundr showed us how generative AI can turn <strong>passive screen time into creative,
            shared learning</strong>. When making a game is as easy as describing it, kids get a whole
            new way to create, and families get something to build together.
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
