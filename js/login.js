
// =====================================================
// TECHFLOW BANK LOGIN
// =====================================================



// =====================================================
// DOM READY
// =====================================================

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


    // =====================================================
    // PASSWORD TOGGLE
    // =====================================================

    if (passwordToggle) {

        passwordToggle.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                passwordToggle.innerHTML =
                    `<i class="fa-regular fa-eye-slash"></i>`;

            } else {

                passwordInput.type = "password";

                passwordToggle.innerHTML =
                    `<i class="fa-regular fa-eye"></i>`;

            }

        });

    }


    // =====================================================
    // MESSAGE
    // =====================================================

    function showMessage(message, type = "error") {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.className =
            `form-message ${type}`;

    }


    // =====================================================
    // CLEAR ERRORS
    // =====================================================

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


    // =====================================================
    // RESET BUTTON
    // =====================================================

    function resetButton() {

        if (!loginBtn) return;

        loginBtn.disabled = false;

        loginBtn.innerHTML = `
            <span>Sign In</span>
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }


    // =====================================================
    // LOGIN
    // =====================================================

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearErrors();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            // =================================================
            // VALIDATION
            // =================================================

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


            // =================================================
            // BUTTON
            // =================================================

            loginBtn.disabled = true;

            loginBtn.innerHTML = `
                <span>Signing in...</span>
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;


            try {

                console.log(
                    "Sending login request to:",
                    `${API_URL}/api/auth/login`
                );


                // =================================================
                // REQUEST
                // =================================================

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
                                email,
                                password
                            })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "LOGIN RESPONSE:",
                    data
                );


                // =================================================
                // LOGIN FAILED
                // =================================================

                if (!response.ok) {

                    showMessage(
                        data.message ||
                        "Invalid email or password.",
                        "error"
                    );

                    resetButton();

                    return;

                }


                // =================================================
                // USER CHECK
                // =================================================

                if (!data.user) {

                    console.error(
                        "User missing from response:",
                        data
                    );

                    showMessage(
                        "Login succeeded but user information was not returned.",
                        "error"
                    );

                    resetButton();

                    return;

                }


                const user =
                    data.user;


                // =================================================
                // CLEAR OLD LOGIN DATA
                // =================================================

                localStorage.removeItem("userId");
                localStorage.removeItem("firstName");
                localStorage.removeItem("lastName");
                localStorage.removeItem("email");
                localStorage.removeItem("accountNumber");
                localStorage.removeItem("accountType");
                localStorage.removeItem("balance");
                localStorage.removeItem("currency");
                localStorage.removeItem("token");


                // =================================================
                // SAVE USER
                // =================================================

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
                    "accountNumber",
                    user.account_number || ""
                );


                localStorage.setItem(
                    "accountType",
                    user.account_type || ""
                );


                localStorage.setItem(
                    "balance",
                    String(user.balance || 0)
                );


                localStorage.setItem(
                    "currency",
                    "NGN"
                );


                // =================================================
                // SAVE TOKEN IF BACKEND RETURNS ONE
                // =================================================

                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                }


                // =================================================
                // ALSO SAVE COMPLETE USER
                // =================================================

                localStorage.setItem(
                    "techflowUser",
                    JSON.stringify(user)
                );


                console.log(
                    "LOGIN DATA SAVED:",
                    {
                        userId: user.id,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        accountNumber: user.account_number,
                        accountType: user.account_type,
                        balance: user.balance,
                        token: data.token
                    }
                );


                // =================================================
                // SUCCESS
                // =================================================

                showMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                // =================================================
                // REDIRECT
                // =================================================

                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 500);

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

});
