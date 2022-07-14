//declare variables

let users = JSON.parse(localStorage.getItem("users"));
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
const loggedInTime = JSON.parse(localStorage.getItem("loggedInTime"));

const editProfile = document.getElementById("editProfile");
const userContainer = document.getElementById("userContainer");
const addShiftsBtn = document.getElementById("addShiftsBtn");
const viewShiftsBtn = document.getElementById("viewShiftsBtn");
const searchInput = document.getElementById("searchInput");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const bestMonthContainer = document.getElementById("bestMonthContainer");
const bestMonth = document.getElementById("bestMonth");
const totalProfit = document.getElementById("totalProfit");

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const logOutBtn = document.getElementById("logOutBtn");

const tableBody = document.getElementById("tableBody");
const shiftRowElements = document.getElementsByClassName("shiftRow");

let shifts = JSON.parse(localStorage.getItem("shifts")) || [];

shifts = allUserShifts(); //display shifts for logged user

renderTable(shifts);

//add events on buttons

editProfile.addEventListener("click", () => {
  location.assign("./profile.html");
});

logOutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUsers");
  loggedInUser.pop();
  isEmpty(loggedInUser);
});

addShiftsBtn.addEventListener("click", function () {
  location.assign("./add_shifts.html");
});

//search between the shifts array and display the searched rows in the table
searchInput.addEventListener("keyup", function () {
  const searchedTerm = this.value;
  const filteredShifts = shifts.filter(function (shift) {
    return shift.shiftName.includes(searchedTerm);
  });
  renderTable(filteredShifts);
});

searchBtn.addEventListener("click", function () {
  const filteredShifts = shifts.filter(function (shift) {
    if (shift.date >= fromDate.value && shift.date <= toDate.value) {
      return shift.date;
    }
  });
  console.log(filteredShifts);
  renderTable(filteredShifts);
});

resetBtn.addEventListener("click", function () {
  fromDate.value = "";
  toDate.value = "";
});

//calculate the profit and hours worked for a day
const profit = {};

shifts.forEach((shift) => {
  const startHour = new Date(`1.${shift.startTime}`);
  const endHour = new Date(`1.${shift.endTime}`);
  if (startHour < endHour) {
    let hoursWorked = (endHour - startHour) / 1000 / 3600;
    profitPerShift = Math.round((hoursWorked * shift.hourlyWage * 100) / 100);

    shift.profitPerDay = profitPerShift;

    const month = new Date(shift.date).toLocaleDateString("EN", {
      month: "long"
    });

    const key = `${month}`;

    console.log(key);

    if (!profit[key]) {
      profit[key] = 0;
    }

    profit[key] += profitPerShift;
    console.log(`${profit[key]} hours worked`);
  }
});

function compare([, a], [, b]) {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }

  return 0;
}

function profitForShifts() {
  const profitEntries = Object.entries(profit).sort(compare); //sort the months for each profit

  console.log("ssss", profitEntries);

  const bestMonthText = profitEntries[0][0];

  console.log(bestMonthText);

  console.log(profitEntries[0][1]);

  bestMonth.innerHTML = `Best month: ${bestMonthText}`;
  totalProfit.innerHTML = `Total profit: ${profitEntries[0][1]}$`;
}

if (shifts.length === 0) {
  console.log("shifts are empty");
} else {
  profitForShifts();
}

renderTable(shifts);

//add rows
function renderTable(arr) {
  tableBody.innerHTML = "";
  arr.forEach((shift) => {
    const {
      shiftName,
      date,
      startTime,
      endTime,
      workPlace,
      hourlyWage,
      profitPerDay
    } = shift;
    tableBody.innerHTML += `<tr class="shiftRow">
    <td>${shiftName}</td>
    <td>${date}</td>
    <td>${startTime}</td>
    <td>${endTime}</td>
    <td>${workPlace}</td>
    <td>${hourlyWage}</td>
    <td>${profitPerDay}</td>
  </tr>`;
  });
  //edit shifts
  const shiftRows = Array.from(shiftRowElements);
  shiftRows.forEach((shift) => {
    shift.addEventListener("click", function (event) {
      const [target] = this.children;
      console.log(this.children);
      const currentShiftName = target.innerText;
      console.log(currentShiftName);
      localStorage.setItem("shiftName", currentShiftName);
      window.location.assign("./edit_shift.html");
    });
  });
}

//verify if the users is logged in for more then an hour

setInterval(function () {
  const verifyUserLogged = (Date.now() - loggedInTime) / 1000 > 3600;

  if (verifyUserLogged) {
    localStorage.removeItem("loggedInUsers");
    localStorage.removeItem("loggedInTime");
    location.assign("./login.html");
  }
}, 1000);

//verify if the array "loggedInUser" is empty
const isEmpty = () => {
  if (loggedInUser.length === 0) {
    location.assign("./login.html");
  }
};

isEmpty();

//create a new p witch will be shown in the nav bar
const welcomeTitle = () => {
  if (loggedInUser.length === 0) {
    location.assign("./login.html");
  } else {
    const para = document.createElement("p");
    para.innerText = `Welcome, ${loggedInUser[0].newUsername}`;
    para.addEventListener("click", function () {
      location.assign("./profile.html");
    });
    userContainer.appendChild(para);
  }
};

function allUserShifts() {
  const filtredShifts = shifts.filter(function (shift) {
    return shift.username === loggedInUser[0].newUsername;
  });
  console.log(filtredShifts);
  return filtredShifts;
}

welcomeTitle();
