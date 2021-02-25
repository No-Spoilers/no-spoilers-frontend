import React, { Component } from 'react';
import './SeriesList.css';

class SeriesList extends Component {
  state = {
    isFetching: false,
    series: [],
    books: [],
    entries: [],
    selectedSeries: null
  }

  componentDidMount()  {
    this.getSeriesList();
  }

  getSeriesList = async () => {
    this.setState({isFetching: true});

    const response = await fetch('https://api.no-spoilers.net/series');
    const body = await response.json();
    console.log('result.body:', body);

    this.setState({
      isFetching: false,
      series: body
    });
  }

  handleSeriesClick = async (seriesId) => {
    this.setState({isFetching: true});

    const response = await fetch(`https://api.no-spoilers.net/series/${seriesId}`);
    const body = await response.json();
    console.log('result.body:', body);

    const series = body.filter(item => !item.bookId && !item.entryId) 
    const books = body.filter(item => item.bookId && !item.entryId)
    const entries = body.filter(item => item.entryId)

    this.setState({
      isFetching: false,
      books,
      entries,
      selectedSeries: series[0].name
    });
  }
  
  render() {
    let loading = <div></div>;
    if (this.state.isFetching) {
      loading = <div>LOADING DATA</div>
    }

    let seriesList = <div></div>;
    if (this.state.series.length > 0) {
      seriesList = (
        <div className="series-list">
          <div className="series-list-header-container">
            <div className="series-list-header-title">Series List</div>
            <div className="series-add-button" onClick={() => this.props.navHandler('create-series')}>Add New<br/>Series</div>
          </div>
          {this.state.series.map(item => (
            <div key={item.seriesId} className="series-name">
              <div onClick={() => this.handleSeriesClick(item.seriesId)}>{item.name}</div>
            </div>
          ))}
        </div>
      );
    }

    let books = <div></div>;
    let entries = <div></div>;
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
      <div className="series-container">
        
        <div>
          {loading}
          {seriesList}
          {books}
          {entries}
        </div>

      </div>
    );
  }
}

export default SeriesList;
