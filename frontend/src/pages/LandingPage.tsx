import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Github, Activity, Database,
  CheckCircle2, Server, Zap, ArrowRight, Scan, BrainCircuit
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StarsBackground } from '@/components/ui/stars-background';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

const FONT_IMPORTS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@400;500;600;700;800&display=swap');
  
  .font-sans-outfit { font-family: 'Outfit', sans-serif; }
  .font-mono-jetbrains { font-family: 'JetBrains Mono', monospace; }
  
  .shadow-glow { box-shadow: 0 0 40px rgba(0, 240, 255, 0.15); }
  .text-glow { text-shadow: 0 0 15px rgba(0, 240, 255, 0.5); }
  
  /* Modern Grid Background */
  .bg-grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  @keyframes marquee {
    from { transform: translateX(0%); }
    to { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 40s linear infinite;
    will-change: transform;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

const ACCENT = 'text-[#00f0ff]';


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans-outfit selection:bg-[#00f0ff]/30 overflow-x-hidden relative">
      <StarsBackground starDensity={0.00015} allStarsTwinkle={true} twinkleProbability={0.7} minTwinkleSpeed={0.5} maxTwinkleSpeed={1.5} />
      <div className="relative z-10">
        <style>{FONT_IMPORTS}</style>
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TerminalDemoSection />
        <TechStackSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
}

// ==========================================
// 1. NAVBAR
// ==========================================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono-jetbrains text-xl tracking-tight text-white font-bold">
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className={ACCENT}
          >
            &gt;_
          </motion.span>
          DevProxy
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#stack" className="hover:text-white transition-colors">Stack</a>
        </div>

        <a
          href="https://github.com/Bhavesh-Solminde/NextIndia"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:border-white/30 transition-all text-sm font-medium text-white"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">Star on GitHub</span>
        </a>
      </div>
    </motion.nav>
  );
}

// ==========================================
// 2. HERO SECTION
// ==========================================
function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  } as any;

  return (
    <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent_80%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center w-full"
      >
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center ">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-sm font-medium text-[#00f0ff] mb-8 shadow-glow">
                <Zap className="w-4 h-4" />
                <span>v1.0 is now live</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5rem] font-bold text-white tracking-tight leading-[1.1] max-w-5xl">
                Every API call. <br className="hidden md:block" /> Every webhook. <br />
                <span className={`${ACCENT} text-glow`}>Visible in real time.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="mt-8 text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
                A self-hosted Proxyman and Webhooksite alternative built for modern teams.
                Intercept traffic, mock responses, and instantly resolve 500s with built-in AI debugging.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/dashboard" className="px-8 py-4 bg-[#00f0ff] hover:bg-[#00d0dd] text-[#050505] font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://github.com/Bhavesh-Solminde/NextIndia" className="px-8 py-4 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff]/10 font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 font-mono-jetbrains">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> TypeScript Strict</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> React 19</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00f0ff]" /> Gemini 2.5 Flash</div>
              </motion.div>
            </div>
          }
        >
          <LiveTerminalMockup />
        </ContainerScroll>
      </motion.div>
    </section>
  );
}

function LiveTerminalMockup() {
  const [mockEvents, setMockEvents] = useState<any[]>([]);

  useEffect(() => {
    // Initial events seeded
    setMockEvents([
      { id: '1', method: 'POST', url: 'https://api.stripe.com/v1/payment_intents', status: 200, latency: 241, auto: true },
      { id: '2', method: 'GET', url: 'https://api.mixpanel.com/track', status: 200, latency: 89, auto: true },
    ]);

    const paths = ['/v1/charges', '/v3/mail/send', '/v1/refunds', '/api/users', '/oauth/token', '/v3/contacts'];
    const statuses = [200, 201, 200, 200, 400, 200, 500, 404];

    const interval = setInterval(() => {
      const isAuto = Math.random() > 0.3;
      const newEvent = {
        id: Math.random().toString(),
        method: ['GET', 'POST', 'PATCH', 'DELETE'][Math.floor(Math.random() * 4)],
        url: (isAuto ? 'https://api.internal.dev' : 'https://api.stripe.com') + paths[Math.floor(Math.random() * paths.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        latency: Math.floor(Math.random() * 300) + 40,
        auto: isAuto
      };

      setMockEvents(prev => [newEvent, ...prev].slice(0, 5));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[590px] rounded-xl border border-white/10 bg-[#0a0a0c] shadow-glow overflow-hidden text-left relative">
      {/* Fake MacOS App Top Bar */}
      <div className="h-12 border-b border-white/10 bg-white/[0.02] flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs font-mono-jetbrains text-neutral-500">API Logs — DevProxy</div>
        <div className="w-16"></div> {/* Spacer to perfectly center the title */}
      </div>

      {/* Fake UI Content */}
      <div className="p-4 flex flex-col gap-3 h-full overflow-hidden">
        <AnimatePresence initial={false}>
          {mockEvents.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ height: 0, opacity: 0, scale: 0.95 }}
              animate={{ height: 'auto', opacity: 1, scale: 1 }}
              exit={{ height: 0, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02]"
            >
              <span className={`text-xs font-bold font-mono-jetbrains w-16 text-center py-1 rounded ${evt.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                evt.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                  evt.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                }`}>
                {evt.method}
              </span>

              <span className="font-mono-jetbrains text-sm text-neutral-300 truncate flex-1">
                {evt.url}
              </span>

              <span className={`text-xs font-mono-jetbrains text-neutral-400 px-2 py-1 rounded hidden sm:block ${evt.auto ? 'bg-white/5 border border-white/10' : 'bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]'}`}>
                {evt.auto ? 'AUTO' : 'MANUAL'}
              </span>

              <span className={`text-xs font-mono-jetbrains w-12 text-center py-1 rounded ${evt.status >= 400 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                }`}>
                {evt.status}
              </span>

              <span className="text-xs font-mono-jetbrains text-neutral-500 w-16 text-right">
                {evt.latency}ms
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

import { Gallery6 } from "@/components/blocks/gallery6"

// ==========================================
// 3. FEATURES GRID (Gallery6)
// ==========================================
function FeaturesSection() {
  const demoData = {
    heading: "Everything you need to debug APIs",
    items: [
      {
        id: "item-1",
        title: "Webhook Interception",
        summary: "Capture incoming webhooks from Stripe, Razorpay, PayPal, etc. Forward them to your local backend and log every detail.",
        url: "#",
        image: "/Webhook Interception.png",
      },
      {
        id: "item-2",
        title: "Automatic HTTP Capture",
        summary: "Monkey-patches Node's http.request / https.request to silently log every outgoing HTTP call your backend makes.",
        url: "#",
        image: "/Automatic HTTP Capture.png",
      },
      {
        id: "item-3",
        title: "Manual API Dispatch",
        summary: "Fire custom API requests (GET/POST/PUT/DELETE) via a slide-over drawer form and see the full response.",
        url: "#",
        image: "/Manual API Dispatch.png",
      },
      {
        id: "item-4",
        title: "AI Debugger",
        summary: "One-click AI analysis of any failed request — streams a real-time diagnosis from Google Gemini 2.5 Flash.",
        url: "#",
        image: "/AI Debugger.png",
      },
    ],
  };

  return <Gallery6 {...demoData} />;
}

// ==========================================
// 4. HOW IT WORKS
// ==========================================
function HowItWorksSection() {
  const steps = [
    { icon: <Server />, title: "1. Outbound Call", desc: "Your backend makes an outgoing HTTP call." },
    { icon: <Scan />, title: "2. Capture", desc: "ProxyInterceptor silently captures it." },
    { icon: <Database />, title: "3. Storage", desc: "Saved to MongoDB with full headers, payload, latency." },
    { icon: <Activity />, title: "4. Broadcast", desc: "Broadcast via Socket.io to your dashboard instantly." },
    { icon: <BrainCircuit />, title: "5. Diagnosis", desc: "Click AI Debug — Gemini streams a diagnosis in real time." }
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" ref={ref} className="py-32 px-6 max-w-4xl mx-auto relative">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          From request to insight <br className="hidden sm:block" />
          <span className="text-[#00f0ff] text-glow">in milliseconds</span>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[2px] bg-white/10 origin-top" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[2px] bg-[#00f0ff] origin-top z-10 shadow-glow"
        />

        <div className="flex flex-col gap-16 md:gap-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0 }}
              className="flex gap-8 items-start relative z-20 group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#09090b] border border-white/20 group-hover:border-[#00f0ff] group-hover:shadow-glow transition-all duration-300 flex items-center justify-center shrink-0">
                <div className="text-neutral-500 group-hover:text-[#00f0ff] transition-colors duration-300">
                  {React.cloneElement(step.icon as React.ReactElement<any>, { className: "w-5 h-5 md:w-7 md:h-7" })}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-white mb-2 font-mono-jetbrains tracking-tight group-hover:text-[#00f0ff] transition-colors">{step.title}</h3>
                <p className="text-neutral-400 md:text-lg">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. TERMINAL DEMO
// ==========================================
function TerminalDemoSection() {
  const codeLines = [
    { text: "[DevProxy] ProxyInterceptor active — monitoring http/https traffic", color: "text-neutral-500" },
    { text: "[DevProxy] → POST https://api.stripe.com/v1/payment_intents — 201 — 312ms", color: "text-green-400" },
    { text: "[DevProxy] → GET  https://api.sendgrid.com/v3/mail/send — 200 — 89ms", color: "text-green-400" },
    { text: "[DevProxy] → POST https://api.razorpay.com/v1/orders — 400 — 201ms", color: "text-red-400" },
    { text: "[DevProxy] Error 400 captured. Click 'AI Debug' in dashboard.", color: "text-red-500/80" },
    { text: "-------------------------------------------------------------", color: "text-neutral-700" },
    { text: "[DevProxy AI] Analyzing failed request...", color: "text-[#00f0ff]" },
    { text: "[DevProxy AI] Root cause: Missing required field 'currency'. Expected: 'INR'", color: "text-[#00f0ff] font-bold" },
  ];

  return (
    <section className="py-32 bg-[#020202] border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00f0ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-xl overflow-hidden border border-white/10 shadow-glow bg-[#0a0a0c]"
        >
          <div className="h-12 bg-white/[0.02] border-b border-white/10 flex items-center px-4 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-xs font-mono-jetbrains text-neutral-500">npm run dev</div>
            <div className="w-12"></div>
          </div>

          <div className="p-8 font-mono-jetbrains text-sm md:text-[15px] leading-loose whitespace-pre-wrap">
            {codeLines.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.1, delay: i * 0.7 }}
                className={l.color}
              >
                {l.text}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 bg-current ml-1"
                  style={{ height: '1em', verticalAlign: 'middle', display: i === codeLines.length - 1 ? 'inline-block' : 'none' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 6. TECH STACK (INFINITE MARQUEE)
// ==========================================
function TechStackSection() {
  const tech = [
    "React 19", "TypeScript", "Express", "Node.js", "MongoDB", "Socket.io",
    "Gemini 2.5 Flash", "TailwindCSS v4", "Zustand", "Vite", "Axios",
    "Framer Motion", "Lucide React", "Mongoose", "REST API"
  ];
  const scrollContent = [...tech, ...tech];

  return (
    <section id="stack" className="py-24 overflow-hidden border-b border-white/5 relative">
      <div className="text-center mb-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Built on a stack you already trust</h2>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Left/Right Gradients for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Animated Marquee */}
        <div className="flex whitespace-nowrap min-w-max gap-6 px-4 animate-marquee">
          {scrollContent.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-8 py-4 bg-white/[0.02] border border-white/5 rounded-xl font-mono-jetbrains text-neutral-400 text-lg hover:text-white hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/5 transition-all duration-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. FINAL CTA
// ==========================================
function FinalCTASection() {
  return (
    <section className="relative py-40 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Radial Glow Setup */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1000px] h-[1000px] opacity-[0.15] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle at center, #00f0ff 0%, transparent 50%)' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center w-full max-w-3xl"
      >
        <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold text-white tracking-tight leading-tight mb-8">
          Stop debugging <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-700">blind.</span>
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-2xl leading-relaxed">
          Stop paying for SaaS tools that hold your local proxy data hostage. Self-host DevProxy and own your debug logs forever.
        </p>
        <a
          href="https://github.com/Bhavesh-Solminde/NextIndia"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-5 bg-[#00f0ff] hover:bg-[#00d0dd] text-[#050505] font-extrabold text-lg rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-glow flex items-center gap-3"
        >
          <Github className="w-6 h-6" />
          Clone & Deploy in 2 minutes
        </a>
      </motion.div>
    </section>
  );
}

// ==========================================
// 8. FOOTER
// ==========================================
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020202] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-mono-jetbrains text-xl font-bold text-white">
          <span className={ACCENT}>&gt;_</span> DevProxy
        </div>
        <div className="text-neutral-500 text-sm md:text-base font-mono-jetbrains text-center">
          Built with TypeScript, React, and Gemini 2.5 Flash
        </div>
        <a
          href="https://github.com/Bhavesh-Solminde/NextIndia"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-500 hover:text-white transition-colors"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
