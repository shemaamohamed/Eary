import React from 'react'
import "../StylePages/AddTest.css"
import Ear from "../../Assets/Images/EARR.png"

export const AddTest = () => {
  return (
    <div className='add_test'>
    <div className='add_A'>
    <div className='add_audio'>
        
        <h4> Upload audio</h4>
        <input type="file" name="myfile" />
     
    </div>
    <div className='add_q'>
    <div id='question'>
            <input type='text' placeholder='Question'></input>
        </div>
        <div id='answer1'>
            <input type='text' placeholder='Answer1'></input>
        </div>
        <div id='answer2'>
            <input type='text'placeholder='Answer2' ></input>
        </div>
        <div id='answer3'>
            <input type='text' placeholder='Answer3'></input>
        </div>
        <div id='answer4'>
            <input type='text' placeholder='Answer4'></input>
        </div>
    </div>
    <button id='add-T'>AddTest</button>
    </div>
    <img className='Ear' src={Ear} alt='#'></img>
    </div>
  )
}
