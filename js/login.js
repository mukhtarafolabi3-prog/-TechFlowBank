document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("loginForm");


    if (!loginForm) {

        console.error(
            "Login form not found"
        );

        return;
    }


    loginForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            // =================================
            // GET FORM VALUES
            // =================================

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;


            // =================================
            // VALIDATE
            // =================================

            if (!email || !password) {

                alert(
                    "Please enter your email and password."
                );

                return;
            }


            try {

                // =================================
                // LOGIN REQUEST
                // =================================

                const response =
                    await fetch(
                        "http://localhost:3000/api/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email,
                                password
                            })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Login response:",
                    data
                );


                // =================================
                // CHECK LOGIN
                // =================================

                if (!response.ok || !data.success) {

                    alert(
                        data.message ||
                        "Invalid email or password."
                    );

                    return;
                }


                // =================================
                // CHECK USER DATA
                // =================================

                if (!data.user || !data.user.id) {

                    console.error(
                        "User data missing:",
                        data
                    );

                    alert(
                        "Login succeeded, but user information was not returned."
                    );

                    return;
                }


                // =================================
                // SAVE USER ID
                // =================================

                localStorage.setItem(
                    "userId",
                    data.user.id
                );


                // =================================
                // SAVE REGISTERED NAME
                // =================================

                localStorage.setItem(
                    "firstName",
                    data.user.first_name
                );

                localStorage.setItem(
                    "lastName",
                    data.user.last_name
                );


                // =================================
                // SAVE EMAIL
                // =================================

                localStorage.setItem(
                    "email",
                    data.user.email
                );


                // =================================
                // SAVE ACCOUNT TYPE
                // =================================

                localStorage.setItem(
                    "accountType",
                    data.user.account_type || ""
                );


                // =================================
                // SAVE JWT TOKEN
                // =================================

                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                }


                // =================================
                // CHECK SAVED DATA
                // =================================

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


                // =================================
                // GO TO DASHBOARD
                // =================================

                window.location.href =
                    "dashboard.html";

            }

            catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                alert(
                    "Unable to connect to the server."
                );

            }

        }
    );

});