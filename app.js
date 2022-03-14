const createNewBook = document.querySelector('.create-new-book');
const bookFormContainer = document.querySelector('.form-container');
const submitBookForm = document.querySelector('.submit-book-form');
const bookLibrary = document.querySelector('.book-library');
const bookCards = document.querySelectorAll('.book-cards');
const form = document.querySelector('.form-container');

const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const pages = document.querySelector('#pages').value;
const haveIReadIt = document.querySelector('.have-i-read-it').value;
const slider = document.querySelector('.slider').value;

function openForm() {
    document.getElementById("form").style.display = "block";
  }
  function closeForm() {
    document.getElementById("form").style.display = "none";
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