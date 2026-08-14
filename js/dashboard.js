document.addEventListener("DOMContentLoaded", async () => {

    // ==========================================
    // GET USER ID
    // ==========================================

    const userId = localStorage.getItem("userId");


    // ==========================================
    // CHECK LOGIN
    // ==========================================

    if (!userId) {

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


        const data = await response.json();


        console.log("Dashboard data:", data);


        // ==========================================
        // CHECK RESPONSE
        // ==========================================

        if (!response.ok || !data.success) {

            console.error(
                "Dashboard error:",
                data.message
            );

            return;
        }


        // ==========================================
        // GET USER
        // ==========================================

        const user = data.user;


        const firstName = user.first_name;
        const lastName = user.last_name;


        const fullName =
            `${firstName} ${lastName}`;


        // ==========================================
        // DISPLAY FIRST NAME
        // ==========================================

        const userName =
            document.getElementById("userName");


        if (userName) {

            userName.textContent =
                firstName;

        }


        // ==========================================
        // DISPLAY FULL NAME - TOP RIGHT
        // ==========================================

        const topUserName =
            document.getElementById("topUserName");


        if (topUserName) {

            topUserName.textContent =
                fullName;

        }


        // ==========================================
        // DISPLAY FULL NAME - SIDEBAR
        // ==========================================

        const sidebarName =
            document.getElementById("sidebarName");


        if (sidebarName) {

            sidebarName.textContent =
                fullName;

        }


        // ==========================================
        // DISPLAY ACCOUNT TYPE
        // ==========================================

        console.log(
            "Account Type:",
            user.account_type
        );


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

            avatar.textContent =
                initials;

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


    } catch (error) {

        console.error(
            "Dashboard connection error:",
            error
        );

    }

});