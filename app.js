(function bookLibrary() {
    
    // variables for book library functionality
    const bookForm = document.querySelector("#book-form");
    const addBookButton = document.querySelector(".create-new-book");
    const submitBookForm = document.querySelector(".submit-book-form");
    const page = document.querySelector(".page");
    const bookLibrary = document.querySelector(".book-library");
    const bookCards = document.querySelector(".book-cards");
    const readItButton = document.querySelector(".read-it");
    const deleteBookButton = document.querySelector(".delete-book-button");
  
    // variables for validating book form
    const titleEntry = document.getElementById("title");
    const titleError = document.getElementById("title-error");
    const authorEntry = document.getElementById("author");
    const authorError = document.getElementById("author-error");
    const pagesEntry = document.getElementById("pages");
    const pagesError = document.getElementById("pages-error");
  
    let toggleFormOn = false;
    let readStatus = null;
    let myLibrary = [];
  
    const toggleBookForm = function () {
      if (toggleFormOn === true) {
        bookForm.style.display = "none";
        addBookButton.textContent = "+ Add Book";
        addBookButton.style.backgroundColor = "#CCE6F4";
        toggleFormOn = false;
      } else if (toggleFormOn === false) {
        bookForm.style.display = "grid";
        addBookButton.textContent = "X Close";
        addBookButton.style.backgroundColor = "red";
        toggleFormOn = true;
      }
    };
  
    // function to toggle have I read it status
    function toggleReadStatus() {
      if (readItButton.textContent == "Yes") {
        readStatus = true;
      } else if (readItButton.textContent == "No") {
        readStatus = false;
      }
  
      if (readStatus === true) {
        readItButton.style.backgroundColor = "#CCE6F4";
        readItButton.style.color = "#175676";
        readItButton.textContent = "No";
        readStatus = false;
      } else if (readStatus === false) {
        readItButton.style.backgroundColor = "#175676";
        readItButton.style.color = "#CCE6F4";
        readItButton.textContent = "Yes";
        readStatus = true;
      }
    }
  
    // function to delete the books when the x button is clicked at the top right
    function deleteBook() {
      this.parentElement.remove();
    }
  
    class Book {
      constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
      }
      getInfo = function () {
        return `${this.title}, by ${this.author}, ${this.pages}`;
      };
    }
  
    // Function to check that entries are valid, if they pass validations they are added to the library array
    function addBookToLibrary() {
      let titleEntry = document.getElementById("title").value;
      let authorEntry = document.getElementById("author").value;
      let pagesEntry = document.getElementById("pages").value;
      let newBook = new Book(titleEntry, authorEntry, pagesEntry);
  
      myLibrary.push(newBook);
      createBookCard(titleEntry, authorEntry, pagesEntry);
      bookForm.reset();
    }
  
    //function to create the auto-population of book cards as they are added and validated
    function createBookCard(titleEntry, authorEntry, pagesEntry) {
      const bookDiv = document.createElement("div");
      const titleEl = document.createElement("p");
      const authorEl = document.createElement("p");
      const pagesEl = document.createElement("p");
  
      const readItText = document.createElement("p");
      const readItButton = document.createElement("button");
      const deleteBookButton = document.createElement("button");
  
      titleEl.textContent = titleEntry;
      authorEl.textContent = authorEntry;
      pagesEl.textContent = pagesEntry;
      readItText.textContent = "Have I read this book yet?";
      readItButton.textContent = "Yes";
      deleteBookButton.textContent = "X";
  
      bookDiv.classList.add("book");
      titleEl.classList.add("card-info");
      authorEl.classList.add("card-info");
      pagesEl.classList.add("card-info");
      readItText.classList.add("card-info");
      readItButton.classList.add("read-it");
      deleteBookButton.classList.add("delete-book-button");
  
      bookDiv.appendChild(titleEl);
      bookDiv.appendChild(authorEl);
      bookDiv.appendChild(pagesEl);
      bookDiv.appendChild(readItText);
      bookDiv.appendChild(readItButton);
      bookDiv.appendChild(deleteBookButton);
  
      bookCards.appendChild(bookDiv);
      bookLibrary.appendChild(bookCards);
      page.appendChild(bookLibrary);
  
      readItButton.addEventListener("click", function () {
        if (readStatus === true) {
          readItButton.style.backgroundColor = "#CCE6F4";
          readItButton.style.color = "#175676";
          readItButton.textContent = "No";
          readStatus = false;
        } else if (readStatus === false) {
          readItButton.style.backgroundColor = "#175676";
          readItButton.style.color = "#CCE6F4";
          readItButton.textContent = "Yes";
          readStatus = true;
        }
      });
  
      deleteBookButton.addEventListener("click", function () {
        this.parentElement.remove();
      });
    }
  
    addBookButton.addEventListener("click", toggleBookForm);
    readItButton.addEventListener("click", toggleReadStatus);
    deleteBookButton.addEventListener("click", deleteBook);
  
    // Validation for Book Form
    titleEntry.addEventListener("input", () => {
      if (titleEntry.validity.valid) {
        titleError.textContent = "";
        titleError.className = "error";
      } else {
        showError();
      }
    });
  
    authorEntry.addEventListener("input", () => {
      if (authorEntry.validity.valid) {
        authorError.textContent = "";
        authorError.className = "error";
      } else {
        showError();
      }
    });
  
    pagesEntry.addEventListener("input", () => {
      if (pagesEntry.validity.valid) {
        pagesError.textContent = "";
        pagesError.className = "error";
      } else {
        showError();
      }
    });
  
    submitBookForm.addEventListener("click", (e) => {
      if (
        !titleEntry.validity.valid ||
        !authorEntry.validity.valid ||
        !pagesEntry.validity.valid
      ) {
        showError();
        e.preventDefault();
      } else {
        addBookToLibrary();
      }
    });
  
    function showError() {
      if (titleEntry.validity.valueMissing) {
        titleError.textContent = "You need to enter a book title";
        titleError.className = "error active";
      } else if (titleEntry.validity.tooShort) {
        titleError.textContent = `Book should be at least ${titleEntry.minLength} characters; you entered: ${titleEntry.value.length}`;
        titleError.className = "error active";
      } else if (titleEntry.validity.tooLong) {
        titleError.textContent = `Book should be no more than ${titleEntry.maxLength} characters; you entered: ${titleEntry.value.length}`;
        titleError.className = "error active";
      } else if (authorEntry.validity.valueMissing) {
        authorError.textContent = "You need to enter the author's name";
        authorError.className = "error active";
      } else if (authorEntry.validity.tooShort) {
        authorError.textContent = `The author name should be at least ${authorEntry.minLength} characters; you entered: ${authorEntry.value.length}`;
        authorError.className = "error active";
      } else if (authorEntry.validity.tooLong) {
        authorError.textContent = `The author name should be no more than ${authorEntry.maxLength} characters; you entered: ${authorEntry.value.length}`;
        authorError.className = "error active";
      } else if (pagesEntry.validity.valueMissing) {
        pagesError.textContent = "You need to include the number of pages";
        pagesError.className = "error active";
      } else if (pagesEntry.validity.tooShort) {
        pagesError.textContent = `The amount of pages must be at least ${pagesEntry.minLength} characters; you entered: ${pagesEntry.value.length}`;
        pagesError.className = "error active";
      } else if (pagesEntry.validity.tooLong) {
        pagesError.textContent = `The amount of pages must be less than ${pagesEntry.maxLength} characters; you entered: ${pagesEntry.value.length}`;
        pagesError.className = "error active";
      } else {
        return;
      }
    }
  })();  