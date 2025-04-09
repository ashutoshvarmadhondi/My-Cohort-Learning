const toDoInput = document.getElementById('to-do-input');
const AddButton = document.getElementById('Add-Button');
const ul = document.getElementById('ul')

AddButton.addEventListener('click', ()=>{
    const value = toDoInput.value;
    const li = document.createElement('li');
    li.append(value)
 
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "X"

    deleteButton.addEventListener('click', () => li.remove())
    li.append(deleteButton)

    ul.append(li);
   

    
})