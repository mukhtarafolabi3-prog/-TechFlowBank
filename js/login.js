// ========================================
// TECHFLOW BANK LOGIN
// ========================================

const API_URL = "http://localhost:3000";


// ========================================
// DOM READY
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordToggle = document.getElementById("passwordToggle");
    const loginBtn = document.getElementById("loginBtn");
    const formMessage = document.getElementById("formMessage");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const rememberMe = document.getElementById("rememberMe");


    // ========================================
    // CHECK FORM
    // ========================================

    if (!loginForm) {
        console.error("loginForm not found");
        return;
    }


    // ========================================
    // PASSWORD SHOW / HIDE
    // ========================================

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


    // ========================================
    // CLEAR ERRORS
    // ========================================

    function clearErrors() {

        emailError.textContent = "";
        passwordError.textContent = "";

        formMessage.textContent = "";
        formMessage.className = "form-message";

    }


    // ========================================
    // SHOW MESSAGE
    // ========================================

    function showMessage(message, type = "error") {

        formMessage.textContent = message;

        formMessage.className =
            `form-message ${type}`;

    }


    // ========================================
    // RESET BUTTON
    // ========================================

    function resetButton() {

        loginBtn.disabled = false;

        loginBtn.innerHTML = `
            <span>Sign In</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }


    // ========================================
    // LOGIN
    // ========================================

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        clearErrors();


        const email = emailInput.value.trim();
        const password = passwordInput.value;


        // ========================================
        // VALIDATION
        // ========================================

        if (!email) {

            emailError.textContent =
                "Email address is required.";

            return;

        }


        if (!password) {

            passwordError.textContent =
                "Password is required.";

            return;

        }


        // ========================================
        // BUTTON LOADING
        // ========================================

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <span>Signing in...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;


        // ========================================
        // SEND REQUEST
        // ========================================

        try {

            console.log(
                "Sending login request to:",
                `${API_URL}/api/auth/login`
            );


            const response = await fetch(
                `${API_URL}/api/auth/login`,
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


            console.log(
                "Login response:",
                data
            );


            // ========================================
            // LOGIN ERROR
            // ========================================

            if (!response.ok || !data.success) {

                showMessage(
                    data.message ||
                    "Invalid email or password.",
                    "error"
                );

                resetButton();

                return;

            }


            // ========================================
            // CHECK USER
            // ========================================

            if (!data.user) {

                console.error(
                    "Backend did not return user:",
                    data
                );

                showMessage(
                    "Login succeeded but user information was not returned.",
                    "error"
                );

                resetButton();

                return;

            }


            const user = data.user;


            // ========================================
            // SAVE USER
            // ========================================

            localStorage.setItem(
                "techflowUser",
                JSON.stringify(user)
            );


            // ========================================
            // SAVE INDIVIDUAL USER DATA
            // ========================================

            localStorage.setItem(
                "userId",
                String(user.id)
            );

            localStorage.setItem(
                "firstName",
                user.first_name || ""
            );

            localStorage.setItem(
                "lastName",
                user.last_name || ""
            );

            localStorage.setItem(
                "email",
                user.email || ""
            );

            localStorage.setItem(
                "phone",
                user.phone || ""
            );

            localStorage.setItem(
                "dateOfBirth",
                user.date_of_birth || ""
            );

            localStorage.setItem(
                "gender",
                user.gender || ""
            );

            localStorage.setItem(
                "accountType",
                user.account_type || ""
            );

            localStorage.setItem(
                "accountName",
                user.account_name || ""
            );

            localStorage.setItem(
                "accountNumber",
                user.account_number || ""
            );

            localStorage.setItem(
                "balance",
                user.balance || "0.00"
            );


            // ========================================
            // REMEMBER ME
            // ========================================

            if (rememberMe && rememberMe.checked) {

                localStorage.setItem(
                    "rememberMe",
                    "true"
                );

            } else {

                localStorage.removeItem(
                    "rememberMe"
                );

            }


            // ========================================
            // SUCCESS
            // ========================================

            showMessage(
                "Login successful. Redirecting...",
                "success"
            );


            console.log(
                "User saved:",
                user
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
                "LOGIN FETCH ERROR:",
                error
            );


            showMessage(
                "Unable to connect to the backend. Make sure your backend server is running.",
                "error"
            );


            resetButton();

        }

    });

});