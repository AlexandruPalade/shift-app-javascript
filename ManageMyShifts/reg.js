import { isPasswordValid } from "./utils.js";

//Declare variables

let users = [];
const loggedInUsers = [];

const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const age = document.getElementById("age");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");

const errorDiv = document.getElementById("errorDiv");
const showError = document.createElement("p");

const registerBtn = document.getElementById("registerBtn");

showError.classList.add("error");

const isUserAlreadyThere = (userEntry) =>
  users.filter((user) => user.username === userEntry).length === 1;

//Event Listeners

registerBtn.addEventListener("click", function () {
  if (isUserAlreadyThere(username.value)) {
    showError.innerText = "this user already exists";
    errorDiv.appendChild(showError);
    return;
  }

  if (username.value.length < 6) {
    showError.innerText = "Username has less than 6 charecters";
    errorDiv.appendChild(showError);
    return;
  }

  if (firstname.value.length < 2) {
    showError.innerText = "Firstname has less than 2 charecters";
    errorDiv.appendChild(showError);
    return;
  }

  if (lastname.value.length < 2) {
    showError.innerText = "Lastname has less than 2 charecters";
    errorDiv.appendChild(showError);
    return;
  }

  if (age.value < 16 || age.value > 65) {
    showError.innerText = "Age must be between 16 and 65 years";
    errorDiv.appendChild(showError);
    return;
  }

  if (isPasswordValid(password.value)) {
    const loggedInTime = Date.now();

    const newUsers = {
      email: email.value,
      username: username.value,
      password: btoa(password.value),
      firstname: firstname.value,
      lastname: lastname.value,
      age: age.value
    };

    users.push(newUsers);
    console.log(users);

    const loggedUser = {
      newUsername: username.value
    };

    loggedInUsers.push(loggedUser);

    localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInTime", JSON.stringify(loggedInTime));

    resetInputs();

    location.assign("./home.html");
  }
});

//Functions

const resetInputs = () => {
  email.value = "";
  username.value = "";
  password.value = "";
  age.value = "";
  firstname.value = "";
  lastname.value = "";
};

const loadUsers = () => {
  users = JSON.parse(localStorage.getItem("users")) || [];
};

loadUsers();
