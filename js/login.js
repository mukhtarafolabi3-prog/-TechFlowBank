
// ========================================
// TECHFLOW BANK LOGIN
// ========================================


const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"

        ? "http://localhost:3000"

        : "https://techflow-banking-backend.vercel.app";



// ========================================
// DOM
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


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
        // PASSWORD TOGGLE
        // ========================================

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



        // ========================================
        // CLEAR ERRORS
        // ========================================

        function clearErrors() {

            emailError.textContent = "";

            passwordError.textContent = "";

            formMessage.textContent = "";

            formMessage.className =
                "form-message";

        }



        // ========================================
        // SHOW MESSAGE
        // ========================================

        function showMessage(
            message,
            type = "error"
        ) {

            formMessage.textContent =
                message;

            formMessage.className =
                "form-message " + type;

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

        loginForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                clearErrors();



                const email =
                    emailInput.value
                        .trim()
                        .toLowerCase();


                const password =
                    passwordInput.value;



                // ========================================
                // VALIDATION
                // ========================================

                let hasError = false;


                if (!email) {

                    emailError.textContent =
                        "Email address is required.";

                    hasError = true;

                }


                if (!password) {

                    passwordError.textContent =
                        "Password is required.";

                    hasError = true;

                }


                if (hasError) {

                    return;

                }



                // ========================================
                // BUTTON
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
                        "LOGIN API:",
                        `${API_URL}/api/auth/login`
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

                                body:
                                    JSON.stringify({
                                        email,
                                        password
                                    })

                            }
                        );



                    // ========================================
                    // READ RESPONSE
                    // ========================================

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

                        resetButton();

                        return;

                    }



                    // ========================================
                    // USER MUST EXIST
                    // ========================================

                    if (!data.user) {

                        console.error(
                            "Backend did not return user:",
                            data
                        );

                        showMessage(
                            "Login succeeded but user data was not returned.",
                            "error"
                        );

                        resetButton();

                        return;

                    }



                    // ========================================
                    // USER
                    // ========================================

                    const user =
                        data.user;



                    console.log(
                        "Logged in user:",
                        user
                    );



                    // ========================================
                    // SAVE USER
                    // ========================================

                    localStorage.setItem(
                        "techflowUser",
                        JSON.stringify(user)
                    );



                    // ========================================
                    // SAVE TOKEN IF BACKEND RETURNS ONE
                    // ========================================

                    if (data.token) {

                        localStorage.setItem(
                            "techflowToken",
                            data.token
                        );

                    } else {

                        localStorage.removeItem(
                            "techflowToken"
                        );

                    }



                    // ========================================
                    // REMEMBER ME
                    // ========================================

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

                    setTimeout(
                        () => {

                            window.location.href =
                                "dashboard.html";

                        },
                        700
                    );

                } catch (error) {

                    console.error(
                        "LOGIN ERROR:",
                        error
                    );


                    showMessage(
                        "Unable to connect to the server.",
                        "error"
                    );


                    resetButton();

                }

            }
        );

    }
);
