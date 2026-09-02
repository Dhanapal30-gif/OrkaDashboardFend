import {
  FiDownload,
  FiFileText,
} from "react-icons/fi";

function Reports() {
  const reports = [
    {
      id: 1,
      name: "Employee Summary",
      description: "Employee status and department summary",
    },
    {
      id: 2,
      name: "Department Report",
      description: "Department-wise employee report",
    },
    {
      id: 3,
      name: "Monthly Report",
      description: "Monthly company dashboard report",
    },
  ];

  const downloadReport = (report) => {
    alert(
      `${report.name} download will be connected to backend later.`
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <p>Company dashboard reports</p>
        </div>
      </div>

      <div className="reports-grid">
        {reports.map((report) => (
          <div className="report-card" key={report.id}>
            <div className="report-icon">
              <FiFileText />
            </div>

            <h3>{report.name}</h3>

            <p>{report.description}</p>

            <button
              className="secondary-button full"
              onClick={() => downloadReport(report)}
            >
              <FiDownload />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;