import React, { useState } from 'react';

const currencyOptions = ['AED', 'INR'];
const typeOptions = ['Expense', 'Income', 'EMI', 'Transfer'];
const accountOptions = ['ADCB Credit Card', 'HDFC Bank', 'Cash', 'ICICI Loan'];
const categoryOptions = ['Grocery', 'Bills', 'Dining', 'Fuel', 'Transfer', 'EMI'];

export default function App() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    currency: 'AED',
    type: 'Expense',
    account: '',
    category: '',
    description: '',
    loanTag: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', form);
    // TODO: Send to Excel backend
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Entry</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-2xl shadow-md space-y-4"
      >
        <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="input" />
        
        <select name="currency" value={form.currency} onChange={handleChange} className="input">
          {currencyOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <select name="type" value={form.type} onChange={handleChange} className="input">
          {typeOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <select name="account" value={form.account} onChange={handleChange} className="input">
          <option value="">Select Account</option>
          {accountOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <select name="category" value={form.category} onChange={handleChange} className="input">
          <option value="">Select Category</option>
          {categoryOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>

        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" />

        <input type="text" name="loanTag" placeholder="Loan Tag (optional)" value={form.loanTag} onChange={handleChange} className="input" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl">Save</button>
      </form>
    </div>
  );
}
