document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Retrieve values from the form
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Perform GraphQL queries or other client-side logic
        // For simplicity, we'll just log the values here
        console.log("Username:", username);
        console.log("Password:", password);
    });
});
