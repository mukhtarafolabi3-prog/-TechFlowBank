document.addEventListener("DOMContentLoaded", () => {

    const userData = localStorage.getItem("techflowUser");

    // If nobody is logged in, go back to login
    if (!userData) {
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(userData);

    // -----------------------------
    // USER NAME
    // -----------------------------

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
        sidebarName.textContent = fullName || "Customer";
    }

    if (topUserName) {
        topUserName.textContent = fullName || "Customer";
    }

    if (userName) {
        userName.textContent = firstName;
    }


    // -----------------------------
    // GREETING
    // -----------------------------

    const greeting =
        document.getElementById("greeting");

    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.textContent = "Good morning";
    } else if (hour < 18) {
        greeting.textContent = "Good afternoon";
    } else {
        greeting.textContent = "Good evening";
    }


    // -----------------------------
    // ACCOUNT INFORMATION
    // -----------------------------

    const accountType =
        user.account_type || "Savings";

    const accountName =
        user.account_name || fullName || "My Account";

    const accountNumber =
        user.account_number || "Not assigned";

    const balance =
        Number(user.balance || 0);


    // -----------------------------
    // ACCOUNT TYPE
    // -----------------------------

    const accountTypeElement =
        document.getElementById("accountType");

    const accountTypeSwitcher =
        document.getElementById("accountTypeSwitcher");

    const menuAccountType =
        document.getElementById("menuAccountType");

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


    // -----------------------------
    // ACCOUNT NUMBER
    // -----------------------------

    const accountNumberElement =
        document.getElementById("accountNumber");

    const accountNumberSwitcher =
        document.getElementById("accountNumberSwitcher");

    const menuAccountNumber =
        document.getElementById("menuAccountNumber");

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


    // -----------------------------
    // BALANCE
    // -----------------------------

    const formattedBalance =
        formatCurrency(balance);

    const accountBalance =
        document.getElementById("accountBalance");

    const summaryBalance =
        document.getElementById("summaryBalance");

    if (accountBalance) {
        accountBalance.textContent =
            formattedBalance;
    }

    if (summaryBalance) {
        summaryBalance.textContent =
            formattedBalance;
    }


    // -----------------------------
    // TOTAL INCOME
    // -----------------------------

    const totalIncome =
        document.getElementById("totalIncome");

    if (totalIncome) {
        totalIncome.textContent =
            formatCurrency(
                Number(user.total_income || 0)
            );
    }


    // -----------------------------
    // TOTAL EXPENSE
    // -----------------------------

    const totalExpense =
        document.getElementById("totalExpense");

    if (totalExpense) {
        totalExpense.textContent =
            formatCurrency(
                Number(user.total_expense || 0)
            );
    }


    // -----------------------------
    // LOGOUT
    // -----------------------------

    const logoutBtn =
        document.getElementById("logoutBtn");

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


    // -----------------------------
    // COPY ACCOUNT NUMBER
    // -----------------------------

    const copyAccount =
        document.getElementById("copyAccount");

    if (copyAccount) {

        copyAccount.addEventListener(
            "click",
            async () => {

                if (
                    !accountNumber ||
                    accountNumber === "Not assigned"
                ) {
                    showToast(
                        "Account number not available"
                    );
                    return;
                }

                try {

                    await navigator.clipboard.writeText(
                        accountNumber
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


    // -----------------------------
    // ACCOUNT SWITCHER
    // -----------------------------

    const accountSwitcher =
        document.getElementById("accountSwitcher");

    const accountMenu =
        document.getElementById("accountMenu");

    if (
        accountSwitcher &&
        accountMenu
    ) {

        accountSwitcher.addEventListener(
            "click",
            () => {

                accountMenu.classList.toggle(
                    "show"
                );

            }
        );

    }


    // -----------------------------
    // MOBILE MENU
    // -----------------------------

    const mobileMenu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("sidebar");

    if (
        mobileMenu &&
        sidebar
    ) {

        mobileMenu.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }

});


// ========================================
// CURRENCY FORMAT
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