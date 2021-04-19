import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { reduxConnect } from '../../redux/tools';
import './SeriesView.css';

const SeriesView = (props) => {
  const seriesId = useParams().id;
  const seriesDetails = props.seriesDetails[seriesId] || {};
  const { timeStamp } = seriesDetails;
  const { getSeriesDetail } = props;

  useEffect(() => {
    if (!timeStamp) { // TODO: check age of timestamp
      getSeriesDetail(seriesId);
    }
  }, [timeStamp, getSeriesDetail, seriesId])

  let books = <div>No Books Yet</div>;
  let entries = <div>No Entries Yet</div>;

  if (seriesDetails?.books?.length > 0) {
    books = (
      <div className="book-list">
        <h2>Books in {seriesDetails.seriesName}</h2>
        {seriesDetails.books.map(book => (
          <div key={book.bookId} className="bullet">
            <div>{book.name}</div>
          </div>
        ))}
      </div>
    );

    entries = (
      <div className="entry-list">
        <h2>Entries in {seriesDetails.seriesName}</h2>
        {seriesDetails.entries.map(entry => (
          <div key={entry.entryId} className="bullet">
            <div>{entry.text} - {entry.createdBy} ({entry.createdAt})</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="series-view-container">
      
      <div>
        <h1>Series: {seriesDetails?.name}</h1>
        {books}
        {entries}
      </div>

    </div>
  );

}

export default reduxConnect(SeriesView);
