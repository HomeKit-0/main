let users = {};

document.addEventListener('DOMContentLoaded', function() {
  fetch('/users.json')
    .then(response => response.json())
    .then(data => {
      users = data;
      const userSelect = document.getElementById('username');
      for (const user in users) {
        let option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        userSelect.appendChild(option);
      }
    });
});

function buyItem(item, cost) {
  const currentUser = "alice"; // Replace with actual login logic
  if (users[currentUser].points >= cost) {
    users[currentUser].points -= cost;
    document.getElementById('points').textContent = users[currentUser].points;
    alert(`Purchased ${item} for ${cost} points`);
    updateUsers(); // Call backend API to update the users.json
  } else {
    alert("Not enough points!");
  }
}

function login(event) {
  event.preventDefault();
  const password = document.getElementById('admin-password').value;
  if (password === 'admin123') {
    document.getElementById('admin-login-form').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
  } else {
    alert("Incorrect password!");
  }
}

function updatePoints() {
  const username = document.getElementById('username').value;
  const newPoints = parseInt(document.getElementById('points').value, 10);
  if (users[username]) {
    users[username].points = newPoints;
    alert(`Updated ${username}'s points to ${newPoints}`);
    updateUsers();
  }
}

function updateUsers() {
  fetch('/api/updateUsers.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users)
  });
}
