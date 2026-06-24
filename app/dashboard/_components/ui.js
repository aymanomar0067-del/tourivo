// Presentational helpers usable from server components.

const COLOR = {
  Confirmed: 'green', Completed: 'green', Active: 'green', Published: 'green', Settled: 'green', Replied: 'green',
  Pending: 'amber', Invited: 'amber', New: 'blue', 'On hold': 'amber', Draft: 'grey', Empty: 'grey', Closed: 'grey',
  Cancelled: 'red', Refunded: 'red',
};
export function Badge({ value }) {
  return <span className={`pill2 ${COLOR[value] || 'grey'}`}>{value}</span>;
}

export function PageHead({ title, sub, action }) {
  return (
    <div className="dash-top">
      <div>
        <h1>{title}</h1>
        {sub && <div className="sub">{sub}</div>}
      </div>
      {action && <div className="right">{action}</div>}
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="demo-banner">
      <strong>Preview UI.</strong> This dashboard shows the full interface with sample data. Catalog data (categories,
      activities, reviews) is real from your site; bookings, users, suppliers, contacts and finance are sample records
      until a backend is connected.
    </div>
  );
}

export function Stars({ n }) {
  const full = Math.round(n || 0);
  return <span style={{ color: '#e08a13', whiteSpace: 'nowrap' }}>{'★'.repeat(full)}{'☆'.repeat(Math.max(0, 5 - full))}</span>;
}
