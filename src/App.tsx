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
    

  return (
    <>
      <Header />
      <Sidebar addBookToLibrary={addBookToLibrary} />
      <Page library={library} />
      <Footer />
    </>
  );
}

export default App;