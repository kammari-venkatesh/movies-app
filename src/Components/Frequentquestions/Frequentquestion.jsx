
import './index.css'


const Frequentquestion = (props) =>{
    const {details,onUpdatedAnswer}=props
    const {id,question,answer,isShow}=details
 const onClickanswer = ()=>{
    onUpdatedAnswer(id)
    console.log("f",id)
    
 }   
 const symbol = isShow ? '-':'+'
 
return(

<div className='data-container'>
 <div className='question-btn-container'>   
<h1 className='question'>{question}</h1>
<button className='question-btn' onClick={onClickanswer}> {symbol}                                         
</button>

</div>
{
    isShow && (
<div className='answer-container'>
<p className='answer'>{answer}</p></div>

)}
</div>

)




}


export default Frequentquestion