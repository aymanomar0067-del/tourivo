import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { finance, egp } from '../../../lib/dashboard-data';

export default function FinancePage() {
  const f = finance();
  const columns = [
    { key: 'id', label: 'Txn' },
    { key: 'booking', label: 'Booking' },
    { key: 'method', label: 'Method' },
    { key: 'amountEGP', label: 'Amount', type: 'money', currency: 'EGP' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ];
  return (
    <>
      <PageHead title="Finance" sub="Revenue, refunds and payouts" action={<button className="d-btn">Export</button>} />
      <div className="stat-grid">
        <div className="stat"><div className="label">Revenue (MTD)</div><div className="num teal">{egp(f.revenueEGP)}</div><div className="hint">Confirmed + completed</div></div>
        <div className="stat"><div className="label">Pending</div><div className="num">{egp(f.pendingEGP)}</div><div className="hint">Awaiting confirmation</div></div>
        <div className="stat"><div className="label">Refunds</div><div className="num" style={{ color: '#c0392b' }}>{egp(f.refundsEGP)}</div><div className="hint">This period</div></div>
        <div className="stat"><div className="label">Net Payout</div><div className="num green">{egp(f.payoutEGP)}</div><div className="hint">After fees (est.)</div></div>
      </div>
      <div className="panel">
        <h2>Recent transactions</h2>
        <div className="desc">Settled payments linked to bookings</div>
        <DataTable rows={f.txns} columns={columns} searchKeys={['id', 'booking', 'method']} pageSize={20} />
      </div>
    </>
  );
}
