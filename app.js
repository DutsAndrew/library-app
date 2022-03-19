const bookForm = document.querySelector('.form-container');
const addBookButton = document.querySelector('.create-new-book');
const submitBookForm = document.querySelector('.submit-book-form');

const page = document.querySelector('.page');
const bookLibrary = document.querySelector('.book-library');
const bookCards = document.querySelector('.book-cards');
const bookDiv = document.querySelector(".book");

const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const pages = document.querySelector('#pages').value;

const sliderSwitch = document.querySelector('.switch');
const sliderInput = document.querySelector('.have-i-read-it');
const sliderSpan = document.querySelector('.slider');
const sliderOn = document.querySelector('.slider').style.backgroundColor = "#2196F3";
const sliderOff = document.querySelector('.slider').style.backgroundColor = "red";

const deleteBookButton = document.querySelector('.delete-book-button');


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
    createBookCard(titleEntry, authorEntry, pagesEntry);
};


//function to create the auto-polulation of book cards as they are added and validated
function createBookCard(titleEntry, authorEntry, pagesEntry) {
    const bookDiv = document.createElement("div");
    const titleEl = document.createElement("p");
    const authorEl = document.createElement("p");
    const pagesEl = document.createElement("p");
    // const readItLabel = document.createElement("label");
    // const readItInput = document.createElement("checkbox");
    // const readItSlider = document.createElement("slider");

    titleEl.textContent = titleEntry;
    authorEl.textContent = authorEntry;
    pagesEl.textContent = pagesEntry;

    bookDiv.classList.add("book");
    titleEl.classList.add("card-info");
    authorEl.classList.add("card-info");
    pagesEl.classList.add("card-info");
    bookDiv.classList.add("bookDiv");
    // readItLabel.classList.add("switch");
    // readItInput.classList.add("have-i-read-it");
    // readItSlider.classList.add("slider");

    bookDiv.appendChild(titleEl);
    bookDiv.appendChild(authorEl);
    bookDiv.appendChild(pagesEl);
    // bookDiv.appendChild(readItLabel);
    // bookDiv.appendChild(readItInput);
    // bookDiv.appendChild(readItSlider);
    bookCards.appendChild(bookDiv);
    bookLibrary.appendChild(bookCards);
    page.appendChild(bookLibrary);
}

// function to delete the books when the x button is clicked at the top right
function deleteBook() {

}

submitBookForm.addEventListener('click', addBookToLibrary);
addBookButton.addEventListener('click', toggleBookForm);
deleteBookButton.addEventListener('click', deleteBook);