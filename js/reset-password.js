const API_URL =
    "http://localhost:3000";


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =================================================
        // GET ELEMENTS
        // =================================================

        const form =
            document.getElementById(
                "resetPasswordForm"
            );


        const newPassword =
            document.getElementById(
                "newPassword"
            );


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            );


        const resetBtn =
            document.getElementById(
                "resetBtn"
            );


        const passwordMatch =
            document.getElementById(
                "passwordMatch"
            );


        const toggleNewPassword =
            document.getElementById(
                "toggleNewPassword"
            );


        const toggleConfirmPassword =
            document.getElementById(
                "toggleConfirmPassword"
            );


        // =================================================
        // CHECK FORM
        // =================================================

        if (!form) {

            console.error(
                "resetPasswordForm not found"
            );

            return;
        }


        // =================================================
        // GET RESET TOKEN
        // =================================================

        const resetToken =
            sessionStorage.getItem(
                "techflowResetToken"
            );


        if (!resetToken) {

            alert(
                "Your password reset session is invalid or has expired."
            );


            window.location.href =
                "forgot-password.html";


            return;
        }



        // =================================================
        // PASSWORD VISIBILITY
        // =================================================

        function togglePassword(
            input,
            button
        ) {

            if (
                input.type ===
                "password"
            ) {

                input.type =
                    "text";

                button.innerHTML = `
                    <i class="fa-regular fa-eye-slash"></i>
                `;

            } else {

                input.type =
                    "password";

                button.innerHTML = `
                    <i class="fa-regular fa-eye"></i>
                `;

            }

        }


        if (
            toggleNewPassword
        ) {

            toggleNewPassword.addEventListener(
                "click",
                () => {

                    togglePassword(
                        newPassword,
                        toggleNewPassword
                    );

                }
            );

        }


        if (
            toggleConfirmPassword
        ) {

            toggleConfirmPassword.addEventListener(
                "click",
                () => {

                    togglePassword(
                        confirmPassword,
                        toggleConfirmPassword
                    );

                }
            );

        }



        // =================================================
        // PASSWORD REQUIREMENTS
        // =================================================

        const lengthRequirement =
            document.getElementById(
                "lengthRequirement"
            );


        const uppercaseRequirement =
            document.getElementById(
                "uppercaseRequirement"
            );


        const numberRequirement =
            document.getElementById(
                "numberRequirement"
            );


        function updateRequirement(
            element,
            valid
        ) {

            if (!element) {
                return;
            }


            const icon =
                element.querySelector(
                    "i"
                );


            if (valid) {

                icon.className =
                    "fa-solid fa-circle-check";

            } else {

                icon.className =
                    "fa-regular fa-circle";

            }

        }


        function checkPasswordRequirements() {

            const password =
                newPassword.value;


            updateRequirement(
                lengthRequirement,
                password.length >= 8
            );


            updateRequirement(
                uppercaseRequirement,
                /[A-Z]/.test(password)
            );


            updateRequirement(
                numberRequirement,
                /\d/.test(password)
            );

        }


        newPassword.addEventListener(
            "input",
            checkPasswordRequirements
        );



        // =================================================
        // PASSWORD MATCH
        // =================================================

        function checkPasswordMatch() {

            const password =
                newPassword.value;


            const confirm =
                confirmPassword.value;


            if (!confirm) {

                passwordMatch.textContent =
                    "";

                return;

            }


            if (
                password === confirm
            ) {

                passwordMatch.textContent =
                    "Passwords match.";

                passwordMatch.className =
                    "password-match success";

            } else {

                passwordMatch.textContent =
                    "Passwords do not match.";

                passwordMatch.className =
                    "password-match error";

            }

        }


        confirmPassword.addEventListener(
            "input",
            checkPasswordMatch
        );


        newPassword.addEventListener(
            "input",
            checkPasswordMatch
        );



        // =================================================
        // FORM SUBMIT
        // =================================================

        form.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                const password =
                    newPassword.value.trim();


                const confirm =
                    confirmPassword.value.trim();



                // =============================================
                // PASSWORD LENGTH
                // =============================================

                if (
                    password.length < 8
                ) {

                    alert(
                        "Password must be at least 8 characters."
                    );


                    newPassword.focus();


                    return;
                }



                // =============================================
                // UPPERCASE
                // =============================================

                if (
                    !/[A-Z]/.test(password)
                ) {

                    alert(
                        "Password must contain at least one uppercase letter."
                    );


                    newPassword.focus();


                    return;
                }



                // =============================================
                // NUMBER
                // =============================================

                if (
                    !/\d/.test(password)
                ) {

                    alert(
                        "Password must contain at least one number."
                    );


                    newPassword.focus();


                    return;
                }



                // =============================================
                // PASSWORD MATCH
                // =============================================

                if (
                    password !== confirm
                ) {

                    alert(
                        "Passwords do not match."
                    );


                    confirmPassword.focus();


                    return;
                }



                // =============================================
                // DISABLE BUTTON
                // =============================================

                resetBtn.disabled =
                    true;


                resetBtn.innerHTML = `
                    <span>Resetting...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                `;



                try {


                    // =============================================
                    // SEND REQUEST
                    // =============================================

                    const response =
                        await fetch(
                            `${API_URL}/api/auth/reset-password`,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify({

                                        token:
                                            resetToken,

                                        newPassword:
                                            password

                                    })

                            }
                        );



                    // =============================================
                    // READ RESPONSE
                    // =============================================

                    const data =
                        await response.json();



                    // =============================================
                    // ERROR
                    // =============================================

                    if (
                        !response.ok
                    ) {

                        alert(
                            data.message ||
                            "Unable to reset password."
                        );


                        return;
                    }



                    // =============================================
                    // SUCCESS
                    // =============================================

                    alert(
                        "Password reset successful. You can now log in."
                    );



                    // =============================================
                    // REMOVE TOKEN
                    // =============================================

                    sessionStorage.removeItem(
                        "techflowResetToken"
                    );


                    sessionStorage.removeItem(
                        "techflowResetEmail"
                    );



                    // =============================================
                    // LOGIN
                    // =============================================

                    window.location.href =
                        "login.html";


                } catch (error) {


                    console.error(
                        "Reset password error:",
                        error
                    );


                    alert(
                        "Unable to connect to the server. Please check your connection and try again."
                    );


                } finally {


                    resetBtn.disabled =
                        false;


                    resetBtn.innerHTML = `
                        <span>Reset Password</span>
                        <i class="fa-solid fa-check"></i>
                    `;

                }

            }
        );

    }
);