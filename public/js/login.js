const o_cb = document.getElementById("userid_check");
o_cb.style.display = "none";
const rememberLb = document.getElementById("remember_label");
v_cb = document.getElementById("v_cb");
alertDiv = document.querySelector(".alert");

v_cb.addEventListener("click", function () {
  o_cb.checked = !o_cb.checked;

  if (o_cb.checked) {
    v_cb.style.backgroundColor = "#000"; // Example: Change background color to black
  } else {
    v_cb.style.backgroundColor = "transparent"; // Example: Set background color to transparent
  }
});

rememberLb.addEventListener("click", function () {
  if (!o_cb.checked) {
    v_cb.style.backgroundColor = "#000"; // Example: Change background color to black
  } else {
    v_cb.style.backgroundColor = "transparent"; // Example: Set background color to transparent
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!alertDiv.contains(target)) {
    alertDiv.remove();
  }
});
