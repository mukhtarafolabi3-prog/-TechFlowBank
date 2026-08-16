const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const formMessage = document.getElementById("formMessage");
    const loginBtn = document.getElementById("loginBtn");

    const passwordToggle =
        document.getElementById("passwordToggle");


    // Password visibility
    if (passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordToggle.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

            } else {

                passwordInput.type = "password";

                passwordToggle.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';
            }

        });
    }


    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        // Clear previous messages
        emailError.textContent = "";
        passwordError.textContent = "";
        formMessage.textContent = "";


        const email = emailInput.value.trim();
        const password = passwordInput.value;


        // Validation
        if (!email) {

            emailError.textContent =
                "Please enter your email address.";

            return;
        }


        if (!password) {

            passwordError.textContent =
                "Please enter your password.";

            return;
        }


        // Disable button
        loginBtn.disabled = true;

        loginBtn.querySelector("span").textContent =
            "Signing in...";


        try {

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                formMessage.textContent =
                    data.message || "Login failed.";

                return;
            }


            // Save logged-in user
            localStorage.setItem(
                "techflowUser",
                JSON.stringify(data.user)
            );


            // Success
            formMessage.textContent =
                "Login successful!";


            // Redirect
            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 500);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            formMessage.textContent =
                "Unable to connect to the server.";

        } finally {

            loginBtn.disabled = false;

            loginBtn.querySelector("span").textContent =
                "Sign In";
        }

    });

});