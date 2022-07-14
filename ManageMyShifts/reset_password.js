import { isPasswordValid } from "./utils.js";

const newPassword = document.getElementById("newPassword");
const cofirmPassword = document.getElementById("confirmPassword");
const errorDiv = document.getElementById("errorDiv");
const showError = document.createElement("p");

const saveBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

let userToReset = JSON.parse(localStorage.getItem("userToReset"));
console.log(userToReset);

const findUserIndex = users.findIndex(
  (user) => user.username === userToReset[0]
);

saveBtn.addEventListener("click", () => {
  users.forEach(() => {
    if (newPassword.value !== cofirmPassword.value) {
      showError.innerText = "Passwords doesn't match";
      showError.classList.add("error")
      errorDiv.appendChild(showError);
    } else if (isPasswordValid(newPassword.value)) {
      users[findUserIndex].password = btoa(newPassword.value);

      localStorage.setItem("users", JSON.stringify(users));

      location.assign("./login.html");
    }
  });
});

cancelBtn.addEventListener("click", () => {
  location.assign("./login.html");
});

console.log(findUserIndex);
