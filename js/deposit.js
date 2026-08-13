const depositForm =
    document.getElementById("depositForm");


depositForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const account =
        document.getElementById("account").value;

    const amount =
        Number(document.getElementById("amount").value);


    if (!account) {

        alert("Please select the account to deposit into.");

        return;

    }


    if (!amount || amount < 100) {

        alert("Minimum deposit amount is ₦100.");

        return;

    }


    const method =
        document.querySelector(
            'input[name="method"]:checked'
        ).value;


    const description =
        document.getElementById("description").value;


    // Temporary frontend data
    const depositData = {

        account: account,

        amount: amount,

        method: method,

        description: description,

        date: new Date().toISOString(),

        status: "pending"

    };


    localStorage.setItem(
        "pendingDeposit",
        JSON.stringify(depositData)
    );


    // Temporary frontend flow
    window.location.href =
        "deposit-review.html";

});