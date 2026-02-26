import { useState, useEffect, useRef } from "react";

const SAMPLES = [
  {
    id: 1, tag: "COLD EMAIL", color: "#00f5ff",
    title: "3-Email Sequence — SaaS Project Management Tool",
    emails: [
      {
        label: "EMAIL 01 — THE HOOK",
        subject: "Subject: Your team is losing 6 hours/week (here's proof)",
        body: `Hi [First Name],

Quick question — how many times does your team switch between tools before a project gets signed off?

For most agencies, it's 4–6 app switches per task. That's roughly 6 hours of lost productivity per person, per week.

We built [Product] to fix that — one workspace for briefs, feedback, approvals, and delivery.

Worth 15 minutes to see if it fits how your team works?

— Fahad`
      },
      {
        label: "EMAIL 02 — FOLLOW UP (DAY 3)",
        subject: "Subject: Re: Your team is losing 6 hours/week",
        body: `Hi [First Name],

Just bumping this up — I know inboxes get busy.

One thing I didn't mention: agencies using [Product] report a 40% reduction in revision rounds — because clients give feedback directly inside the platform, not scattered across email threads.

If that's a problem you're dealing with, happy to show you exactly how it works.

15-minute call this week?

— Fahad`
      },
      {
        label: "EMAIL 03 — THE BREAK-UP",
        subject: "Subject: Closing the loop",
        body: `Hi [First Name],

I'll keep this short — I don't want to keep cluttering your inbox.

If fixing project workflow isn't a priority right now, completely understood.

But if things change and you want to cut down on the chaos between briefs and delivery — my door's open.

Wishing you a great quarter.

— Fahad`
      }
    ]
  },
  {
    id: 2, tag: "LINKEDIN DM", color: "#bf5af2",
    title: "Outreach DM Script — E-Commerce Brand Founders",
    emails: [
      {
        label: "DM — AFTER CONNECT ACCEPTED",
        subject: null,
        body: `Hey [First Name],

Thanks for connecting.

Noticed you're building [Brand] — genuinely interesting what you're doing in the [niche] space.

Quick question: are you currently running any email flows to recover abandoned carts or win back lapsed customers?

Most e-commerce brands lose 25–30% of potential revenue just from weak post-purchase and recovery sequences.

If that's something you'd want to fix, I'd love to take a look at what you have and share some ideas — no pitch, just a fresh set of eyes.

Worth a short chat?

— Fahad`
      }
    ]
  },
  {
    id: 3, tag: "E-COMMERCE", color: "#30d158",
    title: "Abandoned Cart Email — Skincare Brand",
    emails: [
      {
        label: "ABANDONED CART — 1 HOUR AFTER",
        subject: "Subject: You left something behind",
        body: `Hey [First Name],

You were this close to checking out the [Product Name]. Then something came up.

It happens. No judgment.

Your cart is still sitting there waiting — a little patiently, a little hopefully.

If you left because of a question or concern, just reply to this email. I'll sort it out personally.

If you're ready, you're one click away.

[ COMPLETE MY ORDER → ]

Talk soon,
Fahad | [Brand] Team`
      }
    ]
  },
  {
    id: 4, tag: "WIN-BACK", color: "#ff9f0a",
    title: "Win-Back Email — DTC Fashion Brand (90 days inactive)",
    emails: [
      {
        label: "WIN-BACK — EMAIL 01",
        subject: "Subject: We miss you (and we're not just saying that)",
        body: `Hi [First Name],

It's been 90 days. We noticed.

(Yes, we actually track these things. No, it's not weird.)

A lot has changed since your last order — new drops, new styles, and a few things we think you'll actually want this time.

So here's a small incentive to come back:

Use code COMEBACK15 for 15% off — valid for 5 days only.

[ SEE WHAT'S NEW → ]

Good to have you back.

— The [Brand] Team`
      }
    ]
  }
];

const SERVICES = [
  {
    name: "Cold Email Sequences", color: "#00f5ff", tag: "MOST REQUESTED",
    desc: "Most cold emails sound like they were written by someone who Googled 'cold email template' at 11pm, changed the name field, and hit send on 400 people. I write sequences that feel like they were written for one specific person — because they were. The result: people actually reply. Wild concept, I know."
  },
  {
    name: "LinkedIn Outreach Scripts", color: "#bf5af2", tag: "HIGH REPLY RATE",
    desc: "If your DM starts with 'Hey [First Name], I noticed we're both in [Industry]' — I need you to delete it. Right now. I write LinkedIn messages that reference real things, ask one smart question, and make your prospect think 'okay, this one is different.' Try it. You'll see."
  },
  {
    name: "Lead Nurture Flows", color: "#30d158", tag: "PIPELINE FILLER",
    desc: "Your prospect didn't reply. That's fine. It doesn't mean they're not interested — it means your follow-up wasn't interesting enough. I write sequences that stay persistent without becoming the person who double-texts at 2am. There's a very thin line. I know exactly where it is."
  },
  {
    name: "Full Outreach System", color: "#ff9f0a", tag: "BEST VALUE",
    desc: "Cold emails + LinkedIn scripts + follow-ups — the entire machine, built from scratch. For brands tired of staring at their sent folder wondering why nobody replied. Spoiler: it was the copy. Good news: copy is fixable. That's what I do."
  }
];

const WHY = [
  {
    num: "01", color: "#ffe135", title: "Psychology-First Copy",
    desc: "Most copywriters think good copy is about sounding smart. I disagree. Good copy sounds like the reader's own thoughts — but slightly better. Every line I write is built around what your prospect is already thinking. I just put it into words before they do. Then I hand them a CTA. They click it. You get a meeting. Simple as that."
  },
  {
    num: "02", color: "#30d158", title: "B2B + E-Com Brain",
    desc: "Spent 2+ years writing abandoned cart, welcome, and win-back flows for DTC brands — recovering 20–35% of revenue that brands had already written off. That experience taught me one thing: people buy emotionally and justify it logically. Every B2B email I write uses that same psychology. Just with more LinkedIn and less 'your cart is waiting.'"
  },
  {
    num: "03", color: "#00f5ff", title: "Zero Generic Copy",
    desc: "Your prospect gets 40+ cold emails a day. They all say 'I help companies like yours.' They all get deleted. Mine don't. Not because I'm magic — because I do the research, write for one specific person, and say something nobody else is saying. It's called specificity. It works every time. Nobody does it. Their loss."
  }
];

// ─── COMPONENTS ───────────────────────────────────────────

function GlitchText({ text, color = "#ffe135" }) {
  const [g, setG] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setG(true);
      setTimeout(() => setG(false), 120);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span style={{ position: "relative", color, display: "inline-block" }}>
      {text}
      {g && <>
        <span style={{ position: "absolute", top: 0, left: 3, color: "#ff3b3b", opacity: 0.8, clipPath: "inset(15% 0 55% 0)" }}>{text}</span>
        <span style={{ position: "absolute", top: 0, left: -3, color: "#00f5ff", opacity: 0.8, clipPath: "inset(55% 0 10% 0)" }}>{text}</span>
      </>}
    </span>
  );
}

function Typewriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = texts[idx];
    if (!del && shown.length < full.length) {
      const t = setTimeout(() => setShown(full.slice(0, shown.length + 1)), 52);
      return () => clearTimeout(t);
    } else if (!del && shown.length === full.length) {
      const t = setTimeout(() => setDel(true), 2400);
      return () => clearTimeout(t);
    } else if (del && shown.length > 0) {
      const t = setTimeout(() => setShown(shown.slice(0, -1)), 26);
      return () => clearTimeout(t);
    } else {
      setDel(false);
      setIdx((idx + 1) % texts.length);
    }
  }, [shown, del, idx, texts]);
  return <span>{shown}<span style={{ animation: "blink 1s step-end infinite", color: "#ffe135" }}>|</span></span>;
}

function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let n = 0;
      const max = parseFloat(target);
      const step = max / 50;
      const iv = setInterval(() => {
        n += step;
        if (n >= max) { setVal(max); clearInterval(iv); }
        else setVal(Math.floor(n * 10) / 10);
      }, 25);
      obs.disconnect();
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Dots() {
  const dots = useRef(Array.from({ length: 12 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    s: 2 + Math.random() * 2.5, dur: 5 + Math.random() * 5, delay: Math.random() * 4,
    c: ["#ffe135","#ff3b3b","#00f5ff","#bf5af2","#30d158"][i % 5]
  }))).current;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map(d => (
        <div key={d.id} style={{
          position: "absolute", left: `${d.x}%`, top: `${d.y}%`,
          width: d.s, height: d.s, borderRadius: "50%", background: d.c, opacity: 0.3,
          animation: `floatD ${d.dur}s ease-in-out ${d.delay}s infinite alternate`
        }} />
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────

export default function Portfolio() {
  const [open, setOpen] = useState(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [hov, setHov] = useState(null);

  useEffect(() => {
    const fn = e => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div style={{ background: "#080808", color: "#ddd8d0", fontFamily: "'Space Mono', monospace", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes mq    { from{transform:translateX(0)}    to{transform:translateX(-50%)} }
        @keyframes mqr   { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes floatD{ from{transform:translateY(0) rotate(0deg)} to{transform:translateY(-32px) rotate(180deg)} }
        @keyframes spin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes up    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer{ 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes glow  { 0%,100%{box-shadow:0 0 14px #ffe13560} 50%{box-shadow:0 0 36px #ffe135bb,0 0 70px #ffe13535} }
        @keyframes wob   { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
        @keyframes pulse { 0%,100%{opacity:0.85;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }

        .srv { transition:all .28s ease; }
        .srv:hover { transform:translateY(-5px) !important; }

        .sc  { transition:all .22s ease; border:1px solid #1c1c1c; }
        .sc:hover { border-color:#ffe13555 !important; transform:translateX(5px); }

        .wc  { transition:all .22s ease; }
        .wc:hover { transform:translateY(-5px); }

        .tp  { transition:all .18s; }
        .tp:hover { transform:translateY(-3px) scale(1.07); }

        .gb  { transition:all .2s; animation:glow 2.5s ease-in-out infinite; }
        .gb:hover { background:#00f5ff!important; color:#000!important; transform:translate(-4px,-4px)!important; box-shadow:4px 4px 0 #fff!important; animation:none!important; }

        .gho { transition:all .2s; }
        .gho:hover { border-color:#ffe135!important; color:#ffe135!important; transform:translate(-3px,-3px); box-shadow:3px 3px 0 #ffe13540; }

        ::-webkit-scrollbar { width:3px }
        ::-webkit-scrollbar-thumb { background:linear-gradient(#ffe135,#ff3b3b); }

        @media (max-width:768px) {
          .grid2  { grid-template-columns:1fr !important; }
          .grid3  { grid-template-columns:1fr !important; }
          .grid4  { grid-template-columns:repeat(2,1fr) !important; }
          .hero   { padding:60px 28px !important; }
          .sec    { padding:70px 28px !important; }
          .ring   { display:none !important; }
          .avail  { display:none !important; }
        }
      `}</style>

      {/* CURSOR GLOW */}
      <div style={{ position:"fixed", width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,225,53,0.06) 0%,transparent 70%)", left:mouse.x-130, top:mouse.y-130, pointerEvents:"none", zIndex:9999, transition:"left .08s,top .08s" }} />

      {/* ── MARQUEE TOP */}
      <div style={{ background:"#ffe135", overflow:"hidden", padding:"9px 0" }}>
        <div style={{ display:"flex", gap:44, animation:"mq 16s linear infinite", whiteSpace:"nowrap" }}>
          {Array(4).fill(["COLD EMAIL","//","LINKEDIN COPY","//","B2B OUTREACH","//","WORDS THAT CLOSE","//","REPLY RATE UP","//",]).flat().map((t,i)=>(
            <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:3, color:"#000" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── HERO */}
      <div className="hero" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px 64px", position:"relative", overflow:"hidden" }}>
        <Dots />
        {/* grid bg */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,225,53,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,225,53,0.022) 1px,transparent 1px)", backgroundSize:"64px 64px", pointerEvents:"none" }} />
        {/* outline bg word */}
        <div style={{ position:"absolute", right:-10, top:"50%", transform:"translateY(-50%)", fontFamily:"'Bebas Neue',sans-serif", fontSize:200, letterSpacing:-8, color:"transparent", WebkitTextStroke:"1px rgba(255,225,53,0.05)", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>COPY</div>

        {/* available pill */}
        <div className="avail" style={{ position:"absolute", right:76, bottom:90, background:"linear-gradient(135deg,#30d158,#00f5ff)", color:"#000", padding:"9px 18px", fontSize:10, fontWeight:700, letterSpacing:2, animation:"pulse 2.5s ease-in-out infinite" }}>
          OPEN FOR WORK
        </div>

        {/* badge */}
        <div style={{ display:"inline-block", background:"linear-gradient(90deg,#ff3b3b,#bf5af2)", color:"#fff", fontSize:9, letterSpacing:3, padding:"7px 16px", marginBottom:26, width:"fit-content", animation:"up .7s ease .1s both" }}>
          PROFESSIONAL WORD DEALER — CERTIFIED BY EVERY IGNORED COLD EMAIL EVER SENT
        </div>

        {/* name */}
        <div style={{ animation:"up .8s ease .2s both" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(68px,12vw,158px)", lineHeight:.88, letterSpacing:-3 }}>RANA</div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(68px,12vw,158px)", lineHeight:.88, letterSpacing:-3, display:"inline-block", position:"relative" }}>
            <GlitchText text="FAHAD" color="#ffe135"/>
            <div style={{ position:"absolute", bottom:3, left:0, width:"100%", height:5, background:"linear-gradient(90deg,#ff3b3b,#bf5af2,#00f5ff)", transform:"skewX(-6deg)" }}/>
          </div>
        </div>

        {/* typewriter */}
        <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:"clamp(14px,1.8vw,21px)", color:"#ffe135", margin:"26px 0 0", minHeight:28, animation:"up .8s ease .3s both" }}>
          "<Typewriter texts={[
            "I don't write emails. I write reasons they can't hit delete.",
            "Your offer is great. Your copy is putting people to sleep.",
            "Sending 500 emails and getting 2 replies is not a strategy. It's a cry for help.",
            "Most cold emails die in the first line. Mine have a pulse.",
            "I fix the words. You take the credit. We both win.",
          ]}/>"
        </div>

        {/* sub copy */}
        <p style={{ fontSize:14, color:"#aaa", maxWidth:460, lineHeight:2, marginTop:22, animation:"up .8s ease .4s both" }}>
          B2B Cold Email & LinkedIn Copywriter.<br/>
          I help SaaS companies, agencies, and B2B brands turn{" "}
          <span style={{ color:"#30d158", fontWeight:700 }}>ignored outreach into qualified meetings</span>{" "}
          — by fixing the one thing every founder ignores: the actual words.<br/><br/>
          Based in Pakistan. Working globally.<br/>
          <span style={{ color:"#555", fontSize:12 }}>No, I will not do it for "exposure."</span>
        </p>

        {/* CTAs */}
        <div style={{ display:"flex", gap:14, marginTop:38, flexWrap:"wrap", animation:"up .8s ease .5s both" }}>
          <a href="mailto:ranafahadarshad198@gmail.com" className="gb" style={{ background:"#ffe135", color:"#000", padding:"15px 32px", fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:12, letterSpacing:2, textDecoration:"none" }}>
            HIRE ME NOW →
          </a>
          <a href="https://linkedin.com/in/ranafahadpk" target="_blank" rel="noreferrer" className="gho" style={{ background:"transparent", color:"#777", border:"1px solid #2a2a2a", padding:"15px 32px", fontFamily:"'Space Mono',monospace", fontSize:12, letterSpacing:2, textDecoration:"none" }}>
            VIEW LINKEDIN
          </a>
        </div>
      </div>

      {/* ── MARQUEE REVERSE */}
      <div style={{ background:"#0e0e0e", overflow:"hidden", padding:"9px 0", borderTop:"1px solid #181818", borderBottom:"1px solid #181818" }}>
        <div style={{ display:"flex", gap:44, animation:"mqr 22s linear infinite", whiteSpace:"nowrap" }}>
          {Array(4).fill(["NO TEMPLATES","//","PSYCHOLOGY-FIRST","//","SAAS SPECIALIST","//","REPLY RATE OBSESSED","//","ECOM BACKGROUND","//",]).flat().map((t,i)=>(
            <span key={i} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, letterSpacing:3, color:"#303030" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── STATS */}
      <div className="grid4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
        {[
          { n:"2",  suf:"+",  label:"YEARS WRITING COPY",   note:"(still cheaper than a bad hire)",           c:"#ffe135" },
          { n:"35", suf:"%",  label:"REVENUE RECOVERED",    note:"(for ecom clients who actually listened)",   c:"#30d158" },
          { n:"0",  suf:"",   label:"TEMPLATES EVER USED",  note:"(my therapist says this is a problem)",      c:"#ff3b3b" },
          { n:"40", suf:"%+", label:"REPLY RATE LIFT",      note:"(on average. yours could be more)",          c:"#00f5ff" },
        ].map((s,i)=>(
          <div key={i} style={{ padding:"40px 30px", borderRight:i<3?"1px solid #181818":"none", borderBottom:"1px solid #181818", position:"relative" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:s.c, opacity:.5 }}/>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:s.c, lineHeight:1 }}>
              <Counter target={s.n} suffix={s.suf}/>
            </div>
            <div style={{ fontSize:10, color:"#888", letterSpacing:2, marginTop:10, lineHeight:1.6 }}>{s.label}</div>
            <div style={{ fontSize:11, color:"#555", marginTop:5, fontStyle:"italic" }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── SERVICES */}
      <div className="sec" style={{ padding:"90px 64px", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 80% 40%,rgba(191,90,242,.03) 0%,transparent 55%)", pointerEvents:"none" }}/>
        <div style={{ fontSize:10, letterSpacing:4, color:"#ff3b3b", marginBottom:14 }}>// WHAT I DO</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5.8vw,74px)", lineHeight:.9 }}>SERVICES THAT</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5.8vw,74px)", lineHeight:.9, color:"#ffe135", marginBottom:50 }}>ACTUALLY WORK</div>
        <div className="grid2" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
          {SERVICES.map((s,i)=>(
            <div key={i} className="srv"
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{ border:`1px solid ${hov===i?s.color+"55":"#1c1c1c"}`, background:"#0d0d0d", padding:"40px 34px", transition:"all .28s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, gap:12 }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:1, color:hov===i?s.color:"#e0dbd3", transition:"color .25s", lineHeight:1.1 }}>{s.name}</div>
                <span style={{ fontSize:9, letterSpacing:2, padding:"4px 10px", background:s.color+"12", color:s.color, border:`1px solid ${s.color}30`, whiteSpace:"nowrap", flexShrink:0 }}>{s.tag}</span>
              </div>
              <p style={{ fontSize:14, color:"#999", lineHeight:1.95, marginBottom:22 }}>{s.desc}</p>
              <div style={{ fontSize:10, color:s.color, letterSpacing:2, borderTop:`1px solid ${s.color}1e`, paddingTop:14 }}>DM FOR PRICING →</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SAMPLES */}
      <div className="sec" style={{ padding:"90px 64px", background:"#050505", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 15% 70%,rgba(255,225,53,.02) 0%,transparent 55%)", pointerEvents:"none" }}/>
        <div style={{ fontSize:10, letterSpacing:4, color:"#ff3b3b", marginBottom:14 }}>// PORTFOLIO</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5.8vw,74px)", lineHeight:.9 }}>COPY SAMPLES.</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5.8vw,74px)", lineHeight:.9, color:"transparent", WebkitTextStroke:"1.5px #ffe135", marginBottom:20 }}>JUDGE ME.</div>
        <p style={{ fontSize:14, color:"#666", maxWidth:520, lineHeight:1.9, marginBottom:48 }}>
          Real clients get copy built for their specific audience, offer, and ICP. These samples are just to prove I'm not making things up. Click anything that looks interesting. Try not to steal them.{" "}
          <span style={{ color:"#444" }}>(I'll know.)</span>
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
          {SAMPLES.map(s=>(
            <div key={s.id} className="sc" style={{ borderColor:open===s.id?s.color+"55":"#1c1c1c" }}>
              <div onClick={()=>setOpen(open===s.id?null:s.id)}
                style={{ display:"flex", alignItems:"center", gap:16, padding:"20px 26px", cursor:"pointer", borderBottom:open===s.id?"1px solid #1c1c1c":"none" }}>
                <span style={{ fontSize:9, letterSpacing:3, padding:"4px 12px", background:s.color+"10", color:s.color, border:`1px solid ${s.color}30`, whiteSpace:"nowrap" }}>{s.tag}</span>
                <div style={{ flex:1, fontSize:14, color:"#bbb", fontStyle:"italic", fontFamily:"Georgia,serif", lineHeight:1.4 }}>{s.title}</div>
                <div style={{ width:30, height:30, borderRadius:"50%", border:`1.5px solid ${open===s.id?s.color:"#2a2a2a"}`, display:"flex", alignItems:"center", justifyContent:"center", color:open===s.id?s.color:"#444", fontSize:16, fontWeight:700, flexShrink:0, transition:"all .3s", transform:open===s.id?"rotate(45deg)":"none" }}>+</div>
              </div>
              {open===s.id&&(
                <div style={{ padding:"24px 26px", background:"#040404", animation:"up .3s ease both" }}>
                  {s.emails.map((e,ei)=>(
                    <div key={ei} style={{ background:"#0e0e0e", borderLeft:`3px solid ${s.color}`, padding:"22px 26px", marginBottom:12, position:"relative" }}>
                      <div style={{ position:"absolute", top:0, right:0, width:50, height:50, background:`radial-gradient(circle at top right,${s.color}0c,transparent)` }}/>
                      <div style={{ fontSize:9, letterSpacing:3, color:s.color, marginBottom:10 }}>{e.label}</div>
                      {e.subject&&<div style={{ fontSize:13, fontWeight:700, color:"#e0dbd3", marginBottom:14, paddingBottom:12, borderBottom:"1px solid #1c1c1c" }}>{e.subject}</div>}
                      <pre style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#c0bab2", lineHeight:2, whiteSpace:"pre-wrap" }}>{e.body}</pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY ME */}
      <div className="sec" style={{ padding:"90px 64px", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 20% 50%,rgba(0,245,255,.025) 0%,transparent 55%)", pointerEvents:"none" }}/>
        <div style={{ fontSize:10, letterSpacing:4, color:"#ff3b3b", marginBottom:14 }}>// WHY FAHAD</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5.8vw,74px)", lineHeight:.9 }}>THE UNFAIR</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(40px,5.8vw,74px)", lineHeight:.9, color:"#00f5ff", marginBottom:50 }}>ADVANTAGE</div>
        <div className="grid3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {WHY.map((w,i)=>(
            <div key={i} className="wc" style={{ background:"#0d0d0d", border:"1px solid #1c1c1c", padding:"36px 28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:w.color, opacity:.5 }}/>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:66, color:"#151515", lineHeight:1, marginBottom:6 }}>{w.num}</div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:19, marginBottom:14, color:w.color }}>{w.title}</div>
              <p style={{ fontSize:14, color:"#999", lineHeight:2 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TOOLS */}
      <div className="sec" style={{ padding:"48px 64px", borderTop:"1px solid #111" }}>
        <div style={{ fontSize:10, letterSpacing:4, color:"#ff3b3b", marginBottom:20 }}>// TOOLS I USE</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
          {[
            {n:"APOLLO.IO",c:"#ff3b3b"},{n:"LINKEDIN SALES NAV",c:"#0096ff"},
            {n:"KLAVIYO",c:"#00f5ff"},{n:"MAILCHIMP",c:"#ffe135"},
            {n:"CHATGPT",c:"#30d158"},{n:"NOTION",c:"#bf5af2"},
          ].map((t,i)=>(
            <span key={i} className="tp" style={{ padding:"10px 18px", background:t.c+"0d", border:`1px solid ${t.c}28`, fontSize:10, color:t.c, letterSpacing:2 }}>{t.n}</span>
          ))}
        </div>
      </div>

      {/* ── PHILOSOPHY */}
      <div style={{ background:"#ffe135", padding:"80px 64px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", fontFamily:"'Bebas Neue',sans-serif", fontSize:340, color:"rgba(0,0,0,0.05)", top:-60, left:-10, lineHeight:1, pointerEvents:"none" }}>"</div>
        <div style={{ position:"absolute", bottom:-30, right:30, fontFamily:"'Bebas Neue',sans-serif", fontSize:170, color:"rgba(0,0,0,0.04)", pointerEvents:"none" }}>COPY</div>
        <p style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:"clamp(18px,2.8vw,38px)", color:"#0a0a0a", lineHeight:1.5, maxWidth:820, position:"relative", zIndex:1 }}>
          "The issue isn't your offer.<br/>
          It's not your pricing. It's not even the market.<br/><br/>
          It's that your copy sounds like it was written for <em>everyone</em> —<br/>
          which means it connects with <strong>no one.</strong>"
        </p>
        <p style={{ marginTop:28, fontFamily:"'Space Mono',monospace", fontSize:12, color:"#555", position:"relative", zIndex:1 }}>
          — The one thing I tell every client. Every. Single. Time.
        </p>
      </div>

      {/* ── FOOTER CTA */}
      <div className="sec" style={{ padding:"110px 64px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <Dots/>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,225,53,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,225,53,0.016) 1px,transparent 1px)", backgroundSize:"55px 55px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", fontFamily:"'Bebas Neue',sans-serif", fontSize:210, color:"#0c0c0c", top:"50%", left:"50%", transform:"translate(-50%,-50%)", whiteSpace:"nowrap", pointerEvents:"none" }}>LET'S TALK</div>

        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(42px,7.5vw,92px)", lineHeight:.9 }}>
            YOUR INBOX<br/>
            <span style={{ background:"linear-gradient(90deg,#ffe135,#ff3b3b,#bf5af2,#00f5ff,#ffe135)", backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 3s linear infinite" }}>DESERVES BETTER.</span>
          </div>

          <p style={{ fontSize:14, color:"#666", margin:"30px auto 8px", lineHeight:1.95, maxWidth:420 }}>
            Your outreach isn't failing because the market is bad.<br/>
            It's failing because the copy is boring.<br/>
            <span style={{ color:"#444" }}>Boring is fixable. And fixing it is exactly what I do.</span>
          </p>

          <a href="mailto:ranafahadarshad198@gmail.com" style={{ display:"block", color:"#ffe135", fontSize:14, textDecoration:"none", margin:"20px 0 6px", transition:"color .2s" }}>ranafahadarshad198@gmail.com</a>
          <a href="https://linkedin.com/in/ranafahadpk" target="_blank" rel="noreferrer" style={{ display:"block", color:"#ffe135", fontSize:14, textDecoration:"none", transition:"color .2s" }}>linkedin.com/in/ranafahadpk</a>

          <div style={{ marginTop:40 }}>
            <a href="mailto:ranafahadarshad198@gmail.com" className="gb" style={{ background:"#ffe135", color:"#000", padding:"16px 38px", fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:12, letterSpacing:2, textDecoration:"none", display:"inline-block" }}>
              START A PROJECT →
            </a>
          </div>

          <div style={{ marginTop:60, paddingTop:24, borderTop:"1px solid #181818", display:"flex", justifyContent:"space-between", fontSize:10, color:"#2c2c2c", letterSpacing:1, flexWrap:"wrap", gap:10 }}>
            <span>© 2025 RANA FAHAD — PROFESSIONAL WORD DEALER</span>
            <span>LODHRAN, PUNJAB, PAKISTAN</span>
            <span>BUILT WITH WORDS & CAFFEINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
