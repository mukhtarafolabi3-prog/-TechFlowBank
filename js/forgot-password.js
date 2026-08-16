const API_URL =
    "http://localhost:3000";


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "forgotPasswordForm"
            );

        const emailInput =
            document.getElementById("email");

        const continueBtn =
            document.getElementById(
                "continueBtn"
            );


        if (!form) {

            console.error(
                "forgotPasswordForm not found"
            );

            return;
        }


        form.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const email =
                    emailInput.value.trim();


                // =================================
                // VALIDATION
                // =================================

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


                // =================================
                // DISABLE BUTTON
                // =================================

                continueBtn.disabled = true;

                continueBtn.innerHTML = `
                    <span>Checking...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;


                try {

                    // =================================
                    // SEND REQUEST
                    // =================================

                    const response =
                        await fetch(
                            `${API_URL}/api/auth/forgot-password`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({
                                    email: email
                                })
                            }
                        );


                    const data =
                        await response.json();


                    // =================================
                    // ERROR RESPONSE
                    // =================================

                    if (!response.ok) {

                        alert(
                            data.message ||
                            "Unable to process your request."
                        );

                        return;
                    }


                    // =================================
                    // SUCCESS
                    // =================================

                    /*
                        TEMPORARY DEVELOPMENT STEP

                        Your backend currently returns
                        the reset token directly.

                        We save it temporarily so the
                        reset-password page can use it.
                    */

                    if (data.resetToken) {

                        sessionStorage.setItem(
                            "techflowResetToken",
                            data.resetToken
                        );

                        sessionStorage.setItem(
                            "techflowResetEmail",
                            email
                        );

                    }


                    alert(
                        "Password reset request successful."
                    );


                    // =================================
                    // GO TO RESET PASSWORD PAGE
                    // =================================

                    window.location.href =
                        "reset-password.html";


                } catch (error) {

                    console.error(
                        "Forgot password error:",
                        error
                    );


                    alert(
                        "Unable to connect to the server. Please try again."
                    );

                } finally {

                    // =================================
                    // RESTORE BUTTON
                    // =================================

                    continueBtn.disabled = false;

                    continueBtn.innerHTML = `
                        <span>Continue</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    `;

                }

            }
        );

    }
);