// =====================================================
// TECHFLOW DYNAMIC BANK
// DEPOSIT
// =====================================================

const API_URL =
    "https://techflow-banking-backend-ffmn.vercel.app/";


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const depositForm =
        document.getElementById("depositForm");

    const amountInput =
        document.getElementById("amount");

    const descriptionInput =
        document.getElementById("description");

    const depositBtn =
        document.getElementById("depositBtn");

    const message =
        document.getElementById("depositMessage");

    const accountNumberElement =
        document.getElementById("accountNumber");


    // =====================================================
    // GET LOGIN DATA
    // =====================================================

    const userId =
        localStorage.getItem("userId");

    const token =
        localStorage.getItem("token");

    const accountNumber =
        localStorage.getItem("accountNumber");


    console.log("User ID:", userId);
    console.log("Account Number:", accountNumber);
    console.log("Token exists:", Boolean(token));


    // =====================================================
    // CHECK LOGIN
    // =====================================================

    if (!userId || !token) {

        window.location.href =
            "login.html";

        return;
    }


    // =====================================================
    // CHECK FORM
    // =====================================================

    if (!depositForm) {

        console.error(
            "depositForm not found"
        );

        return;
    }


    // =====================================================
    // DISPLAY ACCOUNT NUMBER
    // =====================================================

    if (accountNumberElement) {

        accountNumberElement.textContent =
            accountNumber ||
            "Not available";

    }


    // =====================================================
    // SUBMIT DEPOSIT
    // =====================================================

    depositForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // =================================================
            // GET AMOUNT
            // =================================================

            const amount =
                Number(
                    amountInput.value
                );


            // =================================================
            // GET DESCRIPTION
            // =================================================

            const description =
                descriptionInput
                    ? descriptionInput.value.trim()
                    : "";


            // =================================================
            // VALIDATE AMOUNT
            // =================================================

            if (
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                showMessage(
                    "Please enter a valid deposit amount.",
                    "error"
                );

                return;
            }


            // =================================================
            // CHECK ACCOUNT
            // =================================================

            if (!accountNumber) {

                showMessage(
                    "Your account number could not be found. Please login again.",
                    "error"
                );

                return;
            }


            // =================================================
            // DISABLE BUTTON
            // =================================================

            if (depositBtn) {

                depositBtn.disabled =
                    true;

                depositBtn.textContent =
                    "Processing...";

            }


            try {

                // =================================================
                // SEND REQUEST TO LIVE BACKEND
                // =================================================

                const response =
                    await fetch(
                        `${API_URL}/api/transactions/deposit`,
                        {
                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`

                            },

                            body:
                                JSON.stringify({

                                    userId:
                                        userId,

                                    accountNumber:
                                        accountNumber,

                                    amount:
                                        amount,

                                    description:
                                        description ||
                                        "Account deposit"

                                })

                        }
                    );


                // =================================================
                // READ RESPONSE
                // =================================================

                const data =
                    await response.json();


                console.log(
                    "Deposit response:",
                    data
                );


                // =================================================
                // CHECK BACKEND RESPONSE
                // =================================================

                if (
                    !response.ok ||
                    !data.success
                ) {

                    showMessage(
                        data.message ||
                        "Deposit failed.",
                        "error"
                    );

                    return;
                }


                // =================================================
                // GET NEW BALANCE
                // =================================================

                const newBalance =
                    Number(
                        data.account?.balance ||
                        0
                    );


                // =================================================
                // SAVE NEW BALANCE
                // =================================================

                localStorage.setItem(
                    "balance",
                    String(newBalance)
                );


                // =================================================
                // SUCCESS MESSAGE
                // =================================================

                showMessage(
                    `Deposit successful! New balance: ₦${newBalance.toLocaleString(
                        "en-NG",
                        {
                            minimumFractionDigits:
                                2,

                            maximumFractionDigits:
                                2
                        }
                    )}`,
                    "success"
                );


                // =================================================
                // CLEAR FORM
                // =================================================

                if (amountInput) {

                    amountInput.value = "";

                }


                if (descriptionInput) {

                    descriptionInput.value = "";

                }


                // =================================================
                // REDIRECT
                // =================================================

                setTimeout(
                    () => {

                        window.location.href =
                            "customer-dashboard.html";

                    },
                    1500
                );


            } catch (error) {

                console.error(
                    "Deposit error:",
                    error
                );


                showMessage(
                    "Unable to connect to the banking server.",
                    "error"
                );


            } finally {

                // =================================================
                // ENABLE BUTTON
                // =================================================

                if (depositBtn) {

                    depositBtn.disabled =
                        false;

                    depositBtn.textContent =
                        "Deposit Money";

                }

            }

        }
    );


    // =====================================================
    // SHOW MESSAGE
    // =====================================================

    function showMessage(
        text,
        type
    ) {

        if (!message) {

            alert(text);

            return;
        }


        message.style.display =
            "block";


        message.textContent =
            text;


        message.style.padding =
            "12px";


        message.style.borderRadius =
            "10px";


        message.style.marginTop =
            "10px";


        if (type === "success") {

            message.style.color =
                "#15803d";

            message.style.background =
                "#ecfdf5";

        } else {

            message.style.color =
                "#b91c1c";

            message.style.background =
                "#fef2f2";

        }

    }

});