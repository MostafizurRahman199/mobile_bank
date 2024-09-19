const mockup_phone = document.getElementById("mockup-phone");
const div = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');
div.innerHTML = `
<div class="toast toast-center" id="toast_div">
  <div class="alert text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br">
    <svg
      id="toast_off"
      type="button"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 shrink-0 stroke-current cursor-pointer"
      fill="none"
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Transition Failed</span>
  </div>
</div>
`;
div3.innerHTML = `
<div class="toast toast-center" id="toast_div3">
  <div class="alert text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br">
    <svg
      id="toast_off"
      type="button"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 shrink-0 stroke-current cursor-pointer"
      fill="none"
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Not enough balance</span>

  </div>
</div>
`;

div2.innerHTML = `
<div class="toast toast-center" id="toast_div2">
  <div class="alert text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br">
    <svg
      id="toast_off2"
      type="button"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 shrink-0 stroke-current cursor-pointer"
      fill="none"
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Transaction Success</span>
  </div>
</div>
`;




const addMoneyBtn2 = document.getElementById("addMoney2");
const addMoneyBtn = document.getElementById("addMoney");
const amount = document.getElementById("amount");
const pin = document.getElementById("pin");
const balance = document.getElementById("balance");
const form = document.getElementById('form');


function change(btnText){

    if(btnText === 'Cash Out'){
        addMoneyBtn2.innerText = "Cash Out";
        addMoneyBtn2.addEventListener("click", ()=>{
            let pinValue = pin.value;
            if(pinValue === '1234'){
                let parseBalance = parseInt(balance.innerText);
                let parseAmount = parseInt(amount.value);

                if(parseBalance < parseAmount){
                    mockup_phone.appendChild(div3);
         
                    setTimeout(function () {
                        const toastDiv = document.getElementById("toast_div3");
                        if (toastDiv) {
                            toastDiv.remove();
                        }
                    }, 2000);
                }else{
                    let total = parseInt(balance.innerText) - parseInt(amount.value);
                     balance.innerText = total;
                     pin.value = "";
                     amount.value = "";
         
                     mockup_phone.appendChild(div2);
         
                     setTimeout(function () {
                         const toastDiv = document.getElementById("toast_div2");
                         if (toastDiv) {
                             toastDiv.remove();
                         }
                     }, 2000);
                }
                     
         
            }else{
             pin.value = "";
                 amount.value = "";
                 mockup_phone.appendChild(div);
         
                 setTimeout(function () {
                     const toastDiv = document.getElementById("toast_div");
                     if (toastDiv) {
                         toastDiv.remove();
                     }
                 }, 2000);
            }
         })
    }
    if(btnText === 'Add Money'){
        addMoneyBtn2.innerText = "Add Money";
        addMoneyBtn2.addEventListener("click", ()=>{
            let pinValue = pin.value;
            if(pinValue === '1234'){

                    let total = parseInt(balance.innerText) + parseInt(amount.value);
                     balance.innerText = total;
                     pin.value = "";
                     amount.value = "";
         
                     mockup_phone.appendChild(div2);
         
                     setTimeout(function () {
                         const toastDiv = document.getElementById("toast_div2");
                         if (toastDiv) {
                             toastDiv.remove();
                         }
                     }, 2000);
         
            }else{
             pin.value = "";
                 amount.value = "";
                 mockup_phone.appendChild(div);
         
                 setTimeout(function () {
                     const toastDiv = document.getElementById("toast_div");
                     if (toastDiv) {
                         toastDiv.remove();
                     }
                 }, 2000);
            }
         })
    }
    
}




mockup_phone.addEventListener("click", function (event) {
    if (event.target.closest("#toast_off")) {
        const toastDiv = document.getElementById("toast_div");
        toastDiv.remove(); // Remove the toast from the DOM
    }
    if(event.target.closest("#addMoney")){
         form.className = "space-y-4 px-4 rounded-3xl"
         change("Add Money");
    }
    if(event.target.closest("#cashOut")){
         form.className = "space-y-4 px-4 rounded-3xl"
         change("Cash Out");
    }
});