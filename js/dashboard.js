// ==========================================
// TECHFLOW DYNAMIC BANK
// CUSTOMER DASHBOARD
// ==========================================

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.getElementById("sidebar");


// MOBILE SIDEBAR
if (mobileMenu) {

    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


// ACCOUNT SWITCHER
const accountSwitcher =
    document.getElementById("accountSwitcher");

const accountMenu =
    document.getElementById("accountMenu");


if (accountSwitcher && accountMenu) {

    accountSwitcher.addEventListener("click", (event) => {

        event.stopPropagation();

        accountMenu.classList.toggle("show");

    });


    document.addEventListener("click", () => {

        accountMenu.classList.remove("show");

    });

}


// ACCOUNT SELECTION
const accountOptions =
    accountMenu?.querySelectorAll("button");


accountOptions?.forEach(option => {

    option.addEventListener("click", () => {

        accountOptions.forEach(item => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        const name =
            option.querySelector("strong").textContent;

        const number =
            option.querySelector("small").textContent;

        const switcherName =
            accountSwitcher.querySelector("strong");

        const switcherNumber =
            accountSwitcher.querySelector("small");

        switcherName.textContent = name;

        switcherNumber.textContent = number;

    });

});


// LOGOUT
const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            // Backend will eventually
            // destroy the session/token here.

            localStorage.removeItem(
                "techflowRegistration"
            );

            window.location.href =
                "login.html";
        }

    });

}