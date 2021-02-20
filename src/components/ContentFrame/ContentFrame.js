import React from 'react';
import LoginPage from '../LoginPage/LoginPage';
import SeriesList from '../SeriesList/SeriesList';
// import './ContentFrame.css';

const ContentFrame = (props) => {
  console.log('props:', props);

  return (
    <div className="content-frame-inner">
      { props.content === 'browse' ? <SeriesList /> :
        props.content === 'login' ? <LoginPage setUser={props.setUser} /> : null
      }
    </div>
  )
}

export default ContentFrame;