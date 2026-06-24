import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { contactRows } from '../../../lib/dashboard-data';

export default function ContactRequestsPage() {
  const rows = contactRows();
  const columns = [
    { key: 'id', label: 'Ref' },
    { key: 'name', label: 'Name' },
    { key: 'channel', label: 'Channel' },
    { key: 'message', label: 'Message', type: 'wrap' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];
  return (
    <>
      <PageHead title="Contact Requests" sub={`${rows.length} enquiries`} />
      <DataTable rows={rows} columns={columns} searchKeys={['name', 'message']} filters={[{ key: 'status', options: ['New', 'Replied', 'Closed'] }, { key: 'channel', options: ['WhatsApp', 'Email', 'Web form'] }]} />
    </>
  );
}
