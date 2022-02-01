const inputText = document.getElementById('inputText');
const saveButton = document.getElementById('saveButton');
const clearButton = document.getElementById('clearButton');
const toDoList = document.getElementById('toDoList');
const list = sessionStorage.getItem('list') ? JSON.parse(sessionStorage.getItem('list')) : [];


saveButton.addEventListener('click', saveFunction);
clearButton.addEventListener('click', clearFunction);

let newElem = null;

function showList() {

    for (let elem of list) {
        let listRow = document.createElement('div');
        toDoList.appendChild(listRow);
        listRow.classList.add('listRow');

        const para = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        const saveBtn = document.createElement('button');
        const newDiv = document.createElement('div');

        listRow.appendChild(para);
        listRow.appendChild(newDiv);

        newDiv.appendChild(editButton);
        newDiv.appendChild(saveBtn);
        newDiv.appendChild(deleteButton);

        para.classList.add('listRowText');
        newDiv.classList.add('newDiv')
        deleteButton.classList.add('deleteButton');
        editButton.classList.add('editButton');
        saveBtn.classList.add('saveBtn');

        deleteButton.addEventListener('click', () => deleteRow(elem))
        editButton.addEventListener('click', () => editEvent(para, listRow, elem));
        saveBtn.addEventListener('click', () => saveEvent(para, listRow));

        para.innerHTML = elem.title;
        deleteButton.innerHTML = 'Delete';
        editButton.innerHTML = 'Edit';
        saveBtn.innerHTML = 'Save';
        
    }
}

function saveFunction() {

    if (inputText.value) {
        list.push({
            title: inputText.value,
        });
        sessionStorage.setItem('list', JSON.stringify(list));
    } else {
        alert('Please fill field')
    }
    location.reload();
}

function clearFunction() {
    inputText.value = '';
}


function deleteRow(elem) {
    const delRow = list.filter(el => el.title !== elem.title);
    sessionStorage.setItem('list', JSON.stringify(delRow));
    location.reload();
}

function editEvent(para, listRow, elem) {
    para.contentEditable = "true";
    listRow.querySelector('.editButton').style.display = 'none';
    listRow.querySelector('.saveBtn').style.display = 'block';
    para.style.outline = " 2px solid red";
    para.style.borderRadius = "3px";
    newElem = elem;
    
}

function saveEvent(para, listRow) {
    para.contentEditable = "false";
    listRow.querySelector('.editButton').style.display = 'block';
    listRow.querySelector('.saveBtn').style.display = 'none';
    para.style.outline = "none";
    if (para.innerHTML !== newElem.title){
        list.push({
            title: para.innerHTML,
        });
        sessionStorage.setItem('list', JSON.stringify(list));
        const delRow = list.filter(el => el.title !== newElem.title);
        sessionStorage.setItem('list', JSON.stringify(delRow));
    }
    location.reload();
   
}

showList();