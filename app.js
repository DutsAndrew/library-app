(function bookLibrary() {
    const bookForm = document.querySelector('.form-container');
    const addBookButton = document.querySelector('.create-new-book');
    const submitBookForm = document.querySelector('.submit-book-form');
    const page = document.querySelector('.page');
    const bookLibrary = document.querySelector('.book-library');
    const bookCards = document.querySelector('.book-cards');
    const readItButton = document.querySelector('.read-it');
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

    // function to toggle have I read it status
    function toggleReadStatus() {
        if (readItButton.textContent = "Yes") {
            readStatus = true;
        } else if (readItButton.textContent = "No") {
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
    };

    // function to delete the books when the x button is clicked at the top right
    function deleteBook() {
        this.parentElement.remove();
    }

    // Library array to hold all books and constructor function to easily create and store new book information
    let myLibrary = [];

    class Book {
        constructor(title, author, pages) {
            this.title = title;
            this.author = author;
            this.pages = pages;
        }
        getInfo = function() {
            return(`${this.title}, by ${this.author}, ${this.pages}`);
        }
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
        bookForm.reset();
    };


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

        readItButton.addEventListener('click', function() {
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

        deleteBookButton.addEventListener('click', function() {
            this.parentElement.remove();
        });
    };

    submitBookForm.addEventListener('click', addBookToLibrary);
    addBookButton.addEventListener('click', toggleBookForm);
    readItButton.addEventListener('click', toggleReadStatus);
    deleteBookButton.addEventListener('click', deleteBook);
})();