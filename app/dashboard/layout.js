import './dashboard.css';
import Sidebar from './_components/Sidebar';

export const metadata = {
  title: 'Dashboard — Tourivo',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dash">
      <Sidebar />
      <main className="dash-main">{children}</main>
    </div>
  );
}
