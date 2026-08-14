const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

forgotPasswordForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document
        .getElementById("email")
        .value
        .trim();

    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/auth/forgot-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            }
        );

        const data = await response.json();

        console.log("Server response:", data);

        if (!response.ok) {
            alert(data.message || "Request failed.");
            return;
        }

        alert(data.message);

        window.location.href = "reset-password.html";

    } catch (error) {

        console.error("Forgot password error:", error);

        alert("Unable to connect to the server.");
    }
});