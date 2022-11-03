import React, { useState, useEffect, MouseEvent, FormEvent } from 'react';
import uniqid from 'uniqid';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page from './components/Page';
import Footer from './components/Footer';
import AccountAuthentication from './components/AccountAuthentication';
import './style/App.css';
import './style/FormValidation.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword } from 'firebase/auth';

interface userState {
  formCompleted: boolean,
  currentUser: User | string,
  errorStatus: string | object,
};

interface dbState {
  status: boolean,
  error: string | object,
};

const App = (): JSX.Element | null => {

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
  const auth = getAuth(app);

  const [userStatus, setUserStatus] = useState<userState>({
    formCompleted: false,
    currentUser: '',
    errorStatus: '',
  });

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

  const submitAccountInformation = async (email: string, password: string): Promise<void> => {
    console.log('form is being submitted');
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    // await createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     setUserStatus({
    //       formCompleted: true,
    //       currentUser: user,
    //       errorStatus: '',
    //     });
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     setUserStatus({
    //       formCompleted: false,
    //       currentUser: 'not found',
    //       errorStatus: `${errorCode}, ${errorMessage}`,
    //     });
    //     alert(`${errorCode}, ${errorMessage}, please try again`);
    //   });
  };

  const signInUser = async (email: string, password: string): Promise<void> => {
    console.log('attempting to sign in');
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUserStatus({
          formCompleted: true,
          currentUser: user,
          errorStatus: '',
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setUserStatus({
          formCompleted: false,
          currentUser: 'not found',
          errorStatus: `${errorCode}, ${errorMessage}`,
        });
        alert(`${errorCode}, ${errorMessage}, please try again`);
      });
  }

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

  if (userStatus.formCompleted === false) {
    return (
      <>
        <Header />
        <AccountAuthentication 
          submitAccountInformation={submitAccountInformation}
          signInUser={signInUser}
        />
        <Footer />
      </>
    );
  };

  if (userStatus.formCompleted === true) {
    return (
      <>
        <Header />
        <Sidebar addBookToLibrary={addBookToLibrary} />
        <Page 
          library={library}
          changeReadStatus={changeReadStatus}
          removeBook={removeBook}
        />
        <Footer />
      </>
    );
  };

  return (
    <p>error, please try again</p>
  );
};

export default App;