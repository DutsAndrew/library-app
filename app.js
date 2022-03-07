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