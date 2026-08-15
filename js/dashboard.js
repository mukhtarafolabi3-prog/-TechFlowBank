
document.addEventListener("DOMContentLoaded", async () => {

    // =====================================================
    // GET USER ID
    // =====================================================

    const userId = localStorage.getItem("userId");

    console.log("Dashboard User ID:", userId);


    if (!userId) {

        console.error("No user ID found.");

        window.location.href = "login.html";

        return;
    }


    // =====================================================
    // GREETING
    // =====================================================

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

        greetingElement.textContent =
            greeting;

    }


    // =====================================================
    // GET DASHBOARD DATA
    // =====================================================

    try {

        const response = await fetch(
            `https://techflow-banking-backend.vercel.app/api/dashboard/${userId}`
        );


        const data = await response.json();


        console.log(
            "Dashboard response:",
            data
        );


        if (!response.ok || !data.success) {

            console.error(
                "Dashboard error:",
                data.message ||
                "Unable to load dashboard"
            );

            return;
        }


        const user =
            data.user || {};


        // =====================================================
        // USER INFORMATION
        // =====================================================

        const firstName =
            user.first_name || "";


        const lastName =
            user.last_name || "";


        const fullName =
            `${firstName} ${lastName}`.trim();


        // =====================================================
        // ACCOUNT INFORMATION
        // =====================================================

        const accountNumber =
            user.account_number ||
            "Not assigned";


        const accountType =
            user.account_type ||
            "Not available";


        const balance =
            Number(user.balance || 0);


        const currency =
            user.currency ||
            "NGN";


        // =====================================================
        // DISPLAY USER NAME
        // =====================================================

        const userName =
            document.getElementById(
                "userName"
            );


        if (userName) {

            userName.textContent =
                firstName;

        }


        const sidebarName =
            document.getElementById(
                "sidebarName"
            );


        if (sidebarName) {

            sidebarName.textContent =
                fullName;

        }


        const topUserName =
            document.getElementById(
                "topUserName"
            );


        if (topUserName) {

            topUserName.textContent =
                fullName;

        }


        // =====================================================
        // DISPLAY ACCOUNT BALANCE
        // =====================================================

        const formattedBalance =
            formatCurrency(balance);


        const accountBalance =
            document.getElementById(
                "accountBalance"
            );


        if (accountBalance) {

            accountBalance.textContent =
                formattedBalance;

        }


        const summaryBalance =
            document.getElementById(
                "summaryBalance"
            );


        if (summaryBalance) {

            summaryBalance.textContent =
                formattedBalance;

        }


        // =====================================================
        // DISPLAY ACCOUNT NUMBER
        // =====================================================

        const accountNumberElement =
            document.getElementById(
                "accountNumber"
            );


        if (accountNumberElement) {

            accountNumberElement.textContent =
                accountNumber;

        }


        // =====================================================
        // DISPLAY ACCOUNT TYPE
        // =====================================================

        const accountTypeElement =
            document.getElementById(
                "accountType"
            );


        if (accountTypeElement) {

            accountTypeElement.textContent =
                `${accountType} Account`;

        }


        // =====================================================
        // ACCOUNT SWITCHER
        // =====================================================

        const accountTypeSwitcher =
            document.getElementById(
                "accountTypeSwitcher"
            );


        if (accountTypeSwitcher) {

            accountTypeSwitcher.textContent =
                `${accountType} Account`;

        }


        const accountNumberSwitcher =
            document.getElementById(
                "accountNumberSwitcher"
            );


        if (accountNumberSwitcher) {

            accountNumberSwitcher.textContent =
                maskAccountNumber(
                    accountNumber
                );

        }


        const menuAccountType =
            document.getElementById(
                "menuAccountType"
            );


        if (menuAccountType) {

            menuAccountType.textContent =
                `${accountType} Account`;

        }


        const menuAccountNumber =
            document.getElementById(
                "menuAccountNumber"
            );


        if (menuAccountNumber) {

            menuAccountNumber.textContent =
                maskAccountNumber(
                    accountNumber
                );

        }


        // =====================================================
        // AVATARS
        // =====================================================

        const initials =
            `${firstName.charAt(0)}${lastName.charAt(0)}`
                .toUpperCase();


        const avatars =
            document.querySelectorAll(
                ".avatar"
            );


        avatars.forEach((avatar) => {

            avatar.textContent =
                initials || "U";

        });


        // =====================================================
        // SAVE USER DATA
        // =====================================================

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


        localStorage.setItem(
            "balance",
            String(balance)
        );


        localStorage.setItem(
            "currency",
            currency
        );


        // =====================================================
        // LOAD TRANSACTIONS
        // =====================================================

        await loadRecentTransactions(
            userId
        );


    } catch (error) {

        console.error(
            "Dashboard connection error:",
            error
        );

    }


    // =====================================================
    // COPY ACCOUNT NUMBER
    // =====================================================

    const copyAccount =
        document.getElementById(
            "copyAccount"
        );


    if (copyAccount) {

        copyAccount.addEventListener(
            "click",
            async () => {

                const accountNumberElement =
                    document.getElementById(
                        "accountNumber"
                    );


                if (
                    !accountNumberElement ||
                    !accountNumberElement.textContent ||
                    accountNumberElement.textContent ===
                    "Not assigned"
                ) {

                    showToast(
                        "Account number is not available."
                    );

                    return;
                }


                try {

                    await navigator.clipboard.writeText(
                        accountNumberElement.textContent.trim()
                    );


                    showToast(
                        "Account number copied."
                    );


                } catch (error) {

                    console.error(
                        "Copy account error:",
                        error
                    );


                    showToast(
                        "Unable to copy account number."
                    );

                }

            }
        );

    }


    // =====================================================
    // ACCOUNT SWITCHER
    // =====================================================

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
            (event) => {

                event.stopPropagation();

                accountMenu.classList.toggle(
                    "open"
                );

            }
        );


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !accountSwitcher.contains(
                        event.target
                    ) &&
                    !accountMenu.contains(
                        event.target
                    )
                ) {

                    accountMenu.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    // =====================================================
    // MOBILE MENU
    // =====================================================

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


    // =====================================================
    // CLOSE MOBILE SIDEBAR AFTER LINK CLICK
    // =====================================================

    if (sidebar) {

        sidebar
            .querySelectorAll(".nav-link")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        sidebar.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    // =====================================================
    // LOGOUT
    // =====================================================

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "userId"
                );

                localStorage.removeItem(
                    "firstName"
                );

                localStorage.removeItem(
                    "lastName"
                );

                localStorage.removeItem(
                    "email"
                );

                localStorage.removeItem(
                    "accountNumber"
                );

                localStorage.removeItem(
                    "accountType"
                );

                localStorage.removeItem(
                    "balance"
                );

                localStorage.removeItem(
                    "currency"
                );

                localStorage.removeItem(
                    "token"
                );


                window.location.href =
                    "login.html";

            }
        );

    }

});


// =====================================================
// MASK ACCOUNT NUMBER
// =====================================================

function maskAccountNumber(accountNumber) {

    if (
        !accountNumber ||
        accountNumber === "Not assigned"
    ) {

        return "Not assigned";

    }


    const value =
        String(accountNumber);


    if (value.length <= 4) {

        return value;

    }


    return `**** ${value.slice(-4)}`;

}


// =====================================================
// LOAD RECENT TRANSACTIONS
// =====================================================

async function loadRecentTransactions(
    userId
) {

    const transactionContainer =
        document.getElementById(
            "recentTransactions"
        );


    if (!transactionContainer) {

        console.error(
            "recentTransactions element not found"
        );

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:3000/api/transactions/user/${userId}`
            );


        const data =
            await response.json();


        console.log(
            "Transaction response:",
            data
        );


        if (
            !response.ok ||
            !data.success
        ) {

            transactionContainer.innerHTML = `

                <div class="transaction-loading">

                    Unable to load transactions.

                </div>

            `;

            return;

        }


        const transactions =
            Array.isArray(
                data.transactions
            )
                ? data.transactions
                : [];


        // =====================================================
        // CALCULATE INCOME / EXPENSE
        // =====================================================

        let totalIncome = 0;
        let totalExpense = 0;


        transactions.forEach(
            (transaction) => {

                const amount =
                    Number(
                        transaction.amount || 0
                    );


                const type =
                    transaction.transaction_type;


                if (type === "Deposit") {

                    totalIncome +=
                        amount;

                } else {

                    totalExpense +=
                        amount;

                }

            }
        );


        updateAmountElement(
            "totalIncome",
            totalIncome
        );


        updateAmountElement(
            "totalExpense",
            totalExpense
        );


        updateAmountElement(
            "spendingTotal",
            totalExpense
        );


        updateSpendingChart(
            totalExpense
        );


        // =====================================================
        // KEEP HEADER
        // =====================================================

        transactionContainer.innerHTML = `

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


        // =====================================================
        // NO TRANSACTIONS
        // =====================================================

        if (
            transactions.length === 0
        ) {

            transactionContainer.innerHTML += `

                <div class="transaction-loading">

                    <i class="fa-solid fa-receipt"></i>

                    <span>
                        No transactions yet.
                    </span>

                </div>

            `;

            return;

        }


        // =====================================================
        // SHOW LATEST 5
        // =====================================================

        transactions
            .slice(0, 5)
            .forEach(
                (transaction) => {

                    const amount =
                        Number(
                            transaction.amount || 0
                        );


                    const transactionType =
                        transaction.transaction_type ||
                        "Transaction";


                    const isIncoming =
                        transactionType ===
                        "Deposit";


                    const sign =
                        isIncoming
                            ? "+"
                            : "-";


                    const icon =
                        isIncoming
                            ? "fa-arrow-down"
                            : "fa-arrow-up";


                    const directionClass =
                        isIncoming
                            ? "received"
                            : "sent";


                    const date =
                        formatTransactionDate(
                            transaction.created_at
                        );


                    const amountText =
                        formatCurrency(
                            amount
                        );


                    const description =
                        escapeHtml(
                            transaction.description ||
                            transactionType
                        );


                    const typeText =
                        escapeHtml(
                            transactionType
                        );


                    const status =
                        escapeHtml(
                            transaction.status ||
                            "Completed"
                        );


                    transactionContainer.innerHTML += `

                        <div class="transaction-row">

                            <div class="transaction-name">

                                <div class="transaction-icon ${directionClass}">

                                    <i class="fa-solid ${icon}"></i>

                                </div>


                                <div>

                                    <strong>
                                        ${description}
                                    </strong>

                                    <small>
                                        ${typeText}
                                    </small>

                                </div>

                            </div>


                            <span>
                                ${date}
                            </span>


                            <span class="amount ${directionClass}">
                                ${sign}${amountText}
                            </span>


                            <span class="status successful">
                                ${status}
                            </span>

                        </div>

                    `;

                }
            );


    } catch (error) {

        console.error(
            "Transaction loading error:",
            error
        );


        transactionContainer.innerHTML = `

            <div class="transaction-loading">

                Unable to connect to transaction server.

            </div>

        `;

    }

}


// =====================================================
// UPDATE AMOUNT ELEMENT
// =====================================================

function updateAmountElement(
    elementId,
    amount
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    element.textContent =
        formatCurrency(amount);

}


// =====================================================
// FORMAT CURRENCY
// =====================================================

function formatCurrency(
    amount
) {

    return `₦${Number(amount || 0).toLocaleString(
        "en-NG",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )}`;

}


// =====================================================
// FORMAT TRANSACTION DATE
// =====================================================

function formatTransactionDate(
    dateValue
) {

    if (!dateValue) {

        return "Unknown date";

    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown date";

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
        String(value);


    return div.innerHTML;

}


// =====================================================
// UPDATE SPENDING CHART
// =====================================================

function updateSpendingChart(
    totalExpense
) {

    const donut =
        document.querySelector(
            ".donut"
        );


    const percentage =
        document.querySelector(
            ".donut strong"
        );


    if (!donut) {
        return;
    }


    if (
        !totalExpense ||
        totalExpense <= 0
    ) {

        donut.style.background =
            "conic-gradient(#2563eb 0deg, #e8eef7 0deg)";


        if (percentage) {

            percentage.textContent =
                "0%";

        }

        return;

    }


    const balance =
        Number(
            localStorage.getItem(
                "balance"
            ) || 0
        );


    const baseAmount =
        balance + totalExpense;


    const spendingPercentage =
        baseAmount > 0
            ? Math.min(
                100,
                Math.round(
                    (totalExpense / baseAmount) * 100
                )
            )
            : 0;


    const degrees =
        spendingPercentage * 3.6;


    donut.style.background =
        `conic-gradient(
            #2563eb ${degrees}deg,
            #e8eef7 ${degrees}deg
        )`;


    if (percentage) {

        percentage.textContent =
            `${spendingPercentage}%`;

    }

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


    if (toastMessage) {

        toastMessage.textContent =
            message;

    }


    if (toast) {

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

    } else {

        console.log(
            message
        );

    }

}
