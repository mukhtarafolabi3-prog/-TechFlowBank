const API_URL = "http://localhost:3000";


// =====================================
// REGISTER FORM
// =====================================

const registerForm = document.getElementById("registerForm");


// =====================================
// STEP NAVIGATION
// =====================================

function nextStep(step) {

    const currentStep =
        document.querySelector(".form-step.active");

    if (!currentStep) {
        return;
    }

    // Validate current step before moving forward
    if (step > 1) {

        const currentInputs =
            currentStep.querySelectorAll(
                "input, select"
            );

        for (const input of currentInputs) {

            if (!input.checkValidity()) {

                input.reportValidity();

                return;
            }
        }
    }


    // Hide all steps

    document
        .querySelectorAll(".form-step")
        .forEach((formStep) => {

            formStep.classList.remove("active");

        });


    // Show selected step

    const selectedStep =
        document.getElementById(`step${step}`);

    if (selectedStep) {

        selectedStep.classList.add("active");

    }


    // Update progress indicators

    document
        .querySelectorAll(".progress-item")
        .forEach((item, index) => {

            item.classList.remove("active");

            if (index < step) {

                item.classList.add("active");

            }

        });


    // Update progress lines

    document
        .querySelectorAll(".progress-line")
        .forEach((line, index) => {

            line.classList.remove("active");

            if (index < step - 1) {

                line.classList.add("active");

            }

        });

}


// =====================================
// PASSWORD VISIBILITY
// =====================================

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);

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


// =====================================
// REGISTER
// =====================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // =================================
            // GET FORM VALUES
            // =================================

            const firstName =
                document.getElementById("firstName").value.trim();

            const lastName =
                document.getElementById("lastName").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const dob =
                document.getElementById("dob").value;

            const gender =
                document.getElementById("gender").value;

            const accountType =
                document.querySelector(
                    'input[name="accountType"]:checked'
                )?.value;

            const accountName =
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


            // =================================
            // VALIDATION
            // =================================

            if (!accountType) {

                alert("Please select an account type.");

                nextStep(2);

                return;
            }


            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                nextStep(3);

                return;
            }


            if (!/^\d{4}$/.test(pin)) {

                alert(
                    "Transaction PIN must be exactly 4 digits."
                );

                nextStep(3);

                return;
            }


            if (pin !== confirmPin) {

                alert("Transaction PINs do not match.");

                nextStep(3);

                return;
            }


            if (!terms) {

                alert(
                    "Please agree to the Terms & Conditions and Privacy Policy."
                );

                return;
            }


            // =================================
            // PREPARE DATA
            // =================================

            const userData = {

                first_name: firstName,

                last_name: lastName,

                email: email,

                phone: phone,

                dob: dob,

                gender: gender,

                account_type: accountType,

                account_name: accountName,

                password: password,

                transaction_pin: pin

            };


            console.log(
                "Registration data:",
                userData
            );


            // =================================
            // SUBMIT TO BACKEND
            // =================================

            try {

                const response =
                    await fetch(
                        `${API_URL}/api/auth/register`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(userData)

                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Server response:",
                    data
                );


                // =================================
                // SUCCESS
                // =================================

                if (
                    response.ok &&
                    data.success
                ) {

                    alert(
                        "Registration successful! Your account has been created."
                    );


                    window.location.href =
                        "login.html";


                    return;
                }


                // =================================
                // SERVER ERROR
                // =================================

                alert(
                    data.message ||
                    "Registration failed."
                );

            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                alert(
                    "Unable to connect to server. Please make sure your backend is running."
                );

            }

        }
    );

}