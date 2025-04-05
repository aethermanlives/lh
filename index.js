// pages/index.js – Full Next.js app for Launch Horse form (ready for Vercel deploy)

import { useState } from 'react';

export default function LaunchHorseForm() {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('Other');
  const [companyType, setCompanyType] = useState('LLC');
  const [resellerCert, setResellerCert] = useState(false);
  const [einSpeed, setEINSpeed] = useState('standard');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let stripeURL = 'https://buy.stripe.com/test_default';

    if (einSpeed === 'expedited' && resellerCert) {
      stripeURL = 'https://buy.stripe.com/test_outcome_D';
    } else if (einSpeed === 'expedited') {
      stripeURL = 'https://buy.stripe.com/test_outcome_C';
    } else if (resellerCert) {
      stripeURL = 'https://buy.stripe.com/test_outcome_B';
    } else {
      stripeURL = 'https://buy.stripe.com/test_outcome_A';
    }

    window.location.href = stripeURL;
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Launch Horse: U.S. Company Formation</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          What country do you reside in?
          <select value={country} onChange={(e) => setCountry(e.target.value)} required>
            <option>China</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>India</option>
            <option>Brazil</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Email Address
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Company Name (desired)
          <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </label>

        <label>
          Company Type
          <select value={companyType} onChange={(e) => setCompanyType(e.target.value)} required>
            <option value="LLC">LLC</option>
            <option value="C-Corp">C-Corp</option>
          </select>
        </label>

        <fieldset>
          <legend>Planning to sell goods?</legend>
          <label>
            <input type="radio" name="reseller" checked={resellerCert} onChange={() => setResellerCert(true)} />
            Yes — Include Reseller Certificate & Sales Tax Registration (+$199)
          </label>
          <label>
            <input type="radio" name="reseller" checked={!resellerCert} onChange={() => setResellerCert(false)} />
            No, Thanks
          </label>
        </fieldset>

        <fieldset>
          <legend>EIN Processing Speed</legend>
          <label>
            <input type="radio" name="einspeed" checked={einSpeed === 'expedited'} onChange={() => setEINSpeed('expedited')} />
            Expedited (+$300)
          </label>
          <label>
            <input type="radio" name="einspeed" checked={einSpeed === 'standard'} onChange={() => setEINSpeed('standard')} />
            Standard (+$49)
          </label>
        </fieldset>

        <label>
          Anything else we should know?
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
        </label>

        <button type="submit" style={{ backgroundColor: 'black', color: 'white', padding: '0.75rem', borderRadius: '4px' }}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
