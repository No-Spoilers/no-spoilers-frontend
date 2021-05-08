import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { reduxConnect } from '../../redux/tools';
import AddBookForm from '../AddBookForm/AddBookForm';
import SeriesEditForm from '../AddSeries/SeriesEditForm';
import BookLineItem from './BookLineItem';
import './SeriesView.css';

const SeriesView = (props) => {
  const seriesId = useParams().seriesId;
  const { getSeriesDetail } = props;
  const thisSeries = props.seriesDetails[seriesId] || {};
  const { timeStamp } = thisSeries;

  const [addBookOpen, setAddBookOpen] = useState(false);
  const [editSeriesDetails, setEditSeriesDetails] = useState(false);

  useEffect(() => {
    if (!timeStamp) { // TODO: check age of timestamp
      getSeriesDetail(seriesId);
    }
  }, [timeStamp, getSeriesDetail, seriesId])

  // Determine spoil date
  const userSpoilerLevel = props.userSpoilerLevel[seriesId];
  const spoilBook = thisSeries?.books?.[userSpoilerLevel] || {};
  const spoilDate = spoilBook.pubDate;

  const handleCheckBox = (bookData) => {
    props.setSpoilerLevel(seriesId, bookData.bookId);
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
        <BookLineItem
          book={book}
          index={index}
          key={index}
          handleCheckBox={handleCheckBox}
          spoilDate={spoilDate}
        />
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
