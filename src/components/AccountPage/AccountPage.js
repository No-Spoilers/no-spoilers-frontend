import React from 'react';
import { useHistory } from 'react-router';
import { reduxConnect } from '../../store/reduxTools';
import './AccountPage.css';

const AccountPage = (props) => {
  const history = useHistory();
  
  const handleLogout = () => {
    props.onUserRemoved();
  }

  if (!props.userToken) {
    history.push('/');
    return <div></div>;
  }

  return (
    <div className="account-container">
      <div className="account-frame">
        <div className="info-item">Name: {props.userName}</div>
        <div className="info-item">Email: {props.userEmail}</div>
        
      </div>
      <div className="logout-button" onClick={handleLogout}>Logout</div>
    </div>
  )
}

export default reduxConnect(AccountPage);