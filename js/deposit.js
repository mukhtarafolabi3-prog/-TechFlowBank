
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


    // ==========================================
    // GET USER DATA
    // ==========================================

    const userId =
        localStorage.getItem("userId");

    const accountNumber =
        localStorage.getItem("accountNumber");


    if (!userId) {

        window.location.href =
            "login.html";

        return;
    }


    // ==========================================
    // DISPLAY ACCOUNT NUMBER
    // ==========================================

    if (accountNumberElement) {

        accountNumberElement.textContent =
            accountNumber ||
            "Not available";

    }


    // ==========================================
    // FORM
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


            // ==========================================
            // VALIDATION
            // ==========================================

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


            if (!accountNumber) {

                showMessage(
                    "Account number is not available.",
                    "error"
                );

                return;
            }


            try {

                // ==========================================
                // DISABLE BUTTON
                // ==========================================

                depositBtn.disabled =
                    true;

                depositBtn.textContent =
                    "Processing...";


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


                const data =
                    await response.json();


                console.log(
                    "Deposit response:",
                    data
                );


                // ==========================================
                // CHECK RESPONSE
                // ==========================================

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


                // ==========================================
                // GET NEW BALANCE
                // ==========================================

                const newBalance =
                    Number(
                        data.account.balance
                    );


                // Save updated balance
                localStorage.setItem(
                    "balance",
                    String(newBalance)
                );


                // ==========================================
                // SHOW SUCCESS
                // ==========================================

                showMessage(
                    `Deposit successful. New balance: ₦${newBalance.toLocaleString(
                        "en-NG",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    )}`,
                    "success"
                );


                // Clear amount
                amountInput.value = "";

                descriptionInput.value = "";


                // ==========================================
                // OPTIONAL REDIRECT
                // ==========================================

                setTimeout(() => {

                    window.location.href =
                        "customer-dashboard.html";

                }, 1500);


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

                depositBtn.disabled =
                    false;

                depositBtn.textContent =
                    "Deposit Money";

            }

        }
    );


    // ==========================================
    // MESSAGE
    // ==========================================

    function showMessage(
        text,
        type
    ) {

        message.style.display =
            "block";

        message.textContent =
            text;


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


        message.style.padding =
            "12px";

        message.style.borderRadius =
            "10px";

    }

});
