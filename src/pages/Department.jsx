import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

const initialDepartments = [
  {
    id: 1,
    name: "Software",
    manager: "Kumar",
    employees: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "Hardware",
    manager: "Prakash",
    employees: 18,
    status: "Active",
  },
  {
    id: 3,
    name: "HR",
    manager: "Priya",
    employees: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "Finance",
    manager: "Ravi",
    employees: 10,
    status: "Active",
  },
];

function Department() {
  const [departments, setDepartments] = useState(
    initialDepartments
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    manager: "",
    employees: 0,
    status: "Active",
  });

  const saveDepartment = (e) => {
    e.preventDefault();

    if (!form.name || !form.manager) {
      alert("Please enter department and manager.");
      return;
    }

    if (editingId) {
      setDepartments((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                employees: Number(form.employees),
              }
            : item
        )
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now(),
          employees: Number(form.employees),
        },
      ]);
    }

    closeForm();
  };

  const editDepartment = (department) => {
    setForm(department);
    setEditingId(department.id);
    setShowForm(true);
  };

  const deleteDepartment = (id) => {
    if (!window.confirm("Delete this department?")) return;

    setDepartments((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);

    setForm({
      name: "",
      manager: "",
      employees: 0,
      status: "Active",
    });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Departments</h2>
          <p>Manage company departments</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(true)}
        >
          <FiPlus />
          Add Department
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>
            {editingId
              ? "Edit Department"
              : "Add Department"}
          </h3>

          <form onSubmit={saveDepartment}>
            <div className="form-grid">
              <div className="form-group">
                <label>Department</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Manager</label>
                <input
                  value={form.manager}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      manager: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Employees</label>
                <input
                  type="number"
                  value={form.employees}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      employees: e.target.value,
                    })
                  }
                />
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
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={closeForm}
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
                <th>Department</th>
                <th>Manager</th>
                <th>Employees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((department) => (
                <tr key={department.id}>
                  <td>{department.id}</td>
                  <td>
                    <strong>{department.name}</strong>
                  </td>
                  <td>{department.manager}</td>
                  <td>{department.employees}</td>
                  <td>
                    <span
                      className={`status-badge ${department.status.toLowerCase()}`}
                    >
                      {department.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() =>
                          editDepartment(department)
                        }
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          deleteDepartment(department.id)
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

export default Department;