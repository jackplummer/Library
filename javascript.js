// Books

let myLibrary = [];
const library = document.querySelector('.library');
let deleteBookButtons = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
};

function addBookToLibrary(book) { // add book object to library array
  bookString = `${book.title}, by ${book.author}, ${book.pages} pages long. ${book.read}.`
  return myLibrary.push(bookString);
};

function displayLibrary() { // add books from library array to page
  library.textContent = '';
  for (const books in myLibrary) {
    let book = document.createElement('div');
    book.classList.add('book-card');
    book.setAttribute('data-index', `${books}`);
    book.textContent = myLibrary[books];
    library.appendChild(book);

    let deleteBook = document.createElement('span'); // delete book button
    deleteBook.innerHTML = '&times;';
    deleteBook.classList.add('delete-book');
    deleteBook.setAttribute('data-index', `${books}`);
    book.appendChild(deleteBook);
  };

  deleteBookButtons = document.querySelectorAll('.delete-book');
  deleteBook();
};

function deleteBookLibrary(array, index) { // delete book from library array
  let arrayRemoved = array.splice(index,1)
  return array
};

function deleteBook() { // delete book button deletes correct book
  for (const deleteBookButton of deleteBookButtons) {
    deleteBookButton.addEventListener('click', function() {
      let deleteBookIndex = document.querySelectorAll(`[data-index]`);
      console.log(deleteBookIndex);
      console.log(deleteBookButton);
      for (const deleteBookItem of deleteBookIndex) {
        if (deleteBookItem.dataset.index === deleteBookButton.dataset.index) {
          deleteBookItem.remove();
        };
      };
    })
  };
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
  const newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newRead.value);
  addBookToLibrary(newBook);
  displayLibrary();
  clearForm();
  modal.style.display = 'none';
});



