import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <p className="muted">Sorry, the page you are looking for does not exist or has been moved.</p>
      <Link className="btn btn-primary" href="/en" style={{ marginTop: '1rem' }}>Back to destinations</Link>
    </main>
  );
}
