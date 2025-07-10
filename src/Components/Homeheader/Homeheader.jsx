import './index.css';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import React from 'react'
import { Link } from 'react-router';


const Homeheader = () => {
 const navigate = useNavigate();
 const onClickLogout = () => {

    Cookies.remove('jwt_token');

    navigate('/login', { replace: true });

}


return (
<div className='home-header'>
      <Link to='/home'> <img src='https://res.cloudinary.com/dwatnpdcy/image/upload/ChatGPT_Image_Jun_20_2025_10_38_00_PM_braxw5.png' alt='Header' className='home-header-company-logo' /></Link>
   <div className='signout-container'>
      <button className='signout-button' onClick={onClickLogout}>Logout</button>
   </div>
    </div>

)



}
export default Homeheader;