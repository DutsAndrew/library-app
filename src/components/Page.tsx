import React from "react";
import '../style/Page.css';

const Page = () => {
  return (
    <div className="page">
        <div className="book-library">
            <div className="book-cards" id="book-example">
                <div className="book">
                    <button className="delete-book-button">X</button>
                    <p id="title-of-book" className="card-info">The Hobbit</p>
                    <p id="author-of-book" className="card-info">J.R.R Tolkien</p>
                    <p id="pages-of-book" className="card-info">296 pages</p>
                    <p id="have-i-read-it-text" className="card-info">Have I read this book yet?</p>
                    <button className="read-it">Yes</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Page;