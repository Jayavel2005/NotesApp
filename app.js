const notesContainer = document.getElementById("notes-container");
const addNote = document.getElementById("addNote");
const noteValue = document.getElementById("noteContent");

const notesArray = JSON.parse(localStorage.getItem("notes")) || [];

window.onload = () => {
    notesArray.forEach(noteText => {
        if (noteText.trim() !== '') {
            createNote(noteText);
        }
    });
}

addNote.addEventListener("click", () => {
    const noteText = noteValue.value.trim();
    if (noteText !== "") {
        notesArray.push(noteText);
        createNote(noteText);
        noteValue.value = ""; // Clear input field
        localStorage.setItem("notes", JSON.stringify(notesArray));
        // Hide alert after successful addition
        
    } else {
        // Show alert if the note text is empty
        alert("Note can't be Empty")
    }
});


function createNote(userNote) {
    const note = document.createElement("div");
    note.classList.add("note");

    // Note content creation
    const noteContent = document.createElement("div");
    noteContent.classList.add("note-content", "text-white");
    noteContent.setAttribute("contenteditable", "true");
    noteContent.innerText = userNote;

    // Update the note text in notesArray when edited
    noteContent.addEventListener("blur", () => {
        const updatedText = noteContent.innerText.trim();
        const index = notesArray.indexOf(userNote);
        if (index > -1) {
            notesArray[index] = updatedText; // Update the array
            localStorage.setItem("notes", JSON.stringify(notesArray)); // Update localStorage
        }
    });

    // Note delete button creation
    const noteDeleteBtn = document.createElement("button");
    noteDeleteBtn.innerText = "Delete";
    noteDeleteBtn.classList.add("noteDeleteBtn");

    // Note created
    note.append(noteContent, noteDeleteBtn);

    noteDeleteBtn.addEventListener("click", () => {
        removeNote(note, userNote);
    });

    notesContainer.appendChild(note);
}

function removeNote(note, userNote) {
    note.remove();
    const index = notesArray.indexOf(userNote);
    if (index > -1) {
        notesArray.splice(index, 1);
    }
    localStorage.setItem("notes", JSON.stringify(notesArray));
}
