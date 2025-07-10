import './index.css'
import { RiTwitterXLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import React from 'react'

import { FaLinkedin } from "react-icons/fa6";


const EntryFooter = (props)=>{
const {details}=props
const {queries,links}=details
console.log(queries)
console.log(links)
const getlinks = () => {
    return links.map((each, idx) => (
        <li key={idx}>{each}</li>
    ));
};


    return (
<div className='entry-footer-container'>
<h3 className='queris'>{queries}</h3>
<div className='footer-content'>
<ul className='conditions'>
       {getlinks()}



</ul>
<ul className='footer-icons'>
    <RiTwitterXLine />
    <FaYoutube />
    <FaInstagram />
    <FaLinkedin />




</ul>


</div>
</div>
    )
}

export default EntryFooter