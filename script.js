const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label ");
const progressValue = document.querySelector(".progress-value");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => input.value);
    if (allGoalsAdded) {
      checkBox.parentElement.classList.toggle("completed");

      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`;
      progressLabel.innerText = allQuotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorLabel.style.display = "block";
    }
  });
});
inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;
 

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    errorLabel.style.display = "none";
  });
  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});



