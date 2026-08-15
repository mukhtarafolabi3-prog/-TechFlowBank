
document.addEventListener("DOMContentLoaded", async () => {

    const depositForm =
        document.getElementById("depositForm");

    const amountInput =
        document.getElementById("amount");

    const descriptionInput =
        document.getElementById("description");

    const depositBtn =
        document.getElementById("depositBtn");

    const accountTypeElement =
        document.getElementById("accountType");

    const accountNumberElement =
        document.getElementById("accountNumber");

    const summaryAccountType =
        document.getElementById(
            "summaryAccountType"
        );

    const summaryAccountNumber =
        document.getElementById(
            "summaryAccountNumber"
        );

    const currentBalanceElement =
        document.getElementById(
            "currentBalance"
        );

    const currencyElement =
        document.getElementById("currency");

    const depositResult =
        document.getElementById("depositResult");

    const resultMessage =
        document.getElementById("resultMessage");

    const resultDetails =
        document.getElementById("resultDetails");


    // ==========================================
    // GET USER ID
    // ==========================================

    const userId =
        localStorage.getItem("userId");


    if (!userId) {

        window.location.href =
            "login.html";

        return;
    }


    // ==========================================
    // GET DASHBOARD / ACCOUNT DATA
    // ==========================================

    try {

        const response =
            await fetch(
                `http://localhost:3000/api/dashboard/${userId}`
            );

        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load account"
            );
        }


        const user =
            data.user || {};


        const accountType =
            user.account_type ||
            "Account";

        const accountNumber =
            user.account_number ||
            "Not assigned";

        const balance =
            Number(user.balance || 0);

        const currency =
            user.currency ||
            "NGN";


        // ==========================================
        // DISPLAY ACCOUNT
        // ==========================================

        if (accountTypeElement) {
            accountTypeElement.textContent =
                `${accountType} Account`;
        }


        if (accountNumberElement) {
            accountNumberElement.textContent =
                maskAccountNumber(accountNumber);
        }


        if (summaryAccountType) {
            summaryAccountType.textContent =
                accountType;
        }


        if (summaryAccountNumber) {
            summaryAccountNumber.textContent =
                accountNumber;
        }


        if (currentBalanceElement) {

            currentBalanceElement.textContent =
                formatMoney(balance);

        }


        if (currencyElement) {
            currencyElement.textContent =
                currency;
        }


    } catch (error) {

        console.error(
            "Account loading error:",
            error
        );

        if (accountTypeElement) {
            accountTypeElement.textContent =
                "Unable to load";
        }

        if (accountNumberElement) {
            accountNumberElement.textContent =
                "Unable to load";
        }
    }


    // ==========================================
    // QUICK AMOUNT BUTTONS
    // ==========================================

    document
        .querySelectorAll(".quick-amount")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    amountInput.value =
                        button.dataset.amount;

                    amountInput.focus();

                }
            );

        });


    // ==========================================
    // SUBMIT DEPOSIT
    // ==========================================

    depositForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const amount =
                Number(
                    amountInput.value
                );


            const description =
                descriptionInput.value.trim();


            const accountNumber =
                localStorage.getItem(
                    "accountNumber"
                );


            // ==========================================
            // VALIDATION
            // ==========================================

            if (
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                alert(
                    "Please enter a valid deposit amount."
                );

                amountInput.focus();

                return;
            }


            if (!accountNumber) {

                alert(
                    "Your account number could not be found."
                );

                return;
            }


            // ==========================================
            // DISABLE BUTTON
            // ==========================================

            depositBtn.disabled = true;

            depositBtn.querySelector(
                "span"
            ).textContent =
                "Processing...";


            try {

                // ==========================================
                // SEND DEPOSIT
                // ==========================================

                const response =
                    await fetch(
                        "http://localhost:3000/api/transactions/deposit",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                userId:
                                    Number(userId),

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


                const data =
                    await response.json();


                console.log(
                    "Deposit response:",
                    data
                );


                // ==========================================
                // ERROR
                // ==========================================

                if (
                    !response.ok ||
                    !data.success
                ) {

                    alert(
                        data.message ||
                        "Deposit failed."
                    );

                    return;
                }


                // ==========================================
                // NEW ACCOUNT BALANCE
                // ==========================================

                const newBalance =
                    Number(
                        data.account?.balance || 0
                    );


                localStorage.setItem(
                    "balance",
                    String(newBalance)
                );


                // ==========================================
                // UPDATE BALANCE
                // ==========================================

                if (currentBalanceElement) {

                    currentBalanceElement.textContent =
                        formatMoney(
                            newBalance
                        );

                }


                // ==========================================
                // SHOW SUCCESS
                // ==========================================

                if (resultMessage) {

                    resultMessage.textContent =
                        "Deposit successful.";

                }


                if (resultDetails) {

                    const reference =
                        data.transaction?.reference ||
                        "Transaction completed";

                    resultDetails.textContent =
                        `₦${amount.toLocaleString(
                            "en-NG",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        )} deposited successfully. Reference: ${reference}`;

                }


                if (depositResult) {

                    depositResult.classList.add(
                        "show"
                    );

                }


                // ==========================================
                // RESET FORM
                // ==========================================

                amountInput.value = "";

                descriptionInput.value = "";


            } catch (error) {

                console.error(
                    "Deposit error:",
                    error
                );

                alert(
                    "Unable to connect to the banking server."
                );

            } finally {

                depositBtn.disabled = false;

                depositBtn.querySelector(
                    "span"
                ).textContent =
                    "Deposit Money";

            }

        }
    );

});


// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(amount) {

    return `₦${Number(amount).toLocaleString(
        "en-NG",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )}`;

}


// ==========================================
// MASK ACCOUNT NUMBER
// ==========================================

function maskAccountNumber(accountNumber) {

    const value =
        String(accountNumber || "");

    if (
        !value ||
        value === "Not assigned"
    ) {
        return "Not assigned";
    }

    if (value.length <= 4) {
        return value;
    }

    return `**** ${value.slice(-4)}`;

}
