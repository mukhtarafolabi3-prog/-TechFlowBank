
// ========================================
// TECHFLOW BANK DASHBOARD
// ========================================

// Local development
// Uses deployed backend automatically on Vercel

const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://techflow-banking-backend.vercel.app";


// ========================================
// DASHBOARD LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        console.log(
            "TechFlow Dashboard loading..."
        );

        console.log(
            "API:",
            API_URL
        );


        // ========================================
        // GET SAVED USER
        // ========================================

        const savedUser =
            localStorage.getItem(
                "techflowUser"
            );


        if (!savedUser) {

            console.warn(
                "No logged-in user found."
            );

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


        const userId =
            loggedInUser.id;


        if (!userId) {

            console.error(
                "User ID is missing:",
                loggedInUser
            );

            localStorage.removeItem(
                "techflowUser"
            );

            window.location.href =
                "login.html";

            return;

        }


        // ========================================
        // GET CURRENT USER FROM DATABASE
        // ========================================

        try {

            console.log(
                "Loading user:",
                userId
            );


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


            // ========================================
            // API ERROR
            // ========================================

            if (!response.ok) {

                console.error(
                    "Unable to load user:",
                    data.message
                );

                return;

            }


            // ========================================
            // CHECK USER
            // ========================================

            if (!data.user) {

                console.error(
                    "No user object returned:",
                    data
                );

                return;

            }


            const user =
                data.user;


            console.log(
                "User from database:",
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
                user.firstName ||
                "";

            const lastName =
                user.last_name ||
                user.lastName ||
                "";


            const fullName =
                `${firstName} ${lastName}`
                    .trim();


            console.log(
                "Customer first name:",
                firstName
            );

            console.log(
                "Customer last name:",
                lastName
            );

            console.log(
                "Customer full name:",
                fullName
            );


            // ========================================
            // NAME ELEMENTS
            // ========================================

            const sidebarName =
                document.getElementById(
                    "sidebarName"
                );

            const topUserName =
                document.getElementById(
                    "topUserName"
                );

            const userName =
                document.getElementById(
                    "userName"
                );


            // ========================================
            // SIDEBAR NAME
            // ========================================

            if (sidebarName) {

                sidebarName.textContent =
                    fullName ||
                    "Customer";

            }


            // ========================================
            // TOP USER NAME
            // ========================================

            if (topUserName) {

                topUserName.textContent =
                    fullName ||
                    "Customer";

            }


            // ========================================
            // GREETING NAME
            // ========================================

            if (userName) {

                userName.textContent =
                    firstName ||
                    fullName ||
                    "Customer";

            }


            // ========================================
            // GREETING
            // ========================================

            const greeting =
                document.getElementById(
                    "greeting"
                );


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
            // ACCOUNT TYPE
            // ========================================

            const accountType =
                user.account_type ||
                user.accountType ||
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
                user.accountNumber ||
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

                        localStorage.removeItem(
                            "techflowToken"
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

                            await navigator
                                .clipboard
                                .writeText(
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
// CURRENCY
// ========================================

function formatCurrency(
    amount
) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",

            currency: "NGN",

            minimumFractionDigits: 2,

            maximumFractionDigits: 2
        }
    ).format(amount);

}


// ========================================
// TOAST
// ========================================

function showToast(
    message
) {

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
