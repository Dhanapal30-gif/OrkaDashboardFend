import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiUsers,
  FiBriefcase,
  FiFileText,
  FiSettings,
  FiHome,
} from "react-icons/fi";
import ErrorIcon from "@mui/icons-material/Error";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-mark">O</div>
        <div>
          <strong>ORKA</strong>
          <span>Dashboard</span>
        </div>
      </div>

      <nav className="sidebar-nav">

        <p className="menu-title">MAIN MENU</p>

        {/* <NavLink to="dashboard" end>
          <FiHome />
          Dashboard 1
        </NavLink> */}

        
        {/* <NavLink to="/dashboard">
          <FiUsers />
          Dashboard
        </NavLink> */}

        

        <NavLink to="/businessMetrics">
          <FiBarChart2 />
          Dashboard 2
        </NavLink>

      

        <NavLink to="/mDDashboard">
          <FiFileText />
          Dashboard 
        </NavLink>
        {/* <NavLink to="/dashboard/chat">
          <FiFileText />
          dashboard/chat
        </NavLink> */}

        <p className="menu-title">SYSTEM</p>

        <a href="#settings" onClick={(e) => e.preventDefault()}>
          <FiSettings />
          Settings
        </a>

      </nav>

      <div className="sidebar-footer">
        <span>Company Dashboard</span>
        <small>v1.0.0</small>
      </div>

    </aside>
  );
}

export default Sidebar;