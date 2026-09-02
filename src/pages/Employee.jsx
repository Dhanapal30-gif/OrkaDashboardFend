import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { employees as initialEmployees } from "../data/dummyData";

function Employee() {
  const [employees, setEmployees] =
    useState(initialEmployees);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    department: "Software",
    status: "Active",
    salary: "",
    year: 2026,
  });

  const resetForm = () => {
    setForm({
      name: "",
      department: "Software",
      status: "Active",
      salary: "",
      year: 2026,
    });

    setEditingId(null);
  };

  const openAdd = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (employee) => {
    setForm(employee);
    setEditingId(employee.id);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.salary) {
      alert("Please enter employee name and salary.");
      return;
    }

    if (editingId) {
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editingId
            ? {
                ...form,
                salary: Number(form.salary),
              }
            : employee
        )
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          salary: Number(form.salary),
        },
      ]);
    }

    resetForm();
    setShowForm(false);
  };

  const deleteEmployee = (id) => {
    if (!window.confirm("Delete this employee?")) return;

    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== id)
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Employees</h2>
          <p>Manage company employees</p>
        </div>

        <button className="primary-button" onClick={openAdd}>
          <FiPlus />
          Add Employee
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>
            {editingId
              ? "Edit Employee"
              : "Add Employee"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="Employee name"
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <select
                  value={form.department}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      department: e.target.value,
                    })
                  }
                >
                  <option>Software</option>
                  <option>Hardware</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Operations</option>
                  <option>Sales</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  value={form.salary}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      salary: e.target.value,
                    })
                  }
                  placeholder="Salary"
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>
                    <strong>{employee.name}</strong>
                  </td>
                  <td>{employee.department}</td>
                  <td>
                    <span
                      className={`status-badge ${employee.status.toLowerCase()}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    ₹{employee.salary.toLocaleString("en-IN")}
                  </td>
                  <td>{employee.year}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => openEdit(employee)}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteEmployee(employee.id)
                        }
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employee;