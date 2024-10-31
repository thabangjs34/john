// Toggle password visibility
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

// Register function
function register(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (localStorage.getItem(email)) {
        alert('This email is already registered!');
    } else {
        localStorage.setItem(email, password);
        alert('Registration successful! You can now log in.');
        window.location.href = 'index.html';
    }
}

// Login function
function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedPassword = localStorage.getItem(email);
    if (storedPassword === password) {
        alert('Login successful!');
        // Redirect to home.html
        window.location.href = 'home.html';
    } else {
        alert('Invalid email or password.');
    }
}


// Reset Password function
function resetPassword(event) {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;

    if (localStorage.getItem(email)) {
        const newPassword = prompt('Enter your new password:');
        localStorage.setItem(email, newPassword);
        alert('Password reset successful! You can now log in with your new password.');
        window.location.href = 'index.html';
    } else {
        alert('Email not found.');
    }
}
