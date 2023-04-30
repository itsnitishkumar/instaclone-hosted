import React,{useState} from 'react'
import logo from '../../images/Insta_logo.png'
import '../styles/SignUp.css'
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


export default function SignUp() {

  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //Toast functions
  const notifyA = (data)=> toast.error(data)
  const notifyB = (data)=> toast.success(data)
  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const postUser = ()=>{

    //checking email
    if(!emailRegex.test(email)){
      notifyA('Invalid email');
      return
    }else if(!passwordRegex.test(password)){
      notifyA('Password must contain at least 8 characters, including at least 1 number and must include noth lower and uppercase letters and special characters for example #,?,! ');
      return
    }

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:name,
        email: email,
        userName: userName,
        password: password
      })
    }).then(response => response.json())
      .then(data => {
        if(data.error){
          notifyA(data.error)
        }else{
          notifyB(data.message)
          navigate('/signin');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
  }

  return (
    <div className='signUp'>
      <div className="form-container">
        <div className="form">
          <img src={logo} alt="" className="signUpLogo" />
          <p className="loginPara">
            Sign up to see photos and videos <br/>from your friends
          </p>
          <div>
            <input type="email" name='email' id='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <input type="text" name='name' id='name' placeholder='Full Name' value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <input type="text" name='username' id='username' placeholder='Username' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          </div>
          <div>
            <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <p className="loginPara loginPara2">By signing up, you agree to our Terms, <br/> privacy policy and cookies policy.</p>
          <input type="submit" id='submit-btn' value="Sign Up" onClick={()=>{postUser()}}/>
        </div>
        <div className="form2">
          Already have an account?
          <Link to='/signin'>
            <span className='signInForm2'> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
