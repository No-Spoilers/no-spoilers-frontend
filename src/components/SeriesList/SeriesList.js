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
              <div onClick={() => this.props.navHandler('series', item.seriesId)}>{item.name}</div>
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
