import React, { useState, useEffect, FC } from "react";
import uniqid from 'uniqid';
import Sidebar from './Sidebar';
import Page from './Page';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

interface dbState {
  status: boolean,
  error: string | object,
};

const Library = (): JSX.Element => {

  // Firebase Init
  const firebaseConfig: object = {
    apiKey: "AIzaSyB25C0MNgL_tEDdOGN759b1NX0ZgHC5bj8",
    authDomain: "library-app-7b48d.firebaseapp.com",
    projectId: "library-app-7b48d",
    storageBucket: "library-app-7b48d.appspot.com",
    messagingSenderId: "243144925550",
    appId: "1:243144925550:web:541a504b3ae60cb2c8a17f",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [dbStatus, setDbStatus] = useState<dbState>({
    status: false,
    error: '',
  });

  useEffect(() => {    
    if (dbStatus.status === false) {
      // Get a list of books from database
      const data = getBooks(db);
      async function getBooks(db: any): Promise<object> {
        const booksCollection = collection(db, 'books');
        const booksSnapshot = await getDocs(booksCollection);
        const booksList = booksSnapshot.docs.map(doc => doc.data());
        console.log('async', booksList)
        return booksList;
      };
    };
  }, []);

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
    console.log(library, currentLibrary, newBook);
  };
    
  const changeReadStatus = (e: any): void => {
    const bookId = e.target.parentElement.id;
    const currentLibrary: any[] = library.library;
    currentLibrary.forEach((book: any) => {
      if (book.id === bookId) {
        book.changeBookStatus();
        currentLibrary[currentLibrary.indexOf(book)] = book;
        setLibrary({
          library: [...currentLibrary],
        });
      };
    });
  };

  const removeBook = (e: any): void => {
    const bookId = e.target.parentElement.id;
    const currentLibrary: any[] = library.library;
    currentLibrary.forEach((book: any) => {
      if (book.id === bookId) {
        currentLibrary.splice(currentLibrary.indexOf(book), 1);
        setLibrary({
          library: [...currentLibrary],
        });
      };
    });
  };

  return (
    <>
      <Sidebar addBookToLibrary={addBookToLibrary} />
      <Page 
        library={library}
        changeReadStatus={changeReadStatus}
        removeBook={removeBook}
      />
    </>
  );
};

export default Library;