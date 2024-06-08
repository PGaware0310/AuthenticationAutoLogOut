import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {
const authCnt=useContext(AuthContext);

const onLogoutHandle=(e)=>{
  e.preventDefault();
  authCnt.logout();
}

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCnt.isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {authCnt.isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {authCnt.isLoggedIn && <li>
            <button onClick={onLogoutHandle}>Logout</button>
          </li>}
          </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
