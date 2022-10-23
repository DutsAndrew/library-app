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
    ) {}
    getInfo() {
      return `${this.title}, by ${this.author}, ${this.pages}, ${this.readIt}`;
    };
    changeBookStatus() {
      if (this.readIt === true) {
        this.readIt = false;
        return;
      };
      if (this.readIt === false) {
        this.readIt = true;
      };
    };
  };

  const addBookToLibrary = (title: string, author: string, pages: number): void => {
    const currentLibrary: any[] = library.library;
    const newBook = new Book(title, author, pages, false, uniqid());
    setLibrary({
      library: [...currentLibrary, newBook],
    });
  };
    
  const changeReadStatus = (e: any): void => {
    const bookId = e.target.parentElement.id;
    const currentLibrary: any[] = library.library;
    currentLibrary.forEach((book: any) => {
      if (book.id === bookId) {
        console.log(book, currentLibrary);
        book.changeBookStatus();
        console.log(book, currentLibrary);
        setLibrary({
          library: [currentLibrary],
        });
        return;
      };
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