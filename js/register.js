const API_URL = "http://localhost:3000";


// =====================================
// GET REGISTER FORM
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


    // Only validate when moving forward
    if (step > getCurrentStepNumber()) {

        const inputs =
            currentStep.querySelectorAll(
                "input, select"
            );

        for (const input of inputs) {

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


    // Update progress
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
// GET CURRENT STEP
// =====================================

function getCurrentStepNumber() {

    const currentStep =
        document.querySelector(".form-step.active");

    if (!currentStep) {
        return 1;
    }

    return Number(
        currentStep.id.replace("step", "")
    );
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
// REGISTER FORM SUBMISSION
// =====================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // =================================
            // GET PERSONAL INFORMATION
            // =================================

            const firstName =
                document
                    .getElementById("firstName")
                    .value
                    .trim();


            const lastName =
                document
                    .getElementById("lastName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const dob =
                document
                    .getElementById("dob")
                    .value;


            const gender =
                document
                    .getElementById("gender")
                    .value;


            // =================================
            // GET ACCOUNT INFORMATION
            // =================================

            const accountTypeElement =
                document.querySelector(
                    'input[name="accountType"]:checked'
                );


            const accountType =
                accountTypeElement
                    ? accountTypeElement.value
                    : "";


            const accountName =
                document
                    .getElementById("accountName")
                    .value
                    .trim();


            // =================================
            // GET SECURITY INFORMATION
            // =================================

            const password =
                document
                    .getElementById("password")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            const pin =
                document
                    .getElementById("pin")
                    .value;


            const confirmPin =
                document
                    .getElementById("confirmPin")
                    .value;


            const terms =
                document
                    .getElementById("terms")
                    .checked;


            // =================================
            // VALIDATE STEP 1
            // =================================

            if (
                !firstName ||
                !lastName ||
                !email ||
                !phone ||
                !dob ||
                !gender
            ) {

                alert(
                    "Please complete all personal information."
                );

                nextStep(1);

                return;
            }


            // =================================
            // VALIDATE EMAIL
            // =================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                alert(
                    "Please enter a valid email address."
                );

                nextStep(1);

                document
                    .getElementById("email")
                    .focus();

                return;
            }


            // =================================
            // VALIDATE STEP 2
            // =================================

            if (!accountType) {

                alert(
                    "Please select an account type."
                );

                nextStep(2);

                return;
            }


            if (!accountName) {

                alert(
                    "Please enter your preferred account name."
                );

                nextStep(2);

                return;
            }


            // =================================
            // VALIDATE PASSWORD
            // =================================

            if (password.length < 8) {

                alert(
                    "Password must be at least 8 characters."
                );

                nextStep(3);

                document
                    .getElementById("password")
                    .focus();

                return;
            }


            // =================================
            // CONFIRM PASSWORD
            // =================================

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                nextStep(3);

                document
                    .getElementById("confirmPassword")
                    .focus();

                return;
            }


            // =================================
            // VALIDATE PIN
            // =================================

            if (!/^\d{4}$/.test(pin)) {

                alert(
                    "Transaction PIN must be exactly 4 digits."
                );

                nextStep(3);

                document
                    .getElementById("pin")
                    .focus();

                return;
            }


            // =================================
            // CONFIRM PIN
            // =================================

            if (pin !== confirmPin) {

                alert(
                    "Transaction PINs do not match."
                );

                nextStep(3);

                document
                    .getElementById("confirmPin")
                    .focus();

                return;
            }


            // =================================
            // TERMS
            // =================================

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
            // FIND SUBMIT BUTTON
            // =================================

            const submitButton =
                registerForm.querySelector(
                    ".submit-btn"
                );


            const originalButtonText =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            // =================================
            // DISABLE BUTTON
            // =================================

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';

            }


            // =================================
            // SEND TO BACKEND
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


                // =================================
                // GET SERVER RESPONSE
                // =================================

                const data =
                    await response.json();


                console.log(
                    "Registration response:",
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
                        "Registration successful!\n\nYour account number is: " +
                        data.accountNumber
                    );


                    // Save basic account information
                    localStorage.setItem(
                        "techflowAccountNumber",
                        data.accountNumber
                    );


                    localStorage.setItem(
                        "techflowUserId",
                        data.userId
                    );


                    // Go to login
                    window.location.href =
                        "login.html";


                    return;
                }


                // =================================
                // SERVER ERROR
                // =================================

                alert(
                    data.message ||
                    "Registration failed. Please try again."
                );


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                alert(
                    "Unable to connect to server.\n\n" +
                    "Please make sure your backend is running on:\n" +
                    API_URL
                );


            } finally {

                // =================================
                // RESTORE BUTTON
                // =================================

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalButtonText;

                }

            }

        }
    );

}