import React from 'react';
import { useHistory } from 'react-router';
import './AccountPage.css';

const AccountPage = (props) => {
  const history = useHistory();
  
  const handleLogout = () => {
    history.push('/');
    props.logout();
  }

  if (!props.user) {
    history.push('/');
    return;
  }

  return (
    <div className="account-container">
      <div className="account-frame">
        <div className="info-item">Name: {props.user.name}</div>
        <div className="info-item">Email: {props.user.email}</div>
        
      </div>
      <div className="logout-button" onClick={handleLogout}>Logout</div>
    </div>
  )
}

export default AccountPage;