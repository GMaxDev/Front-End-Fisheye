// scripts/utils/contactForm.js
window.displayModal = function () {
    const modal = document.getElementById("contact_modal");
    const overlay = document.getElementById("overlay");
    modal.style.display = "flex";
    overlay.style.display = "block";
};
  
window.closeModal = function () {
    const modal = document.getElementById("contact_modal");
    const overlay = document.getElementById("overlay");
    modal.style.display = "none";
    overlay.style.display = "none";
};