
const API_URL =
    "https://techflow-banking-backend.vercel.app";


console.log(
    "FORGOT PASSWORD JS LOADED"
);


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


        forgotPasswordForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                // ==========================================
                // GET EMAIL
                // ==========================================

                const email =
                    document
                        .getElementById(
                            "email"
                        )
                        .value
                        .trim();


                if (!email) {

                    alert(
                        "Please enter your email address."
                    );

                    return;
                }


                // ==========================================
                // SEND REQUEST TO LIVE BACKEND
                // ==========================================

                try {

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
                                        email: email
                                    })
                            }
                        );


                    const data =
                        await response.json();


                    console.log(
                        "Forgot password response:",
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
                            "Password recovery failed."
                        );

                        return;
                    }


                    // ==========================================
                    // GET RESET TOKEN
                    // ==========================================

                    const token =
                        data.reset_token;


                    if (!token) {

                        console.error(
                            "No reset token returned:",
                            data
                        );

                        alert(
                            "The reset token was not returned by the server."
                        );

                        return;
                    }


                    // ==========================================
                    // SAVE EMAIL
                    // ==========================================

                    localStorage.setItem(
                        "resetEmail",
                        email
                    );


                    // ==========================================
                    // GO TO RESET PASSWORD
                    // ==========================================

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
                        "Unable to connect to the banking server."
                    );

                }

            }
        );

    }
);

