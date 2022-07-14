const lowerCaseChars = /[a-z]/;
const upperCaseChars = /[A-Z]/;
const specialChars = /\W/;
const numberChars = /\d/;

const errorDiv = document.getElementById("errorDiv");
const showError = document.createElement("p");

showError.classList.add("error");

function isPasswordValid(password) {
  console.log(lowerCaseChars);

  if (password.length < 6) {
    showError.innerText = "Password has less than 6 charecters";

    errorDiv.appendChild(showError);
    return false;
  }

  if (!lowerCaseChars.test(password)) {
    showError.innerText = "password has no lower case";

    errorDiv.appendChild(showError);
    return false;
  }

  if (!upperCaseChars.test(password)) {
    showError.innerText = "Password has no upper case";

    errorDiv.appendChild(showError);
    return false;
  }

  if (!specialChars.test(password)) {
    showError.innerText = "Password has no sepcial characters";

    errorDiv.appendChild(showError);
    return false;
  }

  if (!numberChars.test(password)) {
    showError.innerText = "Password no numbers";

    errorDiv.appendChild(showError);
    return false;
  }
  return true;
}
export { isPasswordValid };
