document.addEventListener("DOMContentLoaded", async () => {

    // ==========================================
    // GET USER ID
    // ==========================================

    const userId = localStorage.getItem("userId");

    console.log("User ID:", userId);


    // ==========================================
    // CHECK LOGIN
    // ==========================================

    if (!userId) {

        console.log("No user ID found. Redirecting to login.");

        window.location.href = "login.html";

        return;
    }


    // ==========================================
    // GET DASHBOARD FROM BACKEND
    // ==========================================

    try {

        const response = await fetch(
            `http://localhost:3000/api/dashboard/${userId}`
        );

        console.log("Response status:", response.status);


        const data = await response.json();

        console.log("Dashboard data:", data);


        // ==========================================
        // CHECK RESPONSE
        // ==========================================

        if (!response.ok || !data.success) {

            console.error(
                "Dashboard error:",
                data.message || "Unable to load dashboard"
            );

            return;
        }


        // ==========================================
        // GET USER
        // ==========================================

        const user = data.user;

        console.log("User:", user);


        const firstName = user.first_name;
        const lastName = user.last_name;

        const fullName = `${firstName} ${lastName}`;


        // ==========================================
        // DISPLAY FIRST NAME
        // ==========================================

        const userName =
            document.getElementById("userName");

        if (userName) {

            userName.textContent = firstName;

        }


        // ==========================================
        // DISPLAY FULL NAME - TOP RIGHT
        // ==========================================

        const topUserName =
            document.getElementById("topUserName");

        if (topUserName) {

            topUserName.textContent = fullName;

        }


        // ==========================================
        // DISPLAY FULL NAME - SIDEBAR
        // ==========================================

        const sidebarName =
            document.getElementById("sidebarName");

        if (sidebarName) {

            sidebarName.textContent = fullName;

        }


        // ==========================================
        // DISPLAY ACCOUNT TYPE
        // ==========================================

        const accountType =
            document.getElementById("accountType");

        if (accountType) {

            accountType.textContent =
                user.account_type || "Account";

        }


        // ==========================================
        // DISPLAY INITIALS
        // ==========================================

        const initials =
            `${firstName.charAt(0)}${lastName.charAt(0)}`
            .toUpperCase();


        const avatars =
            document.querySelectorAll(
                ".avatar, .profile-avatar"
            );


        avatars.forEach(avatar => {

            avatar.textContent = initials;

        });


        // ==========================================
        // SAVE USER DATA
        // ==========================================

        localStorage.setItem(
            "firstName",
            firstName
        );

        localStorage.setItem(
            "lastName",
            lastName
        );

        localStorage.setItem(
            "email",
            user.email
        );

        localStorage.setItem(
            "accountType",
            user.account_type || ""
        );


    } catch (error) {

        console.error(
            "Dashboard connection error:",
            error
        );

    }

});