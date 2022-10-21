import React, { FC } from "react";

interface bookItem {
  book: { title: string; author: string; pages: number; readIt: boolean; id: string; },
  changeReadStatus: React.MouseEventHandler<HTMLButtonElement> | undefined,
};

const BookItem: FC<bookItem> = (props): JSX.Element => {

  const { book, changeReadStatus } = props;

  return (
    <>
      <button className="delete-book-button">X</button>
      <p id="title-of-book" className="card-info">{book.title}</p>
      <p id="author-of-book" className="card-info">{book.author}</p>
      <p id="pages-of-book" className="card-info">{book.pages}</p>
      <p id="have-i-read-it-text" className="card-info">Have I read this book yet?</p>
      <button className={`read-it-${book.readIt}`} onClick={changeReadStatus} >{book.readIt}</button>
    </>
  );
};

export default BookItem;