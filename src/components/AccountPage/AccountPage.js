import React from 'react';
import './AccountPage.css';

const AccountPage = (props) => {
  return (
    <div className="account-container">
      <div className="account-frame">
        <div className="info-item">Name: {props.user.name}</div>
        <div className="info-item">Email: {props.user.email}</div>
        
      </div>
      <div className="logout-button" onClick={props.logout}>Logout</div>
    </div>
  )
}

export default AccountPage;