import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  BusinessCenter,
  WarningAmber,
  Payments,
  CalendarMonth,
  ArrowUpward,
  ArrowDownward,
  MoreHoriz,
  CheckCircle,
  Error,
  AccountTree,
  AttachMoney,
  Speed,
  Bolt,
} from "@mui/icons-material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./MDDashboard.css";

/* =====================================================
   DATA
===================================================== */

const revenueData = [
  { month: "Apr", target: 40, actual: 8.16 },
  { month: "May", target: 40, actual: 18.18 },
  { month: "Jun", target: 40, actual: 7.59 },
  { month: "Jul", target: 40, actual: 15.23 },
];

// const pipelineData = [
//   { stage: "Lead", value: 25, count: 15 },
//   { stage: "Enquiry", value: 40, count: 10 },
//   { stage: "Solution", value: 35, count: 4 },
//   { stage: "Quotation", value: 55, count: 7 },
//   { stage: "PO Confirmed", value: 60, count: 3 },
// ];


const pipelineData = [
  {
    company: "Tata Chennai 5th batch",
    stage: "Quotation",
    value: 10,
    count: 5,
  },
  {
    company: "Flex DTA Alt chamber service",
    stage: "Quotation",
    value: 17,
    count: 10,
  },
  {
    company: "AQMS Nokia Chennai service",
    stage: "Quotation",
    value: 1.6,
    count: 1,
  },
//   {
//     company: "Tata Bengaluru: AQT Rack Modification",
//     stage: "Quotation",
//     value: 3.5,
//     count: 1,
//   },
  {
    company: "Vantiva Nirma - ALT Chamber cycle power cut of",
    stage: "PO Confirmed",
    value: 2.5,
    count: 1,
  },
];

const costData = [
  { name: "Material", value: 22.09 },
  { name: "Operations", value: 5.64 },
  { name: "Marketing", value: 2 },
];

/* =====================================================
   PROJECT PROFITABILITY
===================================================== */
const projects = [
  {
    id: 1,
    poDate: "31.01.2024",
    prnNo: "PRN76",
    projectName: "ALT Chamber",
    companyName: "Neolync Tele Communication Pvt Ltd",
    projectValue: 13982400,
    plannedExpense: 7000000,
    actualCost: 5811683,
    upcomingExpense: 1188317,
    grossMargin: 8170717,
    grossMarginPercent: 58,
  },
  {
    id: 2,
    poDate: "21.02.2024",
    prnNo: "PRN77",
    projectName: "CPMS Phase 2",
    companyName: "Nokia Solutions and Networks India Private Limited - Chennai",
    projectValue: 1961849,
    plannedExpense: 850000,
    actualCost: 424066,
    upcomingExpense: 425934,
    grossMargin: 1537783,
    grossMarginPercent: 78,
  },
  {
    id: 3,
    poDate: "13.01.2024",
    prnNo: "PRN78",
    projectName: "CPMS Software Update",
    companyName: "Nokia Solutions and Networks India Private Limited - Chennai",
    projectValue: 192970,
    plannedExpense: 20000,
    actualCost: 0,
    upcomingExpense: 20000,
    grossMargin: 192970,
    grossMarginPercent: 100,
  },
  {
    id: 4,
    poDate: "05.04.2024",
    prnNo: "PRN79",
    projectName: "Chennai P2L -V5",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 188500,
    plannedExpense: 75000,
    actualCost: 40846,
    upcomingExpense: 34154,
    grossMargin: 147654,
    grossMarginPercent: 78,
  },
  {
    id: 5,
    poDate: "07.05.2024",
    prnNo: "PRN80",
    projectName: "Chennai P2L",
    companyName: "Nokia Solutions and Networks India Private Limited - Chennai",
    projectValue: 397000,
    plannedExpense: 150000,
    actualCost: 49734,
    upcomingExpense: 100266,
    grossMargin: 347266,
    grossMarginPercent: 87,
  },
  {
    id: 6,
    poDate: "05.04.2025",
    prnNo: "PRN81",
    projectName: "Thermal Chamber",
    companyName: "Neolync Tele Communication Pvt Ltd",
    projectValue: 792500,
    plannedExpense: 480000,
    actualCost: 473598,
    upcomingExpense: 6402,
    grossMargin: 318902,
    grossMarginPercent: 40,
  },
  {
    id: 7,
    poDate: "31.05.2024",
    prnNo: "PRN82",
    projectName: "MRU Tester software",
    companyName: "Sanmina-SCI India Private Limited",
    projectValue: 75052,
    plannedExpense: 40000,
    actualCost: 50,
    upcomingExpense: 39950,
    grossMargin: 75002,
    grossMarginPercent: 100,
  },
  {
    id: 8,
    poDate: "31.05.2024",
    prnNo: "PRN83",
    projectName: "MRU Tester software phase 2",
    companyName: "Sanmina-SCI India Private Limited",
    projectValue: 130000,
    plannedExpense: 110000,
    actualCost: 104000,
    upcomingExpense: 6000,
    grossMargin: 26000,
    grossMarginPercent: 20,
  },
  {
    id: 9,
    poDate: "16.07.2024",
    prnNo: "PRN84",
    projectName: "Pick to light phase-2",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 839550,
    plannedExpense: 385000,
    actualCost: 195630,
    upcomingExpense: 189370,
    grossMargin: 643920,
    grossMarginPercent: 77,
  },
  {
    id: 10,
    poDate: "19.07.2024",
    prnNo: "PRN85",
    projectName: "Mat man pro phase 1",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 1948310,
    plannedExpense: 850000,
    actualCost: 829153,
    upcomingExpense: 20847,
    grossMargin: 1119157,
    grossMarginPercent: 57,
  },
  {
    id: 11,
    poDate: "16.07.2024",
    prnNo: "PRN86",
    projectName: "AMC Service Support PTL",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 1038600,
    plannedExpense: 210000,
    actualCost: 656,
    upcomingExpense: 209344,
    grossMargin: 1037944,
    grossMarginPercent: 100,
  },
  {
    id: 12,
    poDate: "26.07.2024",
    prnNo: "PRN87",
    projectName: "Mat man pro phase 2",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 1945350,
    plannedExpense: 550000,
    actualCost: 355351,
    upcomingExpense: 194649,
    grossMargin: 1589999,
    grossMarginPercent: 82,
  },
  {
    id: 13,
    poDate: "08.07.2024",
    prnNo: "PRN88",
    projectName: "CPMS Additional Spare",
    companyName: "Nokia Solutions and Networks India Private Limited - Chennai",
    projectValue: 149100,
    plannedExpense: 40000,
    actualCost: 0,
    upcomingExpense: 40000,
    grossMargin: 149100,
    grossMarginPercent: 100,
  },
  {
    id: 14,
    poDate: "17.10.2024",
    prnNo: "PRN89",
    projectName: "Retro fixture 6 Qty",
    companyName: "Dixon Electro Appliances Private LTD",
    projectValue: 74600,
    plannedExpense: 35000,
    actualCost: 8187,
    upcomingExpense: 26813,
    grossMargin: 66413,
    grossMarginPercent: 89,
  },
  {
    id: 15,
    poDate: "15.11.2024",
    prnNo: "PRN90",
    projectName: "2nd Retro fixture 8 Qty",
    companyName: "Dixon Electro Appliances Private LTD",
    projectValue: 78400,
    plannedExpense: 15000,
    actualCost: 13331,
    upcomingExpense: 1669,
    grossMargin: 65069,
    grossMarginPercent: 83,
  },
  {
    id: 16,
    poDate: "25.11.2024",
    prnNo: "PRN91",
    projectName: "3rd Retro fixture 4 Qty",
    companyName: "Dixon Electro Appliances Private LTD",
    projectValue: 39200,
    plannedExpense: 8000,
    actualCost: 0,
    upcomingExpense: 8000,
    grossMargin: 39200,
    grossMarginPercent: 100,
  },
  {
    id: 17,
    poDate: "04.12.2024",
    prnNo: "PRN92",
    projectName: "4rd Retro fixture 4 Qty",
    companyName: "Dixon Electro Appliances Private LTD",
    projectValue: 39200,
    plannedExpense: 25000,
    actualCost: 20189,
    upcomingExpense: 4811,
    grossMargin: 19011,
    grossMarginPercent: 48,
  },
  {
    id: 18,
    poDate: "08.08.2025",
    prnNo: "PRN93",
    projectName: "ALT Chamber 10 (Humax)",
    companyName: "Humax",
    projectValue: 12245250,
    plannedExpense: 6000000,
    actualCost: 5278088,
    upcomingExpense: 721912,
    grossMargin: 6967162,
    grossMarginPercent: 57,
  },
  {
    id: 19,
    poDate: "10.12.2024",
    prnNo: "PRN94",
    projectName: "5rd Retro fixture 8 Qty",
    companyName: "Dixon Electro Appliances Private LTD",
    projectValue: 78400,
    plannedExpense: 15000,
    actualCost: 4100,
    upcomingExpense: 10900,
    grossMargin: 74300,
    grossMarginPercent: 95,
  },
  {
    id: 20,
    poDate: "12.02.2025",
    prnNo: "PRN95",
    projectName: "TITO – vulnerability development",
    companyName: "ZF Commercial vehicle Control Systems India Limited",
    projectValue: 87950,
    plannedExpense: 10000,
    actualCost: 700,
    upcomingExpense: 9300,
    grossMargin: 87250,
    grossMarginPercent: 99,
  },
  {
    id: 21,
    poDate: "14.04.2025",
    prnNo: "PRN96",
    projectName: "OTA Start Automation 4 bits(Sanmina)",
    companyName: "Sanmina-SCI India Private Limited",
    projectValue: 71200,
    plannedExpense: 21360,
    actualCost: 60520,
    upcomingExpense: -39160,
    grossMargin: 10680,
    grossMarginPercent: 15,
  },
  {
    id: 22,
    poDate: "14.04.2025",
    prnNo: "PRN97",
    projectName: "PTL Hardware interfacing with New software.",
    companyName: "Nokia Solutions and Networks India Private Limited - Chennai",
    projectValue: 65950,
    plannedExpense: 19785,
    actualCost: 0,
    upcomingExpense: 19785,
    grossMargin: 65950,
    grossMarginPercent: 100,
  },
  {
    id: 23,
    poDate: "14.07.2025",
    prnNo: "PRN98",
    projectName: "Auto indication Systeam for mat man pro",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 1195620,
    plannedExpense: 550000,
    actualCost: 381504,
    upcomingExpense: 168496,
    grossMargin: 814116,
    grossMarginPercent: 68,
  },
  {
    id: 24,
    poDate: "09.07.2025",
    prnNo: "PRN99",
    projectName: "Mel Systems and Services LTD",
    companyName: "Mel System and Services LTD",
    projectValue: 237187,
    plannedExpense: 201609,
    actualCost: 199267,
    upcomingExpense: 2342,
    grossMargin: 37920,
    grossMarginPercent: 16,
  },
  {
    id: 25,
    poDate: "23.07.2025",
    prnNo: "PRN100",
    projectName: "Mat man pro System upgrade",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 997750,
    plannedExpense: 350000,
    actualCost: 181350,
    upcomingExpense: 168650,
    grossMargin: 816400,
    grossMarginPercent: 82,
  },
  {
    id: 26,
    poDate: "10.10.2025",
    prnNo: "PRN101",
    projectName: "Burn in trolley",
    companyName: "TATA Electronics Products And Solutions Private Limited - Hosur",
    projectValue: 4396500,
    plannedExpense: 2500000,
    actualCost: 2321115,
    upcomingExpense: 178885,
    grossMargin: 2075385,
    grossMarginPercent: 47,
  },
  {
    id: 27,
    poDate: "03.09.2025",
    prnNo: "PRN102",
    projectName: "Delhi AMC(25-26)",
    companyName: "Nokia Solutions and Networks India Private Limited- Delhi",
    projectValue: 1090530,
    plannedExpense: 200000,
    actualCost: 8528,
    upcomingExpense: 191472,
    grossMargin: 1082002,
    grossMarginPercent: 99,
  },
  {
    id: 28,
    poDate: "24.09.2025",
    prnNo: "PRN103",
    projectName: "ALT Chamber (Dixon)",
    companyName: "SANMINA-SCI INDIA PVT LTD",
    projectValue: 1378850,
    plannedExpense: 650000,
    actualCost: 502190,
    upcomingExpense: 147810,
    grossMargin: 876660,
    grossMarginPercent: 64,
  },
  {
    id: 29,
    poDate: "22.12.2025",
    prnNo: "PRN104",
    projectName: "Burn in trolley( 3 Phase )",
    companyName: "TATA Electronics Products And Solutions Private Limited - Hosur",
    projectValue: 3979200,
    plannedExpense: 1900000,
    actualCost: 1968627,
    upcomingExpense: -68627,
    grossMargin: 2010573,
    grossMarginPercent: 51,
  },
  {
    id: 30,
    poDate: "13.03.2026",
    prnNo: "PRN105",
    projectName: "ALT Chamber (Door Service)",
    companyName: "FLEXTRONICS TECH (I) Pvt Ltd.",
    projectValue: 187450,
    plannedExpense: 95000,
    actualCost: 42225,
    upcomingExpense: 52775,
    grossMargin: 145225,
    grossMarginPercent: 77,
  },
  {
    id: 31,
    poDate: "-",
    prnNo: "PRN106",
    projectName: "MHS Work station",
    companyName: "INTEGFARMS MY HEALTH SCHOOL PRIVATE LIMITED",
    projectValue: 1282631,
    plannedExpense: 1050000,
    actualCost: 853177,
    upcomingExpense: 196823,
    grossMargin: 429454,
    grossMarginPercent: 33,
  },
  {
    id: 32,
    poDate: "07.05.2026",
    prnNo: "PRN107",
    projectName: "Burn in trolley( 3 Phase ) TATA",
    companyName: "TATA Electronics Products And Solutions Private Limited - Chennai",
    projectValue: 1025000,
    plannedExpense: 650000,
    actualCost: 710308,
    upcomingExpense: -60308,
    grossMargin: 314692,
    grossMarginPercent: 31,
  },
  {
    id: 33,
    poDate: "11.05.2026",
    prnNo: "PRN108",
    projectName: "Rack universal adjestment",
    companyName: "TATA Electronics Products And Solutions Private Limited - Bangalore",
    projectValue: 434454,
    plannedExpense: 237000,
    actualCost: 238179,
    upcomingExpense: -1179,
    grossMargin: 196275,
    grossMarginPercent: 45,
  },
  {
    id: 34,
    poDate: "16.05.2026",
    prnNo: "PRN109",
    projectName: "ALT CHAMBER MATERIAL SPARES & SERVICES",
    companyName: "FLEXTRONICS TECH (I) Pvt Ltd.",
    projectValue: 1354530,
    plannedExpense: 500000,
    actualCost: 155892,
    upcomingExpense: 344108,
    grossMargin: 1198638,
    grossMarginPercent: 88,
  },
  {
    id: 35,
    poDate: "07.05.2026",
    prnNo: "PRN110",
    projectName: "Burn in trolley( 3 Phase ) TATA Chennai 2nd Batch",
    companyName: "TATA Electronics Products And Solutions Private Limited - Chennai",
    projectValue: 1025000,
    plannedExpense: 650000,
    actualCost: 634463,
    upcomingExpense: 15537,
    grossMargin: 390537,
    grossMarginPercent: 38,
  },
  {
    id: 36,
    poDate: "30.06.2026",
    prnNo: "PRN111",
    projectName: "Burn in trolley( 3 Phase ) TATA",
    companyName: "TATA Electronics Products And Solutions Private Limited - Hosur",
    projectValue: 3900420,
    plannedExpense: 2726000,
    actualCost: 1350319,
    upcomingExpense: 1375681,
    grossMargin: 2550101,
    grossMarginPercent: 65,
  },
  {
    id: 37,
    poDate: "26.06.2026",
    prnNo: "PRN112",
    projectName: "Burn in trolley( 3 Phase ) TATA Chennai 3rd Batch",
    companyName: "TATA Electronics Products And Solutions Private Limited - Chennai",
    projectValue: 1025000,
    plannedExpense: 829000,
    actualCost: 504098,
    upcomingExpense: 324902,
    grossMargin: 520902,
    grossMarginPercent: 51,
  },
  {
    id: 38,
    poDate: "01.08.2026",
    prnNo: "PRN113",
    projectName: "Burn in trolley( 3 Phase ) TATA Chennai 4th Batch",
    companyName: "TATA Electronics Products And Solutions Private Limited - Chennai",
    projectValue: 1025000,
    plannedExpense: 829000,
    actualCost: 406823,
    upcomingExpense: 422177,
    grossMargin: 618177,
    grossMarginPercent: 60,
  },
  {
    id: 39,
    poDate: "06.08.2026",
    prnNo: "PRN114",
    projectName: "AQT Rack Modification -2 Qty",
    companyName: "TATA Electronics Products And Solutions Private Limited - Bangalore",
    projectValue: 475500,
    plannedExpense: 125000,
    actualCost: 524,
    upcomingExpense: 124476,
    grossMargin: 474976,
    grossMarginPercent: 100,
  },
];
/* =====================================================
   MONTH WISE PROJECT EXPENSE
===================================================== */

const projectExpenseData = [
  { month: "Apr", projectCost: 42, totalExpense: 18.5, actualExpense: 16.2, overhead: 2.3 },
  { month: "May", projectCost: 48, totalExpense: 21.4, actualExpense: 18.9, overhead: 2.5 },
  { month: "Jun", projectCost: 52, totalExpense: 24.1, actualExpense: 21.2, overhead: 2.9 },
  { month: "Jul", projectCost: 67.37, totalExpense: 27.73, actualExpense: 24.3, overhead: 3.43 },
];

/* =====================================================
   MONTH WISE PERFORMANCE
===================================================== */

const performanceData = [
  { month: "Apr", revenue: 8.16, target: 40, expense: 18.5, profit: -10.34, margin: -126, performance: 20 },
  { month: "May", revenue: 18.18, target: 40, expense: 21.4, profit: -3.22, margin: -18, performance: 45 },
  { month: "Jun", revenue: 7.59, target: 40, expense: 19.8, profit: -12.21, margin: -161, performance: 19 },
  { month: "Jul", revenue: 15.23, target: 40, expense: 27.73, profit: -12.5, margin: -82, performance: 38 },
];

/* =====================================================
   OUTSTANDING AMOUNT (PRN-wise breakdown)
===================================================== */

const AVATAR_TYPES = ["success", "warning", "danger"];

const outstandingAmountData = [
  { prn: "PRN105", name: "ALT Chamber (Door Service)", invoice: "OT/2026-27/004", value: 221191 },
  { prn: "PRN102", name: "Delhi AMC(25-26)", invoice: "OT/2026-27/006", value: 321706 },
  { prn: "PRN108", name: "Rack universal adjustment", invoice: "OT/2026-27/008", value: 295429 },
  { prn: "PRN109", name: "ALT Chamber Material Spares & Services", invoice: "OT/2026-27/009", value: 1598345 },
  { prn: "PRN110", name: "Burn in trolley (3 Phase) TATA Chennai 2nd Batch", invoice: "OT/2026-27/007", value: 1209500 },
  { prn: "PC02", name: "Sauna and Ice Bath", invoice: "OT/2026-27/010", value: 1561204 },
  { prn: "PRN112", name: "Burn in trolley (3 Phase) TATA Chennai 3rd Batch", invoice: "OT/2026-27/011", value: 1209500 },
].map((item, index) => ({ ...item, type: AVATAR_TYPES[index % AVATAR_TYPES.length] }));

const outstandingAmountTotal = outstandingAmountData.reduce((sum, item) => sum + item.value, 0);

/* =====================================================
   LIVE PROJECT (PRN-wise)
===================================================== */

const liveProjectData = [
  { prn: "PRN87", name: "Mat man pro phase 2", value: 573878 },
  { prn: "PRN102", name: "Delhi AMC(25-26)", value: 321706 },
  { prn: "PRN111", name: "Burn in trolley (3 Phase) TATA", value: 4602496 },
  { prn: "PRN113", name: "Burn in trolley (3 Phase) TATA Chennai 4th Batch", value: 1209500 },
  { prn: "PRN114", name: "AQT Rack Modification -2 Qty", value: 561090 },
].map((item, index) => ({ ...item, type: AVATAR_TYPES[index % AVATAR_TYPES.length] }));

const liveProjectTotal = liveProjectData.reduce((sum, item) => sum + item.value, 0);

/* =====================================================
   ORKA DIVISIONS (summary + hidden detail)
   Data comes from the Excel-like sheet. The main table shows all columns except the
   yellow-highlighted ones (currentFocus / priority / note). Clicking the view icon
   opens a modal that displays those yellow-column details in table format.
===================================================== */

const orkaDivisionsData = [
  {
    no: 1,
    division: "Existing Business",
    icon: <BusinessCenter />,
    progress: "63%",
    milestones: [
      { text: "Client database creation", percent: 25 },
      { text: "4 Projects", percent: 70 },
      { text: "2 Services", percent: 50 },
      { text: "Identify main/top lead", percent: 70 },
      { text: "Referral marketing for lead", percent: 100 },
      { text: "India marketing", percent: 10 },
      { text: "Sales setup", percent: 30 },
    ],
    status: "Delay",
    currentFocus:
      "Validate all 26 client/contact records, confirm current company & designation, map project history, identify active/top leads and convert opportunities.",
    priority: "High",
    note: "",
  },
  {
    no: 2,
    division: "Sauna Business",
    icon: <AccountTree />,
    progress: "13%",
    milestones: [
      { text: "4 route BAM Work", percent: 13 },
      { text: "Feasibility", percent: 0 },
      { text: "Prototype", percent: 0 },
      { text: "Production Readiness", percent: 0 },
      { text: "Pilot & Launch", percent: 0 },
    ],
    status: "On Track",
    currentFocus:
      "BAM and costing evaluation for all 4 routes; compare technical feasibility, investment, sourcing/manufacturing model and finalize the route decision.",
    priority: "High",
    note: "",
  },
  {
    no: 3,
    division: "Protein Vending Machine",
    icon: <BusinessCenter />,
    progress: "39%",
    milestones: [
      { text: "Supplier Search", percent: 100 },
      { text: "Supplier Finalization", percent: 100 },
      { text: "Business Validation", percent: 100 },
      { text: "Purchase", percent: 100 },
      { text: "QC", percent: 100 },
      { text: "Payment", percent: 100 },
      { text: "Despatch", percent: 100 },
      { text: "BAM", percent: 100 },
      { text: "Procurement & Handover", percent: 100 },
      { text: "Machine Readiness", percent: 100 },
      { text: "Machine Testing", percent: 100 },
      { text: "Machine Performance", percent: 20 },
      { text: "Ingredient R&D", percent: 10 },
      { text: "Machine + Product Integration", percent: 0 },
      { text: "Product Validation", percent: 0 },
      { text: "Final Optimization", percent: 0 },
      { text: "Commercial Readiness", percent: 0 },
      { text: "Pilot", percent: 0 },
      { text: "Final Approval", percent: 0 },
      { text: "Commercial Launch", percent: 0 },
    ],
    status: "Delay",
    currentFocus: "Powder finalization",
    priority: "High",
    note: "",
  },
  {
    no: 4,
    division: "Wellness Center Interior",
    icon: <BusinessCenter />,
    progress: "1%",
    milestones: [
      { text: "MHS Reference Project Study", percent: 10 },
      { text: "ORKA Scope Standardization", percent: 0 },
      { text: "Site & Design Planning", percent: 0 },
      { text: "BOQ & Costing", percent: 0},
      { text: "Procurement", percent: 0 },
      { text: "Site Execution", percent: 0 },
      { text: "Testing & Handover", percent: 0 },
      { text: "ORKA Standardization", percent: 0 },
    ],
    status: "Delay",
    currentFocus: "Study the previous MHS project in detail and convert it into ORKA scope.",
    priority: "High",
    note: "Current management status: On Track",
  },
  {
    no: 5,
    division: "Fofitos – Cloud Kitchen",
    icon: <AttachMoney />,
    progress: "0%",
    milestones: [
      { text: "Project Kick off & Scope Capture", percent: 0 },
      { text: "Site Survey & Existing Condition", percent: 0 },
      { text: "Layout & Interior Design", percent: 0 },
      { text: "BOQ, Specification & Costing", percent: 0 },
      { text: "Procurement & Fabrication", percent: 0 },
      { text: "Site Preparation & Execution", percent: 0 },
      { text: "MEP / Kitchen Interface Coordination", percent: 0 },
      { text: "Testing, Snag & Handover", percent: 0 },
      { text: "Commercial Closure & Standardization", percent: 0 },
    ],
    status: "Not Started",
    currentFocus:
      "Requirement Gathering Fofitos project in detail and convert it into ORKA scope",
    priority: "High",
    note: "",
  },
];


/* =====================================================
   DEPARTMENTS
===================================================== */

const departments = [
  { name: "Accounts", value: 89, status: "Good" },
  { name: "Marketing", value: 0, status: "Attention" },
  { name: "Sales", value: 19, status: "Behind" },
  { name: "Operations", value: 64, status: "Attention" },
  { name: "R&D", value: 37, status: "On Track" },
];

/* =====================================================
   MANAGEMENT ACTIONS
===================================================== */

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

const COLORS = ["#6366f1", "#22c55e", "#f59e0b"];

const formatCurrency = (value) => `₹${value} L`;

/* =====================================================
   STATUS
===================================================== */

const Status = ({ children, type = "success" }) => (
  <span className={`status-badge ${type}`}>
    {type === "success" && <CheckCircle />}
    {type === "danger" && <Error />}
    {type === "warning" && <WarningAmber />}
    {children}
  </span>
);

/* =====================================================
   KPI CARD
===================================================== */

const KpiCard = ({ title, value, subtitle, icon, color, trend }) => (
  <div className={`executive-kpi ${color}`}>
    <div className="kpi-top">
      <div className="kpi-icon">{icon}</div>
      <MoreHoriz />
    </div>

    <p>{title}</p>
    <h2>{value}</h2>

    <div className="kpi-footer">
      {trend === "up" && <ArrowUpward />}
      {trend === "down" && <ArrowDownward />}
      <span>{subtitle}</span>
    </div>
  </div>
);

/* =====================================================
   MAIN
===================================================== */

const MDDashboard = () => {
      const [showPipelineTable, setShowPipelineTable] = useState(false); // NEW
      const [showDivisionModal, setShowDivisionModal] = useState(false);
      const [selectedDivision, setSelectedDivision] = useState(null);

      const [showProjectModal, setShowProjectModal] = useState(false);
      const [selectedProjectDetail, setSelectedProjectDetail] = useState(null);

  return (
    <div className="executive-dashboard">
      {/* HEADER */}
      <div className="executive-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Bolt />
            EXECUTIVE OVERVIEW
          </div>
          {/* <h1>MD / CEO Executive Dashboard</h1> */}
          <p>Real-time business performance, financial health and management priorities</p>
        </div>

        <div className="hero-right">
          <div className="month-selector">
            <CalendarMonth />
            <span>July 2026</span>
          </div>

          <div className="health-score">
            <div className="health-circle">
              <span>62%</span>
            </div>
            <div>
              <small>BUSINESS HEALTH</small>
              <strong>Needs Attention</strong>
            </div>
          </div>
        </div>
      </div>

      {/* KPI */}
      <div className="executive-kpi-grid">
        <KpiCard title="Revenue" value="₹15.23 L" subtitle="Target: ₹40 L" icon={<AttachMoney />} color="blue" trend="down" />
        <KpiCard title="Revenue Achievement" value="38%" subtitle="-62% Variance" icon={<TrendingDown />} color="orange" trend="down" />
        <KpiCard title="Net Profit / Loss" value="-₹12.50 L" subtitle="Current month" icon={<TrendingDown />} color="red" trend="down" />
        <KpiCard title="Outstanding" value="₹72.69 L" subtitle="Collection required" icon={<Payments />} color="purple" />
        <KpiCard title="Active Projects" value="5" subtitle="3 projects delayed" icon={<BusinessCenter />} color="green" />
        <KpiCard title="Business Performance" value="62%" subtitle="Target: 70%+" icon={<Speed />} color="pink" />
      </div>

      {/* REVENUE + BUSINESS HEALTH */}
      <div className="dashboard-grid main-grid">
        <div className="premium-card">
          <div className="card-header">
            <div>
              <span className="card-label">FINANCIAL PERFORMANCE</span>
              <h3>Revenue vs Target</h3>
              <p>Monthly revenue performance overview</p>
            </div>
            <div className="chart-value">
              <span>July Actual</span>
              <strong>₹15.23 L</strong>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#edf0f5" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />

              <Area dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="7 7" fill="transparent" name="Target" />
              <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={4} fill="url(#actualGradient)" name="Actual" />
            </AreaChart>
          </ResponsiveContainer>

          <div className="revenue-stats">
            <div>
              <span>Monthly Target</span>
              <strong>₹40 L</strong>
            </div>
            <div>
              <span>Current Actual</span>
              <strong>₹15.23 L</strong>
            </div>
            <div className="negative-stat">
              <span>Achievement</span>
              <strong>38%</strong>
            </div>
          </div>
        </div>

        {/* BUSINESS HEALTH */}
        <div className="premium-card">
          <div className="card-header">
            <div>
              <span className="card-label">EXECUTIVE SUMMARY</span>
              <h3>Business Health</h3>
              <p>Key financial indicators</p>
            </div>
          </div>

          <div className="health-metrics">
            <div className="health-metric negative">
              <div className="metric-icon">
                <TrendingDown />
              </div>
              <div>
                <span>Profit Margin</span>
                <strong>-82%</strong>
              </div>
            </div>

            <div className="health-metric warning">
              <div className="metric-icon">
                <AccountBalanceWallet />
              </div>
              <div>
                <span>Outstanding</span>
                <strong>₹72.69 L</strong>
              </div>
            </div>

            <div className="health-metric positive">
              <div className="metric-icon">
                <AccountTree />
              </div>
              <div>
                <span>Active Projects</span>
                <strong>12</strong>
              </div>
            </div>
          </div>

          <div className="business-score-box">
            <div>
              <span>Overall Business Score</span>
              <strong>62 / 100</strong>
            </div>
            <div className="score-bar">
              <div style={{ width: "62%" }} />
            </div>
            <p>Target performance should be above 70%</p>
          </div>
        </div>
      </div>

      {/* PROJECT PROFITABILITY */}
      <div className="premium-card section-card">
        <div className="card-header">
          <div>
            <span className="card-label">PROJECT FINANCIAL PERFORMANCE</span>
            <h3>Project-Wise Profitability</h3>
            <p>Project value, planned expense, actual expense, upcoming expense and profit</p>
          </div>
        </div>

        <div className="project-table-wrapper">
          <table className="executive-table stack-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Project Value</th>
                <th>Planned Expense</th>
                <th>Actual Expense</th>
                <th>Upcoming Expense</th>
                <th>Profit / Loss</th>
                <th>Margin</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
  {projects.map((project) => {
    const projectValue = (project.projectValue || 0) / 100000;
    const plannedExpense = (project.plannedExpense || 0) / 100000;
    const actualExpense = (project.actualCost || 0) / 100000;
    const upcomingExpense = (project.upcomingExpense || 0) / 100000;
    const profit = (project.grossMargin || 0) / 100000;

    const margin = project.grossMarginPercent || 0;

    // Expense progress calculation
    const progress =
      project.plannedExpense > 0
        ? Math.min(
            100,
            Math.round(
              ((project.actualCost || 0) / project.plannedExpense) * 100
            )
          )
        : 0;

    // Status calculation
    let status = "On Track";
    let type = "success";

    if ((project.upcomingExpense || 0) < 0) {
      status = "Over Budget";
      type = "danger";
    } else if (progress > 85) {
      status = "Attention";
      type = "warning";
    }

    return (
      <tr key={project.id}>
        {/* PROJECT */}
        <td data-label="Project">
          <div className="table-project">
            <div
              className={`project-avatar ${type}`}
              role="button"
              tabIndex={0}
              title="Open project details"
              onClick={() => {
                setSelectedProjectDetail(project);
                setShowProjectModal(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedProjectDetail(project);
                  setShowProjectModal(true);
                }
              }}
            >
              <BusinessCenter />
            </div>

            <div style={{ flex: 1 }}>
              <strong>{project.projectName || "—"}</strong>
              {/* <span>{project.companyName || "—"}</span> */}
            </div>
          </div>
        </td>

        {/* PROJECT VALUE */}
        <td data-label="Project Value">
          ₹{projectValue.toFixed(2)} L
        </td>

        {/* PLANNED EXPENSE */}
        <td data-label="Planned Expense">
          ₹{plannedExpense.toFixed(2)} L
        </td>

        {/* ACTUAL EXPENSE */}
        <td data-label="Actual Expense">
          ₹{actualExpense.toFixed(2)} L
        </td>

        {/* UPCOMING EXPENSE */}
        <td
          data-label="Upcoming Expense"
          className={
            upcomingExpense < 0
              ? "profit-negative"
              : "upcoming"
          }
        >
          ₹{upcomingExpense.toFixed(2)} L
        </td>

        {/* PROFIT */}
        <td data-label="Profit / Loss">
          <strong
            className={
              profit >= 0
                ? "profit-positive"
                : "profit-negative"
            }
          >
            {profit >= 0 ? "+" : "-"}₹
            {Math.abs(profit).toFixed(2)} L
          </strong>
        </td>

        {/* MARGIN */}
        <td data-label="Margin">
          <strong
            className={
              margin >= 0
                ? "profit-positive"
                : "profit-negative"
            }
          >
            {margin}%
          </strong>
        </td>

        {/* PROGRESS */}
        <td data-label="Progress">
          <div className="progress-cell">
            <span>{progress}%</span>

            <div className="custom-progress">
              <div
                className={type}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </td>

        {/* STATUS */}
        <td data-label="Status">
          <Status type={type}>
            {status}
          </Status>
        </td>
      </tr>
    );
  })}
</tbody>
          </table>
        </div>
      </div>

      {/* Project detail modal */}
      {showProjectModal && selectedProjectDetail && (
        <div className="modal-overlay" onClick={() => setShowProjectModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProjectModal(false)}>×</button>
            <h3>{selectedProjectDetail.name}</h3>

            <table className="detail-table" style={{ marginTop: 12 }}>
              <tbody>
                <tr>
                  <th>Company Name</th>
                  <td>{selectedProjectDetail.companyName || selectedProjectDetail.company || '—'}</td>
                </tr>
                <tr>
                  <th>PO Date</th>
                  <td>{selectedProjectDetail.poDate || selectedProjectDetail.po_date || selectedProjectDetail.po || '—'}</td>
                </tr>
                <tr>
                  <th>PRN No</th>
                  <td>{selectedProjectDetail.prn || selectedProjectDetail.prnNo || selectedProjectDetail.prn_no || '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OUTSTANDING */}
      <div className="dashboard-grid project-grid quad-grid">
        <div className="premium-card equal-card">
          <div className="card-header">
            <div>
              <span className="card-label">CASH COLLECTION</span>
              <h3>Outstanding Receivables</h3>
              <p>Customer payment aging analysis</p>
            </div>
          </div>

          <div className="outstanding-number">
            <span>Total Outstanding</span>
            <strong>₹72.69 L</strong>
          </div>

          <div className="aging-chart">
            <div className="aging-row">
              <span>0–30 Days</span>
              <div className="aging-bar">
                <div className="age-1" style={{ width: "21%" }} />
              </div>
              <strong>₹15 L</strong>
            </div>

            <div className="aging-row">
              <span>31–60 Days</span>
              <div className="aging-bar">
                <div className="age-2" style={{ width: "17%" }} />
              </div>
              <strong>₹12 L</strong>
            </div>

            <div className="aging-row">
              <span>61–90 Days</span>
              <div className="aging-bar">
                <div className="age-3" style={{ width: "14%" }} />
              </div>
              <strong>₹10 L</strong>
            </div>

            <div className="aging-row">
              <span>90+ Days</span>
              <div className="aging-bar">
                <div className="age-4" style={{ width: "49%" }} />
              </div>
              <strong>₹35.69 L</strong>
            </div>
          </div>

          <div className="collection-warning">
            <WarningAmber />
            49% of outstanding is above 90 days
          </div>
        </div>

        {/* SALES PIPELINE */}
        <div className="premium-card equal-card">
          <div className="card-header">
  <div>
    <span className="card-label">FUTURE REVENUE</span>
    <h3>Sales Pipeline</h3>
    <p>Business opportunities and expected future revenue</p>
  </div>
  <div className="pipeline-header-right">
    <div className="pipeline-total">
      <span>Total Pipeline</span>
      <strong>₹215 L</strong>
    </div>
    <button
      type="button"
      className="pipeline-view-btn"
      onClick={() => setShowPipelineTable((prev) => !prev)}
    >
      {showPipelineTable ? "View Chart" : "View"}
    </button>
  </div>
</div>

          {showPipelineTable ? (
  <div className="table-wrapper">
    <table className="executive-table stack-table">
      <thead>
        <tr>
          <th>Company</th>
<th>Stage</th>
<th>Pipeline Value</th>
<th>Lead Count</th>
        </tr>
      </thead>
      <tbody>
  {pipelineData.map((item, index) => (
    <tr key={index}>
      <td data-label="Company">
        <strong>{item.company}</strong>
      </td>

      <td data-label="Stage">
        <span className={`pipeline-stage ${item.stage.toLowerCase().replace(" ", "-")}`}>
          {item.stage}
        </span>
      </td>

      <td data-label="Pipeline Value">
        ₹{item.value} L
      </td>

      <td data-label="Lead Count">
        {item.count}
      </td>
    </tr>
  ))}
</tbody>
    </table>
  </div>
) : (
  <ResponsiveContainer width="100%" height={330}>
    <BarChart data={pipelineData}>
      <CartesianGrid stroke="#edf0f5" strokeDasharray="4 4" vertical={false} />
      <XAxis dataKey="stage" axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={50} />
      <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}L`} />
      <Tooltip formatter={(v) => formatCurrency(v)} />
      <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} name="Pipeline Value" />
    </BarChart>
  </ResponsiveContainer>
)}
        </div>
      </div>

      {/* OUTSTANDING AMOUNT — PRN-WISE DETAIL */}
      <div className="premium-card section-card">
        <div className="card-header">
          <div>
            <span className="card-label">CASH COLLECTION DETAIL</span>
            <h3>Outstanding Amount</h3>
            <p>PRN-wise pending invoice breakdown</p>
          </div>
        </div>

        <div className="table-wrapper compact-table">
          <table className="executive-table stack-table">
            <thead>
              <tr>
                <th>PRN No</th>
                <th>Name</th>
                <th>Invoice No</th>
                <th>Total Value</th>
              </tr>
            </thead>

            <tbody>
              {outstandingAmountData.map((item) => (
                <tr key={item.prn}>
                  <td data-label="PRN No">
                    <strong>{item.prn}</strong>
                  </td>
                  <td data-label="Name">
                    <div className="table-icon-cell">
                      <div className={`project-avatar ${item.type}`}>
                        <BusinessCenter />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td data-label="Invoice No">{item.invoice}</td>
                  <td data-label="Total Value">₹{item.value.toLocaleString("en-IN")}</td>
                </tr>
              ))}

              <tr className="table-total-row">
                <td colSpan={3}>
                  <strong>TOTAL</strong>
                </td>
                <td data-label="Total Value">
                  <strong>₹{outstandingAmountTotal.toLocaleString("en-IN")}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {/* ORKA DIVISIONS SUMMARY (hide yellow columns) */}
      <div className="premium-card section-card">
        <div className="card-header">
          <div>
            <span className="card-label">ORKA TECHNOLOGIES</span>
            <h3>Business Divisions (summary)</h3>
            <p>Showing main columns. Click the view icon to see management focus, priority and notes.</p>
          </div>
        </div>

        <div className="table-wrapper division-table-wrapper compact-table">
          <table className="executive-table stack-table division-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Business Division</th>
                <th>Progress %</th>
                <th>Milestone %</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {orkaDivisionsData.map((item) => (
                <tr key={item.no}>
                  <td data-label="No.">{item.no}</td>
                  <td data-label="Business Division">
                    <div className="table-icon-cell">
                      <div className="division-icon">{item.icon}</div>
                      <div>
                        <strong>{item.division}</strong>
                        <div className="division-summary">{(item.milestones && item.milestones[0]) ? item.milestones[0].text : ''}</div>
                      </div>
                    </div>
                  </td>

                  <td data-label="Progress %">
                    <div className="division-progress-cell">
                      <strong>{item.progress}</strong>
                      <div className="mini-progress" style={{ height: 8, marginTop: 6 }}>
                        <div style={{ width: `${parseInt(item.progress, 10) || 0}%` }} />
                      </div>
                    </div>
                  </td>

                  <td data-label="Milestone %">{item.milestones && item.milestones.length ? Math.round(item.milestones.reduce((s,m)=>s+(m.percent||0),0)/item.milestones.length) + '%' : '—'}</td>

                  <td data-label="Status">
                    <Status type={item.status === 'Delay' ? 'danger' : item.status === 'On Track' ? 'success' : 'warning'}>
                      {item.status}
                    </Status>
                  </td>

                  <td data-label="View">
                    <button
                      type="button"
                      className="division-view-btn"
                      onClick={() => { setSelectedDivision(item); setShowDivisionModal(true); }}
                      aria-label={`View details for ${item.division}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Division detail modal */}
        {showDivisionModal && selectedDivision && (
          <div className="modal-overlay" onClick={() => setShowDivisionModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowDivisionModal(false)}>×</button>
              <h3>{selectedDivision.division}</h3>

              {/* milestone table showing each milestone with its percentage */}
              <div className="milestone-table-wrapper" style={{ marginTop: 12 }}>
                <table className="milestone-table">
                  <thead>
                    <tr>
                      <th>Milestone</th>
                      <th style={{ width: 120 }}>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedDivision.milestones || []).map((m, idx) => (
                      <tr key={idx}>
                        <td style={{ verticalAlign: 'top' }}>{m.text}</td>
                        <td>
                          <div className="milestone-percent-badge">{m.percent}%</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <table className="detail-table" style={{ marginTop: 14 }}>
                <tbody>
                  <tr>
                    <th>Current Management Focus</th>
                    <td style={{ whiteSpace: 'pre-line' }}>{selectedDivision.currentFocus}</td>
                  </tr>
                  <tr>
                    <th>Priority</th>
                    <td>{selectedDivision.priority}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* LIVE PROJECT — PRN-WISE
      <div className="premium-card section-card">
        <div className="card-header">
          <div>
            <span className="card-label">ACTIVE WORK</span>
            <h3>Live Project</h3>
            <p>PRN-wise ongoing project value</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="executive-table stack-table">
            <thead>
              <tr>
                <th>PRN No</th>
                <th>Name</th>
                <th>Total Value</th>
              </tr>
            </thead>

            <tbody>
              {liveProjectData.map((item) => (
                <tr key={item.prn}>
                  <td data-label="PRN No">
                    <strong>{item.prn}</strong>
                  </td>
                  <td data-label="Name">
                    <div className="table-icon-cell">
                      <div className={`project-avatar ${item.type}`}>
                        <BusinessCenter />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td data-label="Total Value">₹{item.value.toLocaleString("en-IN")}</td>
                </tr>
              ))}

              <tr className="table-total-row">
                <td colSpan={2}>
                  <strong>TOTAL</strong>
                </td>
                <td data-label="Total Value">
                  <strong>₹{liveProjectTotal.toLocaleString("en-IN")}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}

      {/* MONTH WISE PROJECT EXPENSE */}
      <div className="premium-card section-card">
        <div className="card-header">
          <div>
            <span className="card-label">PROJECT COST CONTROL</span>
            <h3>Month-Wise Project Expense</h3>
            <p>Monthly project cost and actual expense tracking</p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="executive-table stack-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Project Cost</th>
                <th>Total Project Expense</th>
                <th>Actual Expense</th>
                <th>Monthly Overhead</th>
                <th>Variance</th>
              </tr>
            </thead>

            <tbody>
              {projectExpenseData.map((item) => {
                const variance = item.projectCost - item.totalExpense;
                return (
                  <tr key={item.month}>
                    <td data-label="Month">
                      <strong>{item.month}</strong>
                    </td>
                    <td data-label="Project Cost">₹{item.projectCost.toFixed(2)} L</td>
                    <td data-label="Total Project Expense">₹{item.totalExpense.toFixed(2)} L</td>
                    <td data-label="Actual Expense">₹{item.actualExpense.toFixed(2)} L</td>
                    <td data-label="Monthly Overhead">₹{item.overhead.toFixed(2)} L</td>
                    <td data-label="Variance">
                      <strong className={variance >= 0 ? "profit-positive" : "profit-negative"}>
                        ₹{variance.toFixed(2)} L
                      </strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MONTH WISE PERFORMANCE */}
      <div className="premium-card section-card">
        <div className="card-header">
          <div>
            <span className="card-label">PERFORMANCE TRACKING</span>
            <h3>Month-Wise Performance Tracking</h3>
            <p>Revenue, target, expense, profit and performance</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={performanceData}>
            <CartesianGrid stroke="#edf0f5" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />

            <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} name="Revenue" />
            <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeWidth={2} strokeDasharray="6 6" name="Target" />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} name="Expense" />
          </LineChart>
        </ResponsiveContainer>

        <div className="performance-table-wrapper">
          <table className="executive-table stack-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Target</th>
                <th>Revenue</th>
                <th>Expense</th>
                <th>Profit / Loss</th>
                <th>Margin</th>
                <th>Revenue Performance</th>
              </tr>
            </thead>

            <tbody>
              {performanceData.map((item) => (
                <tr key={item.month}>
                  <td data-label="Month">
                    <strong>{item.month}</strong>
                  </td>
                  <td data-label="Target">₹{item.target} L</td>
                  <td data-label="Revenue">₹{item.revenue} L</td>
                  <td data-label="Expense">₹{item.expense} L</td>

                  <td data-label="Profit / Loss">
                    <strong className={item.profit >= 0 ? "profit-positive" : "profit-negative"}>
                      ₹{item.profit} L
                    </strong>
                  </td>

                  <td data-label="Margin">
                    <strong className={item.margin >= 0 ? "profit-positive" : "profit-negative"}>
                      {item.margin}%
                    </strong>
                  </td>

                  <td data-label="Performance">
                    <div className="performance-cell">
                      <strong>{item.performance}%</strong>
                      <div className="mini-progress">
                        <div style={{ width: `${item.performance}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEPARTMENT */}
      <div className="premium-card section-card">
        <div className="card-header">
          <div>
            <span className="card-label">ORGANIZATION PERFORMANCE</span>
            <h3>Department Performance</h3>
            <p>Current achievement against departmental KPIs</p>
          </div>
        </div>

        <div className="department-grid">
          {departments.map((department) => (
            <div className="department-card" key={department.name}>
              <div className="department-top">
                <div className="department-avatar">
                  <BusinessCenter />
                </div>
                <Status
                  type={
                    department.status === "Good" || department.status === "On Track"
                      ? "success"
                      : department.status === "Behind"
                      ? "danger"
                      : "warning"
                  }
                >
                  {department.status}
                </Status>
              </div>

              <h4>{department.name}</h4>
              <div className="department-percentage">{department.value}%</div>
              <div className="custom-progress">
                <div style={{ width: `${department.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COST + CASH FLOW */}
      <div className="dashboard-grid cost-grid quad-grid">
        <div className="premium-card equal-card">
          <div className="card-header">
            <div>
              <span className="card-label">EXPENSE ANALYSIS</span>
              <h3>Cost Distribution</h3>
              <p>Current month expense breakdown</p>
            </div>
          </div>

          <div className="cost-chart-wrapper">
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={costData} cx="50%" cy="50%" innerRadius={65} outerRadius={100} dataKey="value" paddingAngle={5}>
                    {costData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
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
                  <span className="legend-dot" style={{ background: COLORS[index] }} />
                  <span>{item.name}</span>
                  <strong>₹{item.value} L</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="premium-card cash-card equal-card">
          <div className="card-header">
            <div>
              <span className="card-label">LIQUIDITY</span>
              <h3>Cash Flow Summary</h3>
              <p>Current financial movement</p>
            </div>
          </div>

          <div className="cash-flow-list">
            <div className="cash-flow-item neutral">
              <div>
                <AccountBalanceWallet />
                <span>Opening Cash</span>
              </div>
              <strong>₹XX L</strong>
            </div>

            <div className="cash-flow-item positive">
              <div>
                <ArrowUpward />
                <span>Customer Collections</span>
              </div>
              <strong>+₹XX L</strong>
            </div>

            <div className="cash-flow-item negative">
              <div>
                <ArrowDownward />
                <span>Supplier Payments</span>
              </div>
              <strong>-₹XX L</strong>
            </div>

            <div className="cash-flow-item negative">
              <div>
                <ArrowDownward />
                <span>Operating Expenses</span>
              </div>
              <strong>-₹XX L</strong>
            </div>
          </div>

          <div className="closing-cash-card">
            <span>Closing Cash Position</span>
            <strong>₹XX L</strong>
          </div>
        </div>
      </div>

      {/* MANAGEMENT ACTION */}
      <div className="management-section">
        <div className="management-header">
          <div className="management-title">
            <div className="management-icon">
              <WarningAmber />
            </div>
            <div>
              <span>EXECUTIVE PRIORITIES</span>
              <h2>Management Action Required</h2>
            </div>
          </div>

          <div className="action-counter">4 OPEN ACTIONS</div>
        </div>

        <div className="action-grid">
          {actions.map((action, index) => (
            <div className="action-card" key={index}>
              <div className="action-card-top">
                <span className={`priority ${action.priority.toLowerCase()}`}>{action.priority}</span>
                <MoreHoriz />
              </div>

              <h3>{action.title}</h3>
              <p>{action.description}</p>

              <div className="action-owner">
                <span>OWNER</span>
                <strong>{action.owner}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MDDashboard;
