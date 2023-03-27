import React from 'react'
import "../StylePages/AddTest.css"
import Ear from "../../Assets/Images/EARR.png"

export const AddTest = () => {
  return (
    <div className='add_test'>
        <div className='add_audio'>
        
        <h4> Upload audio</h4>
        <input type="file" name="myfile" />
     
       </div>
    <div className='add_A'>
    
    <div className='add_q'>
    <div id='question'>
            <input type='text' placeholder='Question' className='Answer'></input>
        </div>
        <div id='answer1'>
            <input type='text' placeholder='Answer1' className='Answer'></input>
            <input id='Answer1' type='radio' ></input>
        </div>
        <div id='answer2'>
            <input type='text'placeholder='Answer2' className='Answer' ></input>
            <input id='Answer2' type='radio'></input>

        </div>
        <div id='answer3'>
            <input type='text' placeholder='Answer3' className='Answer'></input>
            <input  id='Answer3'type='radio'></input>

        </div>
        <div id='answer4'>
            <input type='text' placeholder='Answer4' className='Answer'></input>
            <input id='Answer4' type='radio'></input>

        </div>
        <button id='add-T'>AddTest</button>

    </div>
    
    </div>
    <img className='Ear' src={Ear} alt='#'></img>


    
    </div>
  )
}
