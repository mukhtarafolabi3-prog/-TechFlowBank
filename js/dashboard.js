
// =====================================================
// TECHFLOW BANK - DASHBOARD JAVASCRIPT
// =====================================================

const API_URL = "http://localhost:3000";


// =====================================================
// DOM READY
// =====================================================

document.addEventListener("DOMContentLoaded", async () => {

    console.log("=================================");
    console.log("TECHFLOW DASHBOARD STARTED");
    console.log("=================================");


    // =================================================
    // GET SAVED USER
    // =================================================

    const savedUser =
        localStorage.getItem("techflowUser");


    console.log(
        "Saved user:",
        savedUser
    );


    // =================================================
    // CHECK LOGIN
    // =================================================

    if (!savedUser) {

        console.warn(
            "No logged-in user found."
        );

        window.location.href =
            "login.html";

        return;
    }


    // =================================================
    // PARSE USER
    // =================================================

    let loggedInUser;

    try {

        loggedInUser =
            JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "Invalid techflowUser data:",
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
        "Logged-in user object:",
        loggedInUser
    );


    // =================================================
    // GET USER ID
    // =================================================

    const userId =
        loggedInUser.id ||
        loggedInUser.user_id ||
        loggedInUser.userId;


    console.log(
        "User ID:",
        userId
    );


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


    // =================================================
    // LOAD USER FROM BACKEND
    // =================================================

    try {

        console.log(
            "Loading user from:",
            `${API_URL}/api/users/${userId}`
        );


        const response =
            await fetch(
                `${API_URL}/api/users/${userId}`,
                {
                    method: "GET",

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        console.log(
            "User API status:",
            response.status
        );


        // =================================================
        // READ RESPONSE
        // =================================================

        const data =
            await response.json();


        console.log(
            "User API response:",
            data
        );


        // =================================================
        // CHECK RESPONSE
        // =================================================

        if (!response.ok) {

            console.error(
                "Unable to load user:",
                data.message
            );

            /*
             * Do not immediately redirect here.
             * This allows us to see the actual error
             * in the browser console.
             */

            return;
        }


        // =================================================
        // GET USER
        // =================================================

        const user =
            data.user || data;


        console.log(
            "FINAL USER OBJECT:",
            user
        );


        // =================================================
        // SAVE UPDATED USER
        // =================================================

        localStorage.setItem(
            "techflowUser",
            JSON.stringify(user)
        );


        // =================================================
        // GET CUSTOMER NAME
        // =================================================

        /*
         * The backend may return:
         *
         * first_name
         * last_name
         *
         * OR:
         *
         * firstName
         * lastName
         *
         * OR:
         *
         * name
         * full_name
         * fullName
         */


        const firstName =
            user.first_name ||
            user.firstName ||
            "";


        const lastName =
            user.last_name ||
            user.lastName ||
            "";


        let fullName =
            `${firstName} ${lastName}`.trim();


        // =================================================
        // OTHER NAME FORMATS
        // =================================================

        if (!fullName) {

            fullName =
                user.full_name ||
                user.fullName ||
                user.name ||
                "";

        }


        // =================================================
        // FINAL FALLBACK
        // =================================================

        if (!fullName) {

            fullName =
                loggedInUser.first_name ||
                loggedInUser.firstName ||
                loggedInUser.full_name ||
                loggedInUser.fullName ||
                loggedInUser.name ||
                "";

        }


        /*
         * Only use Customer if absolutely nothing
         * was returned by the backend.
         */

        if (!fullName) {

            fullName =
                "Customer";

        }


        // =================================================
        // FIRST NAME FOR GREETING
        // =================================================

        let displayFirstName =
            firstName;


        if (!displayFirstName) {

            displayFirstName =
                fullName.split(" ")[0];

        }


        if (!displayFirstName) {

            displayFirstName =
                "Customer";

        }


        console.log(
            "Customer full name:",
            fullName
        );


        console.log(
            "Customer first name:",
            displayFirstName
        );


        // =================================================
        // DISPLAY CUSTOMER NAME
        // =================================================

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
                fullName;

        }


        if (topUserName) {

            topUserName.textContent =
                fullName;

        }


        if (userName) {

            userName.textContent =
                displayFirstName;

        }


        // =================================================
        // UPDATE AVATARS
        // =================================================

        updateAvatars(
            fullName
        );


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
        // ACCOUNT TYPE
        // =================================================

        const accountType =
            user.account_type ||
            user.accountType ||
            "Savings";


        // =================================================
        // ACCOUNT NUMBER
        // =================================================

        const accountNumber =
            user.account_number ||
            user.accountNumber ||
            "Not assigned";


        // =================================================
        // ACCOUNT TYPE ELEMENTS
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
        // ACCOUNT NUMBER ELEMENTS
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
                user.balance ||
                0
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
        // LOGOUT
        // =================================================

        setupLogout();


        // =================================================
        // COPY ACCOUNT NUMBER
        // =================================================

        setupCopyAccount(
            accountNumber
        );


        // =================================================
        // ACCOUNT SWITCHER
        // =================================================

        setupAccountSwitcher();


        // =================================================
        // MOBILE MENU
        // =================================================

        setupMobileMenu();


        // =================================================
        // LOAD TRANSACTIONS
        // =================================================

        loadTransactions(
            userId
        );


        // =================================================
        // LOAD SUMMARY
        // =================================================

        loadDashboardSummary(
            userId,
            balance
        );


        console.log(
            "================================="
        );

        console.log(
            "DASHBOARD LOADED SUCCESSFULLY"
        );

        console.log(
            "Customer:",
            fullName
        );

        console.log(
            "================================="
        );


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

});


// =====================================================
// UPDATE AVATARS
// =====================================================

function updateAvatars(fullName) {

    const avatars =
        document.querySelectorAll(
            ".avatar"
        );


    if (!avatars.length) {
        return;
    }


    const words =
        fullName
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    let initials =
        "CU";


    if (words.length >= 2) {

        initials =
            words[0].charAt(0) +
            words[1].charAt(0);

    } else if (words.length === 1) {

        initials =
            words[0]
                .substring(0, 2);

    }


    initials =
        initials.toUpperCase();


    avatars.forEach(
        avatar => {

            avatar.textContent =
                initials;

        }
    );

}


// =====================================================
// FORMAT CURRENCY
// =====================================================

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


    /*
     * Prevent attaching the listener
     * multiple times.
     */

    if (
        logoutBtn.dataset.listenerAttached ===
        "true"
    ) {
        return;
    }


    logoutBtn.dataset.listenerAttached =
        "true";


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


// =====================================================
// COPY ACCOUNT NUMBER
// =====================================================

function setupCopyAccount(accountNumber) {

    const copyAccount =
        document.getElementById(
            "copyAccount"
        );


    if (!copyAccount) {
        return;
    }


    if (
        copyAccount.dataset.listenerAttached ===
        "true"
    ) {
        return;
    }


    copyAccount.dataset.listenerAttached =
        "true";


    copyAccount.addEventListener(
        "click",
        async () => {

            if (
                !accountNumber ||
                accountNumber ===
                "Not assigned"
            ) {

                showToast(
                    "Account number not available"
                );

                return;
            }


            try {

                await navigator.clipboard.writeText(
                    String(accountNumber)
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


// =====================================================
// ACCOUNT SWITCHER
// =====================================================

function setupAccountSwitcher() {

    const switcher =
        document.getElementById(
            "accountSwitcher"
        );


    const menu =
        document.getElementById(
            "accountMenu"
        );


    if (!switcher || !menu) {
        return;
    }


    switcher.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !switcher.contains(
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

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!mobileMenu || !sidebar) {
        return;
    }


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
// LOAD TRANSACTIONS
// =====================================================

async function loadTransactions(userId) {

    const container =
        document.getElementById(
            "recentTransactions"
        );


    if (!container) {
        return;
    }


    /*
     * Your backend may not have the transaction
     * endpoint yet.
     *
     * Therefore we don't break the dashboard
     * if the endpoint returns 404.
     */


    try {

        const response =
            await fetch(
                `${API_URL}/api/transactions/user/${userId}`
            );


        if (!response.ok) {

            console.log(
                "Transaction endpoint not available yet."
            );

            return;
        }


        const data =
            await response.json();


        const transactions =
            data.transactions ||
            [];


        if (!transactions.length) {

            showNoTransactions(
                container
            );

            return;
        }


        renderTransactions(
            container,
            transactions
        );


    } catch (error) {

        console.log(
            "Transactions not loaded:",
            error
        );

    }

}


// =====================================================
// SHOW NO TRANSACTIONS
// =====================================================

function showNoTransactions(container) {

    container.innerHTML = `

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

        <div
            class="transaction-loading"
            style="padding: 30px; text-align: center;"
        >

            No transactions yet.

        </div>

    `;

}


// =====================================================
// RENDER TRANSACTIONS
// =====================================================

function renderTransactions(
    container,
    transactions
) {

    let html = `

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


    transactions
        .slice(0, 5)
        .forEach(transaction => {

            const description =
                transaction.description ||
                transaction.type ||
                "Transaction";


            const amount =
                Number(
                    transaction.amount || 0
                );


            const date =
                transaction.created_at ||
                transaction.createdAt ||
                transaction.date ||
                "";


            const status =
                transaction.status ||
                "Completed";


            const formattedDate =
                date
                    ? new Date(date)
                        .toLocaleDateString(
                            "en-NG"
                        )
                    : "-";


            html += `

                <div class="transaction-row">

                    <span>
                        ${escapeHtml(
                            description
                        )}
                    </span>

                    <span>
                        ${formattedDate}
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

        });


    container.innerHTML =
        html;

}


// =====================================================
// DASHBOARD SUMMARY
// =====================================================

async function loadDashboardSummary(
    userId,
    balance
) {

    /*
     * Set the current balance immediately.
     */

    const summaryBalance =
        document.getElementById(
            "summaryBalance"
        );


    if (summaryBalance) {

        summaryBalance.textContent =
            formatCurrency(
                balance
            );

    }


    /*
     * These remain zero until your
     * transaction API is connected.
     */

    const totalIncome =
        document.getElementById(
            "totalIncome"
        );


    const totalExpense =
        document.getElementById(
            "totalExpense"
        );


    const spendingTotal =
        document.getElementById(
            "spendingTotal"
        );


    if (totalIncome) {

        totalIncome.textContent =
            formatCurrency(0);

    }


    if (totalExpense) {

        totalExpense.textContent =
            formatCurrency(0);

    }


    if (spendingTotal) {

        spendingTotal.textContent =
            formatCurrency(0);

    }

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(value) {

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


// =====================================================
// TOAST
// =====================================================

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

