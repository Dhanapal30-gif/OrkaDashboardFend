import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BusinessMetrics from "./components/BusinessMetrics";
import MDDashboard from "./components/MDDashboard";
import Dashboard from "./pages/Dashboard";
import DashboardChatbot from "./components/DashboardChatbot";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar />

        <div className="main">

          <Header />

          <main className="content">

            <Routes>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/businessMetrics"
                element={<BusinessMetrics />}
              />

              <Route
                path="/mDDashboard"
                element={<MDDashboard />}
              />
            </Routes>

          </main>

        </div>

        {/* =========================================
            CHATBOT AVAILABLE ON ALL SCREENS
        ========================================= */}

        <DashboardChatbot />

      </div>
    </BrowserRouter>
  );
}

export default App;