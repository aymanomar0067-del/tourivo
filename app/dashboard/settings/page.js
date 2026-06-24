'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [pm, setPm] = useState({ visa: true, paypal: true, cash: true, applepay: false });
  const toggle = (k) => setPm((s) => ({ ...s, [k]: !s[k] }));

  return (
    <>
      <div className="dash-top">
        <div><h1>Settings</h1><div className="sub">Global platform configuration</div></div>
        <div className="right">
          {saved && <span className="pill2 green">Saved</span>}
          <button className="d-btn primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1800); }}>Save changes</button>
        </div>
      </div>

      <div className="panel">
        <h2>Business</h2>
        <div className="desc">Company details shown across the site</div>
        <div className="form-grid">
          <div className="field"><label>Business name</label><input defaultValue="Tourivo" /></div>
          <div className="field"><label>Support WhatsApp</label><input defaultValue="+20 100 611 0456" /></div>
          <div className="field"><label>Business hours</label><input placeholder="e.g. Sun–Sat, 08:00–22:00" /></div>
          <div className="field"><label>Support email</label><input placeholder="support@yourdomain.com" /></div>
        </div>
      </div>

      <div className="panel">
        <h2>Pricing & tax</h2>
        <div className="desc">Currency and tax applied at checkout</div>
        <div className="form-grid">
          <div className="field"><label>Default currency</label>
            <select defaultValue="EGP"><option>EGP</option><option>USD</option><option>EUR</option></select>
          </div>
          <div className="field"><label>Display currency (storefront)</label>
            <select defaultValue="USD"><option>USD</option><option>EGP</option><option>EUR</option></select>
          </div>
          <div className="field"><label>Tax rate (%)</label><input type="number" placeholder="0" /></div>
          <div className="field"><label>Service fee (%)</label><input type="number" placeholder="0" /></div>
        </div>
      </div>

      <div className="panel">
        <h2>Payment methods</h2>
        <div className="desc">Enabled options for bookings</div>
        <div className="form-grid">
          <label className="chk"><input type="checkbox" checked={pm.visa} onChange={() => toggle('visa')} /> Visa / Mastercard</label>
          <label className="chk"><input type="checkbox" checked={pm.paypal} onChange={() => toggle('paypal')} /> PayPal</label>
          <label className="chk"><input type="checkbox" checked={pm.cash} onChange={() => toggle('cash')} /> Cash on arrival</label>
          <label className="chk"><input type="checkbox" checked={pm.applepay} onChange={() => toggle('applepay')} /> Apple Pay</label>
        </div>
      </div>

      <div className="panel">
        <h2>Booking policy</h2>
        <div className="desc">Defaults applied to new activities</div>
        <div className="form-grid">
          <div className="field"><label>Free cancellation window</label>
            <select defaultValue="24 hours"><option>24 hours</option><option>48 hours</option><option>No free cancellation</option></select>
          </div>
          <div className="field"><label>Booking mode</label>
            <select defaultValue="Book now, pay later"><option>Book now, pay later</option><option>Pay online required</option></select>
          </div>
        </div>
      </div>

      <p className="sub" style={{ marginTop: '-.4rem' }}>Note: this is a preview form. Saving will persist once a backend is connected.</p>
    </>
  );
}
