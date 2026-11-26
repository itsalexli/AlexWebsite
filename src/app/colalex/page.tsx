"use client";

import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import styles from "../agely/agely.module.css";
import diagram from "@/components/diagram.module.css";

const DEMO_EMBED = "https://www.youtube.com/embed/5K0gWmJ80HA";

const focus = ["3D / Three.js", "Assessment design", "AI grading"];

const skills = [
  {
    title: "Attention to detail",
    body: "Small things count: a hex head instead of a round one, or a shaft that's a little too thick.",
  },
  {
    title: "Spatial sense",
    body: "Can you judge size, proportion and position in 3D just by looking at a model?",
  },
  {
    title: "Breaking down shapes",
    body: "Seeing that a bolt is really a cylinder shaft with a hexagonal head on top.",
  },
  {
    title: "Working with real tools",
    body: "Moving, rotating and scaling parts with gizmos, like in a real CAD tool.",
  },
];

const features = [
  {
    title: "Recruiter dashboard",
    clip: "/colalex-dashboard.mp4",
    body: "Recruiters create assessments, track daily activity and see each candidate's latest result in one place.",
  },
  {
    title: "Target model",
    clip: "/colalex-target.mp4",
    body: "Each test starts with a reference model the candidate can orbit and inspect from any angle, with a timer running.",
  },
  {
    title: "Component toolbox",
    clip: "/colalex-build.mp4",
    body: "Candidates rebuild the target from basic shapes (cubes, spheres and cylinders), changing size, segments and colour, and placing each part with move, rotate and scale handles.",
  },
  {
    title: "AI verification",
    clip: "/colalex-verify.mp4",
    body: "On submit, the candidate's model is compared with the target and scored out of 10, with written feedback on what's off. Here, a plain red cylinder scores a 3 because the shape is close but the head and colour are wrong.",
  },
  {
    title: "Getting it right",
    clip: "/colalex-pass.mp4",
    body: "After adding a hexagonal head and matching the proportions and colour, the same bolt scores a 10.",
  },
  {
    title: "Candidate report",
    clip: "/colalex-report.mp4",
    body: "Every attempt is saved to the candidate's report, with scores, AI feedback and pass/fail status, so recruiters can see how someone improved.",
  },
];

export default function ColalexPage() {
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
          <h1 className={styles.title}>Colalex</h1>
          <p className={styles.subtitle}>3D modelling and spatial design assessments, 2026</p>
        </div>

        <div className={styles.hero}>
          <video
            src="/colalex-hero.mp4"
            poster="/colalex-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Building a bolt from basic shapes in Colalex"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className={styles.vignette} />
        </div>

        <section id="why" className={styles.why}>
          <h2 className={styles.sectionTitle}>Why I built it</h2>
          <p className={styles.body}>
            Software engineers get HackerRank. People who work in <strong>3D</strong> (designers,
            CAD drafters, technical artists) mostly get a portfolio review and a conversation, which
            says little about how carefully someone actually works.
          </p>
          <p className={styles.body}>
            Colalex is a <strong>HackerRank-style online assessment for 3D modelling</strong>. Candidates
            get a target model and rebuild it in the browser, and the result shows how well they notice
            detail and judge size and space.
          </p>
        </section>

        <div className={styles.meta}>
          <div>
            <h3 className={styles.metaLabel}>Type</h3>
            <p className={styles.metaText}>Personal project</p>

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
              A spatial reasoning test where candidates rebuild a 3D model from basic shapes, then get
              an AI score and feedback.
            </p>
            <p className={styles.metaText}>
              Recruiters create assessments and review every attempt from a dashboard.
            </p>
          </div>
        </div>

        <section id="what-it-tests" className={styles.section}>
          <h2 className={styles.sectionTitle}>What it tests</h2>
          <div className={styles.pillars}>
            {skills.map((s) => (
              <div key={s.title}>
                <h3 className={styles.pillarTitle}>{s.title}</h3>
                <p className={styles.pillarBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className={styles.section}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={diagram.diagram} role="img" aria-label="How a Colalex assessment works">
            <div className={diagram.row}>
              <div className={diagram.box}>
                Recruiter
                <span className={diagram.boxSub}>creates an assessment</span>
              </div>
              <div className={diagram.box}>
                Candidate
                <span className={diagram.boxSub}>rebuilds the target model</span>
              </div>
            </div>
            <div className={diagram.links}>
              <span>↓</span>
            </div>
            <div className={diagram.row}>
              <div className={`${diagram.box} ${diagram.boxAccent}`}>
                AI verification
                <span className={diagram.boxSub}>compares shape, size and colour, scores out of 10</span>
              </div>
            </div>
            <div className={diagram.links}>
              <span>↓</span>
            </div>
            <div className={diagram.row}>
              <div className={diagram.box}>
                Candidate report
                <span className={diagram.boxSub}>every attempt, score and piece of feedback</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className={styles.section}>
          <h2 className={styles.sectionTitle}>Features</h2>
          {features.map((f) => (
            <div key={f.title}>
              <h3 className={styles.subheading}>{f.title}</h3>
              <p className={styles.body}>{f.body}</p>
              <video
                src={f.clip}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={f.title}
                className={styles.demoVideo}
                style={{ marginTop: 16 }}
              />
            </div>
          ))}
        </section>

        <section id="demo" className={styles.section}>
          <h2 className={styles.sectionTitle}>Full demo</h2>
          <div className={styles.embed}>
            <iframe
              src={DEMO_EMBED}
              title="Colalex demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section id="whats-next" className={styles.section}>
          <h2 className={styles.sectionTitle}>What&apos;s next</h2>
          <p className={styles.body}>
            Bolts are a starting point. Next I want to bring the same format to harder, real-world
            work:
          </p>
          <ul className={styles.bulletList}>
            <li>
              <strong>More complex targets</strong>, like mechanical parts and assemblies with many
              components.
            </li>
            <li>
              <strong>Industry-specific tests</strong> for CAD, architecture and product design roles.
            </li>
            <li>
              <strong>Finer scoring</strong> that measures dimensions and tolerances, not just overall
              shape.
            </li>
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
