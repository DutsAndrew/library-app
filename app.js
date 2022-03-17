const bookForm = document.querySelector('.form-container');
const addBookButton = document.querySelector('.create-new-book');
const submitBookForm = document.querySelector('.submit-book-form');
const bookLibrary = document.querySelector('.book-library');
const bookCards = document.querySelectorAll('.book-cards');

const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const pages = document.querySelector('#pages').value;
const sliderOn = document.querySelector('.slider').style.backgroundColor = "#2196F3";
const sliderOff = document.querySelector('.slider').style.backgroundColor = "red";


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
    let titleEntry = document.getElementById("title").value;
    let authorEntry = document.getElementById("author").value;
    let pagesEntry = document.getElementById("pages").value;

    let newBook = new Book(titleEntry, authorEntry, pagesEntry);

    myLibrary.push(newBook);
    console.log(myLibrary);
}

submitBookForm.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', toggleBookForm);