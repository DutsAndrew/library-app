const addNewBook = document.querySelector('.create-new-book');
const bookFormContainer = document.querySelector('.form-container');
const submitBookForm = document.querySelector('.submit-book-form');
const bookLibrary = document.querySelector('.book-library');
const bookCards = document.querySelectorAll('.book-cards');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.getInfo = function() {
        return(`${title}, by ${author}, ${pages}, ${read}`);
    }
}

function addBookToLibrary() {

}