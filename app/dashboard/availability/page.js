import { PageHead } from '../_components/ui';
import { activityRows } from '../../../lib/dashboard-data';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function AvailabilityPage() {
  const activities = activityRows().slice(0, 10);
  // July 2026 starts on a Wednesday (index 3); 31 days. Sample open/closed pattern.
  const startOffset = 3;
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= 31; d++) {
    const closed = d % 7 === 2; // sample weekly closure
    days.push({ d, closed, slots: closed ? 0 : (d % 3 === 0 ? 2 : 4) });
  }

  return (
    <>
      <PageHead title="Availability" sub="Open days and capacity per activity" action={<button className="d-btn primary">Bulk update</button>} />

      <div className="panel">
        <div className="toolbar">
          <select defaultValue={activities[0]?.name}>
            {activities.map((a) => <option key={a.id}>{a.name}</option>)}
          </select>
          <select defaultValue="July 2026"><option>July 2026</option><option>August 2026</option></select>
          <span className="count">Sample schedule</span>
        </div>
        <div className="cal">
          {DOW.map((d) => <div className="dow" key={d}>{d}</div>)}
          {days.map((day, i) => day ? (
            <div className={`day ${day.closed ? 'closed' : 'open'}`} key={i}>
              <div className="n">{day.d}</div>
              <div className="slot">{day.closed ? 'Closed' : `${day.slots} slots`}</div>
            </div>
          ) : <div key={i} />)}
        </div>
      </div>

      <div className="panel">
        <h2>Capacity by activity</h2>
        <div className="desc">Default daily seats per experience</div>
        <div className="table-wrap">
          <table className="dt">
            <thead><tr><th>Activity</th><th>Destination</th><th>Default seats / day</th><th>Open days</th></tr></thead>
            <tbody>
              {activities.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td><td>{a.destination}</td>
                  <td>{12 + (a.reviews % 8)}</td>
                  <td>Daily except weekly maintenance</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
