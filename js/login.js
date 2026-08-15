// ==========================================
// TECHFLOW BANK - LOGIN
// ==========================================

const API_URL = "http://localhost:3000";


// ==========================================
// ELEMENTS
// ==========================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const formMessage = document.getElementById("formMessage");

const loginBtn = document.getElementById("loginBtn");

const passwordToggle =
    document.getElementById("passwordToggle");


// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================

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


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {

    emailError.textContent = "";
    passwordError.textContent = "";

    formMessage.textContent = "";

    formMessage.className = "form-message";

}


// ==========================================
// SHOW MESSAGE
// ==========================================

function showMessage(message, type) {

    formMessage.textContent = message;

    formMessage.className =
        `form-message ${type}`;

}


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearErrors();


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


    // ======================================
    // VALIDATION
    // ======================================

    let valid = true;


    if (!email) {

        emailError.textContent =
            "Please enter your email address.";

        valid = false;

    }


    if (!password) {

        passwordError.textContent =
            "Please enter your password.";

        valid = false;

    }


    if (!valid) {
        return;
    }


    // ======================================
    // DISABLE BUTTON
    // ======================================

    loginBtn.disabled = true;

    loginBtn.querySelector("span").textContent =
        "Signing in...";


    try {

        // ==================================
        // SEND LOGIN REQUEST
        // ==================================

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


        // ==================================
        // GET RESPONSE
        // ==================================

        const data =
            await response.json();


        console.log("Login response:", data);


        // ==================================
        // LOGIN SUCCESS
        // ==================================

        if (data.success) {

            showMessage(
                "Login successful. Redirecting...",
                "success"
            );


            // Save logged-in user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // Redirect
            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        }


        // ==================================
        // LOGIN FAILED
        // ==================================

        else {

            showMessage(
                data.message ||
                "Invalid email or password.",
                "error"
            );

        }

    }

    catch (error) {

        console.error(
            "Login error:",
            error
        );


        showMessage(
            "Unable to connect to the server. Make sure your backend is running.",
            "error"
        );

    }


    // ======================================
    // ENABLE BUTTON
    // ======================================

    loginBtn.disabled = false;

    loginBtn.querySelector("span").textContent =
        "Sign In";

});