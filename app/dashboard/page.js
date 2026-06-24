import { PageHead, DemoBanner } from './_components/ui';
import { overview, activityMix } from '../../lib/dashboard-data';

export default function OverviewPage() {
  const o = overview();
  const mix = activityMix();
  return (
    <>
      <PageHead title="Control Center" sub="Monitor categories, activities, and bookings" />
      <DemoBanner />

      <div className="stat-grid">
        <div className="stat"><div className="label">Active Categories</div><div className="num teal">{o.activeCategories}</div><div className="hint">All categories synced</div></div>
        <div className="stat"><div className="label">Live Activities</div><div className="num">{o.liveActivities}</div><div className="hint">Marketplace is healthy</div></div>
        <div className="stat"><div className="label">Upcoming Bookings</div><div className="num">{o.upcoming}</div><div className="hint">Pipeline secured</div></div>
        <div className="stat"><div className="label">Refunds Processed</div><div className="num green">{o.refunds}</div><div className="hint">{o.refunds === 0 ? 'No refunds today' : 'Review in Finance'}</div></div>
      </div>

      <div className="panel">
        <h2>Activity Mix</h2>
        <div className="desc">Breakdown of active experiences across categories</div>
        <div className="mix">
          {mix.map((m) => (
            <div className="cell" key={m.type}>
              <div className="t">{m.type}</div>
              <div className="v">{m.count}</div>
              <div className="tag">Popular</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>Platform Settings Snapshot</h2>
        <div className="desc">Pulled from the global settings document</div>
        <div className="form-grid">
          <div className="stat" style={{ borderRadius: 12 }}><div className="label">Business Hours</div><div className="hint" style={{ marginTop: 6 }}>Not configured</div></div>
          <div className="stat" style={{ borderRadius: 12 }}><div className="label">Default Currency</div><div className="num" style={{ fontSize: '1.4rem' }}>EGP</div></div>
          <div className="stat" style={{ borderRadius: 12 }}><div className="label">Tax Rate</div><div className="num" style={{ fontSize: '1.4rem' }}>—</div></div>
          <div className="stat" style={{ borderRadius: 12 }}><div className="label">Payment Methods</div><div className="hint" style={{ marginTop: 6 }}>Visa · PayPal · Cash</div></div>
        </div>
      </div>
    </>
  );
}
