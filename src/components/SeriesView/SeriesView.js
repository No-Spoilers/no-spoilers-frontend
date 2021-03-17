import React, { Component } from 'react';
import './SeriesView.css';

class SeriesView extends Component {
  state = {
    isFetching: false,
    books: [],
    entries: [],
    seriesName: null
  }

  async componentDidMount()  {
    // TODO: check for data already in memory

    this.setState({isFetching: true});

    const response = await fetch(`https://api.no-spoilers.net/series/${this.props.viewItem}`);
    const body = await response.json();
    console.log('result.body:', body);

    const series = body.filter(item => !item.bookId && !item.entryId) 
    const books = body.filter(item => item.bookId && !item.entryId)
    const entries = body.filter(item => item.entryId)

    this.setState({
      isFetching: false,
      books,
      entries,
      seriesName: series[0].name
    });
  }

  handleSeriesClick = async (seriesId) => {

  }
  
  render() {
    let books = <div>No Books Yet</div>;
    let entries = <div>No Entries Yet</div>;

    if (this.state.books.length > 0) {
      books = (
        <div className="book-list">
          <h2>Books in {this.state.selectedSeries}</h2>
          {this.state.books.map(book => (
            <div key={book.bookId} className="bullet">
              <div>{book.name}</div>
            </div>
          ))}
        </div>
      );

      entries = (
        <div className="entry-list">
          <h2>Entries in {this.state.selectedSeries}</h2>
          {this.state.entries.map(entry => (
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
          <h1>Series: {this.state.seriesName}</h1>
          {books}
          {entries}
        </div>

      </div>
    );
  }
}

export default SeriesView;
