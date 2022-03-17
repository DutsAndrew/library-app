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


// Library array to hold all books and constructor function to easily create and store new book information
let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.getInfo = function() {
        return(`${title}, by ${author}, ${pages}`);
    };
}

// Function to check that entries are valid, if they pass validations they are added to the library array
function addBookToLibrary() {
    let titleEntry = document.getElementById("title").value;
    let authorEntry = document.getElementById("author").value;
    let pagesEntry = document.getElementById("pages").value;
    let input = document.getElementsByClassName("input");

    if (titleEntry.length == 0 || authorEntry.length == 0 || pagesEntry.length == 0) {
        input.value = "Empty";
        bookForm.reset();
        alert("You left either your title, author, or pages entry blank, please try again"); 
        return;
    } else if (authorEntry.length > 50 || titleEntry.length > 50) {
        input.value = "Empty";
        bookForm.reset();
        alert("Your author or title entry is too long, please try again");
        return;
    } else if (isNaN(pagesEntry) || pagesEntry < 1 || pagesEntry > 3000) {
        input.value = "Empty";
        bookForm.reset();
        alert("Your # of pages of entry is invalid");
        return;
    }

    let newBook = new Book(titleEntry, authorEntry, pagesEntry);

    myLibrary.push(newBook);
    console.log(myLibrary);
    createBookCard(newBook);
};

function createBookCard(newBook) {
    
}

submitBookForm.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', toggleBookForm);