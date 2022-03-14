const createNewBook = document.getElementById('.create-new-book');
const submitBookForm = document.querySelector('.submit-book-form');
const bookLibrary = document.querySelector('.book-library');
const bookCards = document.querySelectorAll('.book-cards');
const form = document.querySelector('.form-container');

const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const pages = document.querySelector('#pages').value;
const haveIReadIt = document.querySelector('.have-i-read-it').value;
const slider = document.querySelector('.slider').value;

let bookFormContainer = document.getElementById('.form-container');

function toggle() {
  if(bookFormContainer.content.display = "none") {
    bookFormContainer.content.display = "grid";
  } else if (bookFormContainer.display.content = "grid") {
    bookFormContainer.display.content = "none";
  } else {
    bookFormContainer.display.content = "none";
  }
}
    

let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.getInfo = function() {
        return(`${title}, by ${author}, ${pages}`);
    };
}

function addBookToLibrary() {
    const book = new Book();

    myLibrary.push(book);
}



addBookToLibrary('The Lightning Thief', 'Rick Riordan', 333);
addBookToLibrary('The Lightning Thief', 'Rick Riordan', 333);

form.addEventListener('submit', addBookToLibrary);
createNewBook.addEventListener('click', toggle);