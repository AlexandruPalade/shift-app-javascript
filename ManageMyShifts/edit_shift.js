const date = document.getElementById("date");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const hourlyWage = document.getElementById("hourlyWage");
const shiftName = document.getElementById("shiftName");
const comments = document.getElementById("comments");

const errorDiv = document.getElementById("errorDiv");
const showError = document.createElement("p");

const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const shifts = JSON.parse(localStorage.getItem("shifts"));
console.log(shifts);
let shiftNameToEdit = localStorage.getItem("shiftName");
console.log(shiftName);
const findShiftIndex = shifts.findIndex(
  (shift) => shift.shiftName === shiftNameToEdit
);

date.value = shifts[findShiftIndex].date;
startTime.value = shifts[findShiftIndex].startTime;
endTime.value = shifts[findShiftIndex].endTime;
hourlyWage.value = shifts[findShiftIndex].hourlyWage;
workPlace.value = shifts[findShiftIndex].workPlace;
shiftName.value = shifts[findShiftIndex].shiftName;

console.log(findShiftIndex);

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

  shifts.forEach(() => {
    if (shiftAlreadyExist(shiftName.value)) {
      showError.innerText = "This shift name already exists";
      showError.classList.add("error");
      errorDiv.appendChild(showError);
      return;
    } else {
      shifts[findShiftIndex].date = date.value;
      shifts[findShiftIndex].startTime = startTime.value;
      shifts[findShiftIndex].endTime = endTime.value;
      shifts[findShiftIndex].hourlyWage = hourlyWage.value;
      shifts[findShiftIndex].shiftName = shiftName.value;
      shifts[findShiftIndex].comments = comments.value;
      localStorage.setItem("shifts", JSON.stringify(shifts));
    }
  });

  resetInputs();

  location.assign("./home.html");
});

cancelBtn.addEventListener("click", () => {
  location.assign("./home.html");
});

const resetInputs = () => {
  date.value = "";
  startTime.value = "";
  endTime.value = "";
  hourlyWage.value = "";
  shiftName.value = "";
  comments.value = "";
};
