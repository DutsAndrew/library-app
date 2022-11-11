import React, { useState, useEffect, FC } from "react";
import uniqid from 'uniqid';
import Sidebar from './Sidebar';
import Page from './Page';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDoc, getDocs, query } from 'firebase/firestore';

interface userState {
  formCompleted: boolean,
  currentUser: any,
  errorStatus: string | object,
};

interface dbState {
  status: boolean,
  error: string | object,
};

interface LibraryProps {
  userStatus: userState,
}

const Library: FC<LibraryProps> = (props): JSX.Element => {

  const { userStatus } = props;

  const [library, setLibrary]: any[] = useState({
    library: [],
  });

  const [dbStatus, setDbStatus] = useState<dbState>({
    status: false,
    error: '',
  });

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

  useEffect(() => {    
    if (dbStatus.status === false) {
      // Get a list of books from database
      getBooks(db);
      async function getBooks(db: any): Promise<object> {
        const libraryQuery = query(collection(db, 'library', userStatus.currentUser.uid, 'books'));
        const librarySnapshot = await getDocs(libraryQuery);
        const firebaseLibrary: any[] = []
        librarySnapshot.forEach((doc) => {
          const bookTitle = doc.data().title;
          const bookAuthor = doc.data().author;
          const bookPages = doc.data().pages;
          const bookReadIt = doc.data().readIt;
          const bookId = doc.data().id;
          const newBook = new Book(bookTitle, bookAuthor, bookPages, bookReadIt, bookId);
          firebaseLibrary.push(newBook);
        });
        const currentLibrary: any[] = library.library;
        const mergedLibrary = currentLibrary.concat(firebaseLibrary);
        setLibrary({
          library: mergedLibrary,
        });
        return librarySnapshot;
      };
    };
  }, []);

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

  const addBookToFirebaseAndLibrary = async (title: string, author: string, pages: number): Promise<void> => {
    const currentLibrary: any[] = library.library;
    const newBook = new Book(title, author, pages, false, uniqid());
    setLibrary({
      library: [...currentLibrary, newBook],
    });
    // Firestore data converter
    const bookConverter = {
      toFirestore: (newBook: any) => {
          return {
              title: newBook.title,
              author: newBook.author,
              pages: newBook.pages,
              readIt: newBook.readIt,
              id: newBook.id,
              };
      },
      fromFirestore: (snapshot: any, options: any) => {
          const data = snapshot.data(options);
          return new Book(title, author, pages, false, uniqid());
      },
    };
    // Set with bookConverter
    const bookRef = doc(db, 'library', userStatus.currentUser.uid, 'books', newBook.id).withConverter(bookConverter);
    await setDoc(bookRef, newBook);
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
      <Sidebar addBookToFirebaseAndLibrary={addBookToFirebaseAndLibrary} />
      <Page 
        library={library}
        changeReadStatus={changeReadStatus}
        removeBook={removeBook}
      />
    </>
  );
};

export default Library;