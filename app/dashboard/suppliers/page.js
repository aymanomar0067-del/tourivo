import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { supplierRows } from '../../../lib/dashboard-data';

export default function SuppliersPage() {
  const rows = supplierRows();
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Supplier' },
    { key: 'type', label: 'Type' },
    { key: 'contact', label: 'Contact' },
    { key: 'activities', label: 'Activities' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];
  return (
    <>
      <PageHead title="Suppliers" sub={`${rows.length} partners`} action={<button className="d-btn primary">+ Add supplier</button>} />
      <DataTable rows={rows} columns={columns} searchKeys={['name', 'type']} filters={[{ key: 'status', options: ['Active', 'On hold'] }]} />
    </>
  );
}
