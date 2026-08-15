
// =====================================================
// TECHFLOW DYNAMIC BANK
// RESET PASSWORD
// =====================================================

const API_URL =
    "https://techflow-banking-backend.vercel.app";


// =====================================================
// PAGE LOADED
// =====================================================

console.log(
    "RESET PASSWORD JS LOADED"
);


// =====================================================
// DOM READY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const resetPasswordForm =
            document.getElementById(
                "resetPasswordForm"
            );


        if (!resetPasswordForm) {

            console.error(
                "resetPasswordForm not found"
            );

            return;
        }


        // =================================================
        // FORM SUBMIT
        // =================================================

        resetPasswordForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                // =========================================
                // GET INPUTS
                // =========================================

                const newPasswordInput =
                    document.getElementById(
                        "newPassword"
                    );


                const confirmPasswordInput =
                    document.getElementById(
                        "confirmPassword"
                    );


                if (
                    !newPasswordInput ||
                    !confirmPasswordInput
                ) {

                    alert(
                        "Password fields could not be found."
                    );

                    return;
                }


                const newPassword =
                    newPasswordInput.value;


                const confirmPassword =
                    confirmPasswordInput.value;


                // =========================================
                // VALIDATE EMPTY FIELDS
                // =========================================

                if (
                    !newPassword ||
                    !confirmPassword
                ) {

                    alert(
                        "Please fill in both password fields."
                    );

                    return;
                }


                // =========================================
                // PASSWORD LENGTH
                // =========================================

                if (
                    newPassword.length < 8
                ) {

                    alert(
                        "Password must be at least 8 characters."
                    );

                    newPasswordInput.focus();

                    return;
                }


                // =========================================
                // PASSWORD MATCH
                // =========================================

                if (
                    newPassword !==
                    confirmPassword
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    confirmPasswordInput.focus();

                    return;
                }


                // =========================================
                // GET TOKEN FROM URL
                // =========================================

                const urlParams =
                    new URLSearchParams(
                        window.location.search
                    );


                const token =
                    urlParams.get(
                        "token"
                    );


                if (!token) {

                    console.error(
                        "Reset token missing from URL."
                    );


                    alert(
                        "Reset token is missing or invalid."
                    );

                    return;
                }


                console.log(
                    "Reset token found."
                );


                // =========================================
                // FIND SUBMIT BUTTON
                // =========================================

                const submitButton =
                    resetPasswordForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Resetting Password...";

                }


                // =========================================
                // SEND REQUEST TO LIVE BACKEND
                // =========================================

                try {

                    console.log(
                        "Sending password reset request..."
                    );


                    const response =
                        await fetch(
                            `${API_URL}/api/auth/reset-password`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        token:
                                            token,

                                        password:
                                            newPassword

                                    })
                            }
                        );


                    // =====================================
                    // READ RESPONSE SAFELY
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
                        "Reset password response:",
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
                            "Password reset failed."
                        );

                        return;
                    }


                    // =====================================
                    // REMOVE OLD RESET DATA
                    // =====================================

                    localStorage.removeItem(
                        "resetEmail"
                    );


                    // =====================================
                    // SUCCESS
                    // =====================================

                    alert(
                        "Password reset successfully. Please login with your new password."
                    );


                    // =====================================
                    // REDIRECT TO LOGIN
                    // =====================================

                    window.location.href =
                        "login.html";

                } catch (error) {

                    console.error(
                        "Reset password error:",
                        error
                    );


                    alert(
                        "Unable to connect to the banking server. Please try again."
                    );

                } finally {

                    // =====================================
                    // ENABLE BUTTON
                    // =====================================

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Reset Password";

                    }

                }

            }
        );

    }
);
