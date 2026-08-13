const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(
            "http://localhost:3000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            loginMessage.textContent = data.message || "Login failed";
            return;
        }

        // Save user information
        localStorage.setItem("user", JSON.stringify(data.user));

        loginMessage.textContent = "Login successful!";

        // Go to dashboard
        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Login error:", error);
        loginMessage.textContent =
            "Unable to connect to the server.";
    }
});