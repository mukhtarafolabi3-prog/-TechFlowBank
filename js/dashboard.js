
document.addEventListener("DOMContentLoaded", async () => {

    // ==========================================
    // GREETING
    // ==========================================

    const currentHour = new Date().getHours();

    let greeting;

    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    const greetingElement =
        document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.textContent = greeting;
    }


    // ==========================================
    // GET USER ID
    // ==========================================

    const userId =
        localStorage.getItem("userId");

    if (!userId) {
        window.location.href = "login.html";
        return;
    }


    // ==========================================
    // GET DASHBOARD DATA
    // ==========================================

    try {

        const response = await fetch(
            `http://localhost:3000/api/dashboard/${userId}`
        );

        const data = await response.json();

        console.log("Dashboard data:", data);


        if (!response.ok || !data.success) {

            console.error(
                "Dashboard error:",
                data.message
            );

            return;
        }


        // ==========================================
        // USER
        // ==========================================

        const user = data.user || {};

        const firstName =
            user.first_name || "";

        const lastName =
            user.last_name || "";

        const fullName =
            `${firstName} ${lastName}`.trim();


        // ==========================================
        // ACCOUNT
        // ==========================================

        const accountNumber =
            user.account_number || "Not assigned";

        const accountType =
            user.account_type || "Not available";

        const balance =
            Number(user.balance || 0);

        const currency =
            user.currency || "NGN";


        // ==========================================
        // NAME
        // ==========================================

        const userName =
            document.getElementById("userName");

        if (userName) {
            userName.textContent = firstName;
        }


        const topUserName =
            document.getElementById("topUserName");

        if (topUserName) {
            topUserName.textContent = fullName;
        }


        const sidebarName =
            document.getElementById("sidebarName");

        if (sidebarName) {
            sidebarName.textContent = fullName;
        }


        // ==========================================
        // BALANCE
        // ==========================================

        const accountBalance =
            document.getElementById("accountBalance");

        if (accountBalance) {

            accountBalance.textContent =
                `₦${balance.toLocaleString(
                    "en-NG",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}`;
        }


        // ==========================================
        // ACCOUNT NUMBER
        // ==========================================

        const accountNumberElement =
            document.getElementById(
                "accountNumber"
            );

        if (accountNumberElement) {
            accountNumberElement.textContent =
                accountNumber;
        }


        // ==========================================
        // ACCOUNT TYPE
        // ==========================================

        const accountTypeElement =
            document.getElementById(
                "accountType"
            );

        if (accountTypeElement) {

            accountTypeElement.textContent =
                `${accountType} Account`;
        }


        // ==========================================
        // CURRENCY
        // ==========================================

        const currencyElement =
            document.getElementById(
                "currency"
            );

        if (currencyElement) {
            currencyElement.textContent =
                currency;
        }


        // ==========================================
        // AVATAR
        // ==========================================

        const initials =
            `${firstName.charAt(0)}${lastName.charAt(0)}`
                .toUpperCase();

        const avatars =
            document.querySelectorAll(
                ".avatar, .profile-avatar"
            );

        avatars.forEach((avatar) => {
            avatar.textContent = initials;
        });


        // ==========================================
        // SAVE DATA
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
            "accountNumber",
            accountNumber
        );

        localStorage.setItem(
            "accountType",
            accountType
        );

        localStorage.setItem(
            "currency",
            currency
        );


    } catch (error) {

        console.error(
            "Dashboard connection error:",
            error
        );

    }


    // ==========================================
    // LOGOUT
    // ==========================================

    const logoutBtn =
        document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.clear();

                window.location.href =
                    "login.html";

            }
        );

    }

})