import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { reviewRows } from '../../../lib/dashboard-data';

export default function ReviewsPage() {
  const rows = reviewRows();
  const columns = [
    { key: 'author', label: 'Author' },
    { key: 'activity', label: 'Activity', type: 'wrap' },
    { key: 'rating', label: 'Rating', type: 'stars' },
    { key: 'text', label: 'Review', type: 'wrap' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];
  return (
    <>
      <PageHead title="Reviews" sub={`${rows.length} customer reviews`} />
      <DataTable rows={rows} columns={columns} searchKeys={['author', 'activity', 'text']} pageSize={20} />
    </>
  );
}
