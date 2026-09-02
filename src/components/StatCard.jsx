function StatCard({
  title,
  value,
  icon,
  description,
  trend,
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>

        {trend && (
          <span className={`trend ${trend.type}`}>
            {trend.value}
          </span>
        )}
      </div>

      <div className="stat-value">{value}</div>

      <div className="stat-title">{title}</div>

      {description && (
        <div className="stat-description">
          {description}
        </div>
      )}
    </div>
  );
}

export default StatCard;