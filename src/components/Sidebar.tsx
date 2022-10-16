import React, { FC, useState, MouseEvent } from 'react';
import '../style/Sidebar.css';

interface AppProps {
  openBookForm: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

const Sidebar = () => {

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


  return (
    <div className="sidebar">
        <button id='add-book-button' className="create-new-book-closed" onClick={openBookForm} >+ Add Book</button>
        <form noValidate id="book-form" className="form-container-closed">x
            <fieldset>
              <legend className="legend-text">Add new book to library</legend>
              <label htmlFor="title" className="label-title">Title:</label>
              <input type="text" className="input" id="title" placeholder="Title" maxLength={25} minLength={4} required></input>
              <p className ="error-msg" id="title-error"></p>

              <label htmlFor="author" className="label-title">Author:</label>
              <input type="text" className="input" id="author" placeholder="Author" maxLength={30} minLength={4} required></input>
              <p className ="error-msg" id="author-error"></p>

              <label htmlFor="pages" className="label-title">Pages:</label>
              <input type="number" className="input" id="pages" placeholder="# of pages" maxLength={5} minLength={2} required></input>
              <p className ="error-msg" id="pages-error"></p>

              <input type="button" name="submit" className="submit-book-form" value="Add Book"></input>
            </fieldset>
        </form>
    </div>
  );
}

export default Sidebar;