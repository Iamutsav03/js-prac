
const crudop = "https://crudcrud.com/api/0f7d92bd00d34b9784424b9648b60313/notes";

const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("text-area");
const dateInput = document.getElementById("date");
const searchInput = document.getElementById("search");
const messagesList = document.getElementById("messages");
const totalNotesCount = document.getElementById("notes-count");
const showingNotesCount = document.getElementById("showing-notes-count");

let allNotes = [];

// CREATE: Validate form and save a note
function validateForm(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const date = dateInput.value;

    if (!title || !description || !date) {
        alert("Please fill in all fields.");
        return false;
    }

    const message = {
        title: title,
        description: description,
        date: date
    };

    axios.post(crudop, message)
        .then(response => {
            allNotes.push(response.data);
            renderNotes();
            form.reset();
        })
        .catch(error => {
            console.error("Error submitting note:", error);
            alert("Could not save the note. Please try again.");
        });

    return false;
}

// READ + DISPLAY: Render notes and update counts
function renderNotes() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredNotes = allNotes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) ||
        note.description.toLowerCase().includes(searchTerm)
    );

    messagesList.innerHTML = "";

    filteredNotes.forEach(note => {
        displayMessages(note);
    });

    totalNotesCount.textContent = `Total notes: ${allNotes.length}`;
    showingNotesCount.textContent = `Showing notes: ${filteredNotes.length}`;
}

// CREATE NOTE CARD
function displayMessages(message) {
    const li = document.createElement("li");
    li.className =
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm break-words";

    const title = document.createElement("h3");
    title.className = "mb-2 text-lg font-semibold text-slate-900";
    title.textContent = message.title;

    const description = document.createElement("p");
    description.className = "mb-3 whitespace-pre-wrap text-sm text-slate-600";
    description.textContent = message.description;

    const date = document.createElement("p");
    date.className = "mb-4 text-xs text-slate-500";
    date.textContent = `Due date: ${message.date}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className =
        "rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100";

    deleteButton.addEventListener("click", () => {
        deleteMessage(message._id, deleteButton);
    });

    li.append(title, description, date, deleteButton);
    messagesList.appendChild(li);
}

// DELETE: Remove note from API and update UI
function deleteMessage(id, button) {
    button.disabled = true;
    button.textContent = "Deleting...";

    axios.delete(`${crudop}/${id}`)
        .then(() => {
            allNotes = allNotes.filter(note => note._id !== id);
            renderNotes();
        })
        .catch(error => {
            console.error("Error deleting note:", error);
            alert("Could not delete the note. Please try again.");

            button.disabled = false;
            button.textContent = "Delete";
        });
}

// SEARCH: Filter notes while typing
searchInput.addEventListener("input", renderNotes);

// READ: Fetch saved notes when the page loads
function fetchNotes() {
    axios.get(crudop)
        .then(response => {
            allNotes = response.data;
            renderNotes();
        })
        .catch(error => {
            console.error("Error fetching notes:", error);
            alert("Could not load notes. Please check your connection.");
        });
}

fetchNotes();
