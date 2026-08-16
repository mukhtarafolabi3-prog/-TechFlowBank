
// ========================================
// TECHFLOW BANK DASHBOARD
// ========================================


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ========================================
        // GET LOGGED-IN USER
        // ========================================

        const savedUser =
            localStorage.getItem(
                "techflowUser"
            );


        // ========================================
        // NO USER = GO BACK TO LOGIN
        // ========================================

        if (!savedUser) {

            window.location.href =
                "login.html";

            return;

        }



        // ========================================
        // PARSE USER
        // ========================================

        let user;


        try {

            user =
                JSON.parse(savedUser);

        } catch (error) {

            console.error(
                "Invalid saved user:",
                error
            );

            localStorage.removeItem(
                "techflowUser"
            );

            window.location.href =
                "login.html";

            return;

        }



        console.log(
            "Dashboard user:",
            user
        );



        // ========================================
        // USER NAME
        // ========================================

        const firstName =
            user.first_name || "";

        const lastName =
            user.last_name || "";


        const fullName =
            `${firstName} ${lastName}`
                .trim();



        // ========================================
        // INITIALS
        // ========================================

        let initials = "CU";


        if (firstName || lastName) {

            initials =
                (
                    firstName.charAt(0) +
                    lastName.charAt(0)
                )
                .toUpperCase();

        }



        // ========================================
        // GREETING
        // ========================================

        const hour =
            new Date().getHours();


        let greeting =
            "Welcome";


        if (hour < 12) {

            greeting =
                "Good morning";

        } else if (hour < 18) {

            greeting =
                "Good afternoon";

        } else {

            greeting =
                "Good evening";

        }



        const greetingElement =
            document.getElementById(
                "greeting"
            );


        if (greetingElement) {

            greetingElement.textContent =
                greeting;

        }



        // ========================================
        // NAME ELEMENTS
        // ========================================

        const userName =
            document.getElementById(
                "userName"
            );


        const sidebarName =
            document.getElementById(
                "sidebarName"
            );


        const topUserName =
            document.getElementById(
                "topUserName"
            );


        if (userName) {

            userName.textContent =
                firstName || "Customer";

        }


        if (sidebarName) {

            sidebarName.textContent =
                fullName || "Customer";

        }


        if (topUserName) {

            topUserName.textContent =
                fullName || "Customer";

        }



        // ========================================
        // AVATARS
        // ========================================

        const sidebarAvatar =
            document.getElementById(
                "sidebarAvatar"
            );


        const topAvatar =
            document.getElementById(
                "topAvatar"
            );


        if (sidebarAvatar) {

            sidebarAvatar.textContent =
                initials;

        }


        if (topAvatar) {

            topAvatar.textContent =
                initials;

        }



        // ========================================
        // ACCOUNT DATA
        // ========================================

        const accountType =
            user.account_type ||
            "Savings";


        const accountName =
            user.account_name ||
            "Personal Account";


        const accountNumber =
            user.account_number ||
            "Not assigned";


        const balance =
            Number(user.balance || 0);



        // ========================================
        // ACCOUNT TYPE
        // ========================================

        const accountTypeElement =
            document.getElementById(
                "accountType"
            );


        if (accountTypeElement) {

            accountTypeElement.textContent =
                accountType;

        }



        // ========================================
        // ACCOUNT NUMBER
        // ========================================

        const accountNumberElement =
            document.getElementById(
                "accountNumber"
            );


        if (accountNumberElement) {

            accountNumberElement.textContent =
                accountNumber;

        }



        // ========================================
        // SWITCHER
        // ========================================

        const accountTypeSwitcher =
            document.getElementById(
                "accountTypeSwitcher"
            );


        const accountNumberSwitcher =
            document.getElementById(
                "accountNumberSwitcher"
            );


        if (accountTypeSwitcher) {

            accountTypeSwitcher.textContent =
                accountName;

        }


        if (accountNumberSwitcher) {

            accountNumberSwitcher.textContent =
                accountNumber;

        }



        // ========================================
        // BALANCE FORMATTER
        // ========================================

        function formatMoney(amount) {

            return new Intl.NumberFormat(
                "en-NG",
                {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 2
                }
            ).format(amount);

        }



        const formattedBalance =
            formatMoney(balance);



        // ========================================
        // MAIN BALANCE
        // ========================================

        const accountBalance =
            document.getElementById(
                "accountBalance"
            );


        if (accountBalance) {

            accountBalance.textContent =
                formattedBalance;

        }



        // ========================================
        // SUMMARY BALANCE
        // ========================================

        const summaryBalance =
            document.getElementById(
                "summaryBalance"
            );


        if (summaryBalance) {

            summaryBalance.textContent =
                formattedBalance;

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
                        !accountNumber ||
                        accountNumber ===
                        "Not assigned"
                    ) {

                        return;

                    }


                    try {

                        await navigator.clipboard.writeText(
                            accountNumber
                        );


                        showToast(
                            "Account number copied."
                        );

                    } catch (error) {

                        console.error(
                            "Copy failed:",
                            error
                        );

                    }

                }
            );

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

                    localStorage.removeItem(
                        "techflowToken"
                    );


                    window.location.href =
                        "login.html";

                }
            );

        }



        // ========================================
        // MOBILE MENU
        // ========================================

        const mobileMenu =
            document.getElementById(
                "mobileMenu"
            );


        const sidebar =
            document.getElementById(
                "sidebar"
            );


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


            if (!toast) {
                return;
            }


            if (toastMessage) {

                toastMessage.textContent =
                    message;

            }


            toast.classList.add(
                "show"
            );


            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2500
            );

        }

    }
);
