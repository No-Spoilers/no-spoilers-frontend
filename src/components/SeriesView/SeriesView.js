import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import { reduxConnect } from '../../redux/tools';
import './SeriesView.css';

const SeriesView = (props) => {
  const [ state, setState ] = useState({
    isFetching: false,
    books: [],
    entries: [],
    seriesName: null
  });

  const seriesId = useParams().id;

  const loadSeriesData = async (seriesId) => {
    const response = await fetch(`https://api.no-spoilers.net/series/${seriesId}`);
    const body = await response.json();
    if (body.error) {
      console.error(body.error);
      setState({ ...state, isFetching: false, seriesName: 'Error Loading' });
      return;
    }

    const series = body.filter(item => !item.bookId && !item.entryId) 
    const books = body.filter(item => item.bookId && !item.entryId)
    const entries = body.filter(item => item.entryId)

    setState({
      ...state,
      isFetching: false,
      books,
      entries,
      seriesName: series[0].name || 'Name not found'
    });
  }
  
  // TODO: check for data already in memory
  if (!state.isFetching && !state.seriesName) {
    setState({ ...state, isFetching: true });
    loadSeriesData(seriesId);
  }

  let books = <div>No Books Yet</div>;
  let entries = <div>No Entries Yet</div>;

  if (state.books.length > 0) {
    books = (
      <div className="book-list">
        <h2>Books in {state.seriesName}</h2>
        {state.books.map(book => (
          <div key={book.bookId} className="bullet">
            <div>{book.name}</div>
          </div>
        ))}
      </div>
    );

    entries = (
      <div className="entry-list">
        <h2>Entries in {state.seriesName}</h2>
        {state.entries.map(entry => (
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
        <h1>Series: {state.seriesName}</h1>
        {books}
        {entries}
      </div>

    </div>
  );

}

export default reduxConnect(SeriesView);
