// scripts/utils/contactForm.js
const displayModal = function () {
  const modal = document.getElementById("contact_modal");
  const overlay = document.getElementById("overlay");
  modal.style.display = "flex";
  overlay.style.display = "block";
};

const closeModal = function () {
  const modal = document.getElementById("contact_modal");
  const overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
};

window.displayModal = displayModal;
window.closeModal = closeModal;

export { displayModal, closeModal };
