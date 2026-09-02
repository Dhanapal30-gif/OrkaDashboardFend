import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Briefcase,
  AlertTriangle,
  CreditCard,
  Calendar,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Network,
  IndianRupee,
  Gauge,
  Zap,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =====================================================
   DATA
===================================================== */

const revenueData = [
  { month: "Apr", target: 40, actual: 8.16 },
  { month: "May", target: 40, actual: 18.18 },
  { month: "Jun", target: 40, actual: 7.59 },
  { month: "Jul", target: 40, actual: 15.23 },
];

const pipelineData = [
  { stage: "Lead", value: 25, count: 15 },
  { stage: "Enquiry", value: 40, count: 10 },
  { stage: "Quotation", value: 55, count: 7 },
  { stage: "Negotiation", value: 35, count: 4 },
  { stage: "PO Confirmed", value: 60, count: 3 },
];

const costData = [
  { name: "Material", value: 22.09 },
  { name: "Operations", value: 5.64 },
  { name: "Marketing", value: 2 },
];

const projects = [
  {
    name: "Burn-in Trolley",
    customer: "TATA",
    value: "₹46.02 L",
    progress: 70,
    profit: "₹6 L",
    status: "On Track",
    type: "success",
  },
  {
    name: "Sauna",
    customer: "Customer Project",
    value: "₹15.61 L",
    progress: 52,
    profit: "₹0.5 L",
    status: "Low Margin",
    type: "warning",
  },
  {
    name: "MatManPro",
    customer: "Internal",
    value: "₹5.74 L",
    progress: 35,
    profit: "-₹1 L",
    status: "Loss",
    type: "danger",
  },
];

const departments = [
  { name: "Sales", value: 38, status: "Behind" },
  { name: "Operations", value: 82, status: "Attention" },
  { name: "Accounts", value: 89, status: "Good" },
  { name: "Marketing", value: 58, status: "Attention" },
  { name: "R&D", value: 76, status: "On Track" },
];

const actions = [
  {
    priority: "HIGH",
    title: "Revenue below target",
    description: "Increase order conversion and complete pending projects",
    owner: "Sales Team",
  },
  {
    priority: "HIGH",
    title: "Customer outstanding ₹72.69 L",
    description: "Accelerate customer payment collection",
    owner: "Accounts",
  },
  {
    priority: "HIGH",
    title: "3 delayed projects",
    description: "Prepare project recovery plan immediately",
    owner: "Operations",
  },
  {
    priority: "MEDIUM",
    title: "Material cost high",
    description: "Supplier comparison and cost optimization required",
    owner: "Purchase",
  },
];

const PALETTE = ["#B08D2B", "#1F6F54", "#5B6472"];

const formatCurrency = (value) => `₹${value} L`;

/* =====================================================
   SMALL COMPONENTS
===================================================== */

const Status = ({ children, type = "success" }) => (
  <span className={`status-badge ${type}`}>
    {type === "success" && <CheckCircle2 />}
    {type === "danger" && <XCircle />}
    {type === "warning" && <AlertTriangle />}
    {children}
  </span>
);

const KpiCard = ({ title, value, subtitle, icon, tone, trend }) => (
  <div className={`ledger-kpi ${tone}`}>
    <div className="kpi-top">
      <div className="kpi-icon">{icon}</div>
      <MoreHorizontal className="kpi-more" />
    </div>
    <p>{title}</p>
    <h2>{value}</h2>
    <div className="kpi-footer">
      {trend === "up" && <ArrowUp />}
      {trend === "down" && <ArrowDown />}
      <span>{subtitle}</span>
    </div>
  </div>
);

const SectionHeading = ({ chapter, eyebrow, title, sub, right }) => (
  <div className="card-header">
    <div>
      <span className="card-label">
        <em>§{chapter}</em> {eyebrow}
      </span>
      <h3>{title}</h3>
      <p>{sub}</p>
    </div>
    {right}
  </div>
);

/* =====================================================
   MAIN
===================================================== */

const Dashboard = () => {
  return (
    <div className="executive-dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,440;9..144,560;9..144,650&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600;700&display=swap');

        .executive-dashboard {
          --ink: #0E1420;
          --ink-soft: #1A2233;
          --paper: #F6F3EA;
          --paper-line: #E4DFCE;
          --card: #FFFFFF;
          --text: #23293A;
          --text-mute: #6B6455;
          --text-faint: #9A927C;
          --brass: #A9822A;
          --brass-soft: #EFE3C2;
          --forest: #1F6F54;
          --forest-soft: #E1EEE7;
          --oxblood: #8C2F31;
          --oxblood-soft: #F3E1DF;
          --slate: #4A5266;
          --slate-soft: #E7E9EF;

          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'IBM Plex Sans', 'Segoe UI', sans-serif;
          --font-mono: 'IBM Plex Mono', 'Courier New', monospace;

          width: 100%;
          min-height: 100vh;
          padding: 34px;
          background:
            radial-gradient(circle at 100% 0%, rgba(169,130,42,0.06), transparent 45%),
            var(--paper);
          font-family: var(--font-body);
          color: var(--text);
          box-sizing: border-box;
        }
        .executive-dashboard *, .executive-dashboard *::before, .executive-dashboard *::after {
          box-sizing: border-box;
        }

        /* ================= HERO ================= */

        .exec-hero {
          position: relative;
          overflow: hidden;
          border-radius: 6px;
          padding: 40px 44px;
          margin-bottom: 26px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          color: #F3EFE3;
          background:
            radial-gradient(circle at 88% 18%, rgba(169,130,42,0.35), transparent 42%),
            linear-gradient(150deg, #0E1420 0%, #1A2233 100%);
          box-shadow: 0 24px 60px rgba(14,20,32,0.28);
        }
        .exec-hero::after {
          content: "";
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(243,239,227,0.08);
          border-radius: 2px;
          pointer-events: none;
        }
        .hero-content, .hero-right { position: relative; z-index: 2; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 13px;
          border: 1px solid rgba(169,130,42,0.55);
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.6px;
          color: #D9BE7E;
          text-transform: uppercase;
        }
        .hero-badge svg { width: 13px; height: 13px; }
        .exec-hero h1 {
          margin: 18px 0 8px;
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 560;
          letter-spacing: -0.3px;
        }
        .exec-hero p { margin: 0; font-size: 13.5px; color: #B9B2A0; max-width: 420px; }

        .hero-right { display: flex; align-items: center; gap: 22px; }
        .month-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          border: 1px solid rgba(217,190,126,0.3);
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.4px;
          color: #E7DFC9;
        }
        .month-selector svg { width: 15px; height: 15px; color: #D9BE7E; }

        .exec-stamp-wrap { display: flex; align-items: center; gap: 14px; }
        .exec-stamp {
          width: 96px;
          height: 96px;
          flex-shrink: 0;
          border-radius: 50%;
          border: 2.5px solid #D9BE7E;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: rotate(-9deg);
          color: #D9BE7E;
          position: relative;
          opacity: 0.92;
        }
        .exec-stamp::before {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px dashed rgba(217,190,126,0.6);
          border-radius: 50%;
        }
        .exec-stamp .score {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
        .exec-stamp .of100 { font-size: 8px; letter-spacing: 0.5px; margin-top: 2px; }
        .stamp-copy small {
          display: block;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 1.4px;
          color: #9A917A;
          text-transform: uppercase;
        }
        .stamp-copy strong {
          display: block;
          margin-top: 5px;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: #F3D98A;
        }

        /* ================= KPI ================= */

        .ledger-kpi-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
          margin-bottom: 22px;
        }
        .ledger-kpi {
          position: relative;
          min-height: 168px;
          padding: 18px 18px 16px;
          border-radius: 6px;
          background: var(--card);
          border: 1px solid var(--paper-line);
          border-top: 3px solid var(--paper-line);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ledger-kpi:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(35,41,58,0.08);
        }
        .ledger-kpi.brass { border-top-color: var(--brass); }
        .ledger-kpi.forest { border-top-color: var(--forest); }
        .ledger-kpi.oxblood { border-top-color: var(--oxblood); }
        .ledger-kpi.slate { border-top-color: var(--slate); }

        .kpi-top { display: flex; justify-content: space-between; align-items: center; }
        .kpi-more { width: 16px; height: 16px; color: var(--text-faint); }
        .kpi-icon {
          width: 38px; height: 38px;
          border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
        }
        .kpi-icon svg { width: 18px; height: 18px; }
        .brass .kpi-icon { background: var(--brass-soft); color: var(--brass); }
        .forest .kpi-icon { background: var(--forest-soft); color: var(--forest); }
        .oxblood .kpi-icon { background: var(--oxblood-soft); color: var(--oxblood); }
        .slate .kpi-icon { background: var(--slate-soft); color: var(--slate); }

        .ledger-kpi p {
          margin: 18px 0 4px;
          color: var(--text-mute);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .ledger-kpi h2 {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.3px;
        }
        .kpi-footer {
          display: flex; align-items: center; gap: 4px;
          margin-top: 9px;
          font-size: 10px;
          font-weight: 500;
          color: var(--text-mute);
        }
        .kpi-footer svg { width: 12px; height: 12px; }
        .oxblood .kpi-footer { color: var(--oxblood); }

        /* ================= ALERT ================= */

        .exec-alert {
          display: flex; align-items: center; gap: 16px;
          padding: 16px 20px;
          margin-bottom: 22px;
          border-radius: 4px;
          background: var(--card);
          border: 1px solid var(--paper-line);
          border-left: 4px solid var(--oxblood);
        }
        .alert-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          background: var(--oxblood-soft); color: var(--oxblood);
        }
        .alert-icon svg { width: 19px; height: 19px; }
        .alert-content { flex: 1; display: flex; flex-direction: column; gap: 3px; }
        .alert-content strong { font-family: var(--font-display); font-size: 15px; font-weight: 600; }
        .alert-content span { color: var(--text-mute); font-size: 11.5px; }
        .alert-score { text-align: right; }
        .alert-score span { display: block; color: var(--text-faint); font-size: 9px; text-transform: uppercase; letter-spacing: 1px; }
        .alert-score strong { font-family: var(--font-mono); color: var(--oxblood); font-size: 14px; }

        /* ================= GRID / CARD ================= */

        .dashboard-grid { display: grid; gap: 20px; margin-bottom: 20px; }
        .main-grid { grid-template-columns: 1.6fr 1fr; }
        .project-grid { grid-template-columns: 1.55fr 1fr; }
        .cost-grid { grid-template-columns: 1fr 1fr; }

        .ledger-card {
          padding: 26px;
          border-radius: 6px;
          background: var(--card);
          border: 1px solid var(--paper-line);
        }
        .card-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 15px; margin-bottom: 22px;
        }
        .card-label {
          display: block; margin-bottom: 8px;
          color: var(--text-mute);
          font-family: var(--font-mono);
          font-size: 9.5px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase;
        }
        .card-label em { color: var(--brass); font-style: normal; font-weight: 700; }
        .card-header h3 { margin: 0; font-family: var(--font-display); color: var(--text); font-size: 21px; font-weight: 600; }
        .card-header p { margin: 6px 0 0; color: var(--text-faint); font-size: 11.5px; }

        .chart-value, .pipeline-total { text-align: right; }
        .chart-value span, .pipeline-total span { display: block; color: var(--text-faint); font-size: 9px; text-transform: uppercase; letter-spacing: 0.6px; }
        .chart-value strong, .pipeline-total strong { display: block; margin-top: 5px; font-family: var(--font-mono); color: var(--text); font-size: 17px; }

        /* ================= REVENUE ================= */

        .revenue-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 10px; }
        .revenue-stats div { padding: 14px; border-radius: 4px; background: var(--paper); border: 1px solid var(--paper-line); }
        .revenue-stats span { display: block; color: var(--text-faint); font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; }
        .revenue-stats strong { display: block; margin-top: 6px; font-family: var(--font-mono); font-size: 15px; }
        .negative-stat strong { color: var(--oxblood); }

        /* ================= BUSINESS HEALTH ================= */

        .health-metrics { display: flex; flex-direction: column; gap: 11px; }
        .health-metric { display: flex; align-items: center; gap: 13px; padding: 13px 14px; border-radius: 4px; }
        .metric-icon { width: 36px; height: 36px; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .metric-icon svg { width: 17px; height: 17px; }
        .health-metric span { display: block; color: var(--text-mute); font-size: 10px; }
        .health-metric strong { display: block; margin-top: 3px; font-family: var(--font-mono); font-size: 16px; }
        .health-metric.negative { background: var(--oxblood-soft); }
        .health-metric.negative .metric-icon { background: #fff; color: var(--oxblood); }
        .health-metric.warning { background: var(--brass-soft); }
        .health-metric.warning .metric-icon { background: #fff; color: var(--brass); }
        .health-metric.positive { background: var(--forest-soft); }
        .health-metric.positive .metric-icon { background: #fff; color: var(--forest); }

        .business-score-box { margin-top: 20px; padding: 17px; border-radius: 5px; background: var(--ink); color: #F3EFE3; }
        .business-score-box span { color: #9A917A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; }
        .business-score-box strong { display: block; margin: 5px 0 13px; font-family: var(--font-mono); font-size: 21px; }
        .score-bar { height: 6px; overflow: hidden; border-radius: 3px; background: rgba(255,255,255,0.1); }
        .score-bar div { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--brass), #D9BE7E); }
        .business-score-box p { margin: 11px 0 0; color: #9A917A; font-size: 9.5px; }

        /* ================= PROJECT ================= */

        .project-list { display: flex; flex-direction: column; gap: 12px; }
        .project-item { display: grid; grid-template-columns: 1.4fr 0.8fr 0.8fr 0.8fr; gap: 15px; padding: 17px; border: 1px solid var(--paper-line); border-radius: 5px; }
        .project-title { display: flex; align-items: center; gap: 11px; }
        .project-avatar { width: 38px; height: 38px; border-radius: 5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .project-avatar svg { width: 17px; height: 17px; }
        .project-avatar.success { background: var(--forest-soft); color: var(--forest); }
        .project-avatar.warning { background: var(--brass-soft); color: var(--brass); }
        .project-avatar.danger { background: var(--oxblood-soft); color: var(--oxblood); }
        .project-title strong { display: block; font-family: var(--font-display); font-size: 13.5px; font-weight: 600; }
        .project-title span { display: block; margin-top: 3px; color: var(--text-faint); font-size: 9.5px; }
        .project-value span, .project-profit span { display: block; color: var(--text-faint); font-size: 9px; text-transform: uppercase; letter-spacing: 0.4px; }
        .project-value strong, .project-profit strong { display: block; margin-top: 5px; font-family: var(--font-mono); font-size: 12.5px; }
        .project-profit strong.success { color: var(--forest); }
        .project-profit strong.warning { color: var(--brass); }
        .project-profit strong.danger { color: var(--oxblood); }
        .project-progress-wrap { grid-column: 1 / -1; }
        .progress-text { display: flex; justify-content: space-between; margin-bottom: 7px; color: var(--text-mute); font-size: 9.5px; }
        .progress-text strong { font-family: var(--font-mono); color: var(--text); }
        .custom-progress { height: 6px; overflow: hidden; border-radius: 3px; background: var(--paper); }
        .custom-progress div { height: 100%; border-radius: 3px; background: var(--slate); }
        .custom-progress div.success { background: var(--forest); }
        .custom-progress div.warning { background: var(--brass); }
        .custom-progress div.danger { background: var(--oxblood); }

        /* ================= STATUS ================= */

        .status-badge { display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px; border-radius: 3px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.3px; }
        .status-badge svg { width: 12px; height: 12px; }
        .status-badge.success { background: var(--forest-soft); color: var(--forest); }
        .status-badge.warning { background: var(--brass-soft); color: #8A6B1E; }
        .status-badge.danger { background: var(--oxblood-soft); color: var(--oxblood); }

        /* ================= OUTSTANDING ================= */

        .outstanding-number { padding: 20px; border-radius: 5px; background: var(--oxblood-soft); border: 1px solid rgba(140,47,49,0.18); }
        .outstanding-number span { display: block; color: #8A4341; font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; }
        .outstanding-number strong { display: block; margin-top: 6px; font-family: var(--font-mono); color: var(--oxblood); font-size: 27px; }
        .aging-chart { margin-top: 20px; display: flex; flex-direction: column; gap: 15px; }
        .aging-row { display: grid; grid-template-columns: 72px 1fr 60px; align-items: center; gap: 8px; font-size: 9.5px; }
        .aging-row > span { color: var(--text-mute); }
        .aging-row strong { text-align: right; font-family: var(--font-mono); font-size: 10.5px; }
        .aging-bar { height: 7px; overflow: hidden; border-radius: 3px; background: var(--paper); }
        .aging-bar div { height: 100%; border-radius: 3px; }
        .age-1 { background: var(--forest); }
        .age-2 { background: #7A9A3A; }
        .age-3 { background: var(--brass); }
        .age-4 { background: var(--oxblood); }
        .collection-warning { display: flex; align-items: center; gap: 8px; margin-top: 20px; padding: 11px 12px; border-radius: 4px; background: var(--oxblood-soft); color: var(--oxblood); font-size: 10.5px; font-weight: 600; }
        .collection-warning svg { width: 15px; height: 15px; flex-shrink: 0; }

        /* ================= PIPELINE ================= */

        .pipeline-summary { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 14px; }
        .pipeline-step { display: flex; gap: 10px; padding: 13px; border-radius: 5px; background: var(--paper); border: 1px solid var(--paper-line); }
        .pipeline-step-number { font-family: var(--font-mono); color: var(--brass); font-size: 10px; font-weight: 700; }
        .pipeline-step span, .pipeline-step strong, .pipeline-step small { display: block; }
        .pipeline-step span { color: var(--text-mute); font-size: 9px; }
        .pipeline-step strong { margin: 4px 0; font-family: var(--font-mono); font-size: 14px; }
        .pipeline-step small { color: var(--text-faint); font-size: 8.5px; }

        /* ================= DEPARTMENT ================= */

        .department-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .department-card { padding: 16px; border-radius: 5px; background: var(--paper); border: 1px solid var(--paper-line); }
        .department-top { display: flex; justify-content: space-between; }
        .department-avatar { width: 36px; height: 36px; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: var(--slate-soft); color: var(--slate); }
        .department-avatar svg { width: 16px; height: 16px; }
        .department-card h4 { margin: 15px 0 6px; font-family: var(--font-display); font-size: 13.5px; font-weight: 600; }
        .department-percentage { margin-bottom: 10px; font-family: var(--font-mono); font-size: 23px; font-weight: 700; }
        .department-progress div { background: var(--slate); }

        /* ================= COST ================= */

        .cost-chart-wrapper { display: flex; align-items: center; gap: 22px; }
        .pie-wrapper { width: 52%; position: relative; }
        .pie-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; }
        .pie-center strong { display: block; font-family: var(--font-mono); font-size: 15px; }
        .pie-center span { color: var(--text-faint); font-size: 8px; text-transform: uppercase; }
        .cost-legend { flex: 1; display: flex; flex-direction: column; gap: 15px; }
        .cost-legend > div { display: flex; align-items: center; gap: 8px; }
        .legend-dot { width: 9px; height: 9px; border-radius: 2px; flex-shrink: 0; }
        .cost-legend > div span:nth-child(2) { flex: 1; color: var(--text-mute); font-size: 10.5px; }
        .cost-legend strong { font-family: var(--font-mono); font-size: 11px; }

        /* ================= CASH FLOW ================= */

        .cash-flow-list { display: flex; flex-direction: column; gap: 9px; }
        .cash-flow-item { display: flex; justify-content: space-between; align-items: center; padding: 14px; border-radius: 4px; background: var(--paper); }
        .cash-flow-item > div { display: flex; align-items: center; gap: 9px; font-size: 11.5px; }
        .cash-flow-item svg { width: 16px; height: 16px; }
        .cash-flow-item strong { font-family: var(--font-mono); font-size: 13px; }
        .cash-flow-item.positive { background: var(--forest-soft); color: var(--forest); }
        .cash-flow-item.negative { background: var(--oxblood-soft); color: var(--oxblood); }
        .cash-flow-item.neutral { color: var(--text-mute); }
        .closing-cash-card { margin-top: 16px; padding: 19px; border-radius: 5px; background: var(--ink); color: #F3EFE3; }
        .closing-cash-card span { display: block; color: #9A917A; font-size: 10px; text-transform: uppercase; letter-spacing: 0.6px; }
        .closing-cash-card strong { display: block; margin-top: 6px; font-family: var(--font-mono); font-size: 24px; }

        /* ================= MANAGEMENT ================= */

        .management-section { padding: 28px; border-radius: 6px; background: var(--ink); color: #F3EFE3; }
        .management-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; }
        .management-title { display: flex; align-items: center; gap: 13px; }
        .management-icon { width: 44px; height: 44px; border-radius: 5px; display: flex; align-items: center; justify-content: center; background: rgba(217,190,126,0.14); color: #D9BE7E; }
        .management-icon svg { width: 20px; height: 20px; }
        .management-title span { color: #9A917A; font-family: var(--font-mono); font-size: 9.5px; font-weight: 600; letter-spacing: 1.4px; text-transform: uppercase; }
        .management-title h2 { margin: 5px 0 0; font-family: var(--font-display); font-size: 22px; font-weight: 600; }
        .action-counter { padding: 8px 13px; border-radius: 3px; background: rgba(140,47,49,0.22); color: #E7A3A0; font-family: var(--font-mono); font-size: 9.5px; font-weight: 700; letter-spacing: 0.5px; }

        .action-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; }
        .action-card { padding: 18px; border-radius: 5px; background: rgba(255,255,255,0.045); border: 1px solid rgba(255,255,255,0.08); }
        .action-card-top { display: flex; justify-content: space-between; align-items: center; }
        .action-card-top svg { width: 16px; height: 16px; color: #6C7488; }
        .priority { padding: 5px 8px; border-radius: 3px; font-family: var(--font-mono); font-size: 8.5px; font-weight: 700; letter-spacing: 0.4px; }
        .priority.high { background: rgba(140,47,49,0.25); color: #E7A3A0; }
        .priority.medium { background: rgba(169,130,42,0.25); color: #E9CE8E; }
        .action-card h3 { margin: 16px 0 7px; font-family: var(--font-display); font-size: 14px; font-weight: 600; }
        .action-card p { min-height: 46px; margin: 0; color: #A29B89; font-size: 10.5px; line-height: 1.6; }
        .action-owner { margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08); }
        .action-owner span { display: block; color: #6C7488; font-family: var(--font-mono); font-size: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .action-owner strong { display: block; margin-top: 4px; font-size: 11px; }

        /* ================= FOOTER ================= */

        .ledger-footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid var(--paper-line);
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.5px;
          color: var(--text-faint);
          text-transform: uppercase;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1400px) {
          .ledger-kpi-grid { grid-template-columns: repeat(3, 1fr); }
          .department-grid { grid-template-columns: repeat(3, 1fr); }
          .action-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 1050px) {
          .main-grid, .project-grid, .cost-grid { grid-template-columns: 1fr; }
          .pipeline-summary { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .executive-dashboard { padding: 16px; }
          .exec-hero { padding: 28px 24px; flex-direction: column; align-items: flex-start; }
          .hero-right { width: 100%; justify-content: space-between; }
          .ledger-kpi-grid { grid-template-columns: repeat(2, 1fr); }
          .project-item { grid-template-columns: 1fr 1fr; }
          .project-status { display: flex; justify-content: flex-end; }
          .department-grid { grid-template-columns: repeat(2, 1fr); }
          .cost-chart-wrapper { flex-direction: column; }
          .pie-wrapper { width: 100%; }
          .ledger-footer { flex-direction: column; gap: 4px; }
        }

        @media (max-width: 500px) {
          .executive-dashboard { padding: 10px; }
          .exec-hero h1 { font-size: 25px; }
          .hero-right { flex-direction: column; align-items: stretch; gap: 16px; }
          .exec-stamp-wrap { justify-content: center; }
          .month-selector { justify-content: center; }
          .ledger-kpi-grid { grid-template-columns: 1fr; }
          .revenue-stats { grid-template-columns: 1fr; }
          .pipeline-summary { grid-template-columns: 1fr; }
          .department-grid { grid-template-columns: 1fr; }
          .project-item { grid-template-columns: 1fr; }
          .project-status { justify-content: flex-start; }
          .action-grid { grid-template-columns: 1fr; }
          .management-header { align-items: flex-start; flex-direction: column; gap: 14px; }
          .ledger-card { padding: 18px; }
          .management-section { padding: 18px; }
        }
      `}</style>

      {/* ================= HERO ================= */}

      <div className="exec-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Zap />
            Executive Briefing
          </div>
          <h1>MD / CEO Executive Dashboard</h1>
          <p>Real-time business performance, financial health and management priorities.</p>
        </div>

        <div className="hero-right">
          <div className="month-selector">
            <Calendar />
            <span>July 2026</span>
          </div>

          <div className="exec-stamp-wrap">
            <div className="exec-stamp">
              <span className="score">62</span>
              <span className="of100">/ 100</span>
            </div>
            <div className="stamp-copy">
              <small>Business Health</small>
              <strong>Needs Attention</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ================= KPI CARDS ================= */}

      <div className="ledger-kpi-grid">
        <KpiCard title="Revenue" value="₹15.23 L" subtitle="Target: ₹40 L" icon={<IndianRupee />} tone="slate" trend="down" />
        <KpiCard title="Revenue Achievement" value="38%" subtitle="-62% Variance" icon={<TrendingDown />} tone="oxblood" trend="down" />
        <KpiCard title="Net Profit / Loss" value="-₹12.50 L" subtitle="Current month performance" icon={<TrendingDown />} tone="oxblood" trend="down" />
        <KpiCard title="Outstanding" value="₹72.69 L" subtitle="Collection required" icon={<Wallet />} tone="brass" />
        <KpiCard title="Active Projects" value="12" subtitle="3 projects delayed" icon={<Briefcase />} tone="forest" />
        <KpiCard title="Business Performance" value="62%" subtitle="Target: 70%+" icon={<Gauge />} tone="slate" />
      </div>

      {/* ================= ALERT ================= */}

      <div className="exec-alert">
        <div className="alert-icon"><AlertTriangle /></div>
        <div className="alert-content">
          <strong>Executive Attention Required</strong>
          <span>Revenue is below target, outstanding is high and 3 projects require immediate management attention.</span>
        </div>
        <div className="alert-score">
          <span>Priority</span>
          <strong>High</strong>
        </div>
      </div>

      {/* ================= REVENUE + HEALTH ================= */}

      <div className="dashboard-grid main-grid">
        <div className="ledger-card">
          <SectionHeading
            chapter="01"
            eyebrow="Financial Performance"
            title="Revenue vs Target"
            sub="Monthly revenue performance overview"
            right={
              <div className="chart-value">
                <span>July Actual</span>
                <strong>₹15.23 L</strong>
              </div>
            }
          />

          <ResponsiveContainer width="100%" height={310}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A9822A" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#A9822A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#EAE5D6" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6B6455", fontFamily: "IBM Plex Mono", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} tick={{ fill: "#6B6455", fontFamily: "IBM Plex Mono", fontSize: 11 }} />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ borderRadius: 4, border: "1px solid #E4DFCE", fontFamily: "IBM Plex Sans", fontSize: 12 }}
              />
              <Area type="monotone" dataKey="target" stroke="#9A927C" strokeWidth={1.5} strokeDasharray="6 6" fill="transparent" name="Target" />
              <Area type="monotone" dataKey="actual" stroke="#A9822A" strokeWidth={3} fill="url(#actualGradient)" name="Actual" />
            </AreaChart>
          </ResponsiveContainer>

          <div className="revenue-stats">
            <div><span>Monthly Target</span><strong>₹40 L</strong></div>
            <div><span>Current Actual</span><strong>₹15.23 L</strong></div>
            <div className="negative-stat"><span>Achievement</span><strong>38%</strong></div>
          </div>
        </div>

        <div className="ledger-card">
          <SectionHeading chapter="02" eyebrow="Executive Summary" title="Business Health" sub="Key financial indicators" />

          <div className="health-metrics">
            <div className="health-metric negative">
              <div className="metric-icon"><TrendingDown /></div>
              <div><span>Profit Margin</span><strong>-82%</strong></div>
            </div>
            <div className="health-metric warning">
              <div className="metric-icon"><Wallet /></div>
              <div><span>Outstanding</span><strong>₹72.69 L</strong></div>
            </div>
            <div className="health-metric positive">
              <div className="metric-icon"><Network /></div>
              <div><span>Active Projects</span><strong>12</strong></div>
            </div>
          </div>

          <div className="business-score-box">
            <span>Overall Business Score</span>
            <strong>62 / 100</strong>
            <div className="score-bar"><div style={{ width: "62%" }} /></div>
            <p>Target performance should be above 70%</p>
          </div>
        </div>
      </div>

      {/* ================= PROJECT + OUTSTANDING ================= */}

      <div className="dashboard-grid project-grid">
        <div className="ledger-card">
          <SectionHeading chapter="03" eyebrow="Project Performance" title="Project-Wise Profitability" sub="Revenue, margin and execution progress" />

          <div className="project-list">
            {projects.map((project) => (
              <div className="project-item" key={project.name}>
                <div className="project-title">
                  <div className={`project-avatar ${project.type}`}><Briefcase /></div>
                  <div>
                    <strong>{project.name}</strong>
                    <span>{project.customer}</span>
                  </div>
                </div>

                <div className="project-value"><span>Project Value</span><strong>{project.value}</strong></div>
                <div className="project-profit"><span>Profit / Loss</span><strong className={project.type}>{project.profit}</strong></div>
                <div className="project-status"><Status type={project.type}>{project.status}</Status></div>

                <div className="project-progress-wrap">
                  <div className="progress-text"><span>Progress</span><strong>{project.progress}%</strong></div>
                  <div className="custom-progress"><div className={project.type} style={{ width: `${project.progress}%` }} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ledger-card">
          <SectionHeading chapter="04" eyebrow="Cash Collection" title="Outstanding Receivables" sub="Customer payment aging analysis" />

          <div className="outstanding-number">
            <span>Total Outstanding</span>
            <strong>₹72.69 L</strong>
          </div>

          <div className="aging-chart">
            <div className="aging-row"><span>0–30 Days</span><div className="aging-bar"><div className="age-1" style={{ width: "21%" }} /></div><strong>₹15 L</strong></div>
            <div className="aging-row"><span>31–60 Days</span><div className="aging-bar"><div className="age-2" style={{ width: "17%" }} /></div><strong>₹12 L</strong></div>
            <div className="aging-row"><span>61–90 Days</span><div className="aging-bar"><div className="age-3" style={{ width: "14%" }} /></div><strong>₹10 L</strong></div>
            <div className="aging-row"><span>90+ Days</span><div className="aging-bar"><div className="age-4" style={{ width: "49%" }} /></div><strong>₹35.69 L</strong></div>
          </div>

          <div className="collection-warning"><AlertTriangle />49% of outstanding is above 90 days</div>
        </div>
      </div>

      {/* ================= PIPELINE ================= */}

      <div className="ledger-card" style={{ marginBottom: 20 }}>
        <SectionHeading
          chapter="05"
          eyebrow="Future Revenue"
          title="Sales Pipeline"
          sub="Business opportunities and expected future revenue"
          right={
            <div className="pipeline-total">
              <span>Total Pipeline</span>
              <strong>₹215 L</strong>
            </div>
          }
        />

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={pipelineData}>
            <CartesianGrid stroke="#EAE5D6" strokeDasharray="3 5" vertical={false} />
            <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fill: "#6B6455", fontFamily: "IBM Plex Mono", fontSize: 10.5 }} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} tick={{ fill: "#6B6455", fontFamily: "IBM Plex Mono", fontSize: 11 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: 4, border: "1px solid #E4DFCE", fontFamily: "IBM Plex Sans", fontSize: 12 }} />
            <Bar dataKey="value" fill="#A9822A" radius={[3, 3, 0, 0]} name="Pipeline Value" />
          </BarChart>
        </ResponsiveContainer>

        <div className="pipeline-summary">
          {pipelineData.map((item, index) => (
            <div className="pipeline-step" key={item.stage}>
              <div className="pipeline-step-number">0{index + 1}</div>
              <div>
                <span>{item.stage}</span>
                <strong>₹{item.value} L</strong>
                <small>{item.count} Opportunities</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DEPARTMENT ================= */}

      <div className="ledger-card" style={{ marginBottom: 20 }}>
        <SectionHeading chapter="06" eyebrow="Organization Performance" title="Department Performance" sub="Current achievement against departmental KPIs" />

        <div className="department-grid">
          {departments.map((department) => (
            <div className="department-card" key={department.name}>
              <div className="department-top">
                <div className="department-avatar"><Briefcase /></div>
                <Status type={department.status === "Good" || department.status === "On Track" ? "success" : department.status === "Behind" ? "danger" : "warning"}>
                  {department.status}
                </Status>
              </div>
              <h4>{department.name}</h4>
              <div className="department-percentage">{department.value}%</div>
              <div className="custom-progress department-progress"><div style={{ width: `${department.value}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= COST + CASH FLOW ================= */}

      <div className="dashboard-grid cost-grid">
        <div className="ledger-card">
          <SectionHeading chapter="07" eyebrow="Expense Analysis" title="Cost Distribution" sub="Current month expense breakdown" />

          <div className="cost-chart-wrapper">
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={270}>
                <PieChart>
                  <Pie data={costData} cx="50%" cy="50%" innerRadius={64} outerRadius={98} dataKey="value" paddingAngle={4}>
                    {costData.map((entry, index) => (
                      <Cell key={index} fill={PALETTE[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ borderRadius: 4, border: "1px solid #E4DFCE", fontFamily: "IBM Plex Sans", fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center">
                <strong>₹27.73 L</strong>
                <span>Total Cost</span>
              </div>
            </div>

            <div className="cost-legend">
              {costData.map((item, index) => (
                <div key={item.name}>
                  <span className="legend-dot" style={{ background: PALETTE[index] }} />
                  <span>{item.name}</span>
                  <strong>₹{item.value} L</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ledger-card">
          <SectionHeading chapter="08" eyebrow="Liquidity" title="Cash Flow Summary" sub="Current financial movement" />

          <div className="cash-flow-list">
            <div className="cash-flow-item neutral"><div><Wallet /><span>Opening Cash</span></div><strong>₹XX L</strong></div>
            <div className="cash-flow-item positive"><div><ArrowUp /><span>Customer Collections</span></div><strong>+₹XX L</strong></div>
            <div className="cash-flow-item negative"><div><ArrowDown /><span>Supplier Payments</span></div><strong>-₹XX L</strong></div>
            <div className="cash-flow-item negative"><div><ArrowDown /><span>Operating Expenses</span></div><strong>-₹XX L</strong></div>
          </div>

          <div className="closing-cash-card">
            <span>Closing Cash Position</span>
            <strong>₹XX L</strong>
          </div>
        </div>
      </div>

      {/* ================= MANAGEMENT ACTION ================= */}

      <div className="management-section">
        <div className="management-header">
          <div className="management-title">
            <div className="management-icon"><AlertTriangle /></div>
            <div>
              <span>Executive Priorities</span>
              <h2>Management Action Required</h2>
            </div>
          </div>
          <div className="action-counter">4 Open Actions</div>
        </div>

        <div className="action-grid">
          {actions.map((action, index) => (
            <div className="action-card" key={index}>
              <div className="action-card-top">
                <span className={`priority ${action.priority.toLowerCase()}`}>{action.priority}</span>
                <MoreHorizontal />
              </div>
              <h3>{action.title}</h3>
              <p>{action.description}</p>
              <div className="action-owner">
                <span>Owner</span>
                <strong>{action.owner}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ledger-footer">
        <span>Prepared for management review · Confidential</span>
        <span>Generated 29 Aug 2026</span>
      </div>
    </div>
  );
};

export default Dashboard;
