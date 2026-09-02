import { useState } from "react";
import {
  FiMessageCircle,
  FiSend,
  FiX,
  FiUser,
  FiCpu,
} from "react-icons/fi";

function Chatbot({ data }) {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! 👋 I am your Company Dashboard assistant. Ask me about employees, departments, reports or statistics.",
    },
  ]);

  const [input, setInput] = useState("");

  const getResponse = (question) => {
    const q = question.toLowerCase();

    if (q.includes("employee")) {
      return `There are currently ${data.length} employees in the dashboard.`;
    }

    if (q.includes("department")) {
      const departments = [
        ...new Set(data.map((item) => item.department)),
      ];

      return `There are ${departments.length} departments: ${departments.join(
        ", "
      )}.`;
    }

    if (q.includes("active")) {
      const active = data.filter(
        (item) => item.status === "Active"
      ).length;

      return `There are ${active} active employees.`;
    }

    if (q.includes("inactive")) {
      const inactive = data.filter(
        (item) => item.status === "Inactive"
      ).length;

      return `There are ${inactive} inactive employees.`;
    }

    if (q.includes("software")) {
      const count = data.filter(
        (item) => item.department === "Software"
      ).length;

      return `The Software department has ${count} employees.`;
    }

    if (q.includes("salary")) {
      const total = data.reduce(
        (sum, item) => sum + Number(item.salary),
        0
      );

      return `The total salary value is ₹${total.toLocaleString(
        "en-IN"
      )}.`;
    }

    return "I can help you with employee count, departments, active employees, inactive employees, Software department and salary information.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    const botMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getResponse(input),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {open && (
        <div className="chatbot">
          <div className="chat-header">
            <div>
              <strong>Dashboard Assistant</strong>
              <span>Online</span>
            </div>

            <button onClick={() => setOpen(false)}>
              <FiX />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.sender}`}
              >
                <div className="message-icon">
                  {message.sender === "bot" ? (
                    <FiCpu />
                  ) : (
                    <FiUser />
                  )}
                </div>

                <div className="message">
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
            />

            <button onClick={sendMessage}>
              <FiSend />
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-button"
        onClick={() => setOpen(!open)}
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </>
  );
}

export default Chatbot;