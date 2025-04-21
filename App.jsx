import React, { useState } from 'react';

const initialForm = {
  date: new Date().toISOString().slice(0, 10),
  amount: '',
  currency: 'AED',
  type: 'Expense',
  account: '',
  category: '',
  description: '',
  loanTag: ''
};

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0oYca9Sp_ECczIxPK0UG7kl-5hSLYBToGmB_GhocWhQNRxOGK1M83wJUeu9LmGQ5GcA/exec';

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setSuccess(true);
        setForm(initialForm);
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">💸 Add Transaction</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" type="date" name="date" value={form.date} onChange={handleChange} />
          <input className="input" type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
          <select className="input" name="currency" value={form.currency} onChange={handleChange}>
            <option>AED</option>
            <option>INR</option>
          </select>
          <select className="input" name="type" value={form.type} onChange={handleChange}>
            <option>Expense</option>
            <option>Income</option>
            <option>EMI</option>
            <option>Transfer</option>
          </select>
          <input className="input" name="account" placeholder="Account/Card" value={form.account} onChange={handleChange} />
          <input className="input" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <input className="input" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input className="input" name="loanTag" placeholder="Loan Tag (optional)" value={form.loanTag} onChange={handleChange} />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl" disabled={loading}>
            {loading ? 'Saving...' : 'Save Transaction'}
          </button>

          {success === true && <p className="text-green-600 text-center">✅ Saved!</p>}
          {success === false && <p className="text-red-600 text-center">❌ Failed. Try again.</p>}
        </form>
      </div>
    </div>
  );
}
