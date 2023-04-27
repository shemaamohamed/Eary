import React, { useState } from 'react'
import '../StylePages/Exam.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Exam = () => {
  const [audioStart, setplay] = useState(false);
  
  const play =()=>{
          setplay(true);
    }
  return (
    <div>
      {
         audioStart ? ((
            <div className='wave'>
          
              
                
            <div className='question'>
                    <h2> What did you hear ? </h2>
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
                        <div className='swap-questions '>
                          <button className='next'>submit</button>
                        </div>
                        </div>

                </div>
          ))
          : 
          (<div className='ready'>
              <h2>   ready to go ..?</h2>
          <div className='Play-btn' onClick={play}>
          <FontAwesomeIcon icon={faPlay} />
          </div>
          </div>)


      }
     </div>
            
 
  )
}

export default Exam
