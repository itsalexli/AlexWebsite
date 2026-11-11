"use client";

import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import { GRAIN, IBM_TINT } from "@/components/coverEffects";
import styles from "../agely/agely.module.css";
import ibm from "./ibm.module.css";
import diagram from "@/components/diagram.module.css";

const tools = [
  "React + TypeScript",
  "Node.js + Express",
  "Socket.IO",
  "Redis",
  "PostgreSQL",
  "ONNX models",
  "Datadog",
];

const pillars = [
  {
    title: "Fan chat",
    body: "A live chat room that opens right inside the team's app during the game, so fans can talk to each other in real time.",
  },
  {
    title: "Moderator console",
    body: "A live view for moderators to review flagged messages, approve or reject them, and time out or ban users.",
  },
  {
    title: "Admin tools",
    body: "Set up rooms, run promotions and manage the banned and safe word lists for each room.",
  },
  {
    title: "AI moderation",
    body: "Every message is checked automatically before it reaches the room, so moderators only see the hard calls.",
  },
];

// Moderation pipeline, one message at a time
const steps = [
  {
    title: "Fast filters",
    body: "Cheap in-memory checks for profanity (including leetspeak) and each room's banned words.",
  },
  {
    title: "Local AI models",
    body: "Three small models check language, toxicity and personal info. They run on our own servers, so there's no network call or per-message cost.",
  },
  {
    title: "Decision",
    body: "Allow it, reject it automatically, or send it to a moderator to decide.",
  },
];

export default function IbmPage() {
  return (
    <div className={styles.page}>
      <CustomCursor />

      <main className={styles.main}>
        <header className={styles.topBar}>
          <Link href="/" className={styles.topLink}>
            ← Back
          </Link>
        </header>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>IBM</h1>
          <p className={styles.subtitle}>AI Software Engineer Intern, 2026</p>
        </div>

        <div className={styles.hero} style={{ background: IBM_TINT }}>
          <video
            src="/ibm-hype.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="IBM logo animation"
            className={ibm.heroVideo}
          />
          <div className={ibm.grain} style={{ backgroundImage: GRAIN }} />
          <div className={styles.vignette} />
        </div>

        <div className={styles.meta}>
          <div>
            <h3 className={styles.metaLabel}>Role</h3>
            <p className={styles.metaText}>AI Software Engineer Intern, Toronto</p>

            <h3 className={styles.metaLabel}>Team</h3>
            <p className={styles.metaText}>A lean team of 3 engineers</p>

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
              A real-time chat platform for a client&apos;s professional sports teams. Fans open a
              chat room right inside the team&apos;s app and talk with each other during NBA, NHL and
              MLS games.
            </p>
            <p className={styles.metaText}>
              I built across the whole stack, from the fan-facing chat to the moderation pipeline, met
              with the client one-on-one, and one of my suggestions made it into the product.
            </p>
          </div>
        </div>

        <section id="overview" className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.body}>
            Game nights are loud, and fans want to be part of the conversation. The platform gives
            them a <strong>portal to talk to each other live</strong>, right inside the team&apos;s app,
            with thousands of fans in a single room.
          </p>
          <p className={styles.body}>
            A room that size only works if it stays safe, so <strong>moderation was just as important
            as the chat itself</strong>. Alongside the fan chat, we built the views moderators and
            admins use to keep every room in check.
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
            The chat ships as an <strong>SDK that the team&apos;s app imports</strong>. It talks to two
            backend services: a <strong>REST API</strong> for things like rooms, promotions and word
            lists, and a <strong>WebSocket gateway</strong> for live messages and moderation actions.
            Background workers handle the moderation, with Redis and PostgreSQL underneath.
          </p>

          {/* Simplified, high-level architecture */}
          <div className={diagram.diagram} role="img" aria-label="Simplified architecture diagram">
            <div className={diagram.tier}>
              <p className={diagram.tierLabel}>Team&apos;s app + chat SDK</p>
              <div className={diagram.row}>
                <div className={diagram.box}>Fan chat</div>
                <div className={diagram.box}>Moderator console</div>
                <div className={diagram.box}>Admin tools</div>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓ HTTP</span>
              <span>↓ WebSocket</span>
            </div>

            <div className={diagram.row}>
              <div className={diagram.box}>
                Chat API
                <span className={diagram.boxSub}>rooms, promos, word lists, bans</span>
              </div>
              <div className={diagram.box}>
                Realtime gateway
                <span className={diagram.boxSub}>live messages, mod actions</span>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓ jobs</span>
            </div>

            <div className={diagram.row}>
              <div className={`${diagram.box} ${diagram.boxAccent}`}>
                Moderation workers
                <span className={diagram.boxSub}>filters → AI models → decision</span>
              </div>
            </div>

            <div className={diagram.links}>
              <span>↓</span>
            </div>

            <div className={diagram.row}>
              <div className={diagram.box}>
                Redis
                <span className={diagram.boxSub}>pub/sub, cache, queues</span>
              </div>
              <div className={diagram.box}>
                PostgreSQL
                <span className={diagram.boxSub}>rooms, messages, audit logs</span>
              </div>
            </div>
          </div>

          <h3 className={ibm.subheading}>Moderation pipeline</h3>
          <p className={styles.body}>
            Every message goes through a <strong>fast, two-tier check</strong> before fans see it.
          </p>
          <ol className={ibm.steps}>
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className={ibm.stepNum}>{i + 1}</span>
                <div>
                  <h4 className={styles.pillarTitle}>{s.title}</h4>
                  <p className={styles.pillarBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.body}>
            As a backstop, a scheduled job has an LLM <strong>sweep recent messages in live
            rooms</strong> for anything the first pass missed, like threats, scams or doxxing. It
            batches messages and skips entirely when no game is live, so it costs nothing off-hours.
          </p>
        </section>

        <section id="client" className={styles.section}>
          <h2 className={styles.sectionTitle}>Working with the client</h2>
          <p className={styles.body}>
            One of the coolest parts was getting to <strong>sit down with the client one-on-one</strong>.
            I heard first-hand what their teams and moderators needed, brought ideas back to the team,
            and <strong>one of my suggestions was built into the product</strong>.
          </p>
          <p className={styles.body}>
            It made the internship feel like being a <strong>forward-deployed engineer</strong>: talk to
            the people using what you build, then go fix it and ship the change. With a team of three,
            I got to own real pieces of the system end to end.
          </p>
        </section>

        <section id="quality" className={styles.section}>
          <h2 className={styles.sectionTitle}>Reliability</h2>
          <ul className={styles.bulletList}>
            <li>Wrote unit tests across the chat and moderation code.</li>
            <li>
              Added Datadog monitoring across 300+ concurrent chat rooms, keeping 99.9% uptime.
            </li>
            <li>Cached and persisted messages with Redis and PostgreSQL for the moderator dashboards.</li>
            <li>Added rate limiting and auto-ban controls so bad actors are stopped automatically.</li>
          </ul>
        </section>

        <section id="takeaways" className={styles.section}>
          <h2 className={styles.sectionTitle}>Takeaways</h2>
          <p className={styles.body}>
            This summer reminded me how much I <strong>love engineering</strong>: building something
            thousands of fans use on game night, hearing from the client directly, and fixing things fast
            when they mattered.
          </p>
          <p className={styles.body}>
            Most of all, I <strong>loved my team</strong>. Some of the interns and I even biked to
            work together: <strong>41 km, and we still made it in before 9:00am</strong>. The team
            also made me a card at the end, which meant a lot.
          </p>
        </section>

        {/* Bike ride and the team's card, side by side at the bottom */}
        <div className={ibm.photos}>
          <figure className={ibm.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ibm-bike-to-work.webp"
              alt="Alex and two interns with their bikes outside the IBM office, with a 40.98 km Strava ride"
            />
            <figcaption>Biked 41 km to the office with the interns.</figcaption>
          </figure>
          <figure className={ibm.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ibm-card.jpg" alt="Trading card of Alex in a Raptors jersey, made by the team" />
            <figcaption>The card my team made for me.</figcaption>
          </figure>
        </div>

        <footer className={styles.footer}>
          <Link href="/" className={styles.topLink}>
            ← Back to home
          </Link>
        </footer>
      </main>
    </div>
  );
}
