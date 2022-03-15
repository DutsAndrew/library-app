const bookForm = document.querySelector('.form-container');
const addBookButton = document.querySelector('.create-new-book');
const submitBookForm = document.querySelector('.submit-book-form');
const bookLibrary = document.querySelector('.book-library');
const bookCards = document.querySelectorAll('.book-cards');
const form = document.querySelector('.form-container');

const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const pages = document.querySelector('#pages').value;
const haveIReadIt = document.querySelector('.have-i-read-it').value;
const slider = document.querySelector('.slider').value;


// toggle function to handle opening the "add new book" form and to close the same form if no new book is added
let toggleFormOn = false;

const toggleBookForm = function() {
  if (toggleFormOn === true) {
      bookForm.style.display = "none";
      addBookButton.textContent = "+ Add Book";
      addBookButton.style.backgroundColor = "#CCE6F4";
      toggleFormOn = false;
      console.log("the book form has disappeared");
  } 
  
  else if (toggleFormOn === false) {
      bookForm.style.display = "grid";
      addBookButton.textContent = "X Close";
      addBookButton.style.backgroundColor = "red";
      toggleFormOn = true;
      console.log("the book form is now open");
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
addBookButton.addEventListener('click', toggleBookForm);