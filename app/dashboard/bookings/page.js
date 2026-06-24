import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { sampleBookings } from '../../../lib/dashboard-data';

export default function BookingsPage() {
  const rows = sampleBookings();
  const columns = [
    { key: 'id', label: 'Ref' },
    { key: 'customer', label: 'Customer' },
    { key: 'activity', label: 'Activity', type: 'wrap' },
    { key: 'date', label: 'Date' },
    { key: 'pax', label: 'Pax' },
    { key: 'amountEGP', label: 'Amount', type: 'money', currency: 'EGP' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];
  return (
    <>
      <PageHead title="Bookings" sub={`${rows.length} sample bookings`} action={<button className="d-btn">Export CSV</button>} />
      <DataTable rows={rows} columns={columns} searchKeys={['id', 'customer', 'activity']} filters={[{ key: 'status', options: ['Confirmed', 'Pending', 'Completed', 'Cancelled', 'Refunded'] }]} />
    </>
  );
}
