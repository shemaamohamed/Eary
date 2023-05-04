import React, { useEffect, useState } from "react";
import "../StylePages/Exam.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";

const Exam = () => {
  const auth = getAuthUser();
  const [audioStart, setplay] = useState(false);

  const [exam, setExam] = useState({
    loading: true,
    err: null,
    data: []

    
  });
  const [question, setquestion] = useState([]

  )
  const audio =[];

  
  
  
  useEffect(() => {
    if(audioStart){
    setExam({ ...exam, loading: true });
    axios
      .get("http://localhost:4000/exams", {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setExam({...exam, data:resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setExam({
          ...exam,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
    }},  [audioStart]);
    const [randomExam, setRandomExam] = useState(null)

    useEffect(() => {
      if(exam.data.length>0){
        const randomIndex=Math.floor(Math.random()*exam.data.length)
        setRandomExam(exam.data[randomIndex]);
      }
    
      
    }, [exam.data])

    console.log(randomExam);
    




    // exam.data.forEach((item,index) => {
      
  //     const exams=exam.data.length;
  //     for (let i = 0; i < exams ;i ++) {
  //       question.push(exam.data[i])
  //       console.log(question);
       
        
  //     }
  // // }
  // //   );
  // console.log(question.questions);
  
    
  //    const [SelectedExam, setSelectedExam] = useState({
  //     Name:'',
  //     questions:[],
  //    })
  //   setSelectedExam({Name:question.at(1)})

  const play = () => {
    setplay(true);
    HandleplayAudios(audio[0]);
  //  randomExam.questions.slice(0,1).map((item)=>{return(
  //     new Audio(item.Audio).play()
  //  )})
  };
  
  
  const  HandleplayAudios = (src) => {
    
    new Audio(`http://localhost:4000/${src}`).play()
    
  }
  
  const [startIndex, setstartIndex] = useState(0)
  const handleNextQuestion=()=>{
    if(startIndex+1<randomExam.number_of_questions){
    setstartIndex(startIndex+1)
    console.log(startIndex);
    HandleplayAudios();
}


  }


  return (
    <div>
      {audioStart ? (
        <div className="wave">
          <div className="question">
            <audio src=""></audio>
            <h2> What did you hear ? </h2>
            <div className="answers">

             {
              randomExam ? (

                <>

                { randomExam.questions.slice(startIndex,startIndex+1).map((question, index)=>{
                    
                    {HandleplayAudios(question.Audio.slice(7))}
                    //  { new Audio(question.Audio.slice(7)).play()} 
                    return(
                  <>
                 
                   
                    
                  
                      <input 
                      type="radio"
                      className="btn-check"
                      name="options"
                      id={"option1"}
                      autoComplete="off"
                    />
                    <label className="btn btn-primary" htmlFor={"option1"} >
                    {question.RightAnswer}
                    </label>


                    <input 
                      type="radio"
                      className="btn-check"
                      name="options"
                      id={"option2"}
                      autoComplete="off"
                    />
                    <label className="btn btn-primary" htmlFor={"option2"}>
                    {question.Wrong1}
                    </label>


                    <input 
                      type="radio"
                      className="btn-check"
                      name="options"
                      id={"option3"}
                      autoComplete="off"
                    />
                    <label className="btn btn-primary" htmlFor={"option3"}  >
                    {question.Wrong2}
                    </label>


                    <input 
                      type="radio"
                      className="btn-check"
                      name="options"
                      id={"option4"}
                      autoComplete="off"
                    />
                    <label className="btn btn-primary" htmlFor={"option4"}  >
                    {question.Wrong3}
                    </label>
</>



                    

                    )
                    }
                )
                
                    
                
                }
              </>

              ):(
                <p>Loading...!</p>

              )
             }

            </div>
            <div className="swap-questions ">
              <button className="next" onClick={handleNextQuestion}>submit</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="ready">
          <h2> ready to go ..?</h2>
          <div className="Play-btn" onClick={play}>
            <FontAwesomeIcon icon={faPlay} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
