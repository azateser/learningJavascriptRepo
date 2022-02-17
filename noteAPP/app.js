// Created by Azat ESER
// Github: https://github.com/azateser

const newNote = document.querySelector('.input-addNote');
const addNewNoteBtn = document.querySelector('.btn-note-add');
const noteLists = document.querySelector('.note-list');

addNewNoteBtn.addEventListener('click', addNoteFunction);
noteLists.addEventListener('click', removeNoteFunction);
document.addEventListener('DOMContentLoaded', localStorageRead);

function removeNoteFunction(e) {
  const selectedObject = e.target;

  if (selectedObject.classList.contains('note-end')) {
    selectedObject.parentElement.classList.toggle('completed-note');
  }
  if (selectedObject.classList.contains('note-remove')) {
    if (confirm('Are you sure you want to delete?')) {
      selectedObject.parentElement.classList.toggle('kaybol');
      const noteToBeDeleted =
        selectedObject.parentElement.children[0].innerText;

      localStorageSil(noteToBeDeleted);

      selectedObject.parentElement.addEventListener(
        'transitionend',
        function () {
          selectedObject.parentElement.remove();
        }
      );
    }
  }
}

function addNoteFunction(e) {
  e.preventDefault();

  if (newNote.value.length > 0) {
    createANote(newNote.value);
    // save to localstorage
    localStorageKaydet(newNote.value);
    newNote.value = '';
  } else {
    alert('Enter a note.');
  }
}

function localStorageConvertToArray() {
  let myNotes;

  if (localStorage.getItem('myNotes') === null) {
    myNotes = [];
  } else {
    myNotes = JSON.parse(localStorage.getItem('myNotes'));
  }

  return myNotes;
}

function localStorageKaydet(newNote) {
  let myNotes = localStorageConvertToArray();
  myNotes.push(newNote);
  localStorage.setItem('myNotes', JSON.stringify(myNotes));
}

function localStorageRead() {
  let myNotes = localStorageConvertToArray();

  myNotes.forEach(function (myNote) {
    createANote(myNote);
  });
}

function createANote(myNote) {
  // Create Note Div
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note-item');

  // Create Note Li
  const noteLi = document.createElement('li');
  noteLi.classList.add('note');
  noteLi.innerText = myNote;
  noteDiv.appendChild(noteLi);

  // Add Completed Button
  const noteEndBtn = document.createElement('button');
  noteEndBtn.classList.add('note-btn');
  noteEndBtn.classList.add('note-end');
  noteEndBtn.innerHTML = '<i class="far fa-check-square"></i>';
  noteDiv.appendChild(noteEndBtn);

  // Add Remove Button
  const noteRemoveBtn = document.createElement('button');
  noteRemoveBtn.classList.add('note-btn');
  noteRemoveBtn.classList.add('note-remove');
  noteRemoveBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  noteDiv.appendChild(noteRemoveBtn);

  // Let's add the div we created to the ul
  noteLists.appendChild(noteDiv);
}

function localStorageSil(myNote) {
  let myNotes = localStorageConvertToArray();

  // delete item with splice
  const elementIndexToBeDeleted = myNotes.indexOf(myNote);
  console.log(elementIndexToBeDeleted);
  myNotes.splice(elementIndexToBeDeleted, 1);

  localStorage.setItem('myNotes', JSON.stringify(myNotes));
}
