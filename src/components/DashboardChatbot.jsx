import React, { useEffect, useRef, useState } from "react";
import {
  Chat,
  Close,
  Send,
  SmartToy,
  OpenInFull,
  CloseFullscreen,
} from "@mui/icons-material";

import "./DashboardChatbot.css";

const DashboardChatbot = ({
  revenueData = [],
  projects = [],
  departments = [],
  actions = [],
  pipelineData = [],
  costData = [],
}) => {
  // =====================================================
  // DEFAULT DASHBOARD DATA
  // =====================================================

  const defaultRevenueData = [
    { month: "January", actual: 18.5, target: 20 },
    { month: "February", actual: 22.8, target: 22 },
    { month: "March", actual: 28.4, target: 25 },
    { month: "April", actual: 31.2, target: 30 },
    { month: "May", actual: 26.7, target: 32 },
    { month: "June", actual: 35.9, target: 35 },
    { month: "July", actual: 42.5, target: 40 },
  ];

  // =====================================================
  // SAFE DATA
  // =====================================================

  const safeRevenueData =
    Array.isArray(revenueData) && revenueData.length > 0
      ? revenueData
      : defaultRevenueData;

  const safeProjects =
    Array.isArray(projects) ? projects : [];

  const safeDepartments =
    Array.isArray(departments) ? departments : [];

  const safeActions =
    Array.isArray(actions) ? actions : [];

  const safePipelineData =
    Array.isArray(pipelineData) ? pipelineData : [];

  const safeCostData =
    Array.isArray(costData) ? costData : [];

  // =====================================================
  // STATE
  // =====================================================

  const [isOpen, setIsOpen] = useState(false);

  // false = normal chatbot
  // true  = maximized chatbot
  const [isMaximized, setIsMaximized] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello! 👋 I am your Executive AI Assistant. Ask me anything about your business dashboard.",
    },
  ]);

  const messagesEndRef = useRef(null);

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================================
  // NUMBER CONVERSION
  // =====================================================

  const toNumber = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return 0;
    }

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : 0;
    }

    const cleaned = String(value)
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .replace(/L/gi, "")
      .replace(/Cr/gi, "")
      .replace(/%/g, "")
      .trim();

    const number = Number(cleaned);

    return Number.isFinite(number)
      ? number
      : 0;
  };

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatMoney = (value) => {
    const number = toNumber(value);

    return `₹${number.toFixed(2)} L`;
  };

  // =====================================================
  // MONTHS
  // =====================================================

  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const shortMonths = {
    jan: "january",
    feb: "february",
    mar: "march",
    apr: "april",
    may: "may",
    jun: "june",
    jul: "july",
    aug: "august",
    sep: "september",
    sept: "september",
    oct: "october",
    nov: "november",
    dec: "december",
  };

  // =====================================================
  // FIND MONTH
  // =====================================================

  const findMonth = (text) => {
    const q = String(text).toLowerCase();

    for (const month of months) {
      if (q.includes(month)) {
        return month;
      }
    }

    for (const shortMonth of Object.keys(shortMonths)) {
      const regex = new RegExp(
        `\\b${shortMonth}\\b`,
        "i"
      );

      if (regex.test(q)) {
        return shortMonths[shortMonth];
      }
    }

    return null;
  };

  // =====================================================
  // GET MONTH DATA
  // =====================================================

  const getMonthData = (month) => {
    if (!month) return null;

    return safeRevenueData.find((item) => {
      const itemMonth = String(
        item.month ||
          item.monthName ||
          item.name ||
          item.label ||
          ""
      ).toLowerCase();

      return (
        itemMonth === month ||
        itemMonth.includes(month)
      );
    });
  };

  // =====================================================
  // GET ACTUAL REVENUE
  // =====================================================

  const getActualRevenue = (item) => {
    if (!item) return 0;

    return toNumber(
      item.actual ??
        item.actualRevenue ??
        item.revenue ??
        item.sales ??
        item.value ??
        0
    );
  };

  // =====================================================
  // GET TARGET REVENUE
  // =====================================================

  const getTargetRevenue = (item) => {
    if (!item) return 0;

    return toNumber(
      item.target ??
        item.targetRevenue ??
        item.revenueTarget ??
        0
    );
  };

  // =====================================================
  // GET MONTH NAME
  // =====================================================

  const getMonthName = (item) => {
    if (!item) return "Unknown";

    return (
      item.month ||
      item.monthName ||
      item.name ||
      item.label ||
      "Unknown"
    );
  };

  // =====================================================
  // GET ANSWER
  // =====================================================

  const getAnswer = (question) => {
    const q = String(question || "")
      .toLowerCase()
      .trim();

    if (!q) {
      return "Please enter your question.";
    }

    // ===================================================
    // GREETING
    // ===================================================

    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q === "hai"
    ) {
      return "Hello! 👋 How can I help you today?";
    }

    // ===================================================
    // MONTH DETECTION
    // ===================================================

    const requestedMonth = findMonth(q);

    // ===================================================
    // HIGHEST REVENUE
    // ===================================================

    if (
      q.includes("highest revenue") ||
      q.includes("highest sales") ||
      q.includes("best revenue") ||
      q.includes("top revenue") ||
      q.includes("which month has highest")
    ) {
      const highest = [...safeRevenueData].sort(
        (a, b) =>
          getActualRevenue(b) -
          getActualRevenue(a)
      )[0];

      return `🏆 ${getMonthName(
        highest
      )} has the highest revenue.

Revenue: ${formatMoney(
        getActualRevenue(highest)
      )}`;
    }

    // ===================================================
    // LOWEST REVENUE
    // ===================================================

    if (
      q.includes("lowest revenue") ||
      q.includes("lowest sales") ||
      q.includes("worst revenue")
    ) {
      const lowest = [...safeRevenueData].sort(
        (a, b) =>
          getActualRevenue(a) -
          getActualRevenue(b)
      )[0];

      return `📉 ${getMonthName(
        lowest
      )} has the lowest revenue.

Revenue: ${formatMoney(
        getActualRevenue(lowest)
      )}`;
    }

    // ===================================================
    // MONTHLY REVENUE
    // ===================================================

    if (
      q.includes("show monthly revenue") ||
      q.includes("monthly revenue") ||
      q.includes("revenue by month") ||
      q.includes("all month revenue")
    ) {
      return `📊 Monthly Revenue

${safeRevenueData
  .map((item) => {
    return `${getMonthName(item)}
Actual: ${formatMoney(
      getActualRevenue(item)
    )}
Target: ${formatMoney(
      getTargetRevenue(item)
    )}`;
  })
  .join("\n\n")}`;
    }

    // ===================================================
    // TARGET VS ACTUAL
    // ===================================================

    if (
      q.includes("target vs actual") ||
      q.includes("actual vs target") ||
      q.includes("target and actual") ||
      q.includes("compare target")
    ) {
      if (requestedMonth) {
        const monthData =
          getMonthData(requestedMonth);

        if (monthData) {
          const actual =
            getActualRevenue(monthData);

          const target =
            getTargetRevenue(monthData);

          const achievement =
            target > 0
              ? (
                  (actual / target) *
                  100
                ).toFixed(1)
              : 0;

          return `🎯 ${getMonthName(
            monthData
          )} Target vs Actual

Actual Revenue: ${formatMoney(actual)}
Target Revenue: ${formatMoney(target)}
Achievement: ${achievement}%`;
        }
      }

      return `🎯 Target vs Actual

${safeRevenueData
  .map((item) => {
    const actual =
      getActualRevenue(item);

    const target =
      getTargetRevenue(item);

    const achievement =
      target > 0
        ? ((actual / target) * 100).toFixed(1)
        : 0;

    return `${getMonthName(item)}
Actual: ${formatMoney(actual)}
Target: ${formatMoney(target)}
Achievement: ${achievement}%`;
  })
  .join("\n\n")}`;
    }

    // ===================================================
    // SPECIFIC MONTH REVENUE
    // ===================================================

    if (
      requestedMonth &&
      (
        q.includes("revenue") ||
        q.includes("sales") ||
        q.includes("actual") ||
        q.includes("target")
      )
    ) {
      const monthData =
        getMonthData(requestedMonth);

      if (monthData) {
        const actual =
          getActualRevenue(monthData);

        const target =
          getTargetRevenue(monthData);

        const achievement =
          target > 0
            ? (
                (actual / target) *
                100
              ).toFixed(1)
            : 0;

        const variance =
          actual - target;

        return `📊 ${getMonthName(
          monthData
        )} Revenue

Actual Revenue: ${formatMoney(actual)}
Target Revenue: ${formatMoney(target)}
Achievement: ${achievement}%
Variance: ${formatMoney(variance)}`;
      }
    }

    // ===================================================
    // CURRENT / LATEST REVENUE
    // ===================================================

    if (
      q === "revenue" ||
      q.includes("current revenue") ||
      q.includes("latest revenue")
    ) {
      const latest =
        safeRevenueData[
          safeRevenueData.length - 1
        ];

      const actual =
        getActualRevenue(latest);

      const target =
        getTargetRevenue(latest);

      const achievement =
        target > 0
          ? (
              (actual / target) *
              100
            ).toFixed(1)
          : 0;

      return `📊 Latest Revenue

Month: ${getMonthName(latest)}

Actual Revenue: ${formatMoney(actual)}
Target Revenue: ${formatMoney(target)}
Achievement: ${achievement}%`;
    }

    // ===================================================
    // PROFIT
    // ===================================================

    if (
      q.includes("profit") ||
      q.includes("loss") ||
      q.includes("margin")
    ) {
      return `💰 Profit Summary

Net Profit / Loss: -₹12.50 L
Profit Margin: -82%

Current profitability requires management attention.`;
    }

    // ===================================================
    // OUTSTANDING
    // ===================================================

    if (
      q.includes("outstanding") ||
      q.includes("receivable") ||
      q.includes("pending payment")
    ) {
      return `💳 Outstanding Summary

Total Outstanding: ₹72.69 L
Above 90 Days: ₹35.69 L

Priority: Improve payment collection.`;
    }

    // ===================================================
    // PROJECT LOSS
    // ===================================================

    if (
      q.includes("project") &&
      q.includes("loss")
    ) {
      if (safeProjects.length > 0) {
        const lossProjects =
          safeProjects.filter(
            (project) =>
              String(
                project.status || ""
              )
                .toLowerCase()
                .includes("loss") ||
              toNumber(project.profit) < 0
          );

        if (lossProjects.length > 0) {
          return lossProjects
            .map(
              (project) =>
                `⚠️ ${project.name}

Value: ${
  project.value || "N/A"
}
Progress: ${
  project.progress || 0
}%
Profit/Loss: ${
  project.profit || "N/A"
}`
            )
            .join("\n\n");
        }
      }

      return "No project is currently identified as a loss project.";
    }

    // ===================================================
    // PROJECT LIST
    // ===================================================

    if (
      q.includes("show projects") ||
      q.includes("project list") ||
      q === "projects"
    ) {
      if (safeProjects.length > 0) {
        return safeProjects
          .map(
            (project) =>
              `📁 ${project.name || "Project"}

Value: ${
  project.value || "N/A"
}
Progress: ${
  project.progress || 0
}%
Status: ${
  project.status || "N/A"
}`
          )
          .join("\n\n");
      }

      return "Project information is currently being monitored in the dashboard.";
    }

    // ===================================================
    // BEST DEPARTMENT
    // ===================================================

    if (
      q.includes("best department") ||
      q.includes("top department")
    ) {
      if (safeDepartments.length > 0) {
        const best =
          [...safeDepartments].sort(
            (a, b) =>
              toNumber(
                b.value ??
                  b.performance
              ) -
              toNumber(
                a.value ??
                  a.performance
              )
          )[0];

        return `🏆 Best Performing Department

${best.name}

Performance: ${toNumber(
          best.value ??
            best.performance
        )}%`;
      }

      return "Department performance data is currently being monitored.";
    }

    // ===================================================
    // PIPELINE
    // ===================================================

    if (q.includes("pipeline")) {
      if (safePipelineData.length > 0) {
        const total =
          safePipelineData.reduce(
            (sum, item) =>
              sum +
              toNumber(
                item.value ??
                  item.amount
              ),
            0
          );

        return `🚀 Sales Pipeline

Total Pipeline: ${formatMoney(total)}

${safePipelineData
  .map(
    (item) =>
      `${item.stage || item.name}: ${formatMoney(
        item.value ?? item.amount
      )}`
  )
  .join("\n")}`;
      }

      return "Sales pipeline is being monitored in the dashboard.";
    }

    // ===================================================
    // COST
    // ===================================================

    if (
      q.includes("cost") ||
      q.includes("expense")
    ) {
      if (safeCostData.length > 0) {
        const total =
          safeCostData.reduce(
            (sum, item) =>
              sum +
              toNumber(
                item.value ??
                  item.amount
              ),
            0
          );

        return `💰 Cost Analysis

Total Cost: ${formatMoney(total)}

${safeCostData
  .map(
    (item) =>
      `${item.name}: ${formatMoney(
        item.value ?? item.amount
      )}`
  )
  .join("\n")}`;
      }

      return "Cost performance is available in the dashboard summary.";
    }

    // ===================================================
    // BUSINESS SUMMARY
    // ===================================================

    if (
      q.includes("summary") ||
      q.includes("business summary") ||
      q.includes("overall status")
    ) {
      const latest =
        safeRevenueData[
          safeRevenueData.length - 1
        ];

      const highest =
        [...safeRevenueData].sort(
          (a, b) =>
            getActualRevenue(b) -
            getActualRevenue(a)
        )[0];

      return `📋 Executive Summary

Latest Revenue:
${formatMoney(
  getActualRevenue(latest)
)}

Highest Revenue Month:
${getMonthName(highest)}

Net Profit/Loss:
-₹12.50 L

Outstanding:
₹72.69 L

Overall Status:
Needs Attention`;
    }

    // ===================================================
    // DEFAULT
    // ===================================================

    return `I can help you with:

• Which month has highest revenue?
• Which month has lowest revenue?
• Show monthly revenue
• July revenue
• July target vs actual
• What is current revenue?
• What is profit?
• What is outstanding?
• Which project is in loss?
• Which department is best?
• Show pipeline
• Show cost
• Give business summary`;
  };

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSend = () => {
    const question = input.trim();

    if (!question) return;

    const answer = getAnswer(question);

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        sender: "user",
        text: question,
      },
      {
        sender: "bot",
        text: answer,
      },
    ]);

    setInput("");
  };

  // =====================================================
  // ENTER KEY
  // =====================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const handleClearChat = () => {
    setMessages([
      {
        sender: "bot",
        text:
          "Hello! 👋 I am your Executive AI Assistant. How can I help you today?",
      },
    ]);

    setInput("");
  };

  // =====================================================
  // TOGGLE MAXIMIZE
  // =====================================================

  const handleToggleMaximize = () => {
    setIsMaximized((previous) => !previous);
  };

  // =====================================================
  // CLOSE CHAT
  // =====================================================

  const handleClose = () => {
    setIsOpen(false);

    // Restore normal size when closed
    setIsMaximized(false);
  };

  // =====================================================
  // OPEN CHAT
  // =====================================================

  const handleOpen = () => {
    setIsOpen(true);
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <>
      {/* =================================================
          FLOATING CHAT BUTTON
      ================================================= */}

      {!isOpen && (
        <button
          type="button"
          className="dashboard-chat-button"
          onClick={handleOpen}
          aria-label="Open dashboard assistant"
          title="Open Executive AI Assistant"
        >
          <Chat />
        </button>
      )}

      {/* =================================================
          CHAT WINDOW
      ================================================= */}

      {isOpen && (
        <div
          className={`dashboard-chat-window ${
            isMaximized
              ? "dashboard-chat-maximized"
              : "dashboard-chat-normal"
          }`}
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="dashboard-chat-header">
            <div className="chat-title">
              <div className="chat-bot-icon">
                <SmartToy />
              </div>

              <div className="chat-title-text">
                <strong>
                  Executive AI Assistant
                </strong>

                <span>
                  Dashboard Assistant
                </span>
              </div>
            </div>

            {/* =================================================
                HEADER ACTIONS
            ================================================= */}

            <div className="chat-header-actions">
              {/* CLEAR */}

              <button
                type="button"
                className="chat-clear-button"
                onClick={handleClearChat}
                title="Clear chat"
              >
                Clear
              </button>

              {/* MAXIMIZE / MINIMIZE */}

              <button
                type="button"
                className="chat-icon-button"
                onClick={handleToggleMaximize}
                title={
                  isMaximized
                    ? "Restore chat"
                    : "Maximize chat"
                }
                aria-label={
                  isMaximized
                    ? "Restore chat"
                    : "Maximize chat"
                }
              >
                {isMaximized ? (
                  <CloseFullscreen />
                ) : (
                  <OpenInFull />
                )}
              </button>

              {/* CLOSE */}

              <button
                type="button"
                className="chat-close-button"
                onClick={handleClose}
                title="Close chat"
                aria-label="Close chat"
              >
                <Close />
              </button>
            </div>
          </div>

          {/* =================================================
              STATUS BAR
          ================================================= */}

          <div className="chat-status-bar">
            <span className="chat-status-dot"></span>

            <span>
              Online · Ready to assist
            </span>

            {isMaximized && (
              <span className="chat-mode-label">
                Full Screen Mode
              </span>
            )}
          </div>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="dashboard-chat-messages">
            {messages.map(
              (message, index) => (
                <div
                  key={`${message.sender}-${index}`}
                  className={`chat-message ${message.sender}`}
                >
                  {message.sender === "bot" && (
                    <div className="message-bot-icon">
                      <SmartToy />
                    </div>
                  )}

                  <div
                    className="message-bubble"
                    style={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              )
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* =================================================
              INPUT
          ================================================= */}

          <div className="dashboard-chat-input">
            <input
              type="text"
              value={input}
              placeholder="Ask about your business..."
              onChange={(event) =>
                setInput(event.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              title="Send message"
              aria-label="Send message"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardChatbot;