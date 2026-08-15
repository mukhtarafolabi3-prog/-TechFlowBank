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

    const greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.textContent = greeting;
    }


    // ==========================================
    // GET USER ID
    // ==========================================

    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("No userId found in localStorage");

        window.location.href = "login.html";

        return;
    }

    console.log("User ID:", userId);


    // ==========================================
    // GET DASHBOARD DATA
    // ==========================================

    try {

        const response = await fetch(
            `http://localhost:3000/api/dashboard/${userId}`
        );

        // Check if server returned JSON
        const data = await response.json();

        console.log("Dashboard response:", data);


        // ==========================================
        // CHECK RESPONSE
        // ==========================================

        if (!response.ok) {

            console.error(
                "Server error:",
                data.message || "Unable to load dashboard"
            );

            return;
        }


        if (!data.success) {

            console.error(
                "Dashboard error:",
                data.message || "Dashboard request failed"
            );

            return;
        }


        // ==========================================
        // USER DATA
        // ==========================================

        const user = data.user || {};

        const firstName = user.first_name || "";

        const lastName = user.last_name || "";

        const fullName =
            `${firstName} ${lastName}`.trim();


        // ==========================================
        // ACCOUNT DATA
        // ==========================================

        const accountNumber =
            user.account_number || "Not assigned";

        const accountType =
            user.account_type || "Not available";

        const balance =
            Number(user.balance || 0);


        // ==========================================
        // DISPLAY SIDEBAR USER NAME
        // ==========================================

        const sidebarUserName =
            document.getElementById("sidebarUserName");

        if (sidebarUserName) {
            sidebarUserName.textContent = fullName;
        }


        // ==========================================
        // DISPLAY DASHBOARD FIRST NAME
        // ==========================================

        const userName =
            document.getElementById("userName");

        if (userName) {
            userName.textContent = firstName;
        }


        // ==========================================
        // DISPLAY ACCOUNT BALANCE
        // ==========================================

        const accountBalance =
            document.getElementById("accountBalance");

        if (accountBalance) {

            accountBalance.textContent =
                `₦${balance.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`;

        }


        // ==========================================
        // DISPLAY ACCOUNT NUMBER
        // ==========================================

        const accountNumberElement =
            document.getElementById("accountNumber");

        if (accountNumberElement) {
            accountNumberElement.textContent =
                accountNumber;
        }


        // ==========================================
        // DISPLAY ACCOUNT TYPE
        // ==========================================

        const accountTypeElement =
            document.getElementById("accountType");

        if (accountTypeElement) {

            accountTypeElement.textContent =
                `${accountType} Account`;

        }


        // ==========================================
        // DISPLAY HEADER USER
        // ==========================================

        const headerUser =
            document.querySelector(".header-user strong");

        if (headerUser) {
            headerUser.textContent = firstName;
        }


        // ==========================================
        // DISPLAY FULL NAME
        // ==========================================

        const topUserName =
            document.getElementById("topUserName");

        if (topUserName) {
            topUserName.textContent = fullName;
        }


        // ==========================================
        // DISPLAY AVATARS
        // ==========================================

        const initials =
            `${firstName.charAt(0)}${lastName.charAt(0)}`
                .toUpperCase();

        const avatars =
            document.querySelectorAll(
                ".user-avatar, .header-avatar, .avatar, .profile-avatar"
            );

        avatars.forEach((avatar) => {
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
            user.email || ""
        );

        localStorage.setItem(
            "accountNumber",
            accountNumber
        );

        localStorage.setItem(
            "accountType",
            accountType
        );


        console.log("Dashboard loaded successfully");


    } catch (error) {

        console.error(
            "Dashboard connection error:",
            error
        );

    }


    // ==========================================
    // COPY ACCOUNT NUMBER
    // ==========================================

    const copyAccount =
        document.getElementById("copyAccount");

    const accountNumberElement =
        document.getElementById("accountNumber");

    const toast =
        document.getElementById("dashboardToast");

    const toastMessage =
        document.getElementById("toastMessage");


    if (
        copyAccount &&
        accountNumberElement
    ) {

        copyAccount.addEventListener(
            "click",
            async () => {

                try {

                    await navigator.clipboard.writeText(
                        accountNumberElement.textContent
                    );


                    if (toastMessage) {

                        toastMessage.textContent =
                            "Account number copied.";

                    }


                    if (toast) {

                        toast.classList.add("show");


                        setTimeout(() => {

                            toast.classList.remove("show");

                        }, 2500);

                    }

                } catch (error) {

                    console.error(
                        "Copy error:",
                        error
                    );

                }

            }
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

                localStorage.removeItem("userId");

                localStorage.removeItem("firstName");

                localStorage.removeItem("lastName");

                localStorage.removeItem("email");

                localStorage.removeItem("accountNumber");

                localStorage.removeItem("accountType");

                localStorage.removeItem("token");


                window.location.href =
                    "login.html";

            }
        );

    }

});