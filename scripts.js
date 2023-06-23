import Action from "./classess/Action.js";
import ActionsManager from "./classess/ActionManager.js";

let manager = new ActionsManager();
let food = new Action("expense", "Dinner", 300);
manager.addAction(food);
manager.addAction(new Action("income", "Salary", 7000));
manager.addAction(new Action("expense", "Concert", 250));
manager.updateAction(food.id, 350);
manager.calcBalance();
function showActionsInTable() {
  document.getElementById("actions").innerHTML = "";
  for (let action of manager.actions) {
    document.getElementById("actions").innerHTML +=
      `<tr class=${action.type == "income" ? "text-success" : "text-danger"}>
        <td>${action.description} </td> <td>${action.amount}</td>
        <td><i class="fa-regular fa-pen-to-square" onclick="updateAction(${action.id})"></i></td>
        <td><i class="fa-regular fa-trash-can" onclick="deleteAction(${action.id})"></i> </td></tr>`;
  }
}
showActionsInTable();

window.addNewAction = () => {
  let type = document.getElementById("type").value;
  let description = document.getElementById("description").value;
  let amount = +document.getElementById("amount").value;
  let newAction = new Action(type, description, amount);
  manager.addAction(newAction);
  localStorage.setItem("managerActions", JSON.stringify(manager.actions));
  document.getElementById("type").value = "income";
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  showActionsInTable();
};

window.deleteAction = (id) => {
  if (confirm("Are you sure?")) {
    manager.deleteAction(id);
    localStorage.setItem("managerActions", JSON.stringify(manager.actions));
    showActionsInTable();
  }
};
window.updateAction = (id) => {
  let newAmount = prompt("Please enter new value");
  if (newAmount == null || newAmount == "" || newAmount != +newAmount)
    alert("Somthing went Wrong");
  else {
    manager.updateAction(id, +newAmount);
    localStorage.setItem("managerActions", JSON.stringify(manager.actions));
    showActionsInTable();
  }
};
