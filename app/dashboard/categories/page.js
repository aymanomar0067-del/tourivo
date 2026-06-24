import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { categoryRows } from '../../../lib/dashboard-data';

export default function CategoriesPage() {
  const rows = categoryRows();
  const columns = [
    { key: 'name', label: 'Category' },
    { key: 'destination', label: 'Destination' },
    { key: 'trips', label: 'Trips' },
    { key: 'legacyId', label: 'Legacy ID' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'url', label: 'View', type: 'link', hrefKey: 'url' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];
  return (
    <>
      <PageHead title="Categories" sub={`${rows.length} categories`} action={<button className="d-btn primary">+ New category</button>} />
      <DataTable rows={rows} columns={columns} searchKeys={['name', 'destination']} filters={[{ key: 'destination', options: ['Sharm El Sheikh', 'Hurghada'] }, { key: 'status', options: ['Active', 'Empty'] }]} />
    </>
  );
}
