import {dbank } from "../../declarations/dbank"; 

window.addEventListener("load", async () => {
  //console.log("Finished loading"); 

  update();
});

document.querySelector("form").addEventListener("submit", async (e) => {

  e.preventDefault();

  const button = document.getElementById("submit-btn");
  const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
  const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);


  button.setAttribute("disabled",true);

  if(document.getElementById("deposit-amount").value != 0){
    await dbank.topUp(depositAmount);
  }

  if(document.getElementById("withdrawal-amount").value.length != 0){
    await dbank.withdraw(withdrawalAmount);
  }

  await dbank.compound();

  button.removeAttribute("disabled");
  document.getElementById("deposit-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  update();

});

async function update(){
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = `${currentAmount.toFixed(2)}`;
}