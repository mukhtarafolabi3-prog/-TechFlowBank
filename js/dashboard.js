// =====================================================
// TECHFLOW DYNAMIC BANK - CUSTOMER DASHBOARD
// =====================================================

const API_URL = "http://localhost:3000";


// =====================================================
// DASHBOARD START
// =====================================================

document.addEventListener("DOMContentLoaded", async () => {

    // =================================================
    // GET LOGGED-IN USER
    // =================================================

    const savedUser =
        localStorage.getItem("techflowUser");

    if (!savedUser) {

        window.location.href = "login.html";

        return;
    }


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

        localStorage.removeItem(
            "techflowUser"
        );

        window.location.href =
            "login.html";

        return;
    }


    // =================================================
    // LOAD USER
    // =================================================

    try {

        const response =
            await fetch(
                `${API_URL}/api/users/${userId}`
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Unable to load user:",
                data.message
            );

            showToast(
                data.message ||
                "Unable to load account"
            );

            return;
        }


        const user =
            data.user;


        // =================================================
        // UPDATE LOCAL STORAGE
        // =================================================

        localStorage.setItem(
            "techflowUser",
            JSON.stringify(user)
        );


        // =================================================
        // NAME
        // =================================================

        const firstName =
            user.first_name ||
            "Customer";


        const fullName =
            `${user.first_name || ""} ${user.last_name || ""}`
                .trim();


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


        // =================================================
        // AVATARS
        // =================================================

        const initials =
            getInitials(
                user.first_name,
                user.last_name
            );


        document
            .querySelectorAll(".avatar")
            .forEach((avatar) => {

                avatar.textContent =
                    initials;

            });


        // =================================================
        // GREETING
        // =================================================

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


        // =================================================
        // ACCOUNT INFORMATION
        // =================================================

        const accountType =
            user.account_type ||
            "Savings";


        const accountNumber =
            user.account_number ||
            "Not assigned";


        // =================================================
        // ACCOUNT TYPE
        // =================================================

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


        // =================================================
        // ACCOUNT NUMBER
        // =================================================

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


        // =================================================
        // BALANCE
        // =================================================

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


        // =================================================
        // LOAD TRANSACTIONS
        // =================================================

        await loadTransactions(
            userId
        );


        // =================================================
        // LOGOUT
        // =================================================

        setupLogout();


        // =================================================
        // COPY ACCOUNT NUMBER
        // =================================================

        setupCopyAccount(
            user
        );


        // =================================================
        // MOBILE MENU
        // =================================================

        setupMobileMenu();


        // =================================================
        // ACCOUNT SWITCHER
        // =================================================

        setupAccountSwitcher();


        // =================================================
        // BALANCE MENU
        // =================================================

        setupBalanceMenu();


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        showToast(
            "Unable to connect to the server"
        );

    }

});


// =====================================================
// GET INITIALS
// =====================================================

function getInitials(
    firstName,
    lastName
) {

    const first =
        firstName
            ? firstName
                .charAt(0)
                .toUpperCase()
            : "";


    const last =
        lastName
            ? lastName
                .charAt(0)
                .toUpperCase()
            : "";


    return (
        first +
        last
    ) || "CU";

}


// =====================================================
// LOAD TRANSACTIONS
// =====================================================

async function loadTransactions(
    userId
) {

    const container =
        document.getElementById(
            "recentTransactions"
        );


    if (!container) {

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/transactions/${userId}`
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "Transaction error:",
                data.message
            );

            showEmptyTransactions();

            return;
        }


        const transactions =
            data.transactions || [];


        // =================================================
        // CALCULATE INCOME AND EXPENSE
        // =================================================

        let totalIncome = 0;

        let totalExpense = 0;


        transactions.forEach(
            (transaction) => {

                const amount =
                    Number(
                        transaction.amount || 0
                    );


                const type =
                    String(
                        transaction.type || ""
                    )
                    .toLowerCase();


                if (
                    type === "deposit" ||
                    type === "income"
                ) {

                    totalIncome +=
                        amount;

                } else {

                    totalExpense +=
                        amount;

                }

            }
        );


        // =================================================
        // UPDATE SUMMARY
        // =================================================

        const incomeElement =
            document.getElementById(
                "totalIncome"
            );


        const expenseElement =
            document.getElementById(
                "totalExpense"
            );


        const spendingTotal =
            document.getElementById(
                "spendingTotal"
            );


        const spendingBills =
            document.querySelector(
                ".spending-list div:nth-child(1) strong"
            );


        const spendingTransfers =
            document.querySelector(
                ".spending-list div:nth-child(2) strong"
            );


        const spendingWithdrawals =
            document.querySelector(
                ".spending-list div:nth-child(3) strong"
            );


        if (incomeElement) {

            incomeElement.textContent =
                formatCurrency(
                    totalIncome
                );

        }


        if (expenseElement) {

            expenseElement.textContent =
                formatCurrency(
                    totalExpense
                );

        }


        if (spendingTotal) {

            spendingTotal.textContent =
                formatCurrency(
                    totalExpense
                );

        }


        // =================================================
        // SPENDING BREAKDOWN
        // =================================================

        let bills = 0;

        let transfers = 0;

        let withdrawals = 0;

        let others = 0;


        transactions.forEach(
            (transaction) => {

                const amount =
                    Number(
                        transaction.amount || 0
                    );


                const type =
                    String(
                        transaction.type || ""
                    )
                    .toLowerCase();


                if (
                    type === "bill" ||
                    type === "bills"
                ) {

                    bills += amount;

                } else if (
                    type === "transfer"
                ) {

                    transfers += amount;

                } else if (
                    type === "withdraw" ||
                    type === "withdrawal"
                ) {

                    withdrawals += amount;

                } else if (
                    type !== "deposit"
                ) {

                    others += amount;

                }

            }
        );


        if (spendingBills) {

            spendingBills.textContent =
                formatCurrency(
                    bills
                );

        }


        if (spendingTransfers) {

            spendingTransfers.textContent =
                formatCurrency(
                    transfers
                );

        }


        if (spendingWithdrawals) {

            spendingWithdrawals.textContent =
                formatCurrency(
                    withdrawals
                );

        }


        // =================================================
        // DISPLAY RECENT TRANSACTIONS
        // =================================================

        container.innerHTML = "";


        // HEADER

        const header =
            document.createElement(
                "div"
            );


        header.className =
            "transaction-row header";


        header.innerHTML = `
            <span>DESCRIPTION</span>
            <span>DATE</span>
            <span>AMOUNT</span>
            <span>STATUS</span>
        `;


        container.appendChild(
            header
        );


        if (
            transactions.length === 0
        ) {

            showEmptyTransactions();

            return;
        }


        // Show latest 5

        const recent =
            transactions.slice(
                0,
                5
            );


        recent.forEach(
            (transaction) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "transaction-row";


                const type =
                    String(
                        transaction.type || ""
                    )
                    .toLowerCase();


                const amount =
                    Number(
                        transaction.amount || 0
                    );


                const isIncome =
                    type === "deposit" ||
                    type === "income";


                const sign =
                    isIncome
                        ? "+"
                        : "-";


                const amountClass =
                    isIncome
                        ? "positive"
                        : "negative";


                const description =
                    transaction.description ||
                    capitalize(
                        transaction.type ||
                        "Transaction"
                    );


                const date =
                    formatDate(
                        transaction.created_at
                    );


                const status =
                    transaction.status ||
                    "completed";


                row.innerHTML = `

                    <span>
                        ${escapeHtml(description)}
                    </span>

                    <span>
                        ${date}
                    </span>

                    <span class="${amountClass}">
                        ${sign}${formatCurrency(amount)}
                    </span>

                    <span>
                        ${escapeHtml(status)}
                    </span>

                `;


                container.appendChild(
                    row
                );

            }
        );


    } catch (error) {

        console.error(
            "Unable to load transactions:",
            error
        );


        showEmptyTransactions();

    }

}


// =====================================================
// EMPTY TRANSACTIONS
// =====================================================

function showEmptyTransactions() {

    const container =
        document.getElementById(
            "recentTransactions"
        );


    if (!container) {

        return;
    }


    const existingRows =
        container.querySelectorAll(
            ".transaction-row"
        );


    if (
        existingRows.length <= 1
    ) {

        container.innerHTML = `

            <div class="transaction-row header">

                <span>DESCRIPTION</span>

                <span>DATE</span>

                <span>AMOUNT</span>

                <span>STATUS</span>

            </div>

            <div class="transaction-loading">

                No transactions yet.

            </div>

        `;

    }

}


// =====================================================
// LOGOUT
// =====================================================

function setupLogout() {

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (!logoutBtn) {

        return;
    }


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


// =====================================================
// COPY ACCOUNT NUMBER
// =====================================================

function setupCopyAccount(
    user
) {

    const copyAccount =
        document.getElementById(
            "copyAccount"
        );


    if (!copyAccount) {

        return;
    }


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
                    error
                );


                showToast(
                    "Unable to copy account number"
                );

            }

        }
    );

}


// =====================================================
// ACCOUNT SWITCHER
// =====================================================

function setupAccountSwitcher() {

    const button =
        document.getElementById(
            "accountSwitcher"
        );


    const menu =
        document.getElementById(
            "accountMenu"
        );


    if (
        !button ||
        !menu
    ) {

        return;
    }


    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                !button.contains(
                    event.target
                ) &&
                !menu.contains(
                    event.target
                )
            ) {

                menu.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =====================================================
// MOBILE MENU
// =====================================================

function setupMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenu"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (
        !button ||
        !sidebar
    ) {

        return;
    }


    button.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


// =====================================================
// BALANCE MENU
// =====================================================

function setupBalanceMenu() {

    const button =
        document.getElementById(
            "balanceMenuBtn"
        );


    if (!button) {

        return;
    }


    button.addEventListener(
        "click",
        () => {

            showToast(
                "Balance options coming soon"
            );

        }
    );

}


// =====================================================
// FORMAT CURRENCY
// =====================================================

function formatCurrency(
    amount
) {

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


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(
    dateValue
) {

    if (!dateValue) {

        return "-";
    }


    const date =
        new Date(
            dateValue
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return "-";
    }


    return date.toLocaleDateString(
        "en-NG",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// =====================================================
// CAPITALIZE
// =====================================================

function capitalize(
    text
) {

    if (!text) {

        return "";
    }


    return (
        text.charAt(0)
            .toUpperCase() +
        text.slice(1)
    );

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


// =====================================================
// TOAST
// =====================================================

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