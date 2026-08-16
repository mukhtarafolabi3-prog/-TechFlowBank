
// =====================================================
// TECHFLOW DYNAMIC BANK
// LOGIN JAVASCRIPT
// =====================================================


// =====================================================
// API URL
// =====================================================

const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://techflow-banking-backend-ffmn.vercel.app";


// =====================================================
// DOM READY
// =====================================================

document.addEventListener("DOMContentLoaded", () => {


    // =================================================
    // GET ELEMENTS
    // =================================================

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

    const rememberMe =
        document.getElementById("rememberMe");


    // =================================================
    // CHECK LOGIN FORM
    // =================================================

    if (!loginForm) {

        console.error(
            "loginForm was not found."
        );

        return;

    }


    // =================================================
    // PASSWORD SHOW / HIDE
    // =================================================

    if (
        passwordToggle &&
        passwordInput
    ) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const icon =
                    passwordToggle.querySelector("i");


                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";


                    if (icon) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );

                    }

                } else {

                    passwordInput.type =
                        "password";


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


    // =================================================
    // CLEAR ERRORS
    // =================================================

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


    // =================================================
    // SHOW MESSAGE
    // =================================================

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


    // =================================================
    // VALIDATE EMAIL
    // =================================================

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    // =================================================
    // RESET LOGIN BUTTON
    // =================================================

    function resetLoginButton() {

        if (!loginBtn) {

            return;

        }


        loginBtn.disabled =
            false;


        loginBtn.innerHTML = `
            <span>Sign In</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }


    // =================================================
    // LOGIN BUTTON LOADING
    // =================================================

    function loadingLoginButton() {

        if (!loginBtn) {

            return;

        }


        loginBtn.disabled =
            true;


        loginBtn.innerHTML = `
            <span>Signing in...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;

    }


    // =================================================
    // SAVE USER DATA
    // =================================================

    function saveUserData(
        user,
        token
    ) {

        // ---------------------------------------------
        // Remove old login information
        // ---------------------------------------------

        localStorage.removeItem(
            "techflowUser"
        );


        localStorage.removeItem(
            "userId"
        );


        localStorage.removeItem(
            "firstName"
        );


        localStorage.removeItem(
            "lastName"
        );


        localStorage.removeItem(
            "email"
        );


        localStorage.removeItem(
            "accountNumber"
        );


        localStorage.removeItem(
            "accountType"
        );


        localStorage.removeItem(
            "accountName"
        );


        localStorage.removeItem(
            "balance"
        );


        localStorage.removeItem(
            "currency"
        );


        localStorage.removeItem(
            "token"
        );


        // ---------------------------------------------
        // Save complete user object
        // ---------------------------------------------

        localStorage.setItem(
            "techflowUser",
            JSON.stringify(user)
        );


        // ---------------------------------------------
        // Save individual values
        // ---------------------------------------------

        if (user.id !== undefined) {

            localStorage.setItem(
                "userId",
                String(user.id)
            );

        }


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
            "accountNumber",
            user.account_number || ""
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
            "balance",
            String(
                user.balance ?? 0
            )
        );


        localStorage.setItem(
            "currency",
            user.currency || "NGN"
        );


        // ---------------------------------------------
        // Save token
        // ---------------------------------------------

        if (token) {

            localStorage.setItem(
                "token",
                token
            );

        }

    }


    // =================================================
    // SUBMIT LOGIN
    // =================================================

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            clearErrors();


            // -----------------------------------------
            // GET VALUES
            // -----------------------------------------

            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            // -----------------------------------------
            // VALIDATION
            // -----------------------------------------

            let hasError =
                false;


            if (!email) {

                if (emailError) {

                    emailError.textContent =
                        "Email address is required.";

                }

                hasError =
                    true;

            } else if (
                !isValidEmail(email)
            ) {

                if (emailError) {

                    emailError.textContent =
                        "Enter a valid email address.";

                }

                hasError =
                    true;

            }


            if (!password) {

                if (passwordError) {

                    passwordError.textContent =
                        "Password is required.";

                }

                hasError =
                    true;

            }


            if (hasError) {

                return;

            }


            // -----------------------------------------
            // BUTTON LOADING
            // -----------------------------------------

            loadingLoginButton();


            // -----------------------------------------
            // DEBUG
            // -----------------------------------------

            console.log(
                "================================"
            );

            console.log(
                "TECHFLOW LOGIN"
            );

            console.log(
                "API:",
                API_URL
            );

            console.log(
                "Email:",
                email
            );

            console.log(
                "================================"
            );


            // =================================================
            // SEND REQUEST
            // =================================================

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/auth/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    email:
                                        email,

                                    password:
                                        password
                                })
                        }
                    );


                // ---------------------------------------------
                // GET RESPONSE
                // ---------------------------------------------

                let data;


                try {

                    data =
                        await response.json();

                } catch (jsonError) {

                    console.error(
                        "Invalid JSON response:",
                        jsonError
                    );


                    showMessage(
                        `Server returned an invalid response. HTTP ${response.status}`,
                        "error"
                    );


                    resetLoginButton();

                    return;

                }


                // ---------------------------------------------
                // DEBUG RESPONSE
                // ---------------------------------------------

                console.log(
                    "LOGIN HTTP STATUS:",
                    response.status
                );


                console.log(
                    "LOGIN RESPONSE:",
                    data
                );


                // =================================================
                // LOGIN FAILED
                // =================================================

                if (
                    !response.ok ||
                    data.success === false
                ) {


                    // -----------------------------------------
                    // Database error
                    // -----------------------------------------

                    if (
                        data.message ===
                        "Database error"
                    ) {

                        console.error(
                            "DATABASE ERROR:",
                            data.error
                        );


                        console.error(
                            "DATABASE ERROR CODE:",
                            data.code
                        );


                        let databaseMessage =
                            "Database error. Please check the backend.";

                        if (data.error) {

                            databaseMessage =
                                `Database error: ${data.error}`;

                        }


                        showMessage(
                            databaseMessage,
                            "error"
                        );


                    } else {

                        showMessage(
                            data.message ||
                            "Invalid email or password.",
                            "error"
                        );

                    }


                    resetLoginButton();

                    return;

                }


                // =================================================
                // CHECK USER
                // =================================================

                if (!data.user) {

                    console.error(
                        "No user returned:",
                        data
                    );


                    showMessage(
                        "Login succeeded, but no user information was returned.",
                        "error"
                    );


                    resetLoginButton();

                    return;

                }


                // =================================================
                // USER DATA
                // =================================================

                const user =
                    data.user;


                console.log(
                    "LOGGED-IN USER:",
                    user
                );


                // =================================================
                // SAVE LOGIN DATA
                // =================================================

                saveUserData(
                    user,
                    data.token
                );


                // =================================================
                // REMEMBER ME
                // =================================================

                if (
                    rememberMe &&
                    rememberMe.checked
                ) {

                    localStorage.setItem(
                        "techflowRememberMe",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "techflowRememberMe"
                    );

                }


                // =================================================
                // CHECK SAVED DATA
                // =================================================

                console.log(
                    "USER ID:",
                    localStorage.getItem(
                        "userId"
                    )
                );


                console.log(
                    "ACCOUNT NUMBER:",
                    localStorage.getItem(
                        "accountNumber"
                    )
                );


                console.log(
                    "BALANCE:",
                    localStorage.getItem(
                        "balance"
                    )
                );


                console.log(
                    "TOKEN:",
                    localStorage.getItem(
                        "token"
                    )
                );


                // =================================================
                // SUCCESS MESSAGE
                // =================================================

                showMessage(
                    "Login successful. Opening dashboard...",
                    "success"
                );


                // =================================================
                // REDIRECT
                // =================================================

                setTimeout(
                    () => {

                        window.location.href =
                            "dashboard.html";

                    },
                    700
                );

            } catch (error) {

                // =================================================
                // CONNECTION ERROR
                // =================================================

                console.error(
                    "LOGIN CONNECTION ERROR:",
                    error
                );


                showMessage(
                    "Unable to connect to the server. Please check your internet connection or backend.",
                    "error"
                );


                resetLoginButton();

            }

        }
    );

});
