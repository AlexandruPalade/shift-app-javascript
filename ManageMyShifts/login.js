let users = JSON.parse(localStorage.getItem("users"));
console.log(users);

const loggedUsers = [];

const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const resetBtn = document.getElementById("resetBtn");

const errorDiv = document.getElementById("errorDiv");
const showError = document.createElement("p");

loginBtn.addEventListener("click", function () {
  const verify = (element) =>
    username.value === element.username &&
    btoa(password.value) === element.password;
  if (users.some(verify)) {
    const newUser = {
      newUsername: username.value
    };
    const loggedInTime = Date.now();
    loggedUsers.push(newUser);
    localStorage.setItem("loggedInUsers", JSON.stringify(loggedUsers));
    localStorage.setItem("loggedInTime", JSON.stringify(loggedInTime));
    location.assign("./home.html");
  } else {
    showError.innerText = "Username or password incorrect";
    showError.classList.add("error");
    errorDiv.appendChild(showError);
  }
});

registerBtn.addEventListener("click", function () {
  location.assign("./reg.html");
});

const findUser = (userEntry) =>
  users.filter((user) => user.username === userEntry).length === 1;

const findEmail = (userEntry) =>
  users.filter((user) => user.email === userEntry).length === 1;

console.log(findUser(username.value));

resetBtn.addEventListener("click", () => {
  const buildInput = document.querySelector(".resetPassword");
  console.log(buildInput);

  if (buildInput === null && findUser(username.value)) {
    const topContainer = document.getElementById("topContainer");
    const newLabel = document.createElement("label");
    const newInput = document.createElement("input");
    const verifyBtn = document.createElement("button");

    newLabel.innerText = "Please enter the email ";
    newInput.classList.add("resetPassword");
    newInput.setAttribute("type", "text");
    verifyBtn.innerHTML = "Verify";

    topContainer.appendChild(newLabel);
    topContainer.appendChild(newInput);
    topContainer.appendChild(verifyBtn);

    verifyBtn.addEventListener("click", () => {
      if (findEmail(newInput.value)) {
        const userToReset = [];
        userToReset.push(username.value);

        location.assign("./reset_password.html");

        localStorage.setItem("userToReset", JSON.stringify(userToReset));
      } else {
        showError.innerText = "Email incorrect";
        showError.classList.add("error");
        errorDiv.appendChild(showError);
      }
    });
  }
});
