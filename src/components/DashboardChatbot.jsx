import React, { useEffect, useRef, useState } from "react";
import {
  Chat,
  Close,
  Send,
  SmartToy,
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
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I am your Executive Dashboard Assistant. Ask me about revenue, projects, outstanding, departments, pipeline, costs, or management actions.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // =====================================================
  // GET ANSWER
  // =====================================================

const getAnswer = (question) => {
  const q = question.toLowerCase().trim();

  // =====================================================
  // HELPER FUNCTIONS
  // =====================================================

  const findMonth = (text) => {
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

    for (const month of months) {
      if (text.includes(month)) {
        return month;
      }
    }

    for (const shortMonth of Object.keys(shortMonths)) {
      if (text.includes(shortMonth)) {
        return shortMonths[shortMonth];
      }
    }

    return null;
  };

  const getMonthData = (month) => {
    if (!month || !Array.isArray(revenueData)) {
      return null;
    }

    return revenueData.find(
      (item) =>
        item.month &&
        item.month.toLowerCase() === month.toLowerCase().substring(0, 3)
    );
  };

  // =====================================================
  // GREETING
  // =====================================================

  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q.includes("good morning") ||
    q.includes("good afternoon")
  ) {
    return "Hello! 👋 Ask me anything about your dashboard.";
  }

  // =====================================================
  // MONTHLY REVENUE
  // =====================================================

  const month = findMonth(q);

  if (
    month &&
    (
      q.includes("revenue") ||
      q.includes("sales") ||
      q.includes("actual") ||
      q.includes("target")
    )
  ) {
    const monthData = getMonthData(month);

    if (!monthData) {
      return `I don't have revenue data available for ${month}.`;
    }

    const actual = Number(monthData.actual || 0);
    const target = Number(monthData.target || 0);

    const achievement =
      target > 0
        ? ((actual / target) * 100).toFixed(1)
        : 0;

    const variance = actual - target;

    return `${monthData.month} Revenue:

Actual Revenue: ₹${actual.toFixed(2)} L
Target Revenue: ₹${target.toFixed(2)} L
Achievement: ${achievement}%
Variance: ₹${variance.toFixed(2)} L`;
  }

  // =====================================================
  // ALL MONTH REVENUE
  // =====================================================

  if (
    q.includes("monthly revenue") ||
    q.includes("revenue by month") ||
    q.includes("revenue for all months") ||
    q.includes("all month revenue") ||
    q.includes("show revenue")
  ) {
    if (!revenueData.length) {
      return "Revenue data is not available.";
    }

    return revenueData
      .map((item) => {
        const actual = Number(item.actual || 0);
        const target = Number(item.target || 0);

        return `${item.month}: Actual ₹${actual.toFixed(
          2
        )} L / Target ₹${target.toFixed(2)} L`;
      })
      .join("\n");
  }

  // =====================================================
  // HIGHEST REVENUE MONTH
  // =====================================================

  if (
    q.includes("highest revenue") ||
    q.includes("best revenue month") ||
    q.includes("highest revenue month") ||
    q.includes("which month has highest revenue")
  ) {
    if (!revenueData.length) {
      return "Revenue data is not available.";
    }

    const highest = [...revenueData].sort(
      (a, b) => Number(b.actual) - Number(a.actual)
    )[0];

    return `${highest.month} has the highest actual revenue at ₹${Number(
      highest.actual
    ).toFixed(2)} L.`;
  }

  // =====================================================
  // LOWEST REVENUE MONTH
  // =====================================================

  if (
    q.includes("lowest revenue") ||
    q.includes("lowest revenue month") ||
    q.includes("worst revenue month") ||
    q.includes("which month has lowest revenue")
  ) {
    if (!revenueData.length) {
      return "Revenue data is not available.";
    }

    const lowest = [...revenueData].sort(
      (a, b) => Number(a.actual) - Number(b.actual)
    )[0];

    return `${lowest.month} has the lowest actual revenue at ₹${Number(
      lowest.actual
    ).toFixed(2)} L.`;
  }

  // =====================================================
  // REVENUE COMPARISON
  // =====================================================

  if (
    q.includes("compare") &&
    q.includes("revenue")
  ) {
    if (!revenueData.length) {
      return "Revenue data is not available.";
    }

    return revenueData
      .map((item) => {
        const actual = Number(item.actual || 0);
        const target = Number(item.target || 0);
        const achievement =
          target > 0
            ? ((actual / target) * 100).toFixed(1)
            : 0;

        return `${item.month}: ₹${actual.toFixed(
          2
        )} L actual, ₹${target.toFixed(
          2
        )} L target, ${achievement}% achievement`;
      })
      .join("\n");
  }

  // =====================================================
  // CURRENT REVENUE
  // =====================================================

  if (
    q === "revenue" ||
    q.includes("current revenue") ||
    q.includes("current month revenue")
  ) {
    return "Current July revenue is ₹15.23 L against a target of ₹40 L.";
  }

  // =====================================================
  // REVENUE TARGET
  // =====================================================

  if (
    q.includes("revenue target") ||
    q.includes("target revenue") ||
    q.includes("monthly target")
  ) {
    return "The monthly revenue target is ₹40 L.";
  }

  // =====================================================
  // REVENUE ACHIEVEMENT
  // =====================================================

  if (
    q.includes("revenue achievement") ||
    q.includes("revenue percentage") ||
    q.includes("revenue performance")
  ) {
    return "Revenue achievement is currently 38%, against the ₹40 L monthly target.";
  }

  // =====================================================
  // PROFIT
  // =====================================================

  if (
    q.includes("profit") ||
    q.includes("loss")
  ) {
    return "Current Net Profit / Loss is -₹12.50 L and the overall profit margin is -82%.";
  }

  // =====================================================
  // OUTSTANDING
  // =====================================================

  if (
    q.includes("outstanding") ||
    q.includes("receivable") ||
    q.includes("customer payment")
  ) {
    return "Total outstanding receivables are ₹72.69 L. ₹35.69 L is above 90 days.";
  }

  // =====================================================
  // PROJECTS
  // =====================================================

  if (
    q.includes("project") &&
    q.includes("loss")
  ) {
    const lossProject = projects.find(
      (project) => project.type === "danger"
    );

    if (!lossProject) {
      return "No project with a loss status was found.";
    }

    return `${lossProject.name} is currently in loss.

Value: ${lossProject.value}
Progress: ${lossProject.progress}%
Profit/Loss: ${lossProject.profit}
Margin: ${lossProject.margin}
Status: ${lossProject.status}`;
  }

  // =====================================================
  // SPECIFIC PROJECT
  // =====================================================

  const matchedProject = projects.find((project) =>
    q.includes(project.name.toLowerCase())
  );

  if (matchedProject) {
    return `${matchedProject.name}

Customer: ${matchedProject.customer}
Project Value: ${matchedProject.value}
Progress: ${matchedProject.progress}%
Profit/Loss: ${matchedProject.profit}
Margin: ${matchedProject.margin}
Status: ${matchedProject.status}`;
  }

  // =====================================================
  // PROJECT LIST
  // =====================================================

  if (
    q.includes("projects") ||
    q.includes("project details")
  ) {
    return projects
      .map(
        (project) =>
          `${project.name}: ${project.value}, Progress ${project.progress}%, Profit/Loss ${project.profit}, Status ${project.status}`
      )
      .join("\n\n");
  }

  // =====================================================
  // DEPARTMENT
  // =====================================================

  if (
    q.includes("best department") ||
    q.includes("top department") ||
    q.includes("highest department")
  ) {
    if (!departments.length) {
      return "Department data is not available.";
    }

    const best = [...departments].sort(
      (a, b) => b.value - a.value
    )[0];

    return `${best.name} is the best-performing department with ${best.value}% performance and status ${best.status}.`;
  }

  // =====================================================
  // WORST DEPARTMENT
  // =====================================================

  if (
    q.includes("worst department") ||
    q.includes("lowest department") ||
    q.includes("department behind")
  ) {
    if (!departments.length) {
      return "Department data is not available.";
    }

    const worst = [...departments].sort(
      (a, b) => a.value - b.value
    )[0];

    return `${worst.name} has the lowest performance at ${worst.value}% and status ${worst.status}.`;
  }

  // =====================================================
  // ALL DEPARTMENTS
  // =====================================================

  if (
    q.includes("department") ||
    q.includes("department performance")
  ) {
    return departments
      .map(
        (department) =>
          `${department.name}: ${department.value}% - ${department.status}`
      )
      .join("\n");
  }

  // =====================================================
  // PIPELINE
  // =====================================================

  if (
    q.includes("pipeline") ||
    q.includes("sales pipeline")
  ) {
    const totalPipeline = pipelineData.reduce(
      (total, item) =>
        total + Number(item.value || 0),
      0
    );

    return `Sales Pipeline:

Total Pipeline: ₹${totalPipeline.toFixed(2)} L

${pipelineData
  .map(
    (item) =>
      `${item.stage}: ₹${item.value} L (${item.count} opportunities)`
  )
  .join("\n")}`;
  }

  // =====================================================
  // COST
  // =====================================================

  if (
    q.includes("cost") ||
    q.includes("expense")
  ) {
    const totalCost = costData.reduce(
      (total, item) =>
        total + Number(item.value || 0),
      0
    );

    return `Cost Distribution:

Total Cost: ₹${totalCost.toFixed(2)} L

${costData
  .map(
    (item) =>
      `${item.name}: ₹${item.value} L`
  )
  .join("\n")}`;
  }

  // =====================================================
  // BUSINESS HEALTH
  // =====================================================

  if (
    q.includes("business health") ||
    q.includes("health score") ||
    q.includes("business score")
  ) {
    return "Business Health Score is 62/100. The target is above 70%, so the current business status needs attention.";
  }

  // =====================================================
  // MANAGEMENT ACTION
  // =====================================================

  if (
    q.includes("management") ||
    q.includes("action") ||
    q.includes("priority")
  ) {
    return actions
      .map(
        (action) =>
          `${action.priority}: ${action.title}
Owner: ${action.owner}
${action.description}`
      )
      .join("\n\n");
  }

  // =====================================================
  // EXECUTIVE SUMMARY
  // =====================================================

  if (
    q.includes("summary") ||
    q.includes("overall business") ||
    q.includes("overall status")
  ) {
    return `Executive Summary:

Revenue: ₹15.23 L
Revenue Target: ₹40 L
Achievement: 38%
Net Profit/Loss: -₹12.50 L
Outstanding: ₹72.69 L
Active Projects: 12
Delayed Projects: 3
Business Health: 62/100
Sales Pipeline: ₹215 L

Overall Status: Needs Attention.`;
  }

  // =====================================================
  // DEFAULT
  // =====================================================

  return `I couldn't find that information in the dashboard data.

Try asking naturally, for example:

• July month revenue
• What is July actual revenue?
• July target vs actual
• Which month has highest revenue?
• Show monthly revenue
• Which project is in loss?
• Which department is best?
• What is the outstanding?
• Show sales pipeline
• Give me business summary`;
};

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSend = () => {
    const question = input.trim();

    if (!question) {
      return;
    }

    const userMessage = {
      sender: "user",
      text: question,
    };

    const answer = getAnswer(question);

    const botMessage = {
      sender: "bot",
      text: answer,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      botMessage,
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
        text: "Hello! 👋 I am your Executive Dashboard Assistant. Ask me anything about your dashboard.",
      },
    ]);

    setInput("");
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <>
      <button
        type="button"
        className="dashboard-chat-button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Open dashboard assistant"
      >
        {isOpen ? <Close /> : <Chat />}
      </button>

      {isOpen && (
        <div className="dashboard-chat-window">

          <div className="dashboard-chat-header">

            <div className="chat-title">

              <div className="chat-bot-icon">
                <SmartToy />
              </div>

              <div>
                <strong>Executive AI Assistant</strong>
                <span>Dashboard Assistant</span>
              </div>

            </div>

            <div className="chat-header-actions">

              <button
                type="button"
                className="chat-clear-button"
                onClick={handleClearChat}
              >
                Clear
              </button>

              <button
                type="button"
                className="chat-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <Close />
              </button>

            </div>

          </div>

          <div className="dashboard-chat-messages">

            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`chat-message ${message.sender}`}
              >

                {message.sender === "bot" && (
                  <div className="message-bot-icon">
                    <SmartToy />
                  </div>
                )}

                <div className="message-bubble">
                  {message.text}
                </div>

              </div>
            ))}

            <div ref={messagesEndRef} />

          </div>

          <div className="dashboard-chat-input">

            <input
              type="text"
              value={input}
              placeholder="Ask about your business..."
              onChange={(event) => {
                setInput(event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
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