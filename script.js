const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    // Get notes from localStorage
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;

        // Reattach event listeners to newly added notes
        attachDeleteListeners();
        attachEditListeners();
    }
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Attach event listeners for delete functionality
function attachDeleteListeners() {
    const deleteIcons = notesContainer.querySelectorAll("img");
    deleteIcons.forEach(icon => {
        // Remove previous listeners to prevent multiple attachments
        icon.removeEventListener("click", handleDelete);
        icon.addEventListener("click", handleDelete);
    });
}

// Separate delete handler function
function handleDelete(event) {
    const icon = event.target;
    const noteElement = icon.closest('.input-box');
    if (noteElement) {
        noteElement.remove();
        updateStorage();
    }
}

// Attach event listeners for editing notes
function attachEditListeners() {
    const inputBoxes = notesContainer.querySelectorAll(".input-box");
    inputBoxes.forEach(box => {
        // Remove previous listeners to prevent multiple attachments
        box.removeEventListener("keyup", updateStorage);
        box.addEventListener("keyup", updateStorage);
    });
}

// Add a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("div");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    let img = document.createElement("img");
    img.src = "images/delete.png";
    img.alt = "Delete note";

    // Append delete icon inside the note container
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Focus on the new note for immediate editing
    inputBox.focus();

    // Attach event listeners to the new note
    attachDeleteListeners();
    attachEditListeners();
    updateStorage();
});

// Load notes from localStorage on page load
showNotes();