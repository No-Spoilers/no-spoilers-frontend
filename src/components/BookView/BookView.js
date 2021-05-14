import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import { reduxConnect } from "../../redux/tools";
import dateFormat from '../../lib/dateFormat';
import AddBookForm from "../AddBookForm/AddBookForm";
import './BookView.css';


const BookView = (props) => {
  const bookId = useParams().contentId;
  const seriesId = props.lookUp[bookId];

  const [editBook, setEditBook] = useState(false);

  const { seriesDetails, getSeriesDetail } = props;
  
  const book = seriesDetails?.[seriesId]?.books?.[bookId] || {};
  const entries = seriesDetails?.[seriesId]?.entries || {};

  useState(() => {
    if (!book.name && !props.fetching) {
      getSeriesDetail(bookId);
    }
  }, [book, getSeriesDetail, bookId]);

  const toggleEditBook = () => {
    setEditBook(!editBook);
  }

  let description = <div className="book-short-description">{book.text}</div>;

  if (!book.text || book.text?.length < 1) {
    description = null;
  }

  let bookView = <div></div>;

  if (book.name) {
    bookView = (
      <div className="book-view">
        <div className="book-view-header-container">
          <div className="book-title">{book.name}</div>
          <button className="book-edit-button" onClick={toggleEditBook}>Edit</button>
        </div>

        <div className="book-published-date">{dateFormat(book.pubDate)}</div>
        {description}

      </div>
    );
  }

  const seriesName = seriesDetails?.[seriesId]?.name;
  const breadcrumb = seriesName ? `>> ${seriesName}` : '';

  return (
    <div className="book-view-container">
      <Link to={`/${seriesId}`}>
        <div className='breadcrumb-text'>{breadcrumb}</div>
      </Link>
      {editBook ? <AddBookForm book={book} cancel={toggleEditBook} /> : bookView}
    </div>
  ) 

}

export default reduxConnect(BookView);
