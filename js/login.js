const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        console.log("Login response:", data);


        if (!data.success) {

            alert(data.message);

            return;
        }


        // =================================
        // SAVE USER DATA
        // =================================

        localStorage.setItem(
            "userId",
            data.user.id
        );

        localStorage.setItem(
            "firstName",
            data.user.first_name
        );

        localStorage.setItem(
            "lastName",
            data.user.last_name
        );

        localStorage.setItem(
            "email",
            data.user.email
        );

        // Save JWT token
        localStorage.setItem(
            "token",
            data.token
        );


        // =================================
        // GO TO DASHBOARD
        // =================================

        window.location.href =
            "customer-dashboard.html";


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        alert(
            "Unable to connect to the server."
        );

    }

});