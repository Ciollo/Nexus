export function toggleViewPassword(userPassword, toggleViewPasswordElement) {
  if (toggleViewPasswordElement.classList.contains("bxs-hide")) {
    toggleViewPasswordElement.classList.remove("bxs-hide");
    toggleViewPasswordElement.classList.add("bxs-show");
    userPassword.type = "text";
  } else {
    toggleViewPasswordElement.classList.remove("bxs-show");
    toggleViewPasswordElement.classList.add("bxs-hide");
    userPassword.type = "password";
  }
}