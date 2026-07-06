"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Circle } from "lucide-react";

const PROJECTS = [
  {
    name: "SuiSend",
    status: "LIVE",
    detail: "Payment links with built-in yield generation via Scallop.",
    stack: ["Sui Move", "Next.js", "Scallop"],
    meta: "Sui Overflow 2026 · mainnet",
    link: "https://suisend.xyz",
  },
  {
    name: "Nerve Pipeline",
    status: "BUILDING",
    detail:
      "Solana infra combining Yellowstone gRPC, Jito MEV bundles, and an AI retry agent.",
    stack: ["Yellowstone gRPC", "Jito", "AI agent"],
    meta: "Superteam × SOLINFRA × Jito bounty",
    link: null,
  },
  {
    name: "Tekumi",
    status: "SHIPPED",
    detail:
      "ElizaOS agent for indie game discovery, monetized via affiliate deals.",
    stack: ["ElizaOS", "Next.js", "Docker"],
    meta: "Green Man Gaming · Fanatical · GOG",
    link: null,
  },
  {
    name: "Arez",
    status: "SHIPPED",
    detail: "Privacy-preserving payroll built on Umbra, Arcium ZK, and Helius.",
    stack: ["Next.js", "Umbra SDK", "Arcium"],
    meta: "Solana Frontier Hackathon",
    link: null,
  },
  {
    name: "paymoji.sol",
    status: "SHIPPED",
    detail: "A naming and identity dApp for Solana wallets.",
    stack: ["Solana", "Next.js", "Tailwind"],
    meta: "Personal build",
    link: null,
  },
  {
    name: "ECM",
    status: "BUILDING",
    detail:
      "A theme-based RWA / DePIN index with an AI portfolio agent handling micropayments.",
    stack: ["Solana", "AI agent", "x402"],
    meta: "Exotic Capital Markets",
    link: null,
  },
  {
    name: "SwiftyEx",
    status: "SHIPPED",
    detail:
      "Telegram Mini App for NGN conversion, priced off live FX and crypto rates.",
    stack: ["Next.js", "GrammY", "CoinGecko API"],
    meta: "Hackathon build",
    link: null,
  },
  {
    name: "OKX AI Genesis — agent track",
    status: "IN PROGRESS",
    detail: "An autonomous agent submission currently in build.",
    stack: ["AI agent", "TypeScript"],
    meta: "Deadline · Jul 17, 2026",
    link: null,
  },
  {
    name: "TxODDS World Cup Hackathon",
    status: "IN PROGRESS",
    detail: "A prediction-market concept for live match data.",
    stack: ["Prediction markets", "TypeScript"],
    meta: "Deadline · Jul 29, 2026",
    link: null,
  },
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
  { label: "Chains", items: ["Solana", "Sui"] },
  { label: "Contracts", items: ["Anchor", "Sui Move"] },
  { label: "Backend", items: ["Fastify", "Node.js", "TypeScript"] },
  { label: "Frontend", items: ["Next.js", "React", "Tailwind"] },
  { label: "Agents", items: ["ElizaOS", "OpenRouter", "OpenCode"] },
];

const TRACK_RECORD = [
  { org: "Superteam Nigeria", role: "Member" },
  { org: "Sui Overflow 2026", role: "Shipped SuiSend" },
  { org: "Solana Frontier Hackathon", role: "Entered with ECM & Arez" },
  { org: "SOLINFRA × Jito bounty", role: "Building Nerve Pipeline" },
  { org: "OKX AI Genesis Hackathon", role: "In progress — agent track" },
  { org: "TxODDS World Cup Hackathon", role: "In progress" },
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

function LedgerRow({ project: any, index: any }) {
  const ref = useRef(null);
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
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="ledger-link"
              aria-label={`Visit ${project.name}`}
            >
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          )}
        </div>
        <p className="ledger-detail">{project.detail}</p>
        <div className="ledger-tags">
          {project.stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
          <span className="ledger-meta">{project.meta}</span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const scrollTo = (id) => {
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

        .mono {
          font-family: 'JetBrains Mono', monospace;
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

        .navlinks {
          display: flex;
          gap: 22px;
        }

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

        .navlinks button:hover, .navlinks button:focus-visible {
          color: var(--ink);
        }

        section {
          padding: 72px 0;
          border-bottom: 1px solid var(--line);
        }

        section:last-of-type { border-bottom: none; }

        .hero {
          padding-top: 88px;
          padding-bottom: 56px;
        }

        .hero h1 {
          font-size: 44px;
          font-weight: 700;
          max-width: 700px;
        }

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
        }

        .btn:hover { transform: translateY(-1px); background: #232D31; }

        .btn-ghost {
          background: transparent;
          color: var(--ink);
        }

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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .live-strip a {
          color: var(--signal);
          text-decoration: none;
          font-weight: 600;
        }

        .live-strip a:hover { text-decoration: underline; }

        .section-head {
          margin-bottom: 36px;
        }

        .section-head h2 {
          font-size: 26px;
          font-weight: 600;
        }

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

        .ledger-row.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

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

        .ledger-top {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .ledger-name {
          font-size: 18px;
          font-weight: 600;
        }

        .ledger-link {
          color: var(--ink-faint);
          display: inline-flex;
          margin-left: auto;
        }

        .ledger-link:hover { color: var(--signal); }

        .ledger-detail {
          margin: 10px 0 12px 0;
          color: var(--ink-soft);
          font-size: 14.5px;
          max-width: 520px;
        }

        .ledger-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

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

        .pill-live {
          background: var(--signal-soft);
          color: var(--signal);
          font-weight: 600;
        }

        .pill-shipped {
          border: 1px solid var(--line);
          color: var(--ink-soft);
        }

        .pill-building {
          border: 1px solid var(--accent);
          color: var(--accent);
        }

        .pill-progress {
          border: 1px dashed var(--accent);
          color: var(--accent);
        }

        .principles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .principle-card h3 {
          font-size: 17px;
          margin-bottom: 10px;
        }

        .principle-card p {
          color: var(--ink-soft);
          font-size: 14.5px;
        }

        .stack-groups {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

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

        .stack-items {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .track-list {
          display: flex;
          flex-direction: column;
        }

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

        .contact-links {
          margin-top: 30px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

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
          .ledger-row { grid-template-columns: 1fr; }
          .ledger-hash { display: none; }
          .stack-row { grid-template-columns: 1fr; gap: 6px; }
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
            Solo builder · Solana + Sui · Lagos, Nigeria
          </div>
          <h1>
            I ship full-stack products on Solana and Sui — alone, in public, on
            deadline.
          </h1>
          <p className="hero-sub">
            Founder of Eitherway AI. Member of Superteam Nigeria. I write the
            contracts, the backend, and the frontend myself, and I use
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
            collaborations. Drop me a line.
          </p>
          <div className="contact-links">
            <a className="btn" href="mailto:bankoleadedotun16@gmail.com">
              Email
            </a>
            <a
              className="btn btn-ghost"
              href="https://github.com/Mofe-Bankole"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>

        <footer>
          <span>© 2026 Mofe </span>
          <span className="mono">Built solo, shipped often.</span>
        </footer>
      </div>
    </div>
  );
}
