const form = document.getElementById('expenseForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Saving...';

  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbx0oYca9Sp_ECczIxPK0UG7kl-5hSLYBToGmB_GhocWhQNRxOGK1M83wJUeu9LmGQ5GcA/exec", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await res.json();

    if (result.status === 'success') {
      status.textContent = '✅ Saved!';
      form.reset();
    } else {
      status.textContent = '❌ Failed to save.';
    }
  } catch (err) {
    status.textContent = '⚠️ Error: ' + err.message;
  }
});
