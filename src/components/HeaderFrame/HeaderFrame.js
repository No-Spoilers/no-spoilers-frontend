import { Link } from 'react-router-dom';
import { reduxConnect } from "../../redux/tools"
import './HeaderFrame.css';

const HeaderFrame = (props) => {

  let userDiv = <Link to='/login'><div className="account-info">Login/Signup</div></Link>;
  
  if (props.userName) {
    userDiv = (
      <Link to='/account'>
        Logged in: {props.userName}
      </Link>
    )
  }

  return (
    <div className="header-frame">
      <div className="page-name">
        <h1>No-Spoilers.net</h1>
      </div>
      <div className="account-info">
        {userDiv}
      </div>
    </div>
  )
}

export default reduxConnect(HeaderFrame);