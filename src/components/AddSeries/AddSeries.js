import React from 'react';
import { useHistory } from 'react-router';
import './AddSeries.css';
import SeriesEditForm from './SeriesEditForm';

const AddSeries = (props) => {
  const history = useHistory();

  const cancelNewSeries = () => {
    history.push('/browse');
  }

  return (
    <div className="add-series-container">
      
      <h1 className="add-series-title">Add New Series</h1>
      
      <SeriesEditForm
        cancel={cancelNewSeries}
      />

    </div>
  )
}

export default AddSeries;