import { isPasswordValid } from "./utils.js";

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const passwordReset = document.getElementById("password");
const ageReset = document.getElementById("age");
const firstNameReset = document.getElementById("firstName");
const lastNameReset = document.getElementById("lastName");

let users = JSON.parse(localStorage.getItem("users"));
console.log(users);
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUsers"));
console.log(loggedInUser);

const findUserIndex = users.findIndex(
  (user) => user.username === loggedInUser[0].newUsername
);

const isUserLoggedIn = loggedInUser !== null;

if (loggedInUser === null) {
  location.assign("./home.html");
}

users.forEach((user) => {
  const { username, password, firstname, lastname, age } = user;
  if (loggedInUser[0].newUsername === username) {
    console.log(lastname);
    passwordReset.value = password;
    firstNameReset.value = firstname;
    lastNameReset.value = lastname;
    ageReset.value = age;
  }
});

saveBtn.addEventListener("click", () => {
  if (isPasswordValid(password.value)) {
    users.forEach(() => {
      if (isUserLoggedIn) {
        users[findUserIndex].firstName = firstName.value;
        users[findUserIndex].lastName = lastName.value;
        users[findUserIndex].age = age.value;
        users[findUserIndex].password = btoa(password.value);
        localStorage.setItem("users", JSON.stringify(users));
      }
    });

    location.assign("./home.html");
  }
});

console.log(findUserIndex);

cancelBtn.addEventListener("click", () => {
  clearInputs();
  location.assign("./home.html");
});
