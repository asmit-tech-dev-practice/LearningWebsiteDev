let users = {
    "user1@gmail.com": "password123",
    "user2@gmail.com": "password12",
    "user3@gmail.com": "password1234"
};

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('message');

    if (users[email] && users[email] === password) {
        msg.style.color = 'green';
        msg.textContent = "Login successful!";
    } else {
        msg.style.color = 'red';
        msg.textContent = "Invalid email or password.";
    }
}
