
// ========================================
// TECHFLOW DYNAMIC BANK
// DASHBOARD JAVASCRIPT
// ========================================

const API_URL = "http://localhost:3000";


// ========================================
// DOM READY
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // GET LOGGED-IN USER
    // ========================================

    const savedUser =
        localStorage.getItem("techflowUser");

    if (!savedUser) {

        window.location.href = "login.html";

        return;
    }


    let user;

    try {

        user = JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "Invalid saved user:",
            error
        );

        localStorage.removeItem("techflowUser");

        window.location.href =
            "login.html";

        return;
    }


    // ========================================
    // DEBUG
    // ========================================

    console.log(
        "Logged-in customer:",
        user
    );


    // ========================================
    // CUSTOMER NAME
    // ========================================

    const firstName =
        String(
            user.first_name ||
            user.firstName ||
            ""
        ).trim();


    const lastName =
        String(
            user.last_name ||
            user.lastName ||
            ""
        ).trim();


    const fullName =
        `${firstName} ${lastName}`.trim();


    // IMPORTANT:
    // Do NOT use "Customer" when we have
    // first_name / last_name available.

    const displayFullName =
        fullName ||
        user.account_name ||
        user.name ||
        user.username ||
        "Customer";


    const displayFirstName =
        firstName ||
        user.account_name ||
        user.name ||
        "Customer";


    // ========================================
    // DISPLAY CUSTOMER NAME
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


    if (sidebarName) {

        sidebarName.textContent =
            displayFullName;

    }


    if (topUserName) {

        topUserName.textContent =
            displayFullName;

    }


    if (userName) {

        userName.textContent =
            displayFirstName;

    }


    // ========================================
    // AVATARS
    // ========================================

    const avatars =
        document.querySelectorAll(
            ".avatar"
        );


    let initials = "CU";


    if (firstName || lastName) {

        initials =
            `${firstName.charAt(0)}${lastName.charAt(0)}`
                .toUpperCase();

    } else if (firstName) {

        initials =
            firstName
                .substring(0, 2)
                .toUpperCase();

    }


    avatars.forEach(
        avatar => {

            avatar.textContent =
                initials;

        }
    );


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
    // ACCOUNT INFORMATION
    // ========================================

    const accountType =
        user.account_type ||
        user.accountType ||
        "Savings";


    const accountNumber =
        user.account_number ||
        user.accountNumber ||
        "Not assigned";


    const balance =
        Number(
            user.balance || 0
        );


    // ========================================
    // ACCOUNT TYPE
    // ========================================

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
    // TOTAL INCOME
    // ========================================

    const totalIncome =
        Number(
            user.total_income ||
            user.totalIncome ||
            0
        );


    const totalIncomeElement =
        document.getElementById(
            "totalIncome"
        );


    if (totalIncomeElement) {

        totalIncomeElement.textContent =
            formatCurrency(
                totalIncome
            );

    }


    // ========================================
    // TOTAL EXPENSE
    // ========================================

    const totalExpense =
        Number(
            user.total_expense ||
            user.totalExpense ||
            0
        );


    const totalExpenseElement =
        document.getElementById(
            "totalExpense"
        );


    if (totalExpenseElement) {

        totalExpenseElement.textContent =
            formatCurrency(
                totalExpense
            );

    }


    // ========================================
    // SPENDING
    // ========================================

    const spending =
        Number(
            user.total_expense ||
            user.totalExpense ||
            0
        );


    const spendingTotal =
        document.getElementById(
            "spendingTotal"
        );


    if (spendingTotal) {

        spendingTotal.textContent =
            formatCurrency(
                spending
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
                    !user.account_number &&
                    !user.accountNumber
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


                localStorage.removeItem(
                    "techflowRememberMe"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    // ========================================
    // ACCOUNT SWITCHER
    // ========================================

    const accountSwitcher =
        document.getElementById(
            "accountSwitcher"
        );


    const accountMenu =
        document.getElementById(
            "accountMenu"
        );


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


        document.addEventListener(
            "click",
            event => {

                if (
                    !accountSwitcher.contains(
                        event.target
                    ) &&
                    !accountMenu.contains(
                        event.target
                    )
                ) {

                    accountMenu.classList.remove(
                        "show"
                    );

                }

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
    // LOAD RECENT TRANSACTIONS
    // ========================================

    loadRecentTransactions(
        user.id
    );

});


// ========================================
// FORMAT CURRENCY
// ========================================

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-NG",
        {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2
        }
    ).format(
        Number(amount) || 0
    );

}


// ========================================
// LOAD RECENT TRANSACTIONS
// ========================================

async function loadRecentTransactions(
    userId
) {

    const container =
        document.getElementById(
            "recentTransactions"
        );


    if (!container || !userId) {
        return;
    }


    const token =
        localStorage.getItem(
            "techflowToken"
        );


    try {

        const response =
            await fetch(
                `${API_URL}/api/transactions/${userId}`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type":
                            "application/json",

                        ...(token
                            ? {
                                Authorization:
                                    `Bearer ${token}`
                            }
                            : {})
                    }
                }
            );


        if (!response.ok) {

            console.log(
                "Transactions endpoint not available yet."
            );

            return;
        }


        const data =
            await response.json();


        const transactions =
            data.transactions || [];


        const header =
            `
            <div class="transaction-row header">

                <span>
                    DESCRIPTION
                </span>

                <span>
                    DATE
                </span>

                <span>
                    AMOUNT
                </span>

                <span>
                    STATUS
                </span>

            </div>
            `;


        if (!transactions.length) {

            container.innerHTML =
                header +
                `
                <div class="transaction-loading">
                    No recent transactions.
                </div>
                `;

            return;
        }


        const rows =
            transactions
                .slice(0, 5)
                .map(
                    transaction => {

                        const description =
                            transaction.description ||
                            transaction.type ||
                            "Transaction";


                        const date =
                            transaction.created_at ||
                            transaction.date ||
                            "";


                        const amount =
                            Number(
                                transaction.amount || 0
                            );


                        const status =
                            transaction.status ||
                            "Completed";


                        return `
                            <div class="transaction-row">

                                <span>
                                    ${escapeHtml(
                                        description
                                    )}
                                </span>

                                <span>
                                    ${formatDate(
                                        date
                                    )}
                                </span>

                                <span>
                                    ${formatCurrency(
                                        amount
                                    )}
                                </span>

                                <span>
                                    ${escapeHtml(
                                        status
                                    )}
                                </span>

                            </div>
                        `;

                    }
                )
                .join("");


        container.innerHTML =
            header + rows;


    } catch (error) {

        console.error(
            "Transaction loading error:",
            error
        );

    }

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(
    date
) {

    if (!date) {
        return "-";
    }


    const parsedDate =
        new Date(date);


    if (
        Number.isNaN(
            parsedDate.getTime()
        )
    ) {

        return "-";

    }


    return parsedDate.toLocaleDateString(
        "en-NG",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

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
