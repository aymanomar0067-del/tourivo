import DataTable from '../_components/DataTable';
import { PageHead } from '../_components/ui';
import { userRows } from '../../../lib/dashboard-data';

export default function UsersPage() {
  const rows = userRows();
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'joined', label: 'Joined' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'actions', label: 'Actions', type: 'actions' },
  ];
  return (
    <>
      <PageHead title="Users" sub={`${rows.length} accounts`} action={<button className="d-btn primary">+ Invite user</button>} />
      <DataTable rows={rows} columns={columns} searchKeys={['name', 'email']} filters={[{ key: 'role', options: ['Admin', 'Manager', 'Staff', 'Customer'] }, { key: 'status', options: ['Active', 'Invited'] }]} />
    </>
  );
}
