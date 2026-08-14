let currentStep = 1;

// ================================
// NEXT STEP
// ================================

function nextStep(step) {

    if (step > currentStep) {
        const currentFormStep =
            document.getElementById(`step${currentStep}`);

        if (!validateStep(currentFormStep)) {
            return;
        }
    }

    document.querySelectorAll(".form-step").forEach((formStep) => {
        formStep.classList.remove("active");
    });

    const nextFormStep =
        document.getElementById(`step${step}`);

    if (nextFormStep) {
        nextFormStep.classList.add("active");
        currentStep = step;
        updateProgress(step);
    }
}


// ================================
// VALIDATE STEP
// ================================

function validateStep(stepElement) {

    if (!stepElement) {
        console.error("Step not found");
        return false;
    }

    const inputs = stepElement.querySelectorAll(
        "input[required], select[required]"
    );

    for (const input of inputs) {

        if (input.type === "radio") {

            const radioGroup =
                stepElement.querySelectorAll(
                    `input[name="${input.name}"]`
                );

            const checked =
                [...radioGroup].some(
                    radio => radio.checked
                );

            if (!checked) {
                alert("Please select an account type.");
                return false;
            }

            continue;
        }

        if (input.type === "checkbox") {

            if (!input.checked) {
                alert(
                    "Please accept the Terms & Conditions and Privacy Policy."
                );
                return false;
            }

            continue;
        }

        if (!input.value.trim()) {

            input.focus();

            alert(
                `Please fill in ${getFieldName(input)}`
            );

            return false;
        }

        if (!input.checkValidity()) {

            input.focus();

            alert(
                `Please enter a valid ${getFieldName(input)}`
            );

            return false;
        }
    }

    // Step 3 validation
    if (stepElement.id === "step3") {

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const pin =
            document.getElementById("pin").value;

        const confirmPin =
            document.getElementById("confirmPin").value;


        if (password.length < 8) {
            alert("Password must be at least 8 characters.");
            return false;
        }


        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }


        if (!/^\d{4}$/.test(pin)) {
            alert("PIN must be exactly 4 digits.");
            return false;
        }


        if (pin !== confirmPin) {
            alert("PINs do not match.");
            return false;
        }
    }

    return true;
}


// ================================
// FIELD NAME
// ================================

function getFieldName(input) {

    const label =
        document.querySelector(
            `label[for="${input.id}"]`
        );

    return label
        ? label.textContent.trim()
        : "this field";
}


// ================================
// PROGRESS BAR
// ================================

function updateProgress(step) {

    const progressItems =
        document.querySelectorAll(".progress-item");

    const progressLines =
        document.querySelectorAll(".progress-line");


    progressItems.forEach((item, index) => {

        if (index < step) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });


    progressLines.forEach((line, index) => {

        if (index < step - 1) {
            line.classList.add("active");
        } else {
            line.classList.remove("active");
        }
    });
}


// ================================
// PASSWORD TOGGLE
// ================================

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

    if (!input) return;

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


// ================================
// REGISTER USER
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        console.error("registerForm not found");
        return;
    }


    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("Registration submitted");


        // Validate final step
        const step3 =
            document.getElementById("step3");

        if (!validateStep(step3)) {
            return;
        }


        // Get selected account type
        const accountType =
            document.querySelector(
                'input[name="accountType"]:checked'
            );


        // Collect user's information
        const userData = {

            firstName:
                document
                    .getElementById("firstName")
                    .value
                    .trim(),

            lastName:
                document
                    .getElementById("lastName")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),

            phone:
                document
                    .getElementById("phone")
                    .value
                    .trim(),

            dob:
                document
                    .getElementById("dob")
                    .value,

            gender:
                document
                    .getElementById("gender")
                    .value,

            accountType:
                accountType
                    ? accountType.value
                    : "",

            accountName:
                document
                    .getElementById("accountName")
                    .value
                    .trim(),

            password:
                document
                    .getElementById("password")
                    .value,

            pin:
                document
                    .getElementById("pin")
                    .value
        };


        console.log("User data:", userData);


        // ================================
        // SEND TO BACKEND
        // ================================

        try {

            const response = await fetch(
                "http://localhost:3000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(userData)
                }
            );


            const data =
                await response.json();


            console.log(
                "Backend response:",
                data
            );


            // Backend returned an error
            if (!response.ok) {

                alert(
                    data.message ||
                    "Registration failed."
                );

                return;
            }


            // SUCCESS
            alert(
                "Registration successful!"
            );


            // Go to login
            window.location.href =
                "login.html";


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                "Cannot connect to the backend. Make sure the server is running."
            );
        }
    });
});