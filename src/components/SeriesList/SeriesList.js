import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    this.setState({
      isFetching: false,
      series: body
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
            <Link to='/new'><div className="series-add-button">Add New<br/>Series</div></Link>
          </div>
          {this.state.series.map(item => (
            <div key={item.seriesId} className="series-name">
              <Link to={`/${item.seriesId}`}><div>{item.name}</div></Link>
            </div>
          ))}
        </div>
      );
    }


    return (
      <div className="series-list-container">
        
        <div>
          {loading}
          {seriesList}
        </div>

      </div>
    );
  }
}

export default SeriesList;
