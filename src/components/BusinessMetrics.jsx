import React from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiCreditCard,
  FiBriefcase,
  FiUsers,
  FiPackage,
  FiAlertTriangle,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCheckCircle,
  FiClock,
  FiActivity,
} from "react-icons/fi";

import "./BusinessMetrics.css";

const BusinessMetrics = () => {
  const summaryCards = [
    {
      title: "Total Revenue",
      value: "₹2.48 Cr",
      change: "+18.6%",
      type: "positive",
      icon: <FiDollarSign />,
      subtitle: "vs last month",
    },
    {
      title: "Net Profit",
      value: "₹42.8 L",
      change: "+12.4%",
      type: "positive",
      icon: <FiTrendingUp />,
      subtitle: "vs last month",
    },
    {
      title: "Outstanding",
      value: "₹31.6 L",
      change: "-8.2%",
      type: "positive",
      icon: <FiCreditCard />,
      subtitle: "vs last month",
    },
    {
      title: "Active Projects",
      value: "24",
      change: "+4",
      type: "positive",
      icon: <FiBriefcase />,
      subtitle: "this month",
    },
  ];

  const monthlyRevenue = [
    { month: "Jan", revenue: 32 },
    { month: "Feb", revenue: 38 },
    { month: "Mar", revenue: 35 },
    { month: "Apr", revenue: 44 },
    { month: "May", revenue: 49 },
    { month: "Jun", revenue: 46 },
    { month: "Jul", revenue: 56 },
    { month: "Aug", revenue: 62 },
  ];

  const projects = [
    {
      name: "MMP Phase 2",
      client: "Nokia",
      value: "₹42 L",
      progress: 82,
      status: "On Track",
    },
    {
      name: "IoT Automation",
      client: "Enterprise Client",
      value: "₹28 L",
      progress: 65,
      status: "On Track",
    },
    {
      name: "Vending Platform",
      client: "Retail Client",
      value: "₹18 L",
      progress: 48,
      status: "Delayed",
    },
    {
      name: "Inventory System",
      client: "Manufacturing",
      value: "₹15 L",
      progress: 91,
      status: "Completed",
    },
  ];

  const departments = [
    {
      name: "Software",
      revenue: "₹96 L",
      profit: "₹24 L",
      employees: 32,
      performance: 92,
    },
    {
      name: "Hardware & IoT",
      revenue: "₹72 L",
      profit: "₹11 L",
      employees: 18,
      performance: 84,
    },
    {
      name: "Operations",
      revenue: "₹48 L",
      profit: "₹6.8 L",
      employees: 24,
      performance: 78,
    },
    {
      name: "Support",
      revenue: "₹32 L",
      profit: "₹4.2 L",
      employees: 12,
      performance: 88,
    },
  ];

  const alerts = [
    {
      title: "₹8.4 L outstanding for more than 60 days",
      type: "danger",
      icon: <FiAlertTriangle />,
    },
    {
      title: "Vending Platform project is behind schedule",
      type: "warning",
      icon: <FiClock />,
    },
    {
      title: "July revenue exceeded target by 14%",
      type: "success",
      icon: <FiCheckCircle />,
    },
    {
      title: "Inventory value increased by 9.2%",
      type: "info",
      icon: <FiActivity />,
    },
  ];

  return (
    <div className="owner-dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Business Overview</h1>
          <p>
            Company performance, financial health and management insights
          </p>
        </div>

        <div className="header-actions">
          <select className="period-select">
            <option>August 2026</option>
            <option>July 2026</option>
            <option>June 2026</option>
            <option>May 2026</option>
          </select>

          <button className="refresh-btn">
            Refresh
          </button>
        </div>
      </div>

      {/* BUSINESS HEALTH */}
      <section className="health-section">

        <div className="section-title">
          <div>
            <h2>Business Health</h2>
            <span>Overall company performance</span>
          </div>

          <div className="health-score">
            <div className="score-circle">
              87
            </div>
            <div>
              <strong>Healthy</strong>
              <span>Overall Score</span>
            </div>
          </div>
        </div>

        <div className="summary-grid">

          {summaryCards.map((card, index) => (
            <div className="summary-card" key={index}>

              <div className="summary-top">
                <div className="summary-icon">
                  {card.icon}
                </div>

                <div
                  className={`change ${card.type}`}
                >
                  {card.type === "positive" ? (
                    <FiArrowUpRight />
                  ) : (
                    <FiArrowDownRight />
                  )}

                  {card.change}
                </div>
              </div>

              <div className="summary-value">
                {card.value}
              </div>

              <div className="summary-title">
                {card.title}
              </div>

              <div className="summary-subtitle">
                {card.subtitle}
              </div>

            </div>
          ))}

        </div>
      </section>


      {/* FINANCIAL OVERVIEW */}
      <section className="section">

        <div className="section-heading">
          <div>
            <h2>Financial Overview</h2>
            <p>Revenue and profitability trend</p>
          </div>

          <button className="view-btn">
            View Details
          </button>
        </div>

        <div className="financial-grid">

          {/* REVENUE CHART */}
          <div className="dashboard-card revenue-card">

            <div className="card-header">
              <div>
                <h3>Revenue Trend</h3>
                <span>Monthly revenue in ₹ Lakhs</span>
              </div>

              <div className="chart-total">
                ₹62 L
                <small>August</small>
              </div>
            </div>

            <div className="chart">

              <div className="chart-y-axis">
                <span>70</span>
                <span>60</span>
                <span>50</span>
                <span>40</span>
                <span>30</span>
                <span>20</span>
              </div>

              <div className="chart-area">

                <div className="grid-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div className="bars">

                  {monthlyRevenue.map((item, index) => (
                    <div className="bar-wrapper" key={index}>

                      <div className="bar-value">
                        {item.revenue}
                      </div>

                      <div
                        className="bar"
                        style={{
                          height: `${item.revenue * 4}px`,
                        }}
                      />

                      <span className="bar-label">
                        {item.month}
                      </span>

                    </div>
                  ))}

                </div>

              </div>
            </div>

          </div>


          {/* PROFIT CARD */}
          <div className="dashboard-card profit-card">

            <div className="card-header">
              <div>
                <h3>Profitability</h3>
                <span>Current month</span>
              </div>

              <FiTrendingUp className="profit-icon" />
            </div>

            <div className="profit-main">
              <strong>₹42.8 L</strong>
              <span>Net Profit</span>
            </div>

            <div className="profit-details">

              <div>
                <span>Revenue</span>
                <strong>₹62 L</strong>
              </div>

              <div>
                <span>Total Cost</span>
                <strong>₹19.2 L</strong>
              </div>

              <div>
                <span>Profit Margin</span>
                <strong>69.0%</strong>
              </div>

            </div>

            <div className="profit-progress">
              <div
                className="profit-progress-fill"
                style={{ width: "69%" }}
              />
            </div>

            <div className="profit-footer">
              <span>Target Margin</span>
              <strong>65%</strong>
            </div>

          </div>

        </div>

      </section>


      {/* BUSINESS PIPELINE */}
      <section className="section">

        <div className="section-heading">
          <div>
            <h2>Business Pipeline</h2>
            <p>Current sales and upcoming business opportunities</p>
          </div>

          <button className="view-btn">
            View Pipeline
          </button>
        </div>

        <div className="pipeline-grid">

          <div className="pipeline-card">
            <span>Leads</span>
            <strong>84</strong>
            <small>New opportunities</small>
          </div>

          <div className="pipeline-card">
            <span>Proposals</span>
            <strong>32</strong>
            <small>₹1.24 Cr value</small>
          </div>

          <div className="pipeline-card">
            <span>Negotiation</span>
            <strong>18</strong>
            <small>₹68 L value</small>
          </div>

          <div className="pipeline-card">
            <span>Expected Closure</span>
            <strong>₹42 L</strong>
            <small>Next 30 days</small>
          </div>

        </div>

      </section>


      {/* PROJECTS + DEPARTMENTS */}
      <section className="section">

        <div className="two-column">

          {/* PROJECTS */}
          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h3>Project Performance</h3>
                <span>Top active projects</span>
              </div>

              <button className="text-btn">
                View All
              </button>
            </div>

            <div className="project-list">

              {projects.map((project, index) => (

                <div className="project-item" key={index}>

                  <div className="project-info">

                    <div className="project-icon">
                      <FiBriefcase />
                    </div>

                    <div>
                      <strong>{project.name}</strong>
                      <span>{project.client}</span>
                    </div>

                  </div>

                  <div className="project-progress">

                    <div className="progress-top">
                      <span>{project.progress}%</span>

                      <span
                        className={`project-status ${project.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="progress-bar">
                      <div
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>

                  </div>

                  <strong className="project-value">
                    {project.value}
                  </strong>

                </div>

              ))}

            </div>

          </div>


          {/* DEPARTMENTS */}
          <div className="dashboard-card">

            <div className="card-header">
              <div>
                <h3>Department Performance</h3>
                <span>Revenue and efficiency</span>
              </div>

              <button className="text-btn">
                View All
              </button>
            </div>

            <div className="department-list">

              {departments.map((department, index) => (

                <div className="department-item" key={index}>

                  <div className="department-header">

                    <div className="department-name">
                      <div className="department-icon">
                        {index === 0 ? (
                          <FiActivity />
                        ) : index === 1 ? (
                          <FiPackage />
                        ) : index === 2 ? (
                          <FiBriefcase />
                        ) : (
                          <FiUsers />
                        )}
                      </div>

                      <div>
                        <strong>{department.name}</strong>
                        <span>
                          {department.employees} employees
                        </span>
                      </div>
                    </div>

                    <strong>
                      {department.performance}%
                    </strong>

                  </div>

                  <div className="department-progress">
                    <div
                      style={{
                        width: `${department.performance}%`,
                      }}
                    />
                  </div>

                  <div className="department-bottom">

                    <span>
                      Revenue <strong>{department.revenue}</strong>
                    </span>

                    <span>
                      Profit <strong>{department.profit}</strong>
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* INVENTORY + WORKFORCE */}
      <section className="section">

        <div className="four-card-grid">

          <div className="small-dashboard-card">

            <div className="small-card-icon">
              <FiPackage />
            </div>

            <span>Inventory Value</span>

            <strong>₹86.4 L</strong>

            <div className="small-card-change">
              <FiArrowUpRight />
              9.2% this month
            </div>

          </div>


          <div className="small-dashboard-card">

            <div className="small-card-icon">
              <FiUsers />
            </div>

            <span>Total Employees</span>

            <strong>86</strong>

            <div className="small-card-change">
              <FiArrowUpRight />
              4 new this month
            </div>

          </div>


          <div className="small-dashboard-card">

            <div className="small-card-icon">
              <FiBriefcase />
            </div>

            <span>Orders</span>

            <strong>148</strong>

            <div className="small-card-change">
              <FiArrowUpRight />
              16.8% growth
            </div>

          </div>


          <div className="small-dashboard-card">

            <div className="small-card-icon">
              <FiActivity />
            </div>

            <span>Operational Efficiency</span>

            <strong>91.4%</strong>

            <div className="small-card-change">
              <FiArrowUpRight />
              4.6% improvement
            </div>

          </div>

        </div>

      </section>


      {/* MANAGEMENT ALERTS */}
      <section className="section">

        <div className="dashboard-card alerts-card">

          <div className="card-header">

            <div>
              <h3>Management Alerts</h3>
              <span>Items requiring attention</span>
            </div>

            <span className="alert-count">
              {alerts.length} Alerts
            </span>

          </div>

          <div className="alerts-list">

            {alerts.map((alert, index) => (

              <div
                className={`alert-item ${alert.type}`}
                key={index}
              >

                <div className="alert-icon">
                  {alert.icon}
                </div>

                <div className="alert-content">
                  <strong>{alert.title}</strong>
                  <span>Requires management attention</span>
                </div>

                <button className="alert-action">
                  Review
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* MANAGEMENT ACTIONS */}
      <section className="section">

        <div className="management-section">

          <div>
            <h2>Management Actions</h2>
            <p>
              Recommended actions based on current business performance
            </p>
          </div>

          <div className="actions-grid">

            <div className="management-action">
              <div className="action-number">01</div>

              <div>
                <strong>Follow up outstanding payments</strong>
                <span>
                  ₹31.6 L outstanding. ₹8.4 L is overdue above 60 days.
                </span>
              </div>

              <FiArrowUpRight />
            </div>


            <div className="management-action">
              <div className="action-number">02</div>

              <div>
                <strong>Review delayed project</strong>
                <span>
                  Vending Platform is currently behind the planned schedule.
                </span>
              </div>

              <FiArrowUpRight />
            </div>


            <div className="management-action">
              <div className="action-number">03</div>

              <div>
                <strong>Review inventory growth</strong>
                <span>
                  Inventory value increased by 9.2% this month.
                </span>
              </div>

              <FiArrowUpRight />
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default BusinessMetrics;