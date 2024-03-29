import React, { FC } from "react";

interface BookItemProps {
  book: { title: string; author: string; pages: number; readIt: boolean; id: string; },
  changeReadStatus: React.MouseEventHandler<HTMLButtonElement> | undefined,
  removeBook: React.MouseEventHandler<HTMLButtonElement> | undefined,
};

const BookItem: FC<BookItemProps> = (props): JSX.Element => {

  const { book, changeReadStatus, removeBook } = props;

  return (
    <>
      <button className="delete-book-button" onClick={removeBook} >X</button>
      <p id="title-of-book" className="card-info">{book.title}</p>
      <p id="author-of-book" className="card-info">{book.author}</p>
      <p id="pages-of-book" className="card-info">{book.pages}</p>
      <p id="have-i-read-it-text" className="card-info">Have I read this book yet?</p>
      <button className={`read-it-${book.readIt}`} onClick={changeReadStatus} >{`${book.readIt.toString()}`}</button>
    </>
  );
};

export default BookItem;