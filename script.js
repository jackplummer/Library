// DOM Elements & constants
const libraryTable = document.querySelector('.library-table');
let i = 0; // index counter

function Book(title, author, pages, read, index) { // book constructor
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.index = index
};

function addBookToLibrary(book) {
  let row = libraryTable.insertRow();
  row.setAttribute('data-index',`${book.index}`);
  let rowTitle = row.insertCell();
  rowTitle.textContent = `${book.title}`;
  let rowAuthor = row.insertCell();
  rowAuthor.textContent = `${book.author}`;
  let rowPages = row.insertCell();
  rowPages.textContent = `${book.pages}`;
  let rowRead = row.insertCell();
  rowRead.textContent = `${book.read}`;
  let rowDelete = row.insertCell();
  let deleteButton = document.createElement('span'); // add row delete
  deleteButton.innerHTML = '&times;';
  deleteButton.classList.add('delete-book');
  deleteButton.setAttribute('data-index', `${book.index}`);
  rowDelete.appendChild(deleteButton);
  deleteButton.addEventListener('click', function() {
    let deleteBookIndex = document.querySelectorAll(`[data-index]`);
    for (const deleteBookItem of deleteBookIndex) {
      if (deleteBookItem.dataset.index === deleteButton.dataset.index) {
        deleteBookItem.remove();
      };
    }
  })
  let rowReadButton = row.insertCell(); // add row read
  let readButton = document.createElement('span');
  readButton.innerHTML = '&#128214;';
  readButton.setAttribute('data-index', `${book.index}`);
  readButton.classList.add('read-button');
  rowReadButton.appendChild(readButton);
  readButton.addEventListener('click', function() {
    if (row.childNodes[3].textContent === 'Read') {
      row.childNodes[3].textContent = 'Not Read';
    } else {
      row.childNodes[3].textContent = 'Read';
    };
  })
};

// Modal
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const addBook = document.querySelector('#add');

addBook.addEventListener('click', function() {
  modal.style.display = 'block';
});

close.addEventListener('click', function() {
  modal.style.display = 'none';
});

window.addEventListener('click', function(event) { // close modal if area around modal is clicked 
  if (event.target == modal) {
    modal.style.display = 'none';
  };
});

// Modal form
const submitForm = document.querySelector("#submit");
const newTitle = document.querySelector("#title");
const newAuthor = document.querySelector("#author");
const newPages = document.querySelector("#pages");
let newRead = document.querySelector('input[name="radio"]:checked');

function clearForm() {
  newTitle.value = '';
  newAuthor.value = '';
  newPages.value = '';
};

submitForm.addEventListener('click', function() {
  newRead = document.querySelector('input[name="radio"]:checked');
  const newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newRead.value, i);
  i++;
  addBookToLibrary(newBook);

  clearForm();
  modal.style.display = 'none';
});



