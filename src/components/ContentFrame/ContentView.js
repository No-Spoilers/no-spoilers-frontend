import React from 'react';
import { useParams } from "react-router-dom"
import BookView from '../BookView/BookView';
import SeriesView from '../SeriesView/SeriesView';

// import './ContentView.css';

const ContentView = (props) => {
  const contentId = useParams().contentId;

  const contentType = contentId.split('')[0];

  switch (contentType) {
    case 's':
      return <SeriesView />

    case 'b':
      return <BookView />

    case 'e':
      return null;
  
    default:
      return null;
  }

}

export default ContentView;
