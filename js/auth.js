
// =====================================================
// TECHFLOW DYNAMIC BANK
// FRONTEND AUTHENTICATION
// =====================================================

const API_URL =
    "https://techflow-banking-backend.vercel.app";


// =====================================================
// CHECK LOGIN STATE
// =====================================================

function isLoggedIn() {

    const userId =
        localStorage.getItem("userId");

    const token =
        localStorage.getItem("token");

    return Boolean(userId && token);
}


// =====================================================
// GET LOGGED-IN USER
// =====================================================

function getLoggedInUser() {

    return {

        userId:
            localStorage.getItem("userId"),

        firstName:
            localStorage.getItem("firstName"),

        lastName:
            localStorage.getItem("lastName"),

        email:
            localStorage.getItem("email"),

        accountNumber:
            localStorage.getItem("accountNumber"),

        accountType:
            localStorage.getItem("accountType"),

        balance:
            localStorage.getItem("balance"),

        currency:
            localStorage.getItem("currency"),

        token:
            localStorage.getItem("token")

    };

}


// =====================================================
// SAVE LOGIN DATA
// =====================================================

function saveLoginData(data) {

    if (!data || !data.user) {

        console.error(
            "Invalid login data:",
            data
        );

        return false;
    }


    const user =
        data.user;


    localStorage.setItem(
        "userId",
        String(user.id)
    );


    localStorage.setItem(
        "firstName",
        user.first_name || ""
    );


    localStorage.setItem(
        "lastName",
        user.last_name || ""
    );


    localStorage.setItem(
        "email",
        user.email || ""
    );


    localStorage.setItem(
        "accountType",
        user.account_type || ""
    );


    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );

    }


    return true;

}


// =====================================================
// LOAD ACCOUNT DATA
// =====================================================

async function loadAccountData() {

    const userId =
        localStorage.getItem("userId");

    const token =
        localStorage.getItem("token");


    if (!userId) {

        return null;

    }


    try {

        const headers = {
            "Content-Type":
                "application/json"
        };


        if (token) {

            headers.Authorization =
                `Bearer ${token}`;

        }


        const response =
            await fetch(
                `${API_URL}/api/dashboard/${userId}`,
                {
                    method: "GET",
                    headers: headers
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success ||
            !data.user
        ) {

            console.error(
                "Account data error:",
                data
            );

            return null;

        }


        const user =
            data.user;


        localStorage.setItem(
            "accountNumber",
            user.account_number || ""
        );


        localStorage.setItem(
            "accountType",
            user.account_type || ""
        );


        localStorage.setItem(
            "balance",
            String(user.balance || 0)
        );


        localStorage.setItem(
            "currency",
            user.currency || "NGN"
        );


        return user;

    } catch (error) {

        console.error(
            "Account request error:",
            error
        );

        return null;

    }

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

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

    localStorage.removeItem(
        "resetEmail"
    );


    window.location.href =
        "login.html";

}


// =====================================================
// PROTECT PAGE
// =====================================================

function requireLogin() {

    if (!isLoggedIn()) {

        window.location.href =
            "login.html";

        return false;

    }

    return true;

}


// =====================================================
// REDIRECT ALREADY LOGGED-IN USER
// =====================================================

function redirectIfLoggedIn() {

    if (isLoggedIn()) {

        window.location.href =
            "customer-dashboard.html";

        return true;

    }

    return false;

}


// =====================================================
// AUTH FETCH HELPER
// =====================================================

async function authFetch(
    endpoint,
    options = {}
) {

    const token =
        localStorage.getItem("token");


    const headers = {
        "Content-Type":
            "application/json",

        ...(options.headers || {})
    };


    if (token) {

        headers.Authorization =
            `Bearer ${token}`;

    }


    return fetch(
        `${API_URL}${endpoint}`,
        {
            ...options,
            headers: headers
        }
    );

}


// =====================================================
// EXPORT FOR USE IN OTHER FILES
// =====================================================

window.TechFlowAuth = {

    API_URL,

    isLoggedIn,

    getLoggedInUser,

    saveLoginData,

    loadAccountData,

    logout,

    requireLogin,

    redirectIfLoggedIn,

    authFetch

};

