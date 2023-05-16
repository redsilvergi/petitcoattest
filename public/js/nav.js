const navToggle = document.querySelector(".nav-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

navToggle.addEventListener("click", function () {
  dropdownMenu.classList.toggle("open");
  checkDropDown();
});

const checkDropDown = () => {
  if (dropdownMenu.classList.contains("open")) {
    console.log("dropdown is open");
  } else {
    console.log("dropdwon is closed");
  }
};
