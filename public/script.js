document.getElementById('nameForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
  
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
  
    const result = await response.json();
    document.getElementById('response').textContent = result.message;
  });
  