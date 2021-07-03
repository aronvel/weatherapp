const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const ms1 = document.querySelector("#ms1");
const ms2 = document.querySelector("#ms2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  ms1.textContent = "loading ...";
  ms2.textContent = " ";
  const location = search.value;
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.errors) {
        ms1.textContent = data.errors;
      } else {
        ms1.textContent = data.forecast;
        ms2.textContent = data.location;
      }
    });
  });
});
