import { FiFilter, FiRefreshCw } from "react-icons/fi";

function FilterBar({
  filters,
  setFilters,
  departments,
  statuses,
  onReset,
}) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="filter-card">
      <div className="filter-title">
        <FiFilter />
        <span>Filters</span>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Department</label>
          <select
            value={filters.department}
            onChange={(e) =>
              handleChange("department", e.target.value)
            }
          >
            <option value="All">All Departments</option>

            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
          >
            <option value="All">All Status</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Year</label>
          <select
            value={filters.year}
            onChange={(e) =>
              handleChange("year", e.target.value)
            }
          >
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <button className="reset-button" onClick={onReset}>
          <FiRefreshCw />
          Reset
        </button>
      </div>
    </div>
  );
}

export default FilterBar;