function displayModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.getElementById("overlay");
	modal.style.display = "flex";
    overlay.style.display = "block"; // Affiche l'overlay
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const overlay = document.getElementById("overlay");
    modal.style.display = "none";
    overlay.style.display = "none"; // Affiche l'overlay
}
