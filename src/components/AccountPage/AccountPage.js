import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { reduxConnect } from '../../redux/tools';
import './AccountPage.css';

const AccountPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (!props.userToken) {
      history.push('/');
      return <div></div>;
    }
  })
  
  return (
    <div className="account-container">
      <div className="account-frame">
        <div className="info-item">Name: {props.userName}</div>
        <div className="info-item">Email: {props.userEmail}</div>
        
      </div>
      <div className="logout-button" onClick={props.userLogout}>Logout</div>
    </div>
  )
}

export default reduxConnect(AccountPage);