import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
const newPassword=useRef();

const authCnt=useContext(AuthContext);

const handleNewPassword=(e)=>{
  e.preventDefault();

  const enteredNewPassword=newPassword.current.value;

fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC57BuSHUumQtb7HUFYRxvV6gUdPJE-0Qs",{
  method:"POST",
  body:JSON.stringify({
    idToken:authCnt.token,
    password:enteredNewPassword,
    secureToken:false
  }),
  headers:{
    'Content-Type':'application/json'
  }
}).then((res)=>{
  alert("Successfully changed Password",res);
})
  
}

  return (
    <form className={classes.form} onSubmit={handleNewPassword}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassword}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
