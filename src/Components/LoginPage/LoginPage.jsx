import './index.css'
import { useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import React from 'react'


const LoginPage = () =>{
const  [username, setUsername] = useState('')
const  [password, setPassword] = useState('')
const [rememberMe, setRememberMe] = useState(false);
const [termsAccepted, setTermsAccepted] = useState(false);
const [emptyusername, setEmptyUsername] = useState(false);
const [emptypassword, setEmptyPassword] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const navigate = useNavigate();
const handleUsernameChange = (e) => {
    setUsername(e.target.value);
} 

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
} 
const onChangeremember = (e) => {
    setRememberMe(e.target.checked);
}
const onChangeTerms = (e) => {
    setTermsAccepted(e.target.checked);
}
const onBlurusername = () => {
    if (username.trim() === '') {
        setEmptyUsername(true);
    } else {
        setEmptyUsername(false);
    }
}

const onBlurpassword = () => {
    if (password.trim() === '') {
        setEmptyPassword(true);
    } else {
        setEmptyPassword(false);
    }
}
const onSubmitsuccess = (data) => {
    setErrorMessage('');
    const { jwt_token } = data;
    Cookies.set('jwt_token', jwt_token, { expires: 30 });
    navigate('/home');

}
const onSubmitFailure = (errorMessage) => {
    setErrorMessage(errorMessage);
    setEmptyUsername(false);
    setEmptyPassword(false);
}


const onsubmitform = async(event) =>{
    event.preventDefault()
 if (!emptyusername && !emptypassword ) {  
    const userdetails = {
  username: username,
  password: password
}
    const appUrl = 'https://apis.ccbp.in/login'
    const option = {
        method : 'POST',
        body : JSON.stringify(userdetails),
    }
    const response = await fetch(appUrl, option)
    const fetchedData = await response.json()
    if (response.ok === true){
        onSubmitsuccess(fetchedData)
    }
    else{
        onSubmitFailure(fetchedData.error_msg)
    }
}


}
useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken) {

        navigate('/home', { replace: true });
    }
}, []);





    return(<>
    
        <div className="mobileview-logincontainer">
 
        <div className='mobile-logo-container'>
  <img src='https://res.cloudinary.com/dwatnpdcy/image/upload/v1750439339/ChatGPT_Image_Jun_20_2025_10_38_00_PM_braxw5.png' className='login-company-logo'/>
  
</div>
        <form className='login-form' onSubmit={onsubmitform}>
        <h1 className='form-heading'>Login</h1>
        <input type='text' className='username-input' placeholder='Username'onChange={handleUsernameChange} onBlur={onBlurusername}/>
         {emptyusername && <span className='error-message'>Please enter a username</span>}
         <input type='password' className='username-input' placeholder='Password'onChange={handlePasswordChange} onBlur={onBlurpassword}/>
           {emptypassword && <span className='error-message'>Please enter a password</span>}
           <button type='submit' className='submit-btn'>Login</button>
          {errorMessage && <span className='main-error-message'>{errorMessage}</span>}
           <div className='divider-container'> 
<input
  type='checkbox'
  className='remember-me-checkbox'
  checked={rememberMe}
  onChange={onChangeremember}
/>           <label className='remember-me-label'>Remember me</label>
</div>
<div className='terms-container'>
  <input
    type='checkbox'
    className='terms-checkbox'
    checked={termsAccepted}
    onChange={onChangeTerms}
  />
  <label className='terms-label'>
    I agree to the <a href="https://policies.google.com/terms" target="_blank" className="terms-link">Terms of Service</a> and
    <a href="https://policies.google.com/privacy" target="_blank" className="privacy-link"> Privacy Policy</a>.
  </label>
</div>

      <p className='note-para'>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>

        </form>


        </div>
        <div className='mediumview-container'>
            <div className='render-black'>
              <div className='medium-loginheader'>
  <img src='https://res.cloudinary.com/dwatnpdcy/image/upload/v1750439339/ChatGPT_Image_Jun_20_2025_10_38_00_PM_braxw5.png' className='mediumsize-companylogo'/>
              </div>
           
            <div className='medium-form-container'>
              <form className='medium-form' onSubmit={onsubmitform}>
                <h1 className='form-heading'>Login</h1>
        <input type='text' className='username-input' placeholder='Username'onChange={handleUsernameChange} onBlur={onBlurusername}/>
        {emptyusername && <span className='error-message'>Please enter a username</span>}
         <input type='password' className='username-input' placeholder='Password'onChange={handlePasswordChange} onBlur={onBlurpassword}/>
           {emptypassword && <span className='error-message'>Please enter a password</span>}
           <button type='submit' className='submit-btn'>Login</button>
          {errorMessage && <span className='main-error-message'>{errorMessage}</span>}
           <div className='divider-container'>
<input
  type='checkbox'
  className='remember-me-checkbox'
  checked={rememberMe}
  onChange={onChangeremember}
/>
     <label className='remember-me-label'>Remember me</label>
</div>
<div className='terms-container'>
        <input
        type='checkbox'
        className='terms-checkbox'
        checked={termsAccepted}
        onChange={onChangeTerms}
        />  <label className='terms-label'>
    I agree to the <a href="https://policies.google.com/terms" target="_blank" className="terms-link">Terms of Service</a> and
    <a href="https://policies.google.com/privacy" target="_blank" className="privacy-link"> Privacy Policy</a>.
  </label>
</div>

      <p className='note-para'>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>

              </form>
            </div> </div>
        </div></>
    )
}
export default LoginPage