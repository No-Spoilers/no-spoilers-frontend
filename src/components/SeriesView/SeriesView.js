import React, { useEffect } from 'react';
import { useParams } from "react-router-dom"
import dateFormat from '../../lib/dateFormat';
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

  let books = (seriesDetails?.books?.length === 0) ? <div>No Books Yet</div> : <div></div>;

  if (seriesDetails?.books?.length > 0) {
    books = seriesDetails.books.map((book, index) => (
      <div key={book.bookId}>
        <label className="checkbox">
          <input type="checkbox" id={index} name={book.name} value={book.pubDate} />
          <span className='book-title'>{book.name}</span>
          <span>&nbsp;-&nbsp;</span>
          <span className='book-date'>{dateFormat(book.pubDate)}</span>
        </label>
      </div>
      )
    );
  }

  return (
    <div className="series-view-container">
      <h1>Series: {seriesDetails?.name}</h1>
      <p className="series-description">{seriesDetails.text}</p>
      {books}
    </div>
  );

}

export default reduxConnect(SeriesView);
