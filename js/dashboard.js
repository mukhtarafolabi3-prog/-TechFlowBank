document.addEventListener("DOMContentLoaded", () => {

    // Get registered user's name
    const firstName =
        localStorage.getItem("firstName");

    const lastName =
        localStorage.getItem("lastName");


    // Check if user is logged in
    if (!firstName || !lastName) {

        window.location.href = "login.html";

        return;
    }


    // Full registered name
    const fullName =
        `${firstName} ${lastName}`;


    // =================================
    // DISPLAY NAME
    // =================================

    const userName =
        document.getElementById("userName");

    const topUserName =
        document.getElementById("topUserName");

    const sidebarName =
        document.getElementById("sidebarName");


    if (userName) {
        userName.textContent = firstName;
    }


    if (topUserName) {
        topUserName.textContent = fullName;
    }


    if (sidebarName) {
        sidebarName.textContent = fullName;
    }


    // =================================
    // DISPLAY INITIALS
    // =================================

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

});