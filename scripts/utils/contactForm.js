function displayModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.getElementById("overlay");
	modal.style.display = "flex";
    overlay.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.getElementById("overlay");
    modal.style.display = "none";
    overlay.style.display = "none";
}
