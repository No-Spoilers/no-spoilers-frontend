import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom"
import dateFormat from '../../lib/dateFormat';
import { reduxConnect } from '../../redux/tools';
import AddBookForm from '../AddBookForm/AddBookForm';
import SeriesEditForm from '../AddSeries/SeriesEditForm';
import './SeriesView.css';

const SeriesView = (props) => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [editSeriesDetails, setEditSeriesDetails] = useState(false);
  const seriesId = useParams().seriesId;
  const { getSeriesDetail } = props;
  const thisSeries = props.seriesDetails[seriesId] || {};
  const { timeStamp } = thisSeries;

  useEffect(() => {
    if (!timeStamp) { // TODO: check age of timestamp
      getSeriesDetail(seriesId);
    }
  }, [timeStamp, getSeriesDetail, seriesId])

  const handleCheckBox = (e) => {
    // TODO
  }

  const toggleEditDetails = () => {
    setEditSeriesDetails(!editSeriesDetails);
  }

  const sortByTimestamp = (sortOrder) => {
    // sortOrder: 1 for high to low, or -1 for low to high
    return (a,b) => {
      const el1 = new Date(a.pubDate)
      const el2 = new Date(b.pubDate);

      return sortOrder * (el2 - el1);
    }
  }

  let books = null;

  const sortOrder = -1; // TODO: make UI toggle for sortOrder

  if (thisSeries?.books) {
    books = Object.values(thisSeries.books)
      .sort(sortByTimestamp(sortOrder))
      .map((book, index) => (
        <div className="book-line-item" key={book.bookId}>
          <input
            type="checkbox"
            id={index}
            name={book.name}
            value={book.checked}
            onChange={handleCheckBox}
          />
          <div className="checkbox-label">
            <Link to={`/${seriesId}/${book.bookId}`}>
              <span className='book-title'>{book.name}</span>
              <span>&nbsp;-&nbsp;</span>
              <span className='book-date'>{dateFormat(book.pubDate)}</span>
            </Link>
          </div>
        </div>
      ));
  }

  if (books?.length < 1) {
    books = <div>No Books Yet</div>
  }

  function toggleAddBook() {
    setAddBookOpen(!addBookOpen);
  }

  let addBookForm = <button className="add-book-button" onClick={toggleAddBook}>Add Book</button>;

  if (addBookOpen) {
    addBookForm = <AddBookForm cancel={toggleAddBook} seriesId={seriesId} />
  }

  let seriesHeader = (
    <div className="series-detail-view">
      <div className="series-view-header-container">
        <div className="series-view-header-title">{thisSeries?.name}</div>
        <div className="series-edit-button" onClick={toggleEditDetails}>Edit</div>
      </div>
      <p className="series-description">{thisSeries.text}</p>
    </div>
  )

  if (editSeriesDetails) {
    seriesHeader = <SeriesEditForm cancel={toggleEditDetails} thisSeries={thisSeries}  />
  }

  return (
    <div className="series-view-container">
      {seriesHeader}

      {books}

      {addBookForm}
    </div>
  );

}

export default reduxConnect(SeriesView);
