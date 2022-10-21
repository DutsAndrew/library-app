import React, { useState, useEffect, MouseEvent } from 'react';
import uniqid from 'uniqid';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page from './components/Page';
import Footer from './components/Footer';
import './style/App.css';
import './style/FormValidation.css';

const App = () => {

  const [library, setLibrary]: any[] = useState({
    library: [],
  });

  class Book {
    constructor(
      public title: string,
      public author: string,
      public pages: number,
      public readIt: boolean,
      public id: string,
    ) {
      const getInfo = function () {
        return `${title}, by ${author}, ${pages}, ${readIt}`;
      };
    }
  }

  const addBookToLibrary = (title: string, author: string, pages: number): void => {
    const currentLibrary: any[] = library.library;
    const newId: any = uniqid();
    const newBook = new Book(title, author, pages, false, newId);
    setLibrary({
      library: [...currentLibrary, newBook],
    });
  };
    
  const changeReadStatus = (e: any): void => {
    const bookTitleToChange: Element = e.target.parentElement.children[1].textContent;
    const bookAuthorToChange: Element = e.target.parentElement.children[2].textContent;
    const bookPagesToChange: Element = e.target.parentElement.children[3].textContent;
    const currentLibrary: any[] = library.library;
    currentLibrary.forEach((book: any) => {
      if (book.title === bookTitleToChange 
        && book.author === bookAuthorToChange
        && book.pages === Number(bookPagesToChange)
        ) {
          let amendedBook: any = currentLibrary[currentLibrary.indexOf(book)];
          if (book.readIt === true) {
            amendedBook.readIt = false;
            currentLibrary[currentLibrary.indexOf(book)] = amendedBook;
            console.log(currentLibrary[currentLibrary.indexOf(book)], amendedBook);
            setLibrary({
              library: [currentLibrary],
            });
            return;
          };
          if (book.readIt === false) {
            amendedBook.readIt = true;
            currentLibrary[currentLibrary.indexOf(book)] = amendedBook;
            console.log(currentLibrary[currentLibrary.indexOf(book)], amendedBook);
            setLibrary({
              library: [currentLibrary],
            });
            return;
          };
      }
    });
  };

  return (
    <>
      <Header />
      <Sidebar addBookToLibrary={addBookToLibrary} />
      <Page library={library} changeReadStatus={changeReadStatus} />
      <Footer />
    </>
  );
}

export default App;