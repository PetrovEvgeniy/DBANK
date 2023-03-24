
import {dbank } from "../../declarations/dbank"; 

window.addEventListener("load", async () => {
  //console.log("Finished loading"); 

  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = `${currentAmount.toFixed(2)}`;
});

document.querySelector("form").addEventListener("submit", async (e) => {

  e.preventDefault();
  //console.log("submitted  !!!!");

  const button = document.getElementById("submit-btn");
  const depositAmount = parseFloat(document.getElementById("deposit-amount").value);
  const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);


  console.log(depositAmount);
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

  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = `${currentAmount.toFixed(2)}`;

});