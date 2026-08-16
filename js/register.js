const API_URL = "http://localhost:3000";

let currentStep = 1;

function nextStep(step) {
    const currentFormStep = document.getElementById(`step${currentStep}`);

    if (step > currentStep) {
        const inputs = currentFormStep.querySelectorAll(
            "input, select"
        );

        for (const input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }
        }
    }

    document.querySelectorAll(".form-step").forEach((formStep) => {
        formStep.classList.remove("active");
    });

    const nextFormStep = document.getElementById(`step${step}`);

    if (nextFormStep) {
        nextFormStep.classList.add("active");
    }

    document.querySelectorAll(".progress-item").forEach((item, index) => {
        item.classList.toggle("active", index < step);
    });

    currentStep = step;
}


function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);

    if (!input) {
        return;
    }

    if (input.type === "password") {
        input.type = "text";

        button.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';
    } else {
        input.type = "password";

        button.innerHTML =
            '<i class="fa-regular fa-eye"></i>';
    }
}


document.addEventListener("DOMContentLoaded", () => {

    const registerForm =
        document.getElementById("registerForm");

    if (!registerForm) {
        console.error("registerForm not found");
        return;
    }


    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        // Get values
        const first_name =
            document.getElementById("firstName").value.trim();

        const last_name =
            document.getElementById("lastName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const date_of_birth =
            document.getElementById("dob").value;

        const gender =
            document.getElementById("gender").value;

        const account_type =
            document.querySelector(
                'input[name="accountType"]:checked'
            )?.value;

        const account_name =
            document.getElementById("accountName").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const pin =
            document.getElementById("pin").value;

        const confirmPin =
            document.getElementById("confirmPin").value;

        const terms =
            document.getElementById("terms").checked;


        // Password check
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        // PIN check
        if (pin !== confirmPin) {
            alert("Transaction PINs do not match.");
            return;
        }


        // PIN format
        if (!/^\d{4}$/.test(pin)) {
            alert("Transaction PIN must be exactly 4 digits.");
            return;
        }


        // Terms
        if (!terms) {
            alert("Please accept the Terms & Conditions.");
            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        phone,
                        date_of_birth,
                        gender,
                        account_type,
                        account_name,
                        password,
                        pin
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {
                alert(
                    data.message ||
                    "Registration failed."
                );

                return;
            }


            alert(
                "Account created successfully!"
            );


            registerForm.reset();

            window.location.href = "login.html";


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            alert(
                "Unable to connect to TechFlow Banking server."
            );
        }

    });

});