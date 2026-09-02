import { FiBell, FiSearch, FiUser } from "react-icons/fi";

function Header() {
  return (
    <header className="header">
      <div>
        <h1>ORKA Dashboard</h1>
        <p>Management Overview</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <FiSearch />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="icon-button">
          <FiBell />
        </button>

        <div className="profile">
          <div className="profile-icon">
            <FiUser />
          </div>
          <div>
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;