
// =====================================================
// TECHFLOW DYNAMIC BANK
// REGISTRATION
// =====================================================

const API_URL =
    "https://techflow-banking-backend.vercel.app";


// =====================================================
// CURRENT STEP
// =====================================================

let currentStep = 1;


// =====================================================
// NEXT STEP
// =====================================================

function nextStep(step) {

    if (step > currentStep) {

        const currentFormStep =
            document.getElementById(`step${currentStep}`);

        if (!validateStep(currentFormStep)) {
            return;
        }
    }


    document
        .querySelectorAll(".form-step")
        .forEach((formStep) => {

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


// =====================================================
// VALIDATE STEP
// =====================================================

function validateStep(stepElement) {

    if (!stepElement) {

        console.error("Step not found");

        return false;
    }


    const inputs =
        stepElement.querySelectorAll(
            "input[required], select[required]"
        );


    for (const input of inputs) {

        // RADIO
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


        // CHECKBOX
        if (input.type === "checkbox") {

            if (!input.checked) {

                alert(
                    "Please accept the Terms & Conditions and Privacy Policy."
                );

                return false;
            }


            continue;
        }


        // EMPTY FIELD
        if (!input.value.trim()) {

            input.focus();

            alert(
                `Please fill in ${getFieldName(input)}`
            );

            return false;
        }


        // INVALID FIELD
        if (!input.checkValidity()) {

            input.focus();

            alert(
                `Please enter a valid ${getFieldName(input)}`
            );

            return false;
        }
    }


    // =================================================
    // PASSWORD AND PIN VALIDATION
    // =================================================

    if (stepElement.id === "step3") {

        const password =
            document.getElementById("password")?.value || "";

        const confirmPassword =
            document.getElementById("confirmPassword")?.value || "";

        const pin =
            document.getElementById("pin")?.value || "";

        const confirmPin =
            document.getElementById("confirmPin")?.value || "";


        if (password.length < 8) {

            alert(
                "Password must be at least 8 characters."
            );

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


// =====================================================
// GET FIELD NAME
// =====================================================

function getFieldName(input) {

    const label =
        document.querySelector(
            `label[for="${input.id}"]`
        );


    return label
        ? label.textContent.trim()
        : "this field";
}


// =====================================================
// UPDATE PROGRESS BAR
// =====================================================

function updateProgress(step) {

    const progressItems =
        document.querySelectorAll(".progress-item");

    const progressLines =
        document.querySelectorAll(".progress-line");


    progressItems.forEach(
        (item, index) => {

            if (index < step) {

                item.classList.add("active");

            } else {

                item.classList.remove("active");

            }

        }
    );


    progressLines.forEach(
        (line, index) => {

            if (index < step - 1) {

                line.classList.add("active");

            } else {

                line.classList.remove("active");

            }

        }
    );
}


// =====================================================
// PASSWORD TOGGLE
// =====================================================

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);


    if (!input) {
        return;
    }


    const icon =
        button?.querySelector("i");


    if (input.type === "password") {

        input.type = "text";


        if (icon) {

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

        }

    } else {

        input.type = "password";


        if (icon) {

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

        }
    }
}


// =====================================================
// REGISTRATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const registerForm =
            document.getElementById("registerForm");


        if (!registerForm) {

            console.error(
                "registerForm not found"
            );

            return;
        }


        registerForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                console.log(
                    "Registration submitted"
                );


                // =========================================
                // VALIDATE FINAL STEP
                // =========================================

                const step3 =
                    document.getElementById("step3");


                if (!validateStep(step3)) {
                    return;
                }


                // =========================================
                // GET ACCOUNT TYPE
                // =========================================

                const accountType =
                    document.querySelector(
                        'input[name="accountType"]:checked'
                    );


                if (!accountType) {

                    alert(
                        "Please select an account type."
                    );

                    return;
                }


                // =========================================
                // COLLECT FORM DATA
                // =========================================

                const userData = {

                    firstName:
                        document
                            .getElementById("firstName")
                            ?.value
                            .trim() || "",


                    lastName:
                        document
                            .getElementById("lastName")
                            ?.value
                            .trim() || "",


                    email:
                        document
                            .getElementById("email")
                            ?.value
                            .trim() || "",


                    phone:
                        document
                            .getElementById("phone")
                            ?.value
                            .trim() || "",


                    dob:
                        document
                            .getElementById("dob")
                            ?.value || "",


                    gender:
                        document
                            .getElementById("gender")
                            ?.value || "",


                    accountType:
                        accountType.value,


                    accountName:
                        document
                            .getElementById("accountName")
                            ?.value
                            .trim() || "",


                    password:
                        document
                            .getElementById("password")
                            ?.value || "",


                    pin:
                        document
                            .getElementById("pin")
                            ?.value || ""

                };


                console.log(
                    "Registration data:",
                    {
                        ...userData,
                        password: "***",
                        pin: "****"
                    }
                );


                // =========================================
                // DISABLE SUBMIT BUTTON
                // =========================================

                const submitButton =
                    registerForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Creating Account...";

                }


                // =========================================
                // SEND TO LIVE BACKEND
                // =========================================

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
                                    JSON.stringify(
                                        userData
                                    )
                            }
                        );


                    // =====================================
                    // READ RESPONSE
                    // =====================================

                    let data;


                    try {

                        data =
                            await response.json();

                    } catch (jsonError) {

                        console.error(
                            "Invalid server response:",
                            jsonError
                        );

                        alert(
                            "The server returned an invalid response."
                        );

                        return;
                    }


                    console.log(
                        "Registration response:",
                        data
                    );


                    // =====================================
                    // CHECK BACKEND RESPONSE
                    // =====================================

                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        alert(
                            data.message ||
                            "Registration failed."
                        );

                        return;
                    }


                    // =====================================
                    // GET ACCOUNT
                    // =====================================

                    const account =
                        data.account;


                    if (
                        !account ||
                        !account.account_number
                    ) {

                        console.error(
                            "Account information missing:",
                            data
                        );


                        alert(
                            "Registration succeeded, but account information was not returned."
                        );

                        return;
                    }


                    // =====================================
                    // SAVE USER ID
                    // =====================================

                    if (data.user_id) {

                        localStorage.setItem(
                            "userId",
                            String(data.user_id)
                        );

                    }


                    // =====================================
                    // SAVE ACCOUNT NUMBER
                    // =====================================

                    localStorage.setItem(
                        "accountNumber",
                        account.account_number
                    );


                    // =====================================
                    // SAVE ACCOUNT TYPE
                    // =====================================

                    localStorage.setItem(
                        "accountType",
                        account.account_type || userData.accountType
                    );


                    // =====================================
                    // SAVE BALANCE
                    // =====================================

                    localStorage.setItem(
                        "balance",
                        String(account.balance || 0)
                    );


                    // =====================================
                    // SAVE CURRENCY
                    // =====================================

                    localStorage.setItem(
                        "currency",
                        account.currency || "NGN"
                    );


                    // =====================================
                    // SAVE USER INFORMATION
                    // =====================================

                    localStorage.setItem(
                        "firstName",
                        userData.firstName
                    );


                    localStorage.setItem(
                        "lastName",
                        userData.lastName
                    );


                    localStorage.setItem(
                        "email",
                        userData.email
                    );


                    // =====================================
                    // SAVE TOKEN IF BACKEND RETURNS ONE
                    // =====================================

                    if (data.token) {

                        localStorage.setItem(
                            "token",
                            data.token
                        );

                    }


                    // =====================================
                    // DISPLAY SUCCESS
                    // =====================================

                    alert(
                        `Registration successful!\n\n` +
                        `Account Type: ${account.account_type || userData.accountType}\n` +
                        `Account Number: ${account.account_number}\n` +
                        `Balance: ₦${Number(
                            account.balance || 0
                        ).toLocaleString(
                            "en-NG",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )}`
                    );


                    // =====================================
                    // GO TO LOGIN
                    // =====================================

                    window.location.href =
                        "login.html";

                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    alert(
                        "Unable to connect to the banking server."
                    );

                } finally {

                    // =====================================
                    // ENABLE BUTTON AGAIN
                    // =====================================

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            "Create Account";

                    }

                }

            }
        );

    });

