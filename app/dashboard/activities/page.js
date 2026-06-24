import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { activityRows } from '../../../lib/dashboard-data';

export default function ActivitiesPage() {
  const rows = activityRows();
  const columns = [
    { key: 'image', label: '', type: 'image', nameKey: 'name' },
    { key: 'name', label: 'Activity' },
    { key: 'destination', label: 'Destination' },
    { key: 'type', label: 'Type' },
    { key: 'price', label: 'Price', type: 'money', currency: 'USD' },
    { key: 'rating', label: 'Rating', type: 'stars' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'url', label: 'View', type: 'link', hrefKey: 'url' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];
  return (
    <>
      <PageHead title="Activities" sub={`${rows.length} live experiences`} action={<button className="d-btn primary">+ New activity</button>} />
      <DataTable
        rows={rows}
        columns={columns}
        searchKeys={['name', 'destination', 'type']}
        filters={[
          { key: 'destination', options: ['Sharm El Sheikh', 'Hurghada'] },
          { key: 'type', options: ['Excursion', 'Boat Trip', 'Party', 'Wellness Spa', 'Transfer', 'Rental'] },
          { key: 'status', options: ['Published', 'Draft'] },
        ]}
      />
    </>
  );
}
