'use client';
import { useMemo, useState } from 'react';

const BADGE = {
  Confirmed: 'green', Completed: 'green', Active: 'green', Published: 'green', Settled: 'green', Replied: 'green',
  Pending: 'amber', Invited: 'amber', 'On hold': 'amber', New: 'blue',
  Draft: 'grey', Empty: 'grey', Closed: 'grey',
  Cancelled: 'red', Refunded: 'red',
};
const money = (v, cur) => (v == null ? '—' : (cur === 'EGP' ? 'E£' : '$') + Number(v).toLocaleString('en-US'));
const stars = (n) => { const f = Math.round(n || 0); return '★'.repeat(f) + '☆'.repeat(Math.max(0, 5 - f)); };

// columns: [{ key, label, type?, currency?, hrefKey?, nameKey? }]
// type: text | badge | image | stars | money | link | wrap | actions
export default function DataTable({ rows, columns, searchKeys = [], filters = [], pageSize = 25 }) {
  const [q, setQ] = useState('');
  const [fv, setFv] = useState({});
  const [sort, setSort] = useState({ key: null, dir: 1 });
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let r = rows;
    const ql = q.trim().toLowerCase();
    if (ql) r = r.filter((row) => searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(ql)));
    for (const f of filters) {
      const v = fv[f.key];
      if (v && v !== 'All') r = r.filter((row) => String(row[f.key]) === v);
    }
    if (sort.key) {
      r = [...r].sort((a, b) => {
        const x = a[sort.key], y = b[sort.key];
        if (x == null) return 1; if (y == null) return -1;
        if (typeof x === 'number' && typeof y === 'number') return (x - y) * sort.dir;
        return String(x).localeCompare(String(y)) * sort.dir;
      });
    }
    return r;
  }, [rows, q, fv, sort, filters, searchKeys]);

  const pages = Math.ceil(filtered.length / pageSize) || 1;
  const view = filtered.slice(page * pageSize, page * pageSize + pageSize);
  const toggleSort = (k) => setSort((s) => ({ key: k, dir: s.key === k ? -s.dir : 1 }));

  const cell = (c, row) => {
    const v = row[c.key];
    switch (c.type) {
      case 'badge': return <span className={`pill2 ${BADGE[v] || 'grey'}`}>{v}</span>;
      case 'image': return v ? <img className="thumb-sm" src={v} alt={row[c.nameKey] || ''} loading="lazy" /> : <div className="thumb-sm" />;
      case 'stars': return v == null ? '—' : <span style={{ color: '#e08a13' }}>{stars(v)}</span>;
      case 'money': return money(v, c.currency);
      case 'link': return <a className="link-act" href={row[c.hrefKey]} target="_blank" rel="noreferrer">{v || 'Open'}</a>;
      case 'actions': return (
        <span className="row-actions">
          <button className="link-act" type="button">Edit</button>
          <button className="link-act danger" type="button">Delete</button>
        </span>
      );
      default: return v ?? '—';
    }
  };

  return (
    <div>
      <div className="toolbar">
        {searchKeys.length > 0 && (
          <input type="search" placeholder="Search…" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} />
        )}
        {filters.map((f) => (
          <select key={f.key} value={fv[f.key] || 'All'} onChange={(e) => { setFv((s) => ({ ...s, [f.key]: e.target.value })); setPage(0); }}>
            <option>All</option>
            {f.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
        <span className="count">{filtered.length} records</span>
      </div>
      <div className="table-wrap">
        <table className="dt">
          <thead>
            <tr>{columns.map((c) => <th key={c.key} onClick={() => toggleSort(c.key)}>{c.label}{sort.key === c.key ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}</th>)}</tr>
          </thead>
          <tbody>
            {view.map((row, i) => (
              <tr key={i}>{columns.map((c) => <td key={c.key} className={c.type === 'wrap' ? 'wrap' : ''}>{cell(c, row)}</td>)}</tr>
            ))}
            {view.length === 0 && <tr><td colSpan={columns.length} style={{ textAlign: 'center', color: '#6b7785', padding: '2rem' }}>No records match.</td></tr>}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="toolbar" style={{ marginTop: '.8rem', justifyContent: 'flex-end' }}>
          <button className="d-btn sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>‹ Prev</button>
          <span className="count" style={{ marginLeft: 0 }}>Page {page + 1} / {pages}</span>
          <button className="d-btn sm" disabled={page >= pages - 1} onClick={() => setPage((p) => p + 1)}>Next ›</button>
        </div>
      )}
    </div>
  );
}
