// ==========================================
// TECHFLOW DYNAMIC BANK
// REGISTRATION JAVASCRIPT
// ==========================================

let currentStep = 1;


// ==========================================
// STEP NAVIGATION
// ==========================================

function nextStep(step) {

    // Validate current step before moving forward
    if (step > currentStep) {

        if (!validateStep(currentStep)) {
            return;
        }
    }

    document.querySelectorAll(".form-step")
        .forEach(formStep => {
            formStep.classList.remove("active");
        });

    const next = document.getElementById(`step${step}`);

    if (next) {
        next.classList.add("active");
    }

    currentStep = step;

    updateProgress(step);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// VALIDATE STEP
// ==========================================

function validateStep(step) {

    const currentForm =
        document.getElementById(`step${step}`);

    const inputs =
        currentForm.querySelectorAll(
            "input[required], select[required]"
        );

    for (const input of inputs) {

        if (input.type === "radio") {

            const radioName = input.name;

            const checked =
                currentForm.querySelector(
                    `input[name="${radioName}"]:checked`
                );

            if (!checked) {

                alert("Please select your account type.");

                return false;
            }

            continue;
        }

        if (!input.value.trim()) {

            input.focus();

            alert(
                `Please complete the ${input.previousElementSibling?.textContent || "required"} field.`
            );

            return false;
        }
    }

    return true;
}


// ==========================================
// UPDATE PROGRESS
// ==========================================

function updateProgress(step) {

    const progressItems =
        document.querySelectorAll(".progress-item");

    progressItems.forEach((item, index) => {

        if (index + 1 <= step) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });
}


// ==========================================
// PASSWORD VISIBILITY
// ==========================================

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    const icon =
        button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}


// ==========================================
// PASSWORD VALIDATION
// ==========================================

function validatePasswords() {

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password.length < 8) {

        alert(
            "Password must contain at least 8 characters."
        );

        return false;
    }

    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return false;
    }

    return true;
}


// ==========================================
// PIN VALIDATION
// ==========================================

function validatePin() {

    const pin =
        document.getElementById("pin").value;

    const confirmPin =
        document.getElementById("confirmPin").value;

    if (!/^\d{4}$/.test(pin)) {

        alert(
            "Transaction PIN must contain exactly 4 numbers."
        );

        return false;
    }

    if (pin !== confirmPin) {

        alert(
            "Transaction PINs do not match."
        );

        return false;
    }

    return true;
}


// ==========================================
// REGISTRATION SUBMISSION
// ==========================================

document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        // Validate password
        if (!validatePasswords()) {
            return;
        }

        // Validate PIN
        if (!validatePin()) {
            return;
        }

        // Validate terms
        const terms =
            document.getElementById("terms");

        if (!terms.checked) {

            alert(
                "Please accept the Terms & Conditions."
            );

            return;
        }


        // Collect registration data
        const formData = {

            firstName:
                document.getElementById("firstName").value.trim(),

            lastName:
                document.getElementById("lastName").value.trim(),

            email:
                document.getElementById("email").value.trim(),

            phone:
                document.getElementById("phone").value.trim(),

            dateOfBirth:
                document.getElementById("dob").value,

            gender:
                document.getElementById("gender").value,

            accountType:
                document.querySelector(
                    'input[name="accountType"]:checked'
                ).value,

            accountName:
                document.getElementById("accountName").value.trim()
        };


        // ==================================
        // FRONTEND TEST ONLY
        // ==================================
        //
        // We are NOT connecting to the backend yet.
        //
        // This is only for testing the frontend.
        //

        localStorage.setItem(
            "techflowRegistration",
            JSON.stringify(formData)
        );


        alert(
            "Registration successful! Backend connection will be added later."
        );


        // Redirect to login
        window.location.href = "login.html";

    });