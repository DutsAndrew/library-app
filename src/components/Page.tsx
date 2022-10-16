import React, { FC, useEffect } from "react";
import '../style/Page.css';

interface library {
  library: {library: [{title: string, author: string, pages: number, readIt: boolean, id: string}]},
}

const Page: FC<library> = (props): JSX.Element => {

  const { library } = props;

  useEffect(() => {
    console.log(library.library);
  }, [library]);

  return (
    <div className="page">
        <div className="book-library">
            <ul className="book-cards" id="book-example">
              {Array.isArray(library.library) && library.library.map((book) => {
                return <div className="book" key={book.id}>
                  <button className="delete-book-button">X</button>
                  <p id="title-of-book" className="card-info">{book.title}</p>
                  <p id="author-of-book" className="card-info">{book.author}</p>
                  <p id="pages-of-book" className="card-info">{book.pages}</p>
                  <p id="have-i-read-it-text" className="card-info">Have I read this book yet?</p>
                  <button className="read-it">Yes</button>
                </div>
              })}
            </ul>
        </div>
    </div>
  );
};

export default Page;