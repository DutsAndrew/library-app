import React, { FC, useEffect } from "react";
import '../style/Page.css';
import BookItem from './BookItem';

interface library {
  library: {library: [{title: string, author: string, pages: number, readIt: boolean, id: string}]},
  changeReadStatus: React.MouseEventHandler<HTMLButtonElement> | undefined,
  removeBook: React.MouseEventHandler<HTMLButtonElement> | undefined,
}

const Page: FC<library> = (props): JSX.Element => {

  const { library, changeReadStatus, removeBook } = props;

  return (
    <div className="page">
        <div className="book-library">
            <ul className="book-cards" id="book-example">
              {Array.isArray(library.library) && library.library.map((book) => {
                return <li className="book" id={book.id} key={book.id} >
                  <BookItem book={book} changeReadStatus={changeReadStatus} removeBook={removeBook} />
                </li>
              })}
            </ul>
        </div>
    </div>
  );
};

export default Page;