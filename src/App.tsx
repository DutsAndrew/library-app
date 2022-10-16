import React, { useState, useEffect, MouseEvent } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Page from './components/Page';
import Footer from './components/Footer';
import './style/App.css';
import './style/FormValidation.css';

const App = () => {

  const [currentBookStatus, setCurrentBookStatus] = useState({
    status: false,
  });

  const [library, setLibrary] = useState({
    library: [],
  });
    

  return (
    <>
      <Header />
      <Sidebar />
      <Page />
      <Footer />
    </>
  );
}

export default App;