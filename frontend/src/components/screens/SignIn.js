import React,{useState, useContext} from 'react'
import logo from '../../images/Insta_logo.png'
import '../styles/SignIn.css'
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../../context/LoginContext';

export default function SignIn() {

  const {setUserLogin} = useContext(LoginContext)

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //Toast functions
  const notifyA = (data)=> toast.error(data)
  const notifyB = (data)=> toast.success(data)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const postUser = ()=> {

  //checking email
  if(!emailRegex.test(email)){
    notifyA('Invalid email');
    return
  }

  fetch('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(response => response.json())
    .then(data => {
      if(data.error){
        notifyA(data.error)
      }else{
        notifyB(data.message)
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        setUserLogin(true)
        navigate('/');
      }
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <div className='signIn'>
      <div>
        <div className="loginForm">
          <img src={logo} alt="" className="signUpLogo" />
          <div>
            <input type="email" name='email' id='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <input type="submit" id='login-btn' value="Sign In" onClick={()=>{postUser()}}/>
        </div>

        <div className="loginForm2">
          Don't have an account?
          <Link to='/signup'>
            <span className='loginInForm2'> Sign Up</span>
          </Link>
        </div>

        </div>
      </div>
  )
}
