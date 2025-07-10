import './index.css'
import { FaCrown } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import { MdDevices } from "react-icons/md";
import React from 'react'

import { FaUserCheck } from "react-icons/fa";


const Moreresonscard = (props) =>{
const {feature}=props
const {title,description,icons}=feature

const geticon = () =>{
    switch(icons){
        case 'crown':
            return <FaCrown/>
        case 'block':
            return  <MdBlock />
        case 'screen':
            return  <MdDevices />
        default:
            return  <FaUserCheck />

     }

}
     console.log(feature)

return(
<div className='reasons-container'>
 <h1 className='reasons-card-heading'>{title}</h1>
<p className='reasons-card-description'>{description}</p>
<div className='reason-icons'>
    {
   geticon()
    }

</div>




</div>





)




}


export default Moreresonscard