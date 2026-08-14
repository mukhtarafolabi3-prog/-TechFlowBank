const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("formMessage");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const loginBtn = document.getElementById("loginBtn");

    // Basic validation
    if (!email || !password) {
        loginMessage.textContent = "Please enter your email and password.";
        loginMessage.className = "form-message error";
        return;
    }

    try {
        // Disable button while logging in
        loginBtn.disabled = true;
        loginBtn.querySelector("span").textContent = "Signing in...";

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
            loginMessage.textContent =
                data.message || "Invalid email or password.";

            loginMessage.className = "form-message error";

            return;
        }

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(data.user));

        loginMessage.textContent = "Login successful!";
        loginMessage.className = "form-message success";

        // Go to dashboard
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);

    } catch (error) {
        console.error("Login error:", error);

        loginMessage.textContent =
            "Unable to connect to the server. Make sure your backend is running.";

        loginMessage.className = "form-message error";

    } finally {
        loginBtn.disabled = false;
        loginBtn.querySelector("span").textContent = "Sign In";
    }
});