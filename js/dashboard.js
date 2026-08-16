const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {

    // ========================================
    // GET LOGGED-IN USER
    // ========================================

    const savedUser =
        localStorage.getItem("techflowUser");

    if (!savedUser) {
        window.location.href = "login.html";
        return;
    }

    const loggedInUser = JSON.parse(savedUser);

    const userId = loggedInUser.id;

    if (!userId) {
        localStorage.removeItem("techflowUser");
        window.location.href = "login.html";
        return;
    }


    // ========================================
    // GET USER FROM BACKEND
    // ========================================

    try {

        const response = await fetch(
            `${API_URL}/api/users/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {

            console.error(
                "Unable to load user:",
                data.message
            );

            return;
        }


        const user = data.user;


        // ========================================
        // UPDATE LOCAL STORAGE
        // ========================================

        localStorage.setItem(
            "techflowUser",
            JSON.stringify(user)
        );


        // ========================================
        // NAME
        // ========================================

        const fullName =
            `${user.first_name || ""} ${user.last_name || ""}`.trim();

        const firstName =
            user.first_name || "Customer";


        const sidebarName =
            document.getElementById("sidebarName");

        const topUserName =
            document.getElementById("topUserName");

        const userName =
            document.getElementById("userName");


        if (sidebarName) {
            sidebarName.textContent =
                fullName || "Customer";
        }

        if (topUserName) {
            topUserName.textContent =
                fullName || "Customer";
        }

        if (userName) {
            userName.textContent =
                firstName;
        }


        // ========================================
        // GREETING
        // ========================================

        const greeting =
            document.getElementById("greeting");

        const hour =
            new Date().getHours();


        if (greeting) {

            if (hour < 12) {

                greeting.textContent =
                    "Good morning";

            } else if (hour < 18) {

                greeting.textContent =
                    "Good afternoon";

            } else {

                greeting.textContent =
                    "Good evening";

            }

        }


        // ========================================
        // ACCOUNT INFORMATION
        // ========================================

        const accountType =
            user.account_type || "Savings";

        const accountNumber =
            user.account_number || "Not assigned";


        // ========================================
        // ACCOUNT TYPE
        // ========================================

        const accountTypeElement =
            document.getElementById("accountType");

        const accountTypeSwitcher =
            document.getElementById(
                "accountTypeSwitcher"
            );

        const menuAccountType =
            document.getElementById(
                "menuAccountType"
            );


        if (accountTypeElement) {

            accountTypeElement.textContent =
                accountType;

        }

        if (accountTypeSwitcher) {

            accountTypeSwitcher.textContent =
                accountType;

        }

        if (menuAccountType) {

            menuAccountType.textContent =
                accountType;

        }


        // ========================================
        // ACCOUNT NUMBER
        // ========================================

        const accountNumberElement =
            document.getElementById(
                "accountNumber"
            );

        const accountNumberSwitcher =
            document.getElementById(
                "accountNumberSwitcher"
            );

        const menuAccountNumber =
            document.getElementById(
                "menuAccountNumber"
            );


        if (accountNumberElement) {

            accountNumberElement.textContent =
                accountNumber;

        }

        if (accountNumberSwitcher) {

            accountNumberSwitcher.textContent =
                accountNumber;

        }

        if (menuAccountNumber) {

            menuAccountNumber.textContent =
                accountNumber;

        }


        // ========================================
        // BALANCE
        // ========================================

        const balance =
            Number(user.balance || 0);


        const formattedBalance =
            formatCurrency(balance);


        const accountBalance =
            document.getElementById(
                "accountBalance"
            );

        const summaryBalance =
            document.getElementById(
                "summaryBalance"
            );


        if (accountBalance) {

            accountBalance.textContent =
                formattedBalance;

        }

        if (summaryBalance) {

            summaryBalance.textContent =
                formattedBalance;

        }


        // ========================================
        // LOGOUT
        // ========================================

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "techflowUser"
                    );

                    window.location.href =
                        "login.html";

                }
            );

        }


        // ========================================
        // COPY ACCOUNT NUMBER
        // ========================================

        const copyAccount =
            document.getElementById(
                "copyAccount"
            );


        if (copyAccount) {

            copyAccount.addEventListener(
                "click",
                async () => {

                    if (
                        !user.account_number
                    ) {

                        showToast(
                            "Account number not available"
                        );

                        return;
                    }


                    try {

                        await navigator.clipboard.writeText(
                            user.account_number
                        );

                        showToast(
                            "Account number copied"
                        );

                    } catch (error) {

                        console.error(error);

                        showToast(
                            "Unable to copy account number"
                        );

                    }

                }
            );

        }


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

});


// ========================================
// CURRENCY
// ========================================

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2
        }
    ).format(amount);

}


// ========================================
// TOAST
// ========================================

function showToast(message) {

    const toast =
        document.getElementById(
            "dashboardToast"
        );

    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (!toast || !toastMessage) {
        return;
    }


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}