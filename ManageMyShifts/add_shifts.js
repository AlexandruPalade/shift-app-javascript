let shifts = [];
shifts = JSON.parse(localStorage.getItem("shifts")) || [];

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUsers"));
console.log(loggedInUser);

let totalProfit = 0;

const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const hourlyWage = document.getElementById("hourlyWage");
const shiftName = document.getElementById("shiftName");
const comments = document.getElementById("comments");
const workPlace = document.getElementById("workPlace");

const errorDiv = document.getElementById("errorDiv");
const showError = document.createElement("p");

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const shiftAlreadyExist = (userEntry) =>
  shifts.filter((shift) => shift.shiftName === userEntry).length === 1;

saveBtn.addEventListener("click", () => {
  if (startTime.value > endTime.value) {
    showError.innerText = "Start time must be lower than end time ";
    showError.classList.add("error");
    errorDiv.appendChild(showError);
    return;
  }
  if (
    date.value === "" ||
    startTime.value === "" ||
    endTime.value === "" ||
    workPlace.value === "" ||
    hourlyWage.value === "" ||
    shiftName.value === ""
  ) {
    showError.innerText = "Please fill all inputs";
    showError.classList.add("error");
    errorDiv.appendChild(showError);
    return;
  }

  if (shiftAlreadyExist(shiftName.value)) {
    showError.innerText = "This shift name already exists";
    showError.classList.add("error");
    errorDiv.appendChild(showError);
    return;
  }

//add the edited shift into the array

  newShift = {
    date: date.value,
    startTime: startTime.value,
    endTime: endTime.value,
    workPlace: workPlace.value,
    hourlyWage: hourlyWage.value,
    shiftName: shiftName.value,
    comments: comments.value,
    username: loggedInUser[0].newUsername
  };
  shifts.push(newShift);
  console.log(shifts);

  localStorage.setItem("shifts", JSON.stringify(shifts));

  resetInputs();
});

cancelBtn.addEventListener("click", () => {
  location.assign("./home.html");
});

const resetInputs = () => {
  date.value = "";
  startTime.value = "";
  endTime.value = "";
  workPlace.value = "";
  hourlyWage.value = "";
  shiftName.value = "";
  comments.value = "";
};
