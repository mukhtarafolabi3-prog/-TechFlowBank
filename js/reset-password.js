
const API_URL =
    "https://techflow-banking-backend.vercel.app";


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


        resetPasswordForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                // ==========================================
                // GET PASSWORDS
                // ==========================================

                const newPassword =
                    document
                        .getElementById(
                            "newPassword"
                        )
                        .value;


                const confirmPassword =
                    document
                        .getElementById(
                            "confirmPassword"
                        )
                        .value;


                // ==========================================
                // VALIDATE
                // ==========================================

                if (
                    !newPassword ||
                    !confirmPassword
                ) {

                    alert(
                        "Please fill in both password fields."
                    );

                    return;
                }


                if (
                    newPassword.length < 8
                ) {

                    alert(
                        "Password must be at least 8 characters."
                    );

                    return;
                }


                if (
                    newPassword !==
                    confirmPassword
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;
                }


                // ==========================================
                // GET RESET TOKEN FROM URL
                // ==========================================

                const urlParams =
                    new URLSearchParams(
                        window.location.search
                    );


                const token =
                    urlParams.get(
                        "token"
                    );


                if (!token) {

                    alert(
                        "Reset token is missing."
                    );

                    return;
                }


                // ==========================================
                // SEND TO LIVE BACKEND
                // ==========================================

                try {

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


                    const data =
                        await response.json();


                    console.log(
                        "Reset password response:",
                        data
                    );


                    // ==========================================
                    // CHECK RESPONSE
                    // ==========================================

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


                    // ==========================================
                    // REMOVE RESET EMAIL
                    // ==========================================

                    localStorage.removeItem(
                        "resetEmail"
                    );


                    // ==========================================
                    // SUCCESS
                    // ==========================================

                    alert(
                        "Password reset successfully. Please login."
                    );


                    window.location.href =
                        "login.html";

                } catch (error) {

                    console.error(
                        "Reset password error:",
                        error
                    );


                    alert(
                        "Unable to connect to the banking server."
                    );

                }

            }
        );

    }
);

