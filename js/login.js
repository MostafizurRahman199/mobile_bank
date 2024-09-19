const loginBtn = document.getElementById("loginBtn");
const main = document.getElementById("main");
const div = document.createElement('div');
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
    <span>Wrong Password or PIN</span>
  </div>
</div>
`;

let pin = document.getElementById("pin");
let phoneNumber = document.getElementById("phoneNumber");

loginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let pinValue = pin.value;
    let phoneNumberValue = phoneNumber.value;

    console.log(typeof pinValue, typeof phoneNumberValue);
    console.log(pinValue, phoneNumberValue);
    
    if (phoneNumberValue === '01791604420' && pinValue === '1234') {
       window.location.href= "/home.html";
    } else {
        pin.value = "";
        phoneNumber.value = "";
        main.appendChild(div);
    }
});

main.addEventListener("click", function (event) {
    if (event.target.closest("#toast_off")) {
        const toastDiv = document.getElementById("toast_div");
        toastDiv.remove(); // Remove the toast from the DOM
    }
});
