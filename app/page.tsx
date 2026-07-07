"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Send,
  MessageCircle,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

// Drop your links in below — leave "" to hide that link on a row.
const PROJECTS = [
  {
    name: "SuiSend",
    status: "LIVE",
    detail: "Payment links with built-in yield generation via Scallop.",
    stack: ["Sui Move", "Next.js", "Scallop"],
    meta: "Sui Overflow 2026 · mainnet",
    github: "https://github.com/Mofe-Bankole/SuiSend",
    demo: "https://suisend.xyz",
  },
  {
    name: "Nerve Pipeline",
    status: "BUILDING",
    detail:
      "Solana infra combining Yellowstone gRPC, Jito MEV bundles, and an AI retry agent.",
    stack: ["Yellowstone gRPC", "Jito", "AI agent"],
    meta: "Superteam × SOLINFRA × Jito bounty",
    github: "https://github.com/Mofe-Bankole/Nerve",
    demo: "https://x.com/0xcryptooracle/status/2071336561627787391?s=20",
  },
  {
    name: "Tekumi",
    status: "SHIPPED",
    detail:
      "ElizaOS agent for indie game discovery, monetized via affiliate deals.",
    stack: ["ElizaOS", "Next.js", "Docker"],
    meta: "Green Man Gaming · Fanatical · GOG",
    github: "https://github.com/Mofe-Bankole/Tekumi",
    demo: "",
  },
  {
    name: "Arez",
    status: "SHIPPED",
    detail: "Privacy-preserving payroll built on Umbra, Arcium ZK, and Helius.",
    stack: ["Next.js", "Umbra SDK", "Arcium"],
    meta: "Solana Frontier Hackathon",
    github: "https://github.com/Mofe-Bankole/Arez",
    demo: "https://arezonsol.vercel.app/",
  },
  {
    name: "paymoji.sol",
    status: "SHIPPED",
    detail: "A naming and identity dApp for Solana wallets.",
    stack: ["Solana", "Next.js", "Tailwind"],
    meta: "Personal build",
    github: "https://github.com/Mofe-Bankole/Paymoji.sol",
    demo: "https://paymoji-six.vercel.app/",
  },
  {
    name: "Tudor",
    status: "SHIPPED",
    detail:
      "Telegram Mini App for NGN conversion, priced off live FX and crypto rates.",
    stack: ["Next.js", "GrammY", "CoinGecko API"],
    meta: "Hackathon build",
    github: "https://github.com/Mofe-Bankole/Tudor",
    demo: "",
  },
  {
    name: "OKX AI Genesis — agent track",
    status: "IN PROGRESS",
    detail: "An autonomous agent submission currently in build.",
    stack: ["AI agent", "TypeScript"],
    meta: "Deadline · Jul 17, 2026",
    github: "",
    demo: "",
  },
  {
    name: "TxODDS World Cup Hackathon",
    status: "IN PROGRESS",
    detail: "A prediction-market concept for live match data.",
    stack: ["Prediction markets", "TypeScript"],
    meta: "Deadline · Jul 29, 2026",
    github: "",
    demo: "",
  },
];

const ABOUT_FACTS = [
  { label: "Based in", value: "Ibadan, Nigeria" },
  { label: "Focus", value: "Solana · Sui · multi-chain agents" },
  { label: "Currently", value: "OKX AI Genesis + TxODDS hackathons" },
];

const PRINCIPLES = [
  {
    title: "Ship first, tune later",
    body: "Working software on mainnet beats a polished deck every time. I default to shipping something real, then iterating in public.",
  },
  {
    title: "Compete on purpose",
    body: "Hackathons are a repeated game. Reputation and skill compound faster than any single prize, so I treat every entry as proof of work, not a lottery ticket.",
  },
  {
    title: "One builder, full stack",
    body: "Contracts, backend, frontend — I own the whole chain myself. Nothing gets lost in translation between people who don't talk to each other.",
  },
];

const STACK_GROUPS = [
  {
    label: "Chains",
    items: ["Solana", "Sui", "Ethereum", "Avalanche", "Monad", "Starknet"],
  },
  {
    label: "Languages",
    items: ["TypeScript", "Rust", "Golang", "JavaScript"],
  },
  { label: "Contracts", items: ["Anchor", "Sui Move", "Polkadot"] },
  {
    label: "Backend",
    items: ["Fastify", "Node.js", "Hono.js", "Express", "Deno"],
  },
  { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
  { label: "Agents", items: ["ElizaOS", "OpenRouter", "OpenCode"] },
  { label: "Auth", items: ["Privy", "zkLogin", "WalletConnect"] },
];

const TRACK_RECORD = [
  { org: "Superteam Nigeria", role: "Member" },
  { org: "Sui Overflow 2026", role: "Shipped SuiSend" },
  { org: "Solana Frontier Hackathon", role: "Entered with ECM & Arez" },
  { org: "SOLINFRA × Jito bounty", role: "Building Nerve Pipeline" },
  { org: "OKX AI Genesis Hackathon", role: "In progress — agent track" },
  { org: "TxODDS World Cup Hackathon", role: "In progress" },
];

// Drop your real handles/links in below.
const CONTACTS = [
  {
    platform: "Email",
    value: "bankoleadedotun16@gmail.com",
    href: "mailto:bankoleadedotun16@gmail.com",
    Icon: Mail,
  },
  {
    platform: "X",
    value: "@Mofe_bnks",
    href: "https://x.com/Mofe_bnks",
    Icon: FaTwitter,
  },
  {
    platform: "GitHub",
    value: "Mofe-Bankole",
    href: "https://github.com/Mofe-Bankole",
    Icon: FaGithub,
  },
  {
    platform: "Telegram",
    value: "@Mofe_banks",
    href: "https://t.me/@Mofe_banks",
    Icon: Send,
  },
  {
    platform: "WhatsApp",
    value: "Message me",
    href: "https://wa.me/2348158214901",
    Icon: MessageCircle,
  },
  {
    platform: "Discord",
    value: "lmn_3x",
    href: "https://discord.com/users/lmn_3x",
    Icon: MessageSquare,
  },
];

function hashish(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return "0x" + h.toString(16).padStart(8, "0").slice(0, 8);
}

function statusClass(status: string) {
  if (status === "LIVE") return "pill pill-live";
  if (status === "SHIPPED") return "pill pill-shipped";
  if (status === "BUILDING") return "pill pill-building";
  return "pill pill-progress";
}

function LedgerRow({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ledger-row ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${Math.min(index * 60, 400)}ms` }}
    >
      <div className="ledger-hash">{hashish(project.name)}</div>
      <div className="ledger-main">
        <div className="ledger-top">
          <span className={statusClass(project.status)}>
            {project.status === "LIVE" && <span className="dot" />}
            {project.status}
          </span>
          <h3 className="ledger-name">{project.name}</h3>
        </div>
        <p className="ledger-detail">{project.detail}</p>
        <div className="ledger-tags">
          {project.stack.map((s: string) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
          <span className="ledger-meta">{project.meta}</span>
        </div>
        {(project.github || project.demo) && (
          <div className="ledger-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="ledger-link-btn"
              >
                <FaGithub size={13} strokeWidth={2} /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="ledger-link-btn"
              >
                <ArrowUpRight size={13} strokeWidth={2} /> Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

        :root {
          --paper: #F3F5F4;
          --paper-raised: #ECEFED;
          --ink: #12181B;
          --ink-soft: #4A5559;
          --ink-faint: #7C8A8D;
          --signal: #1F6F54;
          --signal-soft: #DCEAE4;
          --accent: #B5652A;
          --accent-soft: #F2E4D6;
          --line: #D7DBD9;
        }

        * { box-sizing: border-box; }

        .page {
          background: var(--paper);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          line-height: 1.5;
          min-height: 100%;
          width: 100%;
        }

        .page h1, .page h2, .page h3 {
          font-family: 'Space Grotesk', sans-serif;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .mono { font-family: 'JetBrains Mono', monospace; }

        .accent-word {
          color: var(--signal);
          font-weight: 700;
        }

        .wrap {
          max-width: 880px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-faint);
          margin-bottom: 14px;
        }

        nav.topbar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(243, 245, 244, 0.88);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid var(--line);
        }

        .topbar-inner {
          max-width: 880px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 16px;
        }

        .navlinks { display: flex; gap: 22px; }

        .navlinks button {
          background: none;
          border: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: var(--ink-soft);
          cursor: pointer;
          padding: 4px 0;
        }

        .navlinks button:hover, .navlinks button:focus-visible { color: var(--ink); }

        section { padding: 72px 0; border-bottom: 1px solid var(--line); }
        section:last-of-type { border-bottom: none; }

        .hero { padding-top: 88px; padding-bottom: 56px; }
        .hero h1 { font-size: 44px; font-weight: 700; max-width: 700px; }

        .hero-sub {
          margin-top: 18px;
          font-size: 17px;
          color: var(--ink-soft);
          max-width: 560px;
        }

        .hero-actions {
          margin-top: 32px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 11px 18px;
          border-radius: 3px;
          cursor: pointer;
          border: 1px solid var(--ink);
          background: var(--ink);
          color: var(--paper);
          transition: transform 0.15s ease, background 0.15s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .btn:hover { transform: translateY(-1px); background: #232D31; }
        .btn-ghost { background: transparent; color: var(--ink); }
        .btn-ghost:hover { background: var(--paper-raised); }

        .live-strip {
          margin-top: 40px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--line);
          background: var(--paper-raised);
          border-radius: 4px;
          padding: 10px 14px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--ink-soft);
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--signal);
          display: inline-block;
          margin-right: 6px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        .live-strip a { color: var(--signal); text-decoration: none; font-weight: 600; }
        .live-strip a:hover { text-decoration: underline; }

        .section-head { margin-bottom: 36px; }
        .section-head h2 { font-size: 26px; font-weight: 600; }

        .about-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
        }

        .about-text p {
          color: var(--ink-soft);
          font-size: 15.5px;
          margin: 0 0 16px 0;
        }

        .about-text p:last-child { margin-bottom: 0; }

        .about-facts {
          display: flex;
          flex-direction: column;
          gap: 0;
          height: fit-content;
          border-top: 1px solid var(--line);
        }

        .about-fact {
          padding: 14px 0;
          border-bottom: 1px solid var(--line);
        }

        .about-fact-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-faint);
          margin-bottom: 4px;
        }

        .about-fact-value { font-size: 14.5px; font-weight: 500; }

        .ledger-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 20px;
          padding: 22px 0;
          border-top: 1px solid var(--line);
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s ease;
        }

        .ledger-row.is-visible { opacity: 1; transform: translateY(0); }

        .ledger-row:hover {
          background: var(--paper-raised);
          border-left: 2px solid var(--signal);
          padding-left: 10px;
          margin-left: -12px;
        }

        .ledger-hash {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--ink-faint);
          padding-top: 3px;
        }

        .ledger-top { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .ledger-name { font-size: 18px; font-weight: 600; }

        .ledger-detail {
          margin: 10px 0 12px 0;
          color: var(--ink-soft);
          font-size: 14.5px;
          max-width: 520px;
        }

        .ledger-tags { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--ink-soft);
          background: var(--paper-raised);
          border: 1px solid var(--line);
          border-radius: 3px;
          padding: 3px 8px;
        }

        .ledger-meta {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--ink-faint);
          margin-left: 4px;
        }

        .ledger-links { display: flex; gap: 14px; margin-top: 12px; }

        .ledger-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--ink-soft);
          text-decoration: none;
          border-bottom: 1px solid transparent;
        }

        .ledger-link-btn:hover { color: var(--signal); border-bottom-color: var(--signal); }

        .pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.03em;
          padding: 3px 9px;
          border-radius: 20px;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .pill-live { background: var(--signal-soft); color: var(--signal); font-weight: 600; }
        .pill-shipped { border: 1px solid var(--line); color: var(--ink-soft); }
        .pill-building { border: 1px solid var(--accent); color: var(--accent); }
        .pill-progress { border: 1px dashed var(--accent); color: var(--accent); }

        .principles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .principle-card h3 { font-size: 17px; margin-bottom: 10px; }
        .principle-card p { color: var(--ink-soft); font-size: 14.5px; }

        .stack-groups { display: flex; flex-direction: column; gap: 18px; }

        .stack-row {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 16px;
          align-items: baseline;
          padding: 14px 0;
          border-top: 1px solid var(--line);
        }

        .stack-row:first-child { border-top: none; }

        .stack-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-faint);
        }

        .stack-items { display: flex; gap: 8px; flex-wrap: wrap; }

        .track-list { display: flex; flex-direction: column; }

        .track-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 0;
          border-top: 1px solid var(--line);
          font-size: 14.5px;
        }

        .track-row:first-child { border-top: none; }
        .track-org { font-weight: 600; }

        .track-role {
          color: var(--ink-soft);
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          text-align: right;
        }

        .contact h2 { font-size: 30px; max-width: 500px; }

        .contact-sub {
          margin-top: 14px;
          color: var(--ink-soft);
          font-size: 15px;
          max-width: 480px;
        }

        .contact-grid {
          margin-top: 32px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 1px solid var(--line);
          border-radius: 4px;
          text-decoration: none;
          color: var(--ink);
          background: var(--paper);
          transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
        }

        .contact-card:hover {
          border-color: var(--signal);
          background: var(--paper-raised);
          transform: translateY(-1px);
        }

        .contact-icon {
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 50%;
          background: var(--paper-raised);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--signal);
        }

        .contact-card:hover .contact-icon { background: var(--signal-soft); }

        .contact-platform {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-faint);
        }

        .contact-value { font-size: 14px; font-weight: 500; }

        footer {
          padding: 28px 0 48px 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--ink-faint);
          display: flex;
          justify-content: space-between;
        }

        @media (max-width: 640px) {
          .hero h1 { font-size: 32px; }
          .principles { grid-template-columns: 1fr; }
          .about-grid { grid-template-columns: 1fr; gap: 28px; }
          .ledger-row { grid-template-columns: 1fr; }
          .ledger-hash { display: none; }
          .stack-row { grid-template-columns: 1fr; gap: 6px; }
          .contact-grid { grid-template-columns: 1fr; }
          .navlinks { display: none; }
          footer { flex-direction: column; gap: 6px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ledger-row, .dot { transition: none; animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <nav className="topbar">
        <div className="topbar-inner">
          <span className="brand">Mofe</span>
          <div className="navlinks">
            <button onClick={() => scrollTo("about")}>About</button>
            <button onClick={() => scrollTo("ledger")}>Shipped</button>
            <button onClick={() => scrollTo("approach")}>Approach</button>
            <button onClick={() => scrollTo("stack")}>Stack</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </div>
        </div>
      </nav>

      <div className="wrap">
        <header className="hero">
          <div className="eyebrow">
            Solo builder · Solana | Sui | Ethereum | Avalanche | Monad · Ibadan,
            Nigeria
          </div>
          <h1>
            I ship full-stack products on{" "}
            <span className="accent-word">any chain</span> — alone, in public,
            on deadline.
          </h1>
          <p className="hero-sub">
            Full-stack blockchain developer. Member of Superteam Nigeria. I
            write the contracts, the backend, and the frontend myself, and I use
            hackathons as a running proof of work.
          </p>
          <div className="hero-actions">
            <button className="btn" onClick={() => scrollTo("ledger")}>
              View the ledger
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => scrollTo("contact")}
            >
              Get in touch
            </button>
          </div>
          <div className="live-strip">
            <span className="dot" />
            LIVE ON MAINNET ·{" "}
            <a href="https://suisend.xyz" target="_blank" rel="noreferrer">
              SuiSend → suisend.xyz
            </a>
          </div>
        </header>

        <section id="about">
          <div className="section-head">
            <div className="eyebrow">Who I am</div>
            <h2>About</h2>
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a solo full-stack developer building on Solana, Sui, and
                whatever chain the problem calls for. Most of what I build
                starts as a hackathon entry and ends up as something people
                actually use — contracts, backend, and frontend, all built by
                me, end to end.
              </p>
              <p>
                My workflow is fast and AI-tooling-heavy: I'd rather ship a
                working version on mainnet this week than a perfect one next
                quarter. I treat hackathons the way a game theorist treats a
                repeated game — the point isn't any single prize, it's the
                reputation and skill that compound every time you show up.
              </p>
              <p>
                When I'm not building, I'm usually reading about Taoism or game
                theory — both keep showing up in how I approach software: do
                less, but make sure what's left actually works.
              </p>
            </div>
            <div className="about-facts">
              {ABOUT_FACTS.map((f) => (
                <div className="about-fact" key={f.label}>
                  <div className="about-fact-label">{f.label}</div>
                  <div className="about-fact-value">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ledger">
          <div className="section-head">
            <div className="eyebrow">A running ledger of what I've built</div>
            <h2>Shipped</h2>
          </div>
          <div>
            {PROJECTS.map((p, i) => (
              <LedgerRow project={p} index={i} key={p.name} />
            ))}
          </div>
        </section>

        <section id="approach">
          <div className="section-head">
            <div className="eyebrow">How I build</div>
            <h2>Three working principles</h2>
          </div>
          <div className="principles">
            {PRINCIPLES.map((p) => (
              <div className="principle-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="stack">
          <div className="section-head">
            <div className="eyebrow">What I build with</div>
            <h2>Stack</h2>
          </div>
          <div className="stack-groups">
            {STACK_GROUPS.map((g) => (
              <div className="stack-row" key={g.label}>
                <div className="stack-label">{g.label}</div>
                <div className="stack-items">
                  {g.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="track">
          <div className="section-head">
            <div className="eyebrow">Where I've competed</div>
            <h2>Track record</h2>
          </div>
          <div className="track-list">
            {TRACK_RECORD.map((t) => (
              <div className="track-row" key={t.org}>
                <div className="track-org">{t.org}</div>
                <div className="track-role">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="eyebrow">Open to work</div>
          <h2>
            Building on Solana or Sui? Want a solo full-stack builder who ships?
          </h2>
          <p className="contact-sub">
            I'm available for ecosystem roles, freelance builds, and hackathon
            collaborations. Reach me wherever's easiest for you.
          </p>
          <div className="contact-grid">
            {CONTACTS.map(({ platform, value, href, Icon }) => (
              <a
                key={platform}
                className="contact-card"
                href={href}
                target={platform === "Email" ? undefined : "_blank"}
                rel="noreferrer"
              >
                <span className="contact-icon">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span>
                  <span className="contact-platform">{platform}</span>
                  <br />
                  <span className="contact-value">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <span>© 2026 Mofe</span>
          <span className="mono">Built solo, shipped often.</span>
        </footer>
      </div>
    </div>
  );
}
