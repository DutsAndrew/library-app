import React, { FC, useState, MouseEvent } from 'react';
import '../style/Sidebar.css';

interface SidebarProps {
  addBookToLibrary: Function,
}

const Sidebar: FC<SidebarProps> = (props): JSX.Element => {

  const { addBookToLibrary } = props;

  const [formToggle, setFormToggle] = useState({
    toggle: false,
  });

  const openBookForm = (e: MouseEvent): void => {
    e.preventDefault();
    console.log('opening');

    if (formToggle.toggle === false) {
      const bookForm: Element | null = document.querySelector("#book-form");
      bookForm?.classList.remove('form-container-closed');
      bookForm?.classList.add('form-container-open');

      const addBookButton: Element | null = document.querySelector("#add-book-button");
      addBookButton?.classList.remove('create-new-book-closed');
      addBookButton?.classList.add('create-new-book-open');
      if (addBookButton) {
        addBookButton.textContent = 'X Close';
      };
      setFormToggle({
        toggle: true,
      });
    }

    if (formToggle.toggle === true) {
      const bookForm: Element | null = document.querySelector("#book-form");
      bookForm?.classList.add('form-container-closed');
      bookForm?.classList.remove('form-container-open');

      const addBookButton: Element | null = document.querySelector("#add-book-button");
      addBookButton?.classList.add('create-new-book-closed');
      addBookButton?.classList.remove('create-new-book-open');
      if (addBookButton) {
        addBookButton.textContent = '+ Add Book';
      };
      setFormToggle({
        toggle: false,
      });
    }
  }

  const handleBookFormChange = (e: any): void => {
    const entryThatChanged: any = e.target;
    const errorText: any = e.target.nextSibling;
    if (entryThatChanged && errorText) {
      if (entryThatChanged.validity.valid) {
        errorText.textContent = "";
        errorText.className = "error";
      } else {
        showError(entryThatChanged, errorText);
      };
    };
  };

  const showError = (entry: any, error: any): void => {
    if (entry.id === 'title') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to enter a book title";
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Book should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Book should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      };
      return;
    };

    if (entry.id === 'author') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to enter the author's name";
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `The author name should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `The author name should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      };
      return;
    };
   
    if (entry.id === 'pages') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to include the number of pages";
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `The amount of pages must be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `The amount of pages must be less than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      };
    };
    return;
  };

  const submitBookForm = (e: MouseEvent): void => {
    e.preventDefault();
    const titleEntry: any | null = document.getElementById("title");
    const authorEntry: any | null = document.getElementById("author");
    const pagesEntry: any | null = document.getElementById("pages");

    if (!titleEntry.validity.valid) {
      showError(titleEntry, titleEntry.nextSibling);
      return;
    };

    if (!authorEntry.validity.valid) {
      showError(authorEntry, authorEntry.nextSibling);
      return;
    };

    if (!pagesEntry.validity.valid) {
      showError(pagesEntry, pagesEntry.nextSibling);
      return;
    };

    if (titleEntry.validity.valid
      && authorEntry.validity.valid
      && pagesEntry.validity.valid
      ) {
        addBookToLibrary(titleEntry.value, authorEntry.value, Number(pagesEntry.value));
      };
  }

  return (
    <div className="sidebar">
        <button id='add-book-button' className="create-new-book-closed" onClick={openBookForm} >+ Add Book</button>
        <form noValidate id="book-form" className="form-container-closed">
            <fieldset>
              <legend className="legend-text">Add new book to library</legend>
              <label htmlFor="title" className="label-title">Title:</label>
              <input type="text" className="input" id="title" placeholder="Title" maxLength={25} minLength={4} onChange={handleBookFormChange} required></input>
              <p className ="error-msg" id="title-error"></p>

              <label htmlFor="author" className="label-title">Author:</label>
              <input type="text" className="input" id="author" placeholder="Author" maxLength={30} minLength={4} onChange={handleBookFormChange} required></input>
              <p className ="error-msg" id="author-error"></p>

              <label htmlFor="pages" className="label-title">Pages:</label>
              <input type="number" className="input" id="pages" placeholder="# of pages" maxLength={5} minLength={2} onChange={handleBookFormChange} required></input>
              <p className ="error-msg" id="pages-error"></p>

              <input type="submit" name="submit" className="submit-book-form" value="Add Book" onClick={submitBookForm} ></input>
            </fieldset>
        </form>
    </div>
  );
}

export default Sidebar;