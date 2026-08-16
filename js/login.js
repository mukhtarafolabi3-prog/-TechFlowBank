
// ========================================
// TECHFLOW BANK LOGIN
// ========================================

// Local backend when developing on your computer
// Deployed backend when using the Vercel website

const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://techflow-banking-backend.vercel.app";


// ========================================
// DOM READY
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const loginBtn =
        document.getElementById("loginBtn");

    const formMessage =
        document.getElementById("formMessage");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");


    // ========================================
    // PASSWORD SHOW / HIDE
    // ========================================

    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const icon =
                    passwordToggle.querySelector("i");

                if (passwordInput.type === "password") {

                    passwordInput.type = "text";

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );

                    }

                } else {

                    passwordInput.type = "password";

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );

                    }

                }

            }
        );

    }


    // ========================================
    // CLEAR ERRORS
    // ========================================

    function clearErrors() {

        if (emailError) {
            emailError.textContent = "";
        }

        if (passwordError) {
            passwordError.textContent = "";
        }

        if (formMessage) {

            formMessage.textContent = "";

            formMessage.className =
                "form-message";

        }

    }


    // ========================================
    // SHOW MESSAGE
    // ========================================

    function showMessage(
        message,
        type = "error"
    ) {

        if (!formMessage) {
            return;
        }

        formMessage.textContent =
            message;

        formMessage.className =
            `form-message ${type}`;

    }


    // ========================================
    // VALIDATE EMAIL
    // ========================================

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    // ========================================
    // CHECK FORM
    // ========================================

    if (!loginForm) {

        console.error(
            "loginForm not found"
        );

        return;

    }


    // ========================================
    // LOGIN
    // ========================================

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearErrors();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const rememberMe =
                document.getElementById(
                    "rememberMe"
                )?.checked || false;


            // ========================================
            // VALIDATION
            // ========================================

            let hasError = false;


            if (!email) {

                if (emailError) {

                    emailError.textContent =
                        "Email address is required.";

                }

                hasError = true;

            } else if (!isValidEmail(email)) {

                if (emailError) {

                    emailError.textContent =
                        "Enter a valid email address.";

                }

                hasError = true;

            }


            if (!password) {

                if (passwordError) {

                    passwordError.textContent =
                        "Password is required.";

                }

                hasError = true;

            }


            if (hasError) {
                return;
            }


            // ========================================
            // DISABLE BUTTON
            // ========================================

            if (loginBtn) {

                loginBtn.disabled = true;

                loginBtn.innerHTML = `
                    <span>Signing in...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;

            }


            // ========================================
            // SEND LOGIN REQUEST
            // ========================================

            try {

                console.log(
                    "Connecting to:",
                    API_URL
                );


                const response =
                    await fetch(
                        `${API_URL}/api/auth/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Login response:",
                    data
                );


                // ========================================
                // LOGIN FAILED
                // ========================================

                if (!response.ok) {

                    showMessage(
                        data.message ||
                        "Invalid email or password.",
                        "error"
                    );

                    resetLoginButton();

                    return;

                }


                // ========================================
                // CHECK USER
                // ========================================

                if (!data.user) {

                    showMessage(
                        "Login succeeded but user information was not returned.",
                        "error"
                    );

                    console.error(
                        "No user returned:",
                        data
                    );

                    resetLoginButton();

                    return;

                }


                // ========================================
                // NORMALIZE USER DATA
                // ========================================

                const user =
                    data.user;


                const firstName =
                    user.first_name ||
                    user.firstName ||
                    "";

                const lastName =
                    user.last_name ||
                    user.lastName ||
                    "";


                // Make sure the dashboard receives
                // the correct customer name.

                user.first_name =
                    firstName;

                user.last_name =
                    lastName;


                // ========================================
                // SAVE USER
                // ========================================

                localStorage.setItem(
                    "techflowUser",
                    JSON.stringify(user)
                );


                // ========================================
                // SAVE TOKEN
                // ========================================

                if (data.token) {

                    localStorage.setItem(
                        "techflowToken",
                        data.token
                    );

                }


                // ========================================
                // REMEMBER ME
                // ========================================

                if (rememberMe) {

                    localStorage.setItem(
                        "techflowRememberMe",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "techflowRememberMe"
                    );

                }


                // ========================================
                // SUCCESS
                // ========================================

                showMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                // ========================================
                // REDIRECT
                // ========================================

                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 800);

            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                showMessage(
                    "Unable to connect to the server. Make sure your backend is online.",
                    "error"
                );

                resetLoginButton();

            }

        }
    );


    // ========================================
    // RESET LOGIN BUTTON
    // ========================================

    function resetLoginButton() {

        if (!loginBtn) {
            return;
        }

        loginBtn.disabled = false;

        loginBtn.innerHTML = `
            <span>Sign In</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }

});
