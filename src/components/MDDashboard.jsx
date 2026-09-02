import React from "react";
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

/* =====================================================
   PROJECT PROFITABILITY
===================================================== */

const projects = [
  {
    name: "Burn-in Trolley",
    customer: "TATA",
    value: 46.02,
    plannedExpense: 40,
    actualExpense: 32,
    upcomingExpense: 3,
    profit: 11.02,
    margin: 24,
    progress: 70,
    status: "On Track",
    type: "success",
  },
  {
    name: "Sauna",
    customer: "Customer Project",
    value: 15.61,
    plannedExpense: 14,
    actualExpense: 13.8,
    upcomingExpense: 1,
    profit: 0.81,
    margin: 5,
    progress: 52,
    status: "Low Margin",
    type: "warning",
  },
  {
    name: "MatManPro",
    customer: "Internal",
    value: 5.74,
    plannedExpense: 7,
    actualExpense: 6.2,
    upcomingExpense: 1.2,
    profit: -1.66,
    margin: -29,
    progress: 35,
    status: "Loss",
    type: "danger",
  },
];

/* =====================================================
   MONTH WISE COMPANY EXPENSE
===================================================== */

const companyExpenseData = [
  {
    month: "Apr",
    revenue: 8.16,
    target: 40,
    expense: 18.5,
    profit: -10.34,
  },
  {
    month: "May",
    revenue: 18.18,
    target: 40,
    expense: 21.4,
    profit: -3.22,
  },
  {
    month: "Jun",
    revenue: 7.59,
    target: 40,
    expense: 19.8,
    profit: -12.21,
  },
  {
    month: "Jul",
    revenue: 15.23,
    target: 40,
    expense: 27.73,
    profit: -12.5,
  },
];

/* =====================================================
   MONTH WISE PROJECT EXPENSE
===================================================== */

const projectExpenseData = [
  {
    month: "Apr",
    projectCost: 42,
    totalExpense: 18.5,
    actualExpense: 16.2,
    overhead: 2.3,
  },
  {
    month: "May",
    projectCost: 48,
    totalExpense: 21.4,
    actualExpense: 18.9,
    overhead: 2.5,
  },
  {
    month: "Jun",
    projectCost: 52,
    totalExpense: 24.1,
    actualExpense: 21.2,
    overhead: 2.9,
  },
  {
    month: "Jul",
    projectCost: 67.37,
    totalExpense: 27.73,
    actualExpense: 24.3,
    overhead: 3.43,
  },
];

/* =====================================================
   MONTH WISE PERFORMANCE
===================================================== */

const performanceData = [
  {
    month: "Apr",
    revenue: 8.16,
    target: 40,
    expense: 18.5,
    profit: -10.34,
    margin: -126,
    performance: 20,
  },
  {
    month: "May",
    revenue: 18.18,
    target: 40,
    expense: 21.4,
    profit: -3.22,
    margin: -18,
    performance: 45,
  },
  {
    month: "Jun",
    revenue: 7.59,
    target: 40,
    expense: 19.8,
    profit: -12.21,
    margin: -161,
    performance: 19,
  },
  {
    month: "Jul",
    revenue: 15.23,
    target: 40,
    expense: 27.73,
    profit: -12.5,
    margin: -82,
    performance: 38,
  },
];

/* =====================================================
   DEPARTMENTS
===================================================== */

const departments = [

  { name: "Accounts", value: 89, status: "Good" },
  { name: "Marketing", value: 58, status: "Attention" },
  { name: "Sales", value: 38, status: "Behind" },
  { name: "Operations", value: 82, status: "Attention" },
  { name: "R&D", value: 76, status: "On Track" },
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

const KpiCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
}) => (
  <div className={`executive-kpi ${color}`}>

    <div className="kpi-top">
      <div className="kpi-icon">
        {icon}
      </div>

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

  return (
    <div className="executive-dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="executive-hero">

        <div className="hero-content">

          <div className="hero-badge">
            <Bolt />
            EXECUTIVE OVERVIEW
          </div>

          <h1>MD / CEO Executive Dashboard</h1>

          <p>
            Real-time business performance, financial health and
            management priorities
          </p>

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


      {/* =================================================
          KPI
      ================================================= */}

      <div className="executive-kpi-grid">

        <KpiCard
          title="Revenue"
          value="₹15.23 L"
          subtitle="Target: ₹40 L"
          icon={<AttachMoney />}
          color="blue"
          trend="down"
        />

        <KpiCard
          title="Revenue Achievement"
          value="38%"
          subtitle="-62% Variance"
          icon={<TrendingDown />}
          color="orange"
          trend="down"
        />

        <KpiCard
          title="Net Profit / Loss"
          value="-₹12.50 L"
          subtitle="Current month"
          icon={<TrendingDown />}
          color="red"
          trend="down"
        />

        <KpiCard
          title="Outstanding"
          value="₹72.69 L"
          subtitle="Collection required"
          icon={<Payments />}
          color="purple"
        />

        <KpiCard
          title="Active Projects"
          value="12"
          subtitle="3 projects delayed"
          icon={<BusinessCenter />}
          color="green"
        />

        <KpiCard
          title="Business Performance"
          value="62%"
          subtitle="Target: 70%+"
          icon={<Speed />}
          color="pink"
        />

      </div>


      {/* =================================================
          ALERT
      ================================================= */}

      {/* <div className="executive-alert">

        <div className="alert-icon">
          <WarningAmber />
        </div>

        <div className="alert-content">

          <strong>
            Executive Attention Required
          </strong>

          <span>
            Revenue is below target, outstanding is high and
            3 projects require immediate management attention.
          </span>

        </div>

        <div className="alert-score">
          <span>Priority</span>
          <strong>HIGH</strong>
        </div>

      </div> */}


      {/* =================================================
          REVENUE + BUSINESS HEALTH
      ================================================= */}

      <div className="dashboard-grid main-grid">

        <div className="premium-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                FINANCIAL PERFORMANCE
              </span>

              <h3>Revenue vs Target</h3>

              <p>
                Monthly revenue performance overview
              </p>

            </div>

            <div className="chart-value">

              <span>July Actual</span>

              <strong>
                ₹15.23 L
              </strong>

            </div>

          </div>

          <ResponsiveContainer width="100%" height={320}>

            <AreaChart data={revenueData}>

              <defs>

                <linearGradient
                  id="actualGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#6366f1"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="95%"
                    stopColor="#6366f1"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#edf0f5"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${v}L`}
              />

              <Tooltip
                formatter={(v) => formatCurrency(v)}
              />

              <Area
                dataKey="target"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="7 7"
                fill="transparent"
                name="Target"
              />

              <Area
                type="monotone"
                dataKey="actual"
                stroke="#6366f1"
                strokeWidth={4}
                fill="url(#actualGradient)"
                name="Actual"
              />

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

              <span className="card-label">
                EXECUTIVE SUMMARY
              </span>

              <h3>Business Health</h3>

              <p>
                Key financial indicators
              </p>

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

            <p>
              Target performance should be above 70%
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          PROJECT PROFITABILITY
      ================================================= */}

      <div className="premium-card section-card">

        <div className="card-header">

          <div>

            <span className="card-label">
              PROJECT FINANCIAL PERFORMANCE
            </span>

            <h3>Project-Wise Profitability</h3>

            <p>
              Project value, planned expense, actual expense,
              upcoming expense and profit
            </p>

          </div>

        </div>

        <div className="project-table-wrapper">

          <table className="executive-table">

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

              {projects.map((project) => (

                <tr key={project.name}>

                  <td>

                    <div className="table-project">

                      <div className={`project-avatar ${project.type}`}>
                        <BusinessCenter />
                      </div>

                      <div>
                        <strong>{project.name}</strong>
                        <span>{project.customer}</span>
                      </div>

                    </div>

                  </td>

                  <td>
                    ₹{project.value.toFixed(2)} L
                  </td>

                  <td>
                    ₹{project.plannedExpense.toFixed(2)} L
                  </td>

                  <td>
                    ₹{project.actualExpense.toFixed(2)} L
                  </td>

                  <td className="upcoming">
                    ₹{project.upcomingExpense.toFixed(2)} L
                  </td>

                  <td>

                    <strong
                      className={
                        project.profit >= 0
                          ? "profit-positive"
                          : "profit-negative"
                      }
                    >
                      {project.profit >= 0 ? "+" : "-"}
                      ₹{Math.abs(project.profit).toFixed(2)} L
                    </strong>

                  </td>

                  <td>

                    <strong
                      className={
                        project.margin >= 0
                          ? "profit-positive"
                          : "profit-negative"
                      }
                    >
                      {project.margin}%
                    </strong>

                  </td>

                  <td>

                    <div className="progress-cell">

                      <span>
                        {project.progress}%
                      </span>

                      <div className="custom-progress">
                        <div
                          className={project.type}
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>

                    </div>

                  </td>

                  <td>

                    <Status type={project.type}>
                      {project.status}
                    </Status>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* =================================================
          OUTSTANDING
      ================================================= */}

      <div className="dashboard-grid project-grid">

        <div className="premium-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                CASH COLLECTION
              </span>

              <h3>Outstanding Receivables</h3>

              <p>
                Customer payment aging analysis
              </p>

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
                <div
                  className="age-1"
                  style={{ width: "21%" }}
                />
              </div>

              <strong>₹15 L</strong>
            </div>

            <div className="aging-row">
              <span>31–60 Days</span>

              <div className="aging-bar">
                <div
                  className="age-2"
                  style={{ width: "17%" }}
                />
              </div>

              <strong>₹12 L</strong>
            </div>

            <div className="aging-row">
              <span>61–90 Days</span>

              <div className="aging-bar">
                <div
                  className="age-3"
                  style={{ width: "14%" }}
                />
              </div>

              <strong>₹10 L</strong>
            </div>

            <div className="aging-row">
              <span>90+ Days</span>

              <div className="aging-bar">
                <div
                  className="age-4"
                  style={{ width: "49%" }}
                />
              </div>

              <strong>₹35.69 L</strong>
            </div>

          </div>

          <div className="collection-warning">

            <WarningAmber />

            49% of outstanding is above 90 days

          </div>

        </div>

      </div>


      {/* =================================================
          MONTH WISE COMPANY EXPENSE
      ================================================= */}

      {/* <div className="premium-card section-card">

        <div className="card-header">

          <div>

            <span className="card-label">
              COMPANY EXPENSE
            </span>

            <h3>Month-Wise Company Expense</h3>

            <p>
              Business revenue, revenue target and company expense
            </p>

          </div>

        </div>

        <ResponsiveContainer width="100%" height={330}>

          <BarChart data={companyExpenseData}>

            <CartesianGrid
              stroke="#edf0f5"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v}L`}
            />

            <Tooltip
              formatter={(v) => formatCurrency(v)}
            />

            <Bar
              dataKey="target"
              fill="#33943b"
              name="Revenue Target"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="revenue"
              fill="#6366f1"
              name="Business Revenue"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="expense"
              fill="#ef4444"
              name="Company Expense"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

        <div className="monthly-summary">

          {companyExpenseData.map((item) => (

            <div
              className="monthly-summary-card"
              key={item.month}
            >

              <strong>{item.month}</strong>

              <span>
                Revenue: ₹{item.revenue} L
              </span>

              <span>
                Expense: ₹{item.expense} L
              </span>

              <strong
                className={
                  item.profit >= 0
                    ? "profit-positive"
                    : "profit-negative"
                }
              >
                Profit/Loss: ₹{item.profit} L
              </strong>

            </div>

          ))}

        </div>

      </div>
 */}

      {/* =================================================
          MONTH WISE PROJECT EXPENSE
      ================================================= */}

      <div className="premium-card section-card">

        <div className="card-header">

          <div>

            <span className="card-label">
              PROJECT COST CONTROL
            </span>

            <h3>Month-Wise Project Expense</h3>

            <p>
              Monthly project cost and actual expense tracking
            </p>

          </div>

        </div>

        <div className="table-wrapper">

          <table className="executive-table">

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

                const variance =
                  item.projectCost - item.totalExpense;

                return (

                  <tr key={item.month}>

                    <td>
                      <strong>{item.month}</strong>
                    </td>

                    <td>
                      ₹{item.projectCost.toFixed(2)} L
                    </td>

                    <td>
                      ₹{item.totalExpense.toFixed(2)} L
                    </td>

                    <td>
                      ₹{item.actualExpense.toFixed(2)} L
                    </td>

                    <td>
                      ₹{item.overhead.toFixed(2)} L
                    </td>

                    <td>

                      <strong
                        className={
                          variance >= 0
                            ? "profit-positive"
                            : "profit-negative"
                        }
                      >
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


      {/* =================================================
          MONTH WISE PERFORMANCE
      ================================================= */}

      <div className="premium-card section-card">

        <div className="card-header">

          <div>

            <span className="card-label">
              PERFORMANCE TRACKING
            </span>

            <h3>Month-Wise Performance Tracking</h3>

            <p>
              Revenue, target, expense, profit and performance
            </p>

          </div>

        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={performanceData}>

            <CartesianGrid
              stroke="#edf0f5"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
              name="Revenue"
            />

            <Line
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="6 6"
              name="Target"
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              name="Expense"
            />

          </LineChart>

        </ResponsiveContainer>

        <div className="performance-table-wrapper">

          <table className="executive-table">

            <thead>

              <tr>
                <th>Month</th>
                 <th>Target</th>
                <th>Revenue</th>
               
                <th>Expense</th>
                <th>Profit / Loss</th>
                <th>Margin</th>
                <th>Performance</th>
              </tr>

            </thead>

            <tbody>

              {performanceData.map((item) => (

                <tr key={item.month}>

                  <td>
                    <strong>{item.month}</strong>
                  </td>
                   <td>
                    ₹{item.target} L
                  </td>

                  <td>
                    ₹{item.revenue} L
                  </td>

                 

                  <td>
                    ₹{item.expense} L
                  </td>

                  <td>

                    <strong
                      className={
                        item.profit >= 0
                          ? "profit-positive"
                          : "profit-negative"
                      }
                    >
                      ₹{item.profit} L
                    </strong>

                  </td>

                  <td>

                    <strong
                      className={
                        item.margin >= 0
                          ? "profit-positive"
                          : "profit-negative"
                      }
                    >
                      {item.margin}%
                    </strong>

                  </td>

                  <td>

                    <div className="performance-cell">

                      <strong>
                        {item.performance}%
                      </strong>

                      <div className="mini-progress">

                        <div
                          style={{
                            width: `${item.performance}%`,
                          }}
                        />

                      </div>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* =================================================
          SALES PIPELINE
      ================================================= */}

      <div className="premium-card section-card">

        <div className="card-header">

          <div>

            <span className="card-label">
              FUTURE REVENUE
            </span>

            <h3>Sales Pipeline</h3>

            <p>
              Business opportunities and expected future revenue
            </p>

          </div>

          <div className="pipeline-total">

            <span>Total Pipeline</span>

            <strong>₹215 L</strong>

          </div>

        </div>

        <ResponsiveContainer width="100%" height={330}>

          <BarChart data={pipelineData}>

            <CartesianGrid
              stroke="#edf0f5"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="stage"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${v}L`}
            />

            <Tooltip
              formatter={(v) => formatCurrency(v)}
            />

            <Bar
              dataKey="value"
              fill="#6366f1"
              radius={[10, 10, 0, 0]}
              name="Pipeline Value"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* =================================================
          DEPARTMENT
      ================================================= */}

      <div className="premium-card section-card">

        <div className="card-header">

          <div>

            <span className="card-label">
              ORGANIZATION PERFORMANCE
            </span>

            <h3>Department Performance</h3>

            <p>
              Current achievement against departmental KPIs
            </p>

          </div>

        </div>

        <div className="department-grid">

          {departments.map((department) => (

            <div
              className="department-card"
              key={department.name}
            >

              <div className="department-top">

                <div className="department-avatar">
                  <BusinessCenter />
                </div>

                <Status
                  type={
                    department.status === "Good" ||
                    department.status === "On Track"
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

              <div className="department-percentage">
                {department.value}%
              </div>

              <div className="custom-progress">

                <div
                  style={{
                    width: `${department.value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =================================================
          COST + CASH FLOW
      ================================================= */}

      <div className="dashboard-grid cost-grid">

        <div className="premium-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                EXPENSE ANALYSIS
              </span>

              <h3>Cost Distribution</h3>

              <p>
                Current month expense breakdown
              </p>

            </div>

          </div>

          <div className="cost-chart-wrapper">

            <div className="pie-wrapper">

              <ResponsiveContainer
                width="100%"
                height={280}
              >

                <PieChart>

                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    dataKey="value"
                    paddingAngle={5}
                  >

                    {costData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip
                    formatter={(v) =>
                      formatCurrency(v)
                    }
                  />

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

                  <span
                    className="legend-dot"
                    style={{
                      background: COLORS[index],
                    }}
                  />

                  <span>{item.name}</span>

                  <strong>
                    ₹{item.value} L
                  </strong>

                </div>

              ))}

            </div>

          </div>

        </div>


        <div className="premium-card cash-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                LIQUIDITY
              </span>

              <h3>Cash Flow Summary</h3>

              <p>
                Current financial movement
              </p>

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


      {/* =================================================
          MANAGEMENT ACTION
      ================================================= */}

      <div className="management-section">

        <div className="management-header">

          <div className="management-title">

            <div className="management-icon">
              <WarningAmber />
            </div>

            <div>

              <span>EXECUTIVE PRIORITIES</span>

              <h2>
                Management Action Required
              </h2>

            </div>

          </div>

          <div className="action-counter">
            4 OPEN ACTIONS
          </div>

        </div>

        <div className="action-grid">

          {actions.map((action, index) => (

            <div
              className="action-card"
              key={index}
            >

              <div className="action-card-top">

                <span
                  className={`priority ${action.priority.toLowerCase()}`}
                >
                  {action.priority}
                </span>

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