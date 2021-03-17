import React from 'react';
import { Link } from 'react-router-dom';
import './SeriesList.css';

const SeriesList = (props) => {
  let loadingDiv = <div></div>;
  if (props.isFetching) {
    loadingDiv = <div>LOADING DATA</div>
  }

  let seriesListDiv = <div></div>;
  if (props.seriesList.length > 0) {
    seriesListDiv = (
      <div className="series-list">
        <div className="series-list-header-container">
          <div className="series-list-header-title">Series List</div>
          <Link to='/new'><div className="series-add-button">Add New<br/>Series</div></Link>
        </div>
        {props.seriesList.map(item => (
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
        {loadingDiv}
        {seriesListDiv}
      </div>

    </div>
  );
}

export default SeriesList;
