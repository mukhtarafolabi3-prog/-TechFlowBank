
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Reset Password | TechFlow Dynamic</title>

    <link rel="stylesheet" href="../css/auth.css">
</head>

<body>

    <div class="auth-container">

        <div class="auth-card">

            <h1>Reset Password</h1>

            <p>
                Enter your new password below.
            </p>

            <form id="resetPasswordForm">

                <div class="form-group">

                    <label for="newPassword">
                        New Password
                    </label>

                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
                        minlength="8"
                        required
                    >

                </div>


                <div class="form-group">

                    <label for="confirmPassword">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        minlength="8"
                        required
                    >

                </div>


                <button type="submit">
                    Reset Password
                </button>

            </form>

        </div>

    </div>


    <script src="../js/reset-password.js"></script>

</body>

</html>
