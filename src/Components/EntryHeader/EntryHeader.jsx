import './index.css'
import { useState } from 'react'
const EntryHeader = (props) =>{
 const {updatebrefData} = props
const [language ,setlanguage]=useState('EN')
const onChangelanguage = (event)=>{
  setlanguage(event.target.value)
  updatebrefData(event.target.value)
}
    return(
<div className='entry-header-container'>
  
  <img src='https://res.cloudinary.com/dwatnpdcy/image/upload/v1750439339/ChatGPT_Image_Jun_20_2025_10_38_00_PM_braxw5.png' className='companylogo'/>
  <div className='language-container'>
    <select className='language-select' value={language} onChange={onChangelanguage}>
       <option value="EN">English</option>
      
        <option value="TE">తెలుగు</option>
        <option value="HI">हिन्दी</option>
       
      </select>
 </div>


</div>


    )



}
export default EntryHeader