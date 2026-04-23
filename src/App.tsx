import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { 
  Bot, 
  Database, 
  ShieldCheck, 
  CloudRain, 
  Zap, 
  Info,
  X,
  ArrowRightLeft,
  Server,
  Layers,
  Lock,
  RefreshCw,
  Image as ImageIcon,
  Workflow,
  Network,
  Check,
  Loader2,
  Terminal,
  Scale,
  Search,
  Briefcase,
  Settings2,
  Mail,
  FileText,
  CheckCircle,
  Monitor,
  Users
} from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export type Persona = 'product' | 'business' | 'compliance';

export const PERSONA_CONTENT: Record<Persona, { heroBadge: string, heroTitlePre: string, heroTitlePost: string, heroSub: string, orchestrationValue: string, portfolioSub: string, workflowSub: string }> = {
  product: {
    heroBadge: "PRODUCT STRATEGY",
    heroTitlePre: "Build Limitless",
    heroTitlePost: "Agentic Experiences.",
    heroSub: "Accelerate your roadmap. Deploy secure, multimodal AI agents directly into Charles Schwab's existing Salesforce and Mainframe infrastructure via MCP.",
    orchestrationValue: "Ship complex features faster. By delegating tasks to specialized sub-agents, product teams can build modular, self-healing workflows without monolithic codebase changes.",
    portfolioSub: "Unify disparate data silos into a single interactive view. Drive product engagement with dynamic charting that seamlessly integrates with advanced reasoning tools.",
    workflowSub: "How product teams can orchestrate cross-functional agents to automate a 3-day onboarding lifecycle into minutes."
  },
  business: {
    heroBadge: "BUSINESS LEADERSHIP",
    heroTitlePre: "Transform Cost Centers",
    heroTitlePost: "Into Revenue Engines.",
    heroSub: "Drive unmatched operational efficiency. Automate high-touch wealth management workflows to free your advisors for relationship building and asset gathering.",
    orchestrationValue: "Radically reduce operational overhead. Automated conflict resolution and specialized sub-agents combine to increase margins and process volumes without adding headcount.",
    portfolioSub: "Instantly surface total client wealth and allocation gaps. Empower advisors to proactively cross-sell by generating customized asset allocation recommendations in seconds.",
    workflowSub: "A practical look at how automating the onboarding lifecycle drives operational scale and accelerates time-to-revenue."
  },
  compliance: {
    heroBadge: "SUPERVISION & COMPLIANCE",
    heroTitlePre: "Zero-Trust",
    heroTitlePost: "Agentic Automation.",
    heroSub: "Deploy AI with absolute control. Programmable guardrails, WORM-compliant audit trails, and mandatory Human-in-the-Loop gates ensure frictionless FINRA/SEC adherence.",
    orchestrationValue: "Systematize regulatory adherence. Orchestrators strictly govern sub-agent actions, ensuring every programmatic decision passes through predefined risk and compliance vectors.",
    portfolioSub: "Maintain a strict real-time audit of aggregate client wealth. Ensure that any AI-generated portfolio advice runs against verifiable, current account structures and compliance limits.",
    workflowSub: "An audit-ready breakdown of how automated workflows securely navigate PII, LexisNexis checks, and mandatory principal approvals."
  }
};

type Feature = {
  id: string;
  title: string;
  icon: any;
  shortDesc: string;
  valueProp: Record<Persona, string>;
  imagePrompt: string;
  simulation: {
    title: string;
    prompt: string;
    steps: string[];
    result: string;
  };
  agentConfig: {
    model: string;
    tools: { name: string; description: string }[];
    systemPrompt: string;
  };
};

const features: Feature[] = [
  {
    id: 'desktop-agent',
    title: 'OS-Level Rep Assistant',
    icon: Monitor,
    shortDesc: 'A lightweight system tray companion delivering cross-app automation and local hardware bridges.',
    valueProp: {
      product: 'Create net-new capabilities outside the browser sandbox. Deliver cross-application workflow navigation, unified notifications, and passive telemetry to identify friction points automatically.',
      business: 'Collapse cashiering and swivel-chair benchmarks. By populating data across applications (e.g., the 166→39 click reduction), rep time-on-task drops dramatically.',
      compliance: 'Secure local bridges. Cleanly reach telephony, signature pads, check scanners, and audited file systems without exposing web tabs to native OS vulnerabilities.'
    },
    imagePrompt: 'A sleek, dark-themed 3D visualization of a computer desktop interface. A glowing AI system tray icon anchors a holographic assistant floating above various application windows, connected by glowing data threads.',
    simulation: {
      title: "Cross-App Cashiering Automation",
      prompt: "Agent: Initiate wire transfer for Client ID 8832, pulling validated balances from Mainframe into Client Central.",
      steps: [
        "Invoked via global hotkey overlay...",
        "Extracting wire instructions from secure email client...",
        "Validating available funds via Mainframe terminal bridge...",
        "Populating target fields in web-based Client Central...",
        "Awaiting rep confirmation for final execution..."
      ],
      result: "Data Population Complete. Reduced 166 manual clicks to 39. Wire transfer payload staged in Client Central for final Rep biometric authorization via local badge reader."
    },
    agentConfig: {
      model: "gemini-1.5-pro-002",
      tools: [
        { name: "OS_Window_Manager", description: "FDC3-compliant tool to focus windows, surface screens, and maintain context across the rep workspace." },
        { name: "Local_Hardware_Bridge", description: "Direct integration with telephony, signature pads, and local file systems bypassing browser restrictions." },
        { name: "Cross_App_Clipboard", description: "Securely extracts and populates validated data across disparate desktop and web applications." },
        { name: "Telemetry_Tracker", description: "Passive, trusted local agent measuring cross-app time-on-task to identify automation opportunities." }
      ],
      systemPrompt: "You are an OS-level Rep Assistant living in the system tray. You have global context of the rep's desktop, audio, and active windows. Your goal is to guide reps through multi-app tasks, securely pull and populate data across disparate systems, and manage unified notifications. Never execute a destructive action without explicitly focusing the relevant window for human-in-the-loop confirmation."
    }
  },
  {
    id: 'data-integration',
    title: 'Omnichannel Client Data Integration',
    icon: Database,
    shortDesc: 'Unify Salesforce FSC, internal mainframes, and Brokerage systems securely.',
    valueProp: {
      product: 'Empower Service and Advice reps with a holistic view. By running agents directly within the Google Cloud perimeter (BigQuery, Cloud Storage) and syncing with Salesforce via MCP, reps no longer need to toggle between 5+ internal systems.',
      business: 'Eliminate system-toggling inefficiency. Reduce average handle times for Service reps by up to 40% by giving agents direct, unified access to disparate legacy data streams.',
      compliance: 'Maintain airtight data governance. Client data stays within VPC perimeters. Agents securely map LexisNexis flags to Salesforce records without exposing PII to external untrusted endpoints.'
    },
    imagePrompt: 'A sleek, dark-themed 3D abstract representation of glowing data streams flowing from diverse corporate storage units (databases, vaults, mainframe nodes) into a central, glowing core (Vertex AI). Clean financial aesthetic, neon blue and deep indigo accents.',
    simulation: {
      title: "Estate Account Onboarding Verification",
      prompt: "Agent: Verify KYC documents for the Jenkins Family Trust account opening via Salesforce.",
      steps: [
        "Authenticating via VPC Service Controls...",
        "Correlating Salesforce FSC record with Secure Document Vault...",
        "Extracting entity structures and signatories from scanned Trust PDF...",
        "Cross-checking internal mainframe for existing Jenkins obligations...",
        "Validating against LexisNexis and OFAC lists..."
      ],
      result: "Verification Paused. Identified missing beneficiary signature on page 4 of the Trust Agreement. Sent automated notification to Relationship Manager queue with flagged PDF coordinate. Risk scoring: Low."
    },
    agentConfig: {
      model: "gemini-1.5-pro-002",
      tools: [
        { name: "Salesforce_FSC_API", description: "Read/Write access to Client Entity and Opportunity records in Salesforce Financial Services Cloud." },
        { name: "Document_Vault_OCR", description: "Multi-modal vision access to securely scan and extract text/entities from uploaded PDFs in the Schwab secure vault." },
        { name: "Mainframe_Obligation_Lookup", description: "Read-only access to legacy Schwab mainframes to query existing margin balances and obligations." },
        { name: "LexisNexis_Risk_API", description: "External API connector for running real-time AML (Anti-Money Laundering) and KYC checks against watchlists." }
      ],
      systemPrompt: "You are an expert KYC & Onboarding validation agent for Charles Schwab. Your goal is to review ingested trust documents against Salesforce FSC entity records. Use your tools to extract signatories, cross-reference existing obligations via mainframe, and run AML/KYC checks. If any signature is missing or conflicts arise, halt execution and flag coordinates for Relationship Manager review. Maintain strict adherence to FINRA Rule 2090 (Know Your Customer)."
    }
  },
  {
    id: 'advanced-reasoning',
    title: 'Complex Trade & Issue Resolution',
    icon: Bot,
    shortDesc: 'Multi-step logic for margin calls, corporate actions, and complex trades.',
    valueProp: {
      product: 'Move beyond standard chatbots. Utilize sophisticated multi-step reasoning capabilities to automate complex, non-deterministic wealth management workflows effortlessly.',
      business: 'Scale high-touch service. Automating non-deterministic workflows liberates Service reps to handle 3x more client volume and focus on relationship building.',
      compliance: 'Enforce trade logic automatically. The reasoning engine drafts trade proposals while strictly adhering to Rule 144 controls and mandatory pre-execution constraints recorded on-chain.'
    },
    imagePrompt: 'A minimalist 3D rendering of a glowing neural network or decision tree, floating in dark space, with individual nodes lighting up sequentially to represent multi-step portfolio logic and trading algorithms. Neon purple and cyan accents.',
    simulation: {
      title: "Margin Call Liquidation Strategy",
      prompt: "Agent: Draft liquidation resolution for Client ID 8832 experiencing a complex margin call on restricted stock.",
      steps: [
        "Calculating real-time margin deficit via internal risk API...",
        "Analyzing client's Rule 144 restricted stock holdings...",
        "Optimizing liquidation sequence for tax minimization (tax-loss harvesting)...",
        "Formulating compliant trade proposals..."
      ],
      result: "Proposed Liquidation Queued. Recommended selling $45k of unrestricted AAPL lots with highest cost basis first to minimize tax impact. Drafted customized risk disclosure ready for Advisor review prior to execution."
    },
    agentConfig: {
      model: "gemini-1.5-pro-002",
      tools: [
        { name: "Risk_Margin_API", description: "Calculates real-time portfolio margin deficits using Schwab's internal risk models." },
        { name: "Portfolio_Holdings_DB", description: "Retrieves current client asset allocations, cost basis data, and restriction flags (e.g., Rule 144)." },
        { name: "Tax_Loss_Harvesting_Engine", description: "Evaluates optimal lot liquidation strategies to minimize capital gains exposure." },
        { name: "Trade_Proposal_Drafting", description: "Constructs compliant trade payloads and standard risk disclosure drafts for Principal Review." }
      ],
      systemPrompt: "You are a specialized wealth management operations agent handling high-net-worth margin calls. You must calculate real-time margin deficits and identify restricted Rule 144 stock constraints securely. Formulate liquidation strategies that prioritize tax minimization (highest cost basis first). Do not execute trades directly; you must format a compliant trade proposal and risk disclosure for Principal Advisor approval."
    }
  },
  {
    id: 'multi-modal',
    title: 'Client Communication Synthesis',
    icon: Zap,
    shortDesc: 'Process client calls, secure PDFs, and email threads natively.',
    valueProp: {
      product: 'Unlock value from previously inaccessible unstructured wealth data. Seamlessly analyze scanned tax forms, encrypted emails, and recorded rep-client calls natively in a single pass.',
      business: 'Accelerate time-to-action. Automatically turning unstructured conversations into actionable CRM data drives faster advice execution, directly increasing asset gathering velocities.',
      compliance: 'Automated surveillance and disclosure mapping. The agent natively appends required SEC/FINRA disclosures to all drafted client communications based on extracted intent.'
    },
    imagePrompt: 'An elegant glass-morphism dashboard floating in a dark void. Holographic icons of tax documents, emails, soundwaves, and CRM records are orbiting a central glowing Gemini star icon, symbolizing unified wealth data processing.',
    simulation: {
      title: "Post-Call Advice Synthesis",
      prompt: "Agent: Process the 40-minute audio recording from Advisor Sarah's Q3 review with the Smith family.",
      steps: [
        "Transcribing 40-minute secure audio recording...",
        "Extracting newly mentioned life events (upcoming 2028 retirement)...",
        "Correlating stated retirement goals against current target-date allocations...",
        "Drafting follow-up email with appropriate SEC disclosures..."
      ],
      result: "Synthesis Complete. Updated Salesforce Financial Plan with '2028 Planned Retirement'. Detected 12% shortfall in target savings. Drafted Advisor follow-up email proposing recommended Roth conversions, attaching compliant disclosures."
    },
    agentConfig: {
      model: "gemini-1.5-pro-002",
      tools: [
        { name: "Audio_Transcription_Secure", description: "Processes encrypted voice recordings (e.g., advisor calls) into structured text using Vertex AI." },
        { name: "Salesforce_Financial_Plan_Write", description: "Updates core fields within the client's Salesforce Financial Plan object." },
        { name: "Goal_Allocation_Engine", description: "Compares extracted life events (e.g., retirement date) against current target-date glide paths." },
        { name: "Email_Drafting_API", description: "Generates compliant outgoing email drafts requiring Advisor approval, appending necessary SEC/FINRA footers." }
      ],
      systemPrompt: "You are a communications synthesis agent serving Charles Schwab Advisors. Analyze SEC-compliant meeting recordings and encrypted emails. Extract discrete financial lifecycle events (e.g., predicted retirement dates, liquidity needs). Compare extracted goals against the client's current target-date allocations. Output structured CRM update payloads and draft polite, professional follow-up correspondence appending proper SEC/FINRA disclosures."
    }
  }
];

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [simState, setSimState] = useState<'idle' | 'running' | 'complete'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [showAgentConfig, setShowAgentConfig] = useState(false);
  const [subAction, setSubAction] = useState<string>('');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [persona, setPersona] = useState<Persona>('product');

  const portfolioData = [
    { name: 'Equities', value: 4500000, color: '#3b82f6' },
    { name: 'Fixed Income', value: 2100000, color: '#8b5cf6' },
    { name: 'Cash Equivalents', value: 1250000, color: '#10b981' },
    { name: 'Alternatives', value: 850000, color: '#f59e0b' }
  ];
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  // Lock body scroll when modal is open and reset simulation state
  useEffect(() => {
    if (selectedFeature) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    setSimState('idle');
    setCurrentStep(0);
    setShowAgentConfig(false);
    setSubAction('');
    setExpandedTool(null);
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedFeature]);

  // Handle simulation progress
  useEffect(() => {
    if (simState === 'running' && selectedFeature) {
      if (currentStep < selectedFeature.simulation.steps.length) {
        
        const isLastStep = currentStep === selectedFeature.simulation.steps.length - 1;
        const nextStepText = isLastStep ? "Finalizing synthesis" : selectedFeature.simulation.steps[currentStep + 1];
        const currentTools = selectedFeature.agentConfig.tools;
        const tool = currentTools[currentStep % currentTools.length];

        setSubAction('');

        const t1 = setTimeout(() => setSubAction(`Executing tool: ${tool.name}()`), 700);
        const t2 = setTimeout(() => setSubAction(`Analyzing results...`), 1400);
        const t3 = setTimeout(() => setSubAction(`Preparing action: ${nextStepText.substring(0, 40)}...`), 2100);

        const timer = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          setSubAction('');
        }, 3000);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
          clearTimeout(timer);
        };
      } else {
        const finishTimer = setTimeout(() => {
          setSimState('complete');
        }, 500);
        return () => clearTimeout(finishTimer);
      }
    }
  }, [simState, currentStep, selectedFeature]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050608] text-slate-200 font-sans selection:bg-blue-600 selection:text-white flex flex-col relative">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 py-8 flex flex-col">
        {/* Navigation / Header */}
        <header className="sticky top-0 z-40 bg-[#050608]/80 backdrop-blur-md flex justify-between items-center mb-16 border-b border-slate-800 pb-4 shrink-0 pt-4 flex-wrap gap-y-4 gap-x-2">
          <div className="flex items-center gap-3 flex-1 sm:flex-none">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shrink-0">
              G
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white italic truncate">
              Gemini <span className="font-light text-slate-400 hidden sm:inline">Enterprise Agent Platform</span>
            </h1>
          </div>
          
          <div className="flex bg-slate-900/80 p-1 rounded-lg border border-slate-700/50 shadow-inner overflow-x-auto hide-scrollbar w-full md:w-auto order-3 md:order-none justify-center">
            {(['product', 'business', 'compliance'] as Persona[]).map(p => (
              <button
                key={p}
                onClick={() => setPersona(p)}
                className={`px-3 sm:px-4 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold rounded-md transition-all active:scale-95 whitespace-nowrap ${
                  persona === p 
                    ? 'bg-blue-600 outline outline-1 outline-blue-400 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 hover:shadow-sm hover:-translate-y-0.5'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex gap-6 text-[10px] sm:text-xs uppercase tracking-widest font-medium text-slate-400">
            <button onClick={() => scrollTo('features')} className="hover:text-slate-200 transition-all hover:-translate-y-0.5 active:scale-95">Features</button>
            <button onClick={() => scrollTo('compliance')} className="hover:text-slate-200 transition-all hover:-translate-y-0.5 active:scale-95">Compliance</button>
            <button onClick={() => scrollTo('workflow')} className="hover:text-slate-200 transition-all hover:-translate-y-0.5 active:scale-95">Workflow</button>
          </div>
        </header>

        <main className="flex-1 flex flex-col gap-32 pb-24">
          
          {/* Section: Strategic Value Propositon / Hero */}
          <section className="flex flex-col gap-6">
            <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={fadeIn} className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
              <motion.h2 
                key={persona}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-4"
              >
                {PERSONA_CONTENT[persona].heroBadge}
              </motion.h2>
              <div className="min-h-[100px] md:min-h-[130px]">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={persona}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-3xl md:text-5xl font-light leading-tight text-white mb-6 max-w-4xl"
                  >
                    {PERSONA_CONTENT[persona].heroTitlePre} <span className="text-blue-400 font-normal">{PERSONA_CONTENT[persona].heroTitlePost}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="min-h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.p 
                     key={persona}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.2 }}
                     className="text-lg text-slate-400 max-w-3xl mb-10 leading-relaxed"
                  >
                    {PERSONA_CONTENT[persona].heroSub}
                  </motion.p>
                </AnimatePresence>
              </div>
              <button onClick={() => scrollTo('features')} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium tracking-wide transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 inline-block relative z-10">
                Explore Core Workflows
              </button>
            </motion.div>
          </section>

          {/* Section: Features (Interactive) */}
          <section id="features" className="scroll-mt-32">
            <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="mb-12">
              <h2 className="text-sm uppercase tracking-widest text-indigo-400 font-bold mb-2">Core Platform Abilities</h2>
              <p className="text-2xl font-light text-slate-300">Click a functional pillar to reveal business value.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <motion.div 
                  key={feature.id}
                  initial="initial" 
                  whileInView="whileInView" 
                  variants={fadeIn}
                  onClick={() => setSelectedFeature(feature)}
                  className="bg-slate-900/30 hover:bg-slate-800/50 border border-slate-800 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] active:scale-[0.98] group"
                >
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.shortDesc}</p>
                  <div className="mt-6 flex items-center text-xs font-bold text-blue-400 uppercase tracking-widest group-hover:text-blue-300">
                    View Business Value &rarr;
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section: Compliance and Supervision */}
          <section id="compliance" className="scroll-mt-32">
            <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="mb-12 text-center md:text-left">
              <h2 className="text-sm uppercase tracking-widest text-emerald-400 font-bold mb-2">Supervision & Compliance</h2>
              <p className="text-2xl font-light text-slate-300">Enterprise guardrails built directly into the agentic loop.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="bg-slate-900/30 border border-emerald-900/50 p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                <Scale className="w-8 h-8 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Pre-Execution Rule Validation</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Before any agent executes a trade proposal or finalizes an account modification through internal systems, the operation is programmatically evaluated against standard FINRA/SEC parameters and internal Schwab risk policies.
                </p>
                <div className="bg-black/50 p-4 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-300">
                  <div className="text-emerald-400 mb-1">✔ Rule 204 Check: Passed</div>
                  <div className="text-emerald-400 mb-1">✔ AML Velocity Check: Passed</div>
                  <div className="text-slate-500">Agent Action Approved.</div>
                </div>
              </motion.div>

              <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="bg-slate-900/30 border border-emerald-900/50 p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                <Search className="w-8 h-8 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Immutable Audit & WORM Sync</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Every chain-of-thought, tool invocation, and generated client communication is securely logged. The platform seamlessly exports these forensic trails directly into WORM-compliant storage repositories.
                </p>
                <div className="bg-black/50 p-4 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-300">
                  <div className="flex justify-between mb-1"><span>Log ID: 99482A</span><span className="text-emerald-400">SYNCED</span></div>
                  <div className="text-slate-500 truncate mt-2">Destination: AWS Glacier / GCP WORM Vault</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section: Agent Orchestration */}
          <section id="orchestration" className="scroll-mt-32">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-center">
                <motion.div initial="initial" whileInView="whileInView" variants={fadeIn}>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20">
                    <Workflow className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-sm uppercase tracking-widest text-purple-400 font-bold mb-3">Agent Orchestration</h2>
                  <p className="text-3xl font-light leading-tight text-white mb-6">
                    Coordinate <span className="font-normal text-purple-400">multiple specialized agents</span> for complex decision-making.
                  </p>
                  <div className="min-h-[120px]">
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={persona}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-slate-400 leading-relaxed mb-6"
                      >
                        <strong>Platform Value:</strong> {PERSONA_CONTENT[persona].orchestrationValue}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Automated conflict resolution between internal routing systems.",
                      "Self-healing workflows that flag reps only on critical exceptions.",
                      "Human-in-the-loop (HITL) escalations (e.g. Principal Approval) merely acting as the final node."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-300 items-start">
                        <Network className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <div className="lg:w-1/2 bg-[#020305] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none"></div>
                 
                 <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="relative z-10 w-full">
                    {/* Visualizer Frame */}
                    <div className="aspect-[4/3] rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800/50 to-slate-900/50 flex flex-col items-center justify-center p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                       
                       <ImageIcon className="w-12 h-12 text-slate-700 mb-4" />
                       <div className="text-center font-mono text-xs uppercase tracking-widest text-slate-500 mb-6">Image Placeholder</div>

                       <div className="w-full bg-indigo-950/30 p-4 border border-indigo-900/50 rounded-xl relative z-20">
                          <h4 className="text-[10px] font-bold text-indigo-300 uppercase mb-2 flex items-center gap-2 tracking-widest">
                            <ImageIcon className="w-3 h-3" /> Image Prompt
                          </h4>
                          <p className="text-xs text-indigo-200/70 font-mono italic">
                            "A sleek, dark-themed 3D visualization of a master AI node acting as an orchestral conductor, directing streams of glowing data to smaller, specialized worker nodes below it. Cinematic lighting, neon cyan and deep purple accents, corporate architecture."
                          </p>
                       </div>
                    </div>
                 </motion.div>
              </div>
            </div>
          </section>

          {/* Section: Client Portfolio Overview */}
          <section id="portfolio" className="scroll-mt-32">
            <div className="flex flex-col lg:flex-row bg-[#080b13] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
                <motion.div initial="initial" whileInView="whileInView" variants={fadeIn}>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-3">Client Portfolio Overview</h2>
                  <p className="text-3xl font-light leading-tight text-white mb-6">
                    Real-time synthesis of <span className="font-normal text-blue-400">aggregate holdings.</span>
                  </p>
                  <div className="min-h-[120px]">
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={persona}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-slate-400 leading-relaxed mb-6"
                      >
                        <strong>Value Proposition:</strong> {PERSONA_CONTENT[persona].portfolioSub}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <button onClick={() => {
                        const feature = features.find(f => f.id === 'advanced-reasoning');
                        if (feature) setSelectedFeature(feature);
                      }} 
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 active:scale-95 border border-slate-700 hover:border-slate-500 self-start"
                  >
                    <Zap className="w-4 h-4 text-amber-400" /> Analyze via Advanced Reasoning
                  </button>
                </motion.div>
              </div>
              <div className="lg:w-1/2 bg-[#020305] p-8 md:p-12 flex flex-col justify-center border-l border-slate-800">
                <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="w-full">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-200">Sarah Jenkins</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Household ID: 899-24A</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-light text-white">$8,700,000</p>
                      <p className="text-xs text-emerald-400 font-bold tracking-wider">+2.4% YTD</p>
                    </div>
                  </div>
                  <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#f8fafc', fontSize: '12px' }}
                          itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Section: End-to-End Workflow Example */}
          <section id="workflow" className="scroll-mt-32">
            <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="mb-16 md:text-center">
              <h2 className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-2">End-to-End Workflow</h2>
              <p className="text-2xl md:text-3xl font-light text-slate-200 mb-4">HNW Account Onboarding Lifecycle</p>
              <div className="min-h-[60px] max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={persona}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 text-sm leading-relaxed"
                  >
                    {PERSONA_CONTENT[persona].workflowSub}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="max-w-4xl mx-auto relative">
               {/* Vertical Line */}
               <div className="absolute left-[27px] top-4 bottom-12 w-px bg-slate-800 hidden sm:block"></div>

               {/* Step 1 */}
               <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="relative sm:pl-20 pb-12">
                  <div className="hidden sm:flex absolute left-0 top-0 w-14 h-14 bg-sky-500/10 border border-sky-500/30 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(14,165,233,0.15)]">
                    <Mail className="w-6 h-6 text-sky-400" />
                  </div>
                  <div className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3 border-b border-slate-800/50 pb-4">
                       <h3 className="text-lg sm:text-xl font-bold text-slate-200 flex items-center gap-3">
                         <span className="sm:hidden w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm">1</span> 
                         Client Request Initiation
                       </h3>
                       <span className="text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 px-3 py-1.5 rounded-md border border-sky-500/30">SALESFORCE FSC</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      A high-net-worth client emails their Relationship Manager requesting a new joint margin account, attaching a scanned PDF of their driver's licenses and signed Trust documents. FSC automatically detects the intent, creates a draft Opportunity, and securely triggers the Orchestrator Agent.
                    </p>
                  </div>
               </motion.div>

               {/* Step 2 */}
               <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="relative sm:pl-20 pb-12">
                  <div className="hidden sm:flex absolute left-0 top-0 w-14 h-14 bg-blue-500/10 border border-blue-500/30 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <Layers className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-3 border-b border-slate-800/50 pb-4">
                         <h3 className="text-lg sm:text-xl font-bold text-slate-200 flex items-center gap-3">
                           <span className="sm:hidden w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">2</span>
                           Parallel Agentic Processing
                         </h3>
                         <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-md border border-blue-500/30">GEMINI MCP SERVER</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        The primary Orchestrator dispatches specialized sub-agents securely within the GCP perimeter to process the unstructured request simultaneously:
                      </p>
                      <ul className="space-y-4">
                         <li className="flex items-start gap-4 text-sm text-slate-300 bg-black/40 p-4 rounded-xl border border-slate-800/50">
                           <div className="bg-emerald-500/20 p-2 rounded-lg shrink-0">  
                             <FileText className="w-4 h-4 text-emerald-400" />
                           </div>
                           <div>
                             <strong className="text-slate-200 block mb-1">Document Analysis Agent:</strong> 
                             Extracts entities, addresses, and multi-modal signatures from the unstructured Trust PDF using Vision capabilities.
                           </div>
                         </li>
                         <li className="flex items-start gap-4 text-sm text-slate-300 bg-black/40 p-4 rounded-xl border border-slate-800/50">
                           <div className="bg-rose-500/20 p-2 rounded-lg shrink-0">
                             <Search className="w-4 h-4 text-rose-400" />
                           </div>
                           <div>
                             <strong className="text-slate-200 block mb-1">KYC/AML Agent:</strong> 
                             Uses provisioned internal tools to ping LexisNexis APIs and cross-references Charles Schwab's internal risk watchlists for all extracted entities.
                           </div>
                         </li>
                      </ul>
                    </div>
                  </div>
               </motion.div>

               {/* Step 3 */}
               <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="relative sm:pl-20 pb-12">
                  <div className="hidden sm:flex absolute left-0 top-0 w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3 border-b border-slate-800/50 pb-4">
                       <h3 className="text-lg sm:text-xl font-bold text-slate-200 flex items-center gap-3">
                         <span className="sm:hidden w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">3</span>
                         Supervision & Human-in-the-Loop
                       </h3>
                       <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-md border border-emerald-500/30">COMPLIANCE GUARDRAILS</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      The agents uncover a minor discrepancy in the physical address format between the Trust doc and LexisNexis. The system halts automated provisioning and delegates a quick decision to the RM.
                    </p>
                    <div className="bg-black/50 border-l-2 border-emerald-500 p-4 font-mono text-[11px] sm:text-xs text-slate-300 rounded-r-xl shadow-inner">
                       <span className="text-amber-400 block mb-2">{`>`} FLAGGED FOR REVIEW: Address Mismatch.</span>
                       <span className="text-slate-400 block mb-2">{`>`} ROUTING: Sent push notification to Relationship Manager in Salesforce.</span>
                       <span className="text-emerald-400 block font-bold">{`>`} HITL ACTION: RM clicks "Approve Variance - Verified via Phone" in FSC.</span>
                    </div>
                  </div>
               </motion.div>

               {/* Step 4 */}
               <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="relative sm:pl-20">
                  <div className="hidden sm:flex absolute left-0 top-0 w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-full items-center justify-center z-10 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <CheckCircle className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3 border-b border-slate-800/50 pb-4">
                       <h3 className="text-lg sm:text-xl font-bold text-slate-200 flex items-center gap-3">
                         <span className="sm:hidden w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">4</span>
                         Finalization & Mainframe Sync
                       </h3>
                       <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-md border border-purple-500/30">SCHWAB MAINFRAMES</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      Upon RM approval, the orchestration loop resumes. Pre-execution compliance checks lock the payload, and a secure API request is pushed to the legacy brokerage core to complete provisioning.
                    </p>
                    <div className="flex flex-wrap gap-4 text-[10px] sm:text-xs uppercase font-bold tracking-widest text-slate-500 bg-black/30 p-4 rounded-xl border border-slate-800/50">
                       <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400"/> Account Provisioned</div>
                       <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400"/> ACAT Funding Initiated</div>
                       <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-purple-400"/> WORM Audit Synced</div>
                    </div>
                  </div>
               </motion.div>

            </div>
          </section>

          {/* Section: Ecosystem Integration */}
          <section id="integration" className="scroll-mt-32">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 flex flex-col justify-center">
                <motion.div initial="initial" whileInView="whileInView" variants={fadeIn}>
                  <div className="inline-block bg-indigo-500/20 px-3 py-1 rounded-full text-[10px] font-bold text-indigo-300 border border-indigo-500/30 mb-4">SYSTEM TRAY COMPANION</div>
                  <h2 className="text-sm uppercase tracking-widest text-indigo-400 font-bold mb-2">The Architectural Seat</h2>
                  <p className="text-3xl font-light text-slate-200 mb-6 leading-tight">
                    The <span className="font-normal text-sky-400">Digital Rep Platform</span> Container
                  </p>
                  <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
                    <p>
                      We cannot leave strategic ground on the table by migrating to a pure web app. Agents require an <strong>OS-level surface</strong>, not just a sandboxed browser tab, to access the file system, inter-app automation, and persistent context.
                    </p>
                    <p>
                      <strong className="text-slate-200">The Strategy:</strong> Pair the new web-based Client Central with a lightweight system tray companion. This thin desktop agent communicates with the web UI via FDC3 messages, giving browser apps desktop-native powers. It lives above the workspace—deduplicating notifications and restoring context regardless of the active application.
                    </p>
                    <div className="bg-indigo-950/20 p-4 border border-indigo-900/50 rounded-xl">
                      <h4 className="text-xs font-bold text-indigo-300 uppercase mb-2">Image Prompt Required:</h4>
                      <p className="text-xs text-indigo-200/60 font-mono italic">
                        "A sleek, dark-mode 3D architectural diagram. A glowing foundational layer labeled 'OS System Tray' supports a web browser running Client Central on top. Glowing data threads representing FDC3 messaging connect the browser to a central AI node hovering nearby."
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-7">
                <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="h-full bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
                   <div className="w-full flex justify-between items-center px-4 relative z-10">
                      <div className="w-28 h-28 bg-[#0a0f1c] border border-sky-500/30 rounded-2xl flex flex-col items-center justify-center text-center p-3 shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                        <Briefcase className="w-8 h-8 text-sky-400 mb-3" />
                        <div className="text-sky-400 font-bold text-[10px] mb-1">SALESFORCE</div>
                        <div className="text-[9px] text-slate-500 uppercase">FSC CRM</div>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center px-6">
                        <div className="text-[10px] font-mono font-bold text-indigo-300 mb-2 bg-[#050608] px-3 py-1 rounded shadow-sm z-10">MCP PROTOCOL</div>
                        <div className="w-full h-px border-t-2 border-dashed border-indigo-500/40 relative">
                           <motion.div 
                            animate={{ x: ['-200%', '200%'] }} 
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute top-1/2 -translate-y-1/2 w-12 h-1 bg-indigo-400 rounded-full shadow-[0_0_12px_#818cf8]" 
                           />
                        </div>
                      </div>

                      <div className="w-28 h-28 bg-[#0a0f1c] border border-blue-500/30 rounded-2xl flex flex-col items-center justify-center text-center p-3 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                        <Bot className="w-8 h-8 text-blue-400 mb-3" />
                        <div className="text-blue-400 font-bold text-[10px] mb-1">GEMINI</div>
                        <div className="text-[9px] text-slate-500 uppercase">MCP Server</div>
                      </div>
                   </div>

                   <div className="mt-12 w-full max-w-md p-4 rounded-xl bg-black/60 border border-slate-800 font-mono text-[10px] text-slate-400">
                     <span className="text-green-400">// Mechanism: RM triggers wealth analysis task</span><br/>
                     <span className="text-slate-500">POST /mcp/tools/call</span><br/>
                     {`{`}<br/>
                     &nbsp;&nbsp;<span className="text-blue-300">"tool"</span>: "predict_margin_exposure",<br/>
                     &nbsp;&nbsp;<span className="text-blue-300">"context"</span>: {`{ "accountId": "SF-9921" }`}<br/>
                     {`}`}
                   </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Section: Limitations & Solutions */}
          <section id="limitations" className="scroll-mt-32">
            <motion.div initial="initial" whileInView="whileInView" variants={fadeIn} className="mb-12 text-center md:text-left">
              <h2 className="text-sm uppercase tracking-widest text-slate-500 font-bold mb-2">Architectural Reality</h2>
              <p className="text-2xl font-light text-slate-300">Limitations & Best Practices</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                {
                  icon: RefreshCw,
                  title: "State & Trade Synchronization",
                  setup: "Latency between CRM updates and Brokerage backend.",
                  challenge: "Real-time trade state synchronization across internet boundaries introduces unacceptable latency for live Agentic reasoning loops.",
                  solution: "Implement an Event-Driven Architecture. Utilize GCP Pub/Sub alongside internal mainframe messaging. Platforms push state changes asynchronously, allowing edge-cached nodes to answer agent queries instantly."
                },
                {
                  icon: Server,
                  title: "The Browser Sandbox",
                  setup: "Agents require deep OS integrations that pure web cannot reach cleanly.",
                  challenge: "As Agentforce and Vertex workflows land on the rep desktop, a sandboxed browser tab cannot give them the clipboard access, file system visibility, or local bridges (telephony, scanners) they need to actually get work done.",
                  solution: "Deploy the System Tray Assistant. Serving as the AI-ready surface, it extends cleanly into any future MCP-style local tool pattern. It provides passive telemetry to measure actual time-on-task, proving value capture post-delivery."
                },                
                {
                  icon: Lock,
                  title: "PII & GLBA Security",
                  setup: "Cross-boundary authentication & IAM.",
                  challenge: "Salesforce and internal clouds use separate identities. Mapping a Service Rep's access rights securely to a BigQuery dataset containing PII is highly complex.",
                  solution: "Implement OAuth 2.0 Token Exchange (RFC 8693). Wrap the MCP server in API Gateway requiring authenticated identity translation, and lock resources behind VPC Service Controls strictly tied to those accounts."
                }
              ].map((item, i) => (
                <motion.div key={i} initial="initial" whileInView="whileInView" variants={fadeIn} className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">{item.title}</h3>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <p className="text-xs font-mono text-slate-500">{item.setup}</p>
                    <div>
                      <div className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest mb-1 flex items-center gap-1">Challenge</div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.challenge}</p>
                    </div>
                    <div className="pt-2">
                      <div className="text-[10px] font-bold text-green-400/80 uppercase tracking-widest mb-1 flex items-center gap-1">Solution</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </main>

        {/* Footer Bar */}
        <footer className="mt-auto pt-8 pb-4 shrink-0 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-600 gap-4 border-t border-slate-800/50">
          <div className="flex gap-4 items-center">
             <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg">G</div>
             <span className="uppercase tracking-widest font-medium border-r border-slate-800 pr-4">Charles Schwab Internal</span>
             <span className="uppercase tracking-widest font-medium">Strategy & Architecture</span>
          </div>
          <span className="text-slate-500 font-medium italic">Gemini Enterprise Agent Platform Overview</span>
        </footer>
      </div>

      {/* Feature Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4 sm:p-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 100 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 100 }}
                 transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                 className="w-full max-w-2xl bg-[#0a0f1c] border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
               >
                 <div className="relative h-48 sm:h-64 bg-slate-900 border-b border-slate-800 flex flex-col items-center justify-center p-6 shrink-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
                    <selectedFeature.icon className="w-16 h-16 text-blue-400 mb-4 opacity-50 absolute right-8 top-8" />
                    
                    <div className="relative z-10 w-full max-w-sm rounded border border-slate-800 bg-black/50 p-4 backdrop-blur-md">
                      <div className="flex items-center gap-2 mb-2">
                         <ImageIcon className="w-4 h-4 text-slate-500" />
                         <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Image Generation Prompt</span>
                      </div>
                      <p className="text-xs text-slate-400 italic">
                        "{selectedFeature.imagePrompt}"
                      </p>
                    </div>
                 </div>
                 
                 <div className="p-6 sm:p-8 overflow-y-auto">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">Business Value Proposition</div>
                        <h2 className="text-2xl font-semibold text-slate-200">{selectedFeature.title}</h2>
                      </div>
                      <button 
                         onClick={() => setSelectedFeature(null)}
                         className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:rotate-90 active:scale-90"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {simState === 'idle' ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                          {selectedFeature.valueProp[persona]}
                        </p>
                        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center flex-wrap gap-4">
                          <div className="flex flex-wrap gap-3">
                            <button 
                              onClick={() => setSimState('running')}
                              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/50 rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95 group"
                            >
                              <Terminal className="w-4 h-4 group-hover:animate-pulse" />
                              Run Interactive Simulation
                            </button>
                            <button 
                              onClick={() => setShowAgentConfig(true)}
                              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 active:scale-95 border border-slate-700 hover:border-slate-500"
                            >
                              <Settings2 className="w-4 h-4 text-slate-400" />
                              Config
                            </button>
                          </div>
                          <button 
                            onClick={() => setSelectedFeature(null)}
                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all hover:-translate-y-0.5 active:scale-95"
                          >
                            Close Insight
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-5 font-mono text-xs overflow-hidden flex flex-col min-h-[280px]">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                           <div className="flex items-center gap-2 text-slate-400">
                             <Terminal className="w-4 h-4" />
                             <span>{selectedFeature.simulation.title}</span>
                           </div>
                           <div className="flex items-center gap-4">
                             <button 
                               onClick={() => setShowAgentConfig(true)} 
                               className="text-slate-500 hover:text-slate-300 flex items-center gap-1.5 text-[10px] uppercase tracking-widest transition-all hover:-translate-y-0.5 active:scale-95"
                             >
                               <Settings2 className="w-3 h-3" /> Config
                             </button>
                             <div className="flex gap-1.5 pl-4 border-l border-slate-800">
                               <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                               <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                             </div>
                           </div>
                        </div>
                        <div className="text-blue-400 mb-5 font-medium leading-relaxed">
                          <span className="text-slate-600 mr-2">{">"}</span>{selectedFeature.simulation.prompt}
                        </div>
                        
                        <div className="flex-1 overflow-y-auto space-y-3">
                          {selectedFeature.simulation.steps.map((step, index) => (
                            <div key={index} className="flex flex-col">
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: currentStep > index ? 1 : (currentStep === index && simState === 'running' ? 0.7 : 0) }}
                                className={`flex items-start gap-3 ${currentStep === index && simState === 'running' ? 'text-yellow-400' : 'text-slate-400'}`}
                              >
                                <div className="mt-0.5 shrink-0">
                                  {currentStep > index && <Check className="w-3.5 h-3.5 text-green-500" />}
                                  {currentStep === index && simState === 'running' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                  {currentStep < index && <div className="w-3.5 h-3.5" />}
                                </div>
                                <span className={currentStep === index && simState === 'running' ? 'animate-pulse' : ''}>{step}</span>
                              </motion.div>
                              
                              {currentStep === index && simState === 'running' && subAction && (
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={subAction}
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.15 }}
                                    className="ml-[26px] mt-2 text-[10px] text-emerald-400/80 font-mono flex items-center gap-2"
                                  >
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    {subAction}
                                  </motion.div>
                                </AnimatePresence>
                              )}
                            </div>
                          ))}
                          
                          {simState === 'complete' && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-white mt-6 bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg bg-gradient-to-br from-blue-900/20 to-transparent"
                            >
                              <span className="text-green-400 font-bold mb-2 flex items-center gap-2">
                                <Check className="w-4 h-4" /> Execution Successful
                              </span>
                              <div className="text-slate-300 leading-relaxed">
                                {selectedFeature.simulation.result}
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {simState === 'complete' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 pt-4 border-t border-slate-800/50 flex justify-end">
                            <button 
                              onClick={() => setSimState('idle')}
                              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-all hover:-translate-y-0.5 active:scale-95"
                            >
                              Reset Simulation
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                 </div>

                 {/* Agent Config Overlay */}
                 <AnimatePresence>
                   {showAgentConfig && (
                     <motion.div
                       initial={{ opacity: 0, y: "10%" }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: "10%" }}
                       transition={{ type: "spring", damping: 25, stiffness: 200 }}
                       className="absolute inset-0 bg-[#0a0f1c] z-50 flex flex-col overflow-y-auto w-full h-full border border-slate-700/50"
                     >
                       <div className="p-6 sm:p-8 flex flex-col h-full">
                         <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4 shrink-0">
                           <div className="flex items-center gap-3">
                             <div className="p-2 bg-slate-800/50 rounded-lg">
                               <Settings2 className="w-5 h-5 text-emerald-400" />
                             </div>
                             <div>
                               <h3 className="text-sm font-bold text-slate-200">Agent Configuration</h3>
                               <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1">Audit & Transparency Log</p>
                             </div>
                           </div>
                           <button 
                             onClick={() => setShowAgentConfig(false)}
                             className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:rotate-90 active:scale-90"
                           >
                             <X className="w-5 h-5" />
                           </button>
                         </div>

                         <div className="space-y-8 flex-1">
                           <div>
                             <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2"><Zap className="w-3 h-3 text-emerald-500/70" /> Foundational LLM Model</label>
                             <div className="inline-flex items-center gap-2 bg-emerald-950/20 border border-emerald-900/40 px-3 py-1.5 rounded-lg text-emerald-300 font-mono text-xs">
                               {selectedFeature.agentConfig.model}
                             </div>
                           </div>

                           <div>
                             <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2"><Layers className="w-3 h-3 text-blue-500/70" /> Enabled Tool Access (MCP Vectors)</label>
                             <div className="flex flex-wrap gap-2">
                               {selectedFeature.agentConfig.tools.map((t, idx) => (
                                 <div key={idx} className="flex flex-col gap-2 w-full sm:w-[calc(50%-0.5rem)]">
                                   <button 
                                     onClick={() => setExpandedTool(expandedTool === t.name ? null : t.name)}
                                     className={`text-left px-3 py-2.5 rounded-md font-mono text-[11px] sm:text-xs flex items-center justify-between transition-all active:scale-[0.98] hover:shadow-md border ${
                                       expandedTool === t.name 
                                         ? 'bg-blue-900/30 border-blue-500/50 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.1)]' 
                                         : 'bg-slate-900 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-500'
                                     }`}
                                   >
                                      <div className="flex items-center gap-2">
                                         <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${expandedTool === t.name ? 'bg-blue-400' : 'bg-blue-500'}`}></div> 
                                         <span className="truncate">{t.name}</span>
                                      </div>
                                      <Info className="w-3.5 h-3.5 shrink-0 ml-2 opacity-50" />
                                   </button>
                                   
                                   <AnimatePresence>
                                     {expandedTool === t.name && (
                                        <motion.div 
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="p-3 bg-slate-900/50 border border-slate-700/30 rounded-md text-[11px] sm:text-xs text-slate-400 leading-relaxed font-sans mb-1 shadow-inner relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 rounded-l-md"></div>
                                            {t.description}
                                          </div>
                                        </motion.div>
                                     )}
                                   </AnimatePresence>
                                 </div>
                               ))}
                             </div>
                           </div>

                           <div>
                             <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-2"><Briefcase className="w-3 h-3 text-purple-500/70" /> Active System Prompt</label>
                             <div className="bg-black/60 border border-slate-800 p-5 rounded-xl text-slate-400 font-mono text-xs leading-loose overflow-x-auto whitespace-pre-wrap">
                               {selectedFeature.agentConfig.systemPrompt}
                             </div>
                           </div>
                         </div>
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
