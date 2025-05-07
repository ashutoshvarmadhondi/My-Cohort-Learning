const toDoInput = document.getElementById('to-do-input');
const AddButton = document.getElementById('Add-Button');
const removeAllContainer = document.getElementById('remove-all-container');

const ul = document.getElementById('ul');

AddButton.addEventListener('click', () => {
    const value = toDoInput.value.trim();
    if (value === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement('li');

    const taskText = document.createElement('p');
    taskText.innerText = value;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = "X";

    deleteButton.addEventListener('click', () => {
        li.remove();
        // Hide ul if all tasks are removed
        if (ul.children.length === 0) {
            ul.style.display = "none";
        }
    });
    
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    ul.appendChild(li);
    ul.style.display = "flex"; 
    toDoInput.value = ""; 
    createRemoveAllButton();  
});

function createRemoveAllButton() {
    // Prevent duplicates
    if (document.getElementById('remove-all-btn')) return;

    const removeAllBtn = document.createElement('button');
    removeAllBtn.id = 'remove-all-btn';
    removeAllBtn.innerText = "Remove All";
    removeAllBtn.style.marginTop = "20px";
    removeAllBtn.style.padding = "10px 20px";
    removeAllBtn.style.backgroundColor = "#a52a2a";
    removeAllBtn.style.color = "white";
    removeAllBtn.style.border = "none";
    removeAllBtn.style.borderRadius = "6px";
    removeAllBtn.style.cursor = "pointer";

    removeAllBtn.addEventListener('click', () => {
        ul.innerHTML = "";
        ul.style.display = "none";
        removeAllBtn.remove();
    });

    removeAllContainer.appendChild(removeAllBtn);
}