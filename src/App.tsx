import React, { useState } from 'react';
import Header from './components/Header';
import Library from './components/Library';
import Footer from './components/Footer';
import AccountAuthentication from './components/AccountAuthentication';
import './style/App.css';
import './style/FormValidation.css';
import { initializeApp } from 'firebase/app';
import { getAuth,
  createUserWithEmailAndPassword,
  User,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';

interface userState {
  formCompleted: boolean,
  currentUser: User | string,
  errorStatus: string | object,
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
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [userStatus, setUserStatus] = useState<userState>({
    formCompleted: false,
    currentUser: '',
    errorStatus: '',
  });

  const createAccountWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    console.log('form is being submitted');
    await createUserWithEmailAndPassword(auth, email, password)
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
  };

  const signInWithGoogleAccount = async (): Promise<void> => {
    console.log('attempting to sign in');
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setUserStatus({
            formCompleted: true,
            currentUser: user,
            errorStatus: '',
          });
          console.log(user);
        };
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setUserStatus({
          formCompleted: false,
          currentUser: 'not found',
          errorStatus: `${errorCode}, ${errorMessage}`,
        });
        alert(`${errorCode}, ${errorMessage}; ${email}, ${credential} please try again`);
      });
  };

  if (userStatus.formCompleted === false) {
    return (
      <>
        <Header userStatus={userStatus} />
        <AccountAuthentication 
          createAccountWithEmailAndPassword={createAccountWithEmailAndPassword}
          signInUser={signInUser}
          signInWithGoogleAccount={signInWithGoogleAccount}
        />
        <Footer />
      </>
    );
  };

  if (userStatus.formCompleted === true) {
    return (
      <>
        <Header userStatus={userStatus} />
        <Library userStatus={userStatus} />
        <Footer />
      </>
    );
  };

  return (
    <p>error, please try again</p>
  );
};

export default App;