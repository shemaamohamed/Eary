import React from 'react'
import '../StylePages/Exam.css'
const check='';
const Exam = () => {
  return (
    <div>
    
    <div className='wave'>
        
    <div className='question'>
            <h2> what did you hear ? </h2>
                  <div className='answers'>

                <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off"/>
                <label class="btn btn-primary" for="option1">King</label>

                <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off"/>
                <label class="btn btn-primary" for="option2">Ping</label>

                <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off"/>
                <label class="btn btn-primary" for="option3">Sing</label>

                <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off"/>
                <label class="btn btn-primary" for="option4">Ting</label>
                     </div>
                </div>
        </div>
    </div>
            
 
  )
}

export default Exam
