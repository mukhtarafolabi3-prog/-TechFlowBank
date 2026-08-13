const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");


forgotPasswordForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();


    if (!email) {

        alert("Please enter your email address.");

        return;
    }


    // Basic email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    /*
        FRONTEND TEST ONLY

        Backend will later handle:

        POST /api/auth/forgot-password

        The backend will:
        1. Check the email
        2. Generate OTP/token
        3. Send OTP/reset link
        4. Allow password reset
    */


    localStorage.setItem(
        "passwordRecoveryEmail",
        email
    );


    alert(
        "If this email is registered, a password recovery code will be sent."
    );


    // Temporary frontend redirect
    window.location.href =
        "verify-otp.html";

});