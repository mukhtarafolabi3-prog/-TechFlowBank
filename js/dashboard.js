// ========================================
// TECHFLOW BANKING - DASHBOARD
// ========================================

const API_URL =
    "https://techflow-banking-backend.vercel.app";


// ========================================
// DASHBOARD START
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // ========================================
        // GET SAVED USER
        // ========================================

        const savedUser =
            localStorage.getItem(
                "techflowUser"
            );


        if (!savedUser) {

            window.location.href =
                "login.html";

            return;
        }


        // ========================================
        // PARSE USER
        // ========================================

        let loggedInUser;


        try {

            loggedInUser =
                JSON.parse(savedUser);

        } catch (error) {

            console.error(
                "Invalid user data:",
                error
            );

            localStorage.removeItem(
                "techflowUser"
            );

            window.location.href =
                "login.html";

            return;
        }


        // ========================================
        // GET USER OBJECT
        // ========================================

        const savedUserData =
            loggedInUser.user ||
            loggedInUser;


        const userId =
            savedUserData.id;


        if (!userId) {

            console.error(
                "User ID was not found."
            );

            localStorage.removeItem(
                "techflowUser"
            );

            window.location.href =
                "login.html";

            return;
        }


        // ========================================
        // FETCH USER FROM BACKEND
        // ========================================

        try {

            const response =
                await fetch(
                    `${API_URL}/api/users/${userId}`
                );


            const data =
                await response.json();


            console.log(
                "Dashboard API response:",
                data
            );


            if (!response.ok) {

                console.error(
                    "Unable to load user:",
                    data.message
                );

                return;
            }


            // ========================================
            // USER FROM DATABASE
            // ========================================

            const user =
                data.user;


            if (!user) {

                console.error(
                    "No user returned from backend."
                );

                return;
            }


            console.log(
                "Logged-in customer:",
                user
            );


            // ========================================
            // SAVE UPDATED USER
            // ========================================

            localStorage.setItem(
                "techflowUser",
                JSON.stringify(user)
            );


            // ========================================
            // CUSTOMER NAME
            // ========================================

            const firstName =
                user.first_name ||
                "";


            const lastName =
                user.last_name ||
                "";


            const fullName =
                `${firstName} ${lastName}`.trim();


            // ========================================
            // SIDEBAR CUSTOMER NAME
            // ========================================

            const sidebarName =
                document.getElementById(
                    "sidebarName"
                );


            if (sidebarName) {

                sidebarName.textContent =
                    fullName ||
                    "Customer";

            }


            // ========================================
            // TOP USER NAME
            // ========================================

            const topUserName =
                document.getElementById(
                    "topUserName"
                );


            if (topUserName) {

                topUserName.textContent =
                    fullName ||
                    "Customer";

            }


            // ========================================
            // WELCOME CUSTOMER NAME
            // ========================================

            const userName =
                document.getElementById(
                    "userName"
                );


            if (userName) {

                userName.textContent =
                    firstName ||
                    "Customer";

            }


            // ========================================
            // GREETING
            // ========================================

            const greeting =
                document.getElementById(
                    "greeting"
                );


            const currentHour =
                new Date().getHours();


            if (greeting) {

                if (
                    currentHour < 12
                ) {

                    greeting.textContent =
                        "Good morning";

                } else if (
                    currentHour < 18
                ) {

                    greeting.textContent =
                        "Good afternoon";

                } else {

                    greeting.textContent =
                        "Good evening";

                }

            }


            // ========================================
            // ACCOUNT TYPE
            // ========================================

            const accountType =
                user.account_type ||
                "Savings";


            const accountTypeElement =
                document.getElementById(
                    "accountType"
                );


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

            const accountNumber =
                user.account_number ||
                "Not assigned";


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
                Number(
                    user.balance || 0
                );


            const formattedBalance =
                formatCurrency(
                    balance
                );


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

                            console.error(
                                "Copy error:",
                                error
                            );


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

    }
);


// ========================================
// FORMAT NIGERIAN CURRENCY
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
// TOAST MESSAGE
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


    if (
        !toast ||
        !toastMessage
    ) {

        return;
    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}