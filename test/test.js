const form = document.getElementById("form-1");
const option1 = document.getElementById("option-1");
const option2 = document.getElementById("option-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(option1.checked, option2.value);
});
