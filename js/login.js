const API_URL = "http://localhost:3000";


// ==================================================
// LOGIN FORM
// ==================================================

const loginForm = document.getElementById("loginForm");

const loginBtn = document.getElementById("loginBtn");

const formMessage =
    document.getElementById("formMessage");

const passwordToggle =
    document.getElementById("passwordToggle");

const password =
    document.getElementById("password");


// ==================================================
// PASSWORD SHOW / HIDE
// ==================================================

if (passwordToggle && password) {

    passwordToggle.addEventListener(
        "click",
        () => {

            if (password.type === "password") {

                password.type = "text";

                passwordToggle.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                password.type = "password";

                passwordToggle.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );

}


// ==================================================
// SHOW MESSAGE
// ==================================================

function showMessage(message, type = "error") {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;

    formMessage.className =
        `form-message ${type}`;

}


// ==================================================
// CLEAR ERRORS
// ==================================================

function clearErrors() {

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");


    if (emailError) {
        emailError.textContent = "";
    }


    if (passwordError) {
        passwordError.textContent = "";
    }


    showMessage("");

}


// ==================================================
// LOGIN
// ==================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            clearErrors();


            // ------------------------------------------
            // GET FORM VALUES
            // ------------------------------------------

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const passwordValue =
                document
                    .getElementById("password")
                    .value;


            const rememberMe =
                document
                    .getElementById("rememberMe")
                    ?.checked || false;


            // ------------------------------------------
            // VALIDATION
            // ------------------------------------------

            if (!email) {

                const emailError =
                    document.getElementById(
                        "emailError"
                    );

                if (emailError) {
                    emailError.textContent =
                        "Please enter your email address.";
                }

                return;
            }


            if (!email.includes("@")) {

                const emailError =
                    document.getElementById(
                        "emailError"
                    );

                if (emailError) {
                    emailError.textContent =
                        "Please enter a valid email address.";
                }

                return;
            }


            if (!passwordValue) {

                const passwordError =
                    document.getElementById(
                        "passwordError"
                    );

                if (passwordError) {
                    passwordError.textContent =
                        "Please enter your password.";
                }

                return;
            }


            // ------------------------------------------
            // DISABLE BUTTON
            // ------------------------------------------

            if (loginBtn) {

                loginBtn.disabled = true;

                loginBtn.innerHTML = `
                    <span>Signing in...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;

            }


            // ------------------------------------------
            // DATA
            // ------------------------------------------

            const loginData = {

                email: email,

                password: passwordValue

            };


            console.log(
                "Login data:",
                {
                    email: email,
                    password: "********"
                }
            );


            // ------------------------------------------
            // SEND TO BACKEND
            // ------------------------------------------

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
                                JSON.stringify(
                                    loginData
                                )

                        }
                    );


                // --------------------------------------
                // READ RESPONSE
                // --------------------------------------

                const data =
                    await response.json();


                console.log(
                    "Login server response:",
                    data
                );


                // --------------------------------------
                // LOGIN SUCCESS
                // --------------------------------------

                if (
                    response.ok &&
                    data.success
                ) {


                    // Store logged-in user

                    localStorage.setItem(
                        "techflowUser",
                        JSON.stringify(data.user)
                    );


                    // Remember email if selected

                    if (rememberMe) {

                        localStorage.setItem(
                            "techflowRememberEmail",
                            email
                        );

                    } else {

                        localStorage.removeItem(
                            "techflowRememberEmail"
                        );

                    }


                    showMessage(
                        "Login successful. Redirecting...",
                        "success"
                    );


                    // ----------------------------------
                    // REDIRECT
                    // ----------------------------------

                    setTimeout(
                        () => {

                            window.location.href =
                                "dashboard.html";

                        },
                        800
                    );


                    return;

                }


                // --------------------------------------
                // LOGIN FAILED
                // --------------------------------------

                showMessage(
                    data.message ||
                    "Invalid email or password.",
                    "error"
                );


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showMessage(
                    "Unable to connect to server. Please make sure your backend is running.",
                    "error"
                );

            } finally {


                // --------------------------------------
                // ENABLE BUTTON AGAIN
                // --------------------------------------

                if (loginBtn) {

                    loginBtn.disabled = false;

                    loginBtn.innerHTML = `
                        <span>Sign In</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    `;

                }

            }

        }
    );

}


// ==================================================
// LOAD REMEMBERED EMAIL
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedEmail =
            localStorage.getItem(
                "techflowRememberEmail"
            );


        const emailInput =
            document.getElementById("email");


        const rememberCheckbox =
            document.getElementById("rememberMe");


        if (
            savedEmail &&
            emailInput
        ) {

            emailInput.value =
                savedEmail;


            if (rememberCheckbox) {

                rememberCheckbox.checked =
                    true;

            }

        }

    }
);