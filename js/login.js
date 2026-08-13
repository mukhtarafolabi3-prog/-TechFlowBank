/* =========================================
   TECHFLOW BANK
   LOGIN
========================================= */

const loginForm =
    document.getElementById("loginForm");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

const loginBtn =
    document.getElementById("loginBtn");

const formMessage =
    document.getElementById("formMessage");


// =========================================
// PASSWORD TOGGLE
// =========================================

passwordToggle.addEventListener(
    "click",
    () => {

        const icon =
            passwordToggle.querySelector("i");

        if (password.type === "password") {

            password.type = "text";

            icon.classList.remove(
                "fa-eye"
            );

            icon.classList.add(
                "fa-eye-slash"
            );

        } else {

            password.type = "password";

            icon.classList.remove(
                "fa-eye-slash"
            );

            icon.classList.add(
                "fa-eye"
            );
        }

    }
);


// =========================================
// CLEAR ERRORS
// =========================================

function clearErrors() {

    document
        .querySelectorAll(".field-error")
        .forEach((error) => {

            error.textContent = "";

        });

    formMessage.className =
        "form-message";

    formMessage.textContent =
        "";
}


// =========================================
// ERROR
// =========================================

function setError(
    field,
    message
) {

    const error =
        document.getElementById(
            `${field}Error`
        );

    if (error) {

        error.textContent =
            message;

    }
}


// =========================================
// VALIDATE
// =========================================

function validateLogin() {

    clearErrors();

    let valid = true;

    const emailValue =
        email.value.trim();

    const passwordValue =
        password.value;


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(emailValue)) {

        setError(
            "email",
            "Enter a valid email address."
        );

        valid = false;
    }


    if (!passwordValue) {

        setError(
            "password",
            "Enter your password."
        );

        valid = false;

    }


    return valid;
}


// =========================================
// LOGIN
// =========================================

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        if (!validateLogin()) {

            formMessage.className =
                "form-message error";

            formMessage.textContent =
                "Please enter your login details.";

            return;
        }


        loginBtn.disabled = true;


        loginBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            <span>Signing In...</span>
        `;


        /*
         * BACKEND CONNECTION WILL COME HERE.
         *
         * Later:
         *
         * const response = await fetch(
         *     "/api/auth/login",
         *     {
         *         method: "POST",
         *         headers: {
         *             "Content-Type": "application/json"
         *         },
         *         body: JSON.stringify({
         *             email: email.value.trim(),
         *             password: password.value
         *         })
         *     }
         * );
         */


        // Temporary frontend response

        setTimeout(() => {

            formMessage.className =
                "form-message success";

            formMessage.textContent =
                "Login successful! Redirecting...";

            loginBtn.disabled = false;

            loginBtn.innerHTML = `
                <span>Sign In</span>
                <i class="fa-solid fa-arrow-right"></i>
            `;

        }, 800);
      window.location.href = "dashboard.html";
    }
     
);