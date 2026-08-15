// =====================================================
// TECHFLOW DYNAMIC BANK
// FORGOT PASSWORD
// =====================================================

const API_URL =
    "https://techflow-banking-backend-ffmn.vercel.app";


console.log(
    "FORGOT PASSWORD JS LOADED"
);


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const forgotPasswordForm =
            document.getElementById(
                "forgotPasswordForm"
            );


        if (!forgotPasswordForm) {

            console.error(
                "forgotPasswordForm not found"
            );

            return;
        }


        // =====================================================
        // FORM SUBMIT
        // =====================================================

        forgotPasswordForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                // =====================================================
                // GET EMAIL
                // =====================================================

                const emailInput =
                    document.getElementById(
                        "email"
                    );


                if (!emailInput) {

                    alert(
                        "Email field not found."
                    );

                    return;
                }


                const email =
                    emailInput.value.trim();


                // =====================================================
                // VALIDATE EMAIL
                // =====================================================

                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    emailInput.focus();

                    return;
                }


                if (
                    !emailInput.checkValidity()
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    emailInput.focus();

                    return;
                }


                // =====================================================
                // GET BUTTON
                // =====================================================

                const submitButton =
                    forgotPasswordForm.querySelector(
                        'button[type="submit"]'
                    );


                const originalButtonText =
                    submitButton
                        ? submitButton.textContent
                        : "Continue";


                try {

                    // =====================================================
                    // DISABLE BUTTON
                    // =====================================================

                    if (submitButton) {

                        submitButton.disabled =
                            true;

                        submitButton.textContent =
                            "Checking...";

                    }


                    console.log(
                        "Sending forgot-password request..."
                    );


                    // =====================================================
                    // SEND REQUEST TO LIVE BACKEND
                    // =====================================================

                    const response =
                        await fetch(
                            `${API_URL}/api/auth/forgot-password`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        email:
                                            email
                                    })
                            }
                        );


                    // =====================================================
                    // READ RESPONSE
                    // =====================================================

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
                        "Forgot password response:",
                        data
                    );


                    // =====================================================
                    // CHECK BACKEND RESPONSE
                    // =====================================================

                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        alert(
                            data.message ||
                            "Password recovery failed."
                        );

                        return;
                    }


                    // =====================================================
                    // GET RESET TOKEN
                    // =====================================================

                    const token =
                        data.reset_token;


                    if (!token) {

                        console.error(
                            "Reset token missing:",
                            data
                        );

                        alert(
                            "The server did not return a reset token."
                        );

                        return;
                    }


                    // =====================================================
                    // SAVE EMAIL
                    // =====================================================

                    localStorage.setItem(
                        "resetEmail",
                        email
                    );


                    // =====================================================
                    // GO TO RESET PASSWORD PAGE
                    // =====================================================

                    window.location.href =
                        `reset-password.html?token=${encodeURIComponent(
                            token
                        )}`;

                } catch (error) {

                    console.error(
                        "Forgot password error:",
                        error
                    );


                    alert(
                        "Unable to connect to the banking server. Please try again."
                    );

                } finally {

                    // =====================================================
                    // ENABLE BUTTON AGAIN
                    // =====================================================

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            originalButtonText;

                    }

                }

            }
        );

    }
);