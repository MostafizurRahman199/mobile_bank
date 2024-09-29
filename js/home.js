function subtract(option1, option2) {
    return option1 - option2;
}

function addition(option1, option2) {
    return option1 + option2;
}

function getById(id) {
    return document.getElementById(id);
}

const mockup_phone = getById("mockup-phone");
const logout = getById("logout");
const transactionDiv = getById('transaction');

const toastHTMLs = {
    toast_div: `
        <div class="toast toast-center" id="toast_div">
            <div class="alert text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br">
                <svg id="toast_off" type="button" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Transaction Failed</span>
            </div>
        </div>`,
    toast_div3: `
        <div class="toast toast-center" id="toast_div3">
            <div class="alert text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br">
                <svg id="toast_off" type="button" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Not enough balance</span>
            </div>
        </div>`,
    toast_div4: `
        <div class="toast toast-center" id="toast_div4">
            <div class="alert text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br">
                <svg id="toast_off" type="button" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Please Enter Number as Amount</span>
            </div>
        </div>`,
    toast_div2: `
        <div class="toast toast-center" id="toast_div2">
            <div class="alert text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br">
                <svg id="toast_off2" type="button" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current cursor-pointer" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Transaction Success</span>
            </div>
        </div>`
};

const addMoneyBtn2 = getById("addMoney2");
const amount = getById("amount");
const pin = getById("pin");
const balance = getById("balance");
const form = getById('form');

function showToast(toastId, toastDivHtml) {
    const existingToast = getById(toastId);

    if (existingToast) {
        existingToast.remove(); // Remove the old toast if it exists
    }

    mockup_phone.insertAdjacentHTML('beforeend', toastDivHtml); // Add the new toast to the DOM

    setTimeout(function () {
        const toastDiv = getById(toastId);
        if (toastDiv) {
            toastDiv.remove(); // Remove after 2 seconds
        }
    }, 2000);
}

function resetForm() {
    amount.value = '';
    pin.value = '';
}

function transactionHistory(balance, amount, operation) {
    let newDiv = document.createElement('div');

    if (operation === 1) {
        newDiv.innerHTML = `
        <div class="font_1 card text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
        focus:outline-none font-base rounded-lg bg-base-100 w-4/4 p-0 shadow-xl">
           <div class="card-body p-2 m-1">
               <p>CashOut ${amount} and Current Balance ${balance}</p>
               <p class="text-sm text-gray-50">${new Date().toLocaleDateString()}</p>
           </div>
        </div>`;
    } else if (operation === 2) {
        newDiv.innerHTML = `
        <div class="font_1 card text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
        focus:outline-none font-medium rounded-lg bg-base-100 w-4/4 p-0 shadow-xl">
           <div class="card-body p-2 m-1">
               <p>Add Money ${amount} and Current Balance ${balance}</p>
               <p class="text-sm text-gray-50 font-thin">${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}</p>
           </div>
        </div>`;
    }

    transactionDiv.appendChild(newDiv);
}

function performTransaction(action) {
    let pinValue = pin.value;

    if (pinValue === '1234' && !isNaN(parseFloat(amount.value))) {
        let parseBalance = parseFloat(balance.innerText);
        let parseAmount = parseFloat(amount.value);

        if (action === 'Cash Out') {
            if (parseBalance < parseAmount) {
                showToast("toast_div3", toastHTMLs.toast_div3); // Not enough balance toast
            } else {
                let total = subtract(parseBalance, parseAmount);
                balance.innerText = total;
                transactionHistory(parseBalance, parseAmount, 1);
                resetForm();
                showToast("toast_div2", toastHTMLs.toast_div2); // Success toast
            }
        } else if (action === 'Add Money') {
            let total = addition(parseBalance, parseAmount);
            balance.innerText = total;
            transactionHistory(parseBalance, parseAmount, 2);
            resetForm();
            showToast("toast_div2", toastHTMLs.toast_div2); // Success toast
        }
    } else {
        resetForm();
        showToast("toast_div", toastHTMLs.toast_div); // Wrong pin or invalid amount toast
    }
}

function change(action) {
    const transactionButton = getById("addMoney2");
    transactionButton.textContent = action;

    // Reassign the event listener to the new button
    transactionButton.onclick = () => performTransaction(action);
}

mockup_phone.addEventListener("click", function (event) {
    const target = event.target;

    if (target.id === "toast_off" || target.parentElement?.id === "toast_off") {
        const toastDiv = getById("toast_div");
        if (toastDiv) {
            toastDiv.remove();
        }
    }

    if (target.id === "addMoney" || target.parentElement?.id === "addMoney") {
        transactionDiv.className = "border-2 p-2 space-y-2 overflow-y-scroll hide";
        form.className = "space-y-4 px-4 rounded-3xl";
        change("Add Money");
    }

    if (target.id === "cashOut" || target.parentElement?.id === "cashOut") {
        transactionDiv.className = "border-2 p-2 space-y-2 overflow-y-scroll hide";
        form.className = "space-y-4 px-4 rounded-3xl";
        change("Cash Out");
    }
    if(event.target.id === 'transactionBtn' || event.target.parentElement?.id === 'transactionBtn'){
        form.className = "space-y-4 px-4 rounded-3xl hide";
        transactionDiv.classList = "border-2 p-2 space-y-2 overflow-y-scroll";
    }
    if (target.id === 'logout' || target.parentElement?.id === 'logout') {
        logout.remove();
    }
});
