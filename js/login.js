const API_URL =
    "https://techflow-banking-backend.vercel.app";


// =====================================================
// LOGIN
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("loginForm");


    if (!loginForm) {

        console.error("Login form not found");

        return;
    }


    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // =====================================================
            // GET FORM VALUES
            // =====================================================

            const emailInput =
                document.getElementById("email");

            const passwordInput =
                document.getElementById("password");


            if (!emailInput || !passwordInput) {

                console.error(
                    "Email or password input not found"
                );

                return;
            }


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            // =====================================================
            // VALIDATION
            // =====================================================

            if (!email || !password) {

                alert(
                    "Please enter your email and password."
                );

                return;
            }


            try {

                // =====================================================
                // DISABLE BUTTON
                // =====================================================

                const loginButton =
                    loginForm.querySelector(
                        'button[type="submit"]'
                    );


                if (loginButton) {

                    loginButton.disabled = true;

                    loginButton.textContent =
                        "Logging in...";

                }


                // =====================================================
                // LOGIN REQUEST
                // =====================================================

                const response =
                    await fetch(
                        `${API_URL}/api/auth/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    email: email,
                                    password: password
                                })
                        }
                    );


                // =====================================================
                // GET RESPONSE
                // =====================================================

                const data =
                    await response.json();


                console.log(
                    "Login response:",
                    data
                );


                // =====================================================
                // CHECK LOGIN
                // =====================================================

                if (
                    !response.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        "Invalid email or password."
                    );

                    return;
                }


                // =====================================================
                // CHECK USER
                // =====================================================

                if (
                    !data.user ||
                    !data.user.id
                ) {

                    console.error(
                        "User data missing:",
                        data
                    );

                    alert(
                        "Login succeeded, but user information was not returned."
                    );

                    return;
                }


                // =====================================================
                // SAVE USER ID
                // =====================================================

                localStorage.setItem(
                    "userId",
                    String(data.user.id)
                );


                // =====================================================
                // SAVE USER INFORMATION
                // =====================================================

                localStorage.setItem(
                    "firstName",
                    data.user.first_name || ""
                );


                localStorage.setItem(
                    "lastName",
                    data.user.last_name || ""
                );


                localStorage.setItem(
                    "email",
                    data.user.email || ""
                );


                localStorage.setItem(
                    "accountType",
                    data.user.account_type || ""
                );


                // =====================================================
                // SAVE JWT TOKEN
                // =====================================================

                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                }


                // =====================================================
                // LOAD ACCOUNT INFORMATION
                // =====================================================

                try {

                    const dashboardResponse =
                        await fetch(
                            `${API_URL}/api/dashboard/${data.user.id}`,
                            {
                                method: "GET",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    ...(data.token
                                        ? {
                                            Authorization:
                                                `Bearer ${data.token}`
                                        }
                                        : {})
                                }
                            }
                        );


                    const dashboardData =
                        await dashboardResponse.json();


                    console.log(
                        "Dashboard data:",
                        dashboardData
                    );


                    if (
                        dashboardResponse.ok &&
                        dashboardData.success &&
                        dashboardData.user
                    ) {

                        const user =
                            dashboardData.user;


                        // =====================================================
                        // SAVE ACCOUNT NUMBER
                        // =====================================================

                        localStorage.setItem(
                            "accountNumber",
                            user.account_number || ""
                        );


                        // =====================================================
                        // SAVE ACCOUNT TYPE
                        // =====================================================

                        localStorage.setItem(
                            "accountType",
                            user.account_type || ""
                        );


                        // =====================================================
                        // SAVE BALANCE
                        // =====================================================

                        localStorage.setItem(
                            "balance",
                            String(
                                user.balance || 0
                            )
                        );


                        // =====================================================
                        // SAVE CURRENCY
                        // =====================================================

                        localStorage.setItem(
                            "currency",
                            user.currency || "NGN"
                        );

                    } else {

                        console.warn(
                            "Account information could not be loaded:",
                            dashboardData
                        );

                    }


                } catch (dashboardError) {

                    console.error(
                        "Dashboard request error:",
                        dashboardError
                    );

                }


                // =====================================================
                // CHECK SAVED DATA
                // =====================================================

                console.log(
                    "User ID:",
                    localStorage.getItem("userId")
                );

                console.log(
                    "First Name:",
                    localStorage.getItem("firstName")
                );

                console.log(
                    "Last Name:",
                    localStorage.getItem("lastName")
                );

                console.log(
                    "Email:",
                    localStorage.getItem("email")
                );

                console.log(
                    "Account Number:",
                    localStorage.getItem("accountNumber")
                );

                console.log(
                    "Account Type:",
                    localStorage.getItem("accountType")
                );

                console.log(
                    "Balance:",
                    localStorage.getItem("balance")
                );


                // =====================================================
                // LOGIN SUCCESS
                // =====================================================

                alert(
                    `Welcome ${data.user.first_name || ""}!`
                );


                // =====================================================
                // GO TO DASHBOARD
                // =====================================================

                window.location.href =
                    "customer-dashboard.html";


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                alert(
                    "Unable to connect to the banking server."
                );


            } finally {

                const loginButton =
                    loginForm.querySelector(
                        'button[type="submit"]'
                    );


                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Login";

                }

            }

        }
    );

});