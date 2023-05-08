import React, { useEffect, useState } from "react";
import "../StylePages/Exam.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getAuthUser } from "../../../helper/Storage";

const Exam = () => {
  const [shufflearr, setshufflearr] = useState([])
  const [answers, setanswers] = useState([])
  const [Grade, setGrade] = useState(0)
  const [radioans, setradioans] = useState('');
  const auth = getAuthUser();
  const [startIndex, setstartIndex] = useState(-1)
  const [question, setquestion] = useState('')
  const [audioStart, setplay] = useState(false);
  const [randomExam, setRandomExam] = useState(null)
  const [Trigger, setTrigger] = useState(0)
  const [answercp, setanswercp] = useState('')
  const [examName, setexamName] = useState('')
  const [HistoryData, setHistoryData] = useState({
    exam_Name:'',
    questions_answers:[]
  })
  

  const [exam, setExam] = useState({
    loading: true,
    err: null,
    data: []
  });
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
        console.log(resp);
        setExam({...exam, data:resp.data, loading: false, err: null });
      })
      .catch((err) => {
        console.log(err);
        setExam({
          ...exam,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
    }},  [audioStart]);

    useEffect(() => {
      if(exam.data.length>0){
        const randomIndex=Math.floor(Math.random()*exam.data.length)
        setRandomExam(exam.data[randomIndex]);
      }
    
      
    }, [exam.data])

    
    
    




  const play = () => {
    setplay(true);
    HandleplayAudios(audio[0]);
  };
  
  
  const HandleplayAudios = async (src) => {
    
   const audio= new Audio(`http://localhost:4000/${src}`)
    audio.loop=false;
    audio.play();
  }
  
  const handleNextQuestion=()=>{
    if(startIndex+1<randomExam.number_of_questions-1){
    setstartIndex(startIndex+1)
    
    HandleplayAudios();
  }
  setTrigger(Trigger+1);
  

  setanswercp(examName)
  setHistoryData({...HistoryData,
    exam_Name:examName,
    questions_answers:[...HistoryData.questions_answers,{question:question,answer:radioans}]
  })

  
  
  // HandleRightAnswers(radioans);
}
console.log(randomExam);
console.log(HistoryData);
let data = JSON.stringify({
  "exam_Name": `${examName}`,
  "questions_answers": HistoryData.questions_answers
});

console.log(data);
useEffect(() => {
  

  if (Trigger===randomExam?.number_of_questions) {
    axios
      .post(
        "http://localhost:4000/history",data,{
          headers:{
            token:auth.token,
            "Content-Type":"application/json"
            
          }
        }
       
      )
      .then((resp) => {
        // setHistoryData({ err: null,  loading: false });
        console.log(resp);
        setHistoryData({ exam_Name:'',
        questions_answers:[]
      }
      )
       
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

}, [Trigger])





useEffect(() => {

 
  
  // if (startIndex<randomExam.number_of_questions-1) {
    
    if (radioans==answers.RightAnswer){
      setGrade(Grade+1)
     
    }
  
    


  

}, [Trigger])


  

  const shuffleArray=(arr)=>{
    return arr.sort(()=>Math.random()- 0.5);
  }

  
 
  
  var shuffledArray=[]
  
  useEffect(() => {
    if(randomExam){
      setanswers (randomExam.questions[startIndex+1])
      let arr=[
        randomExam.questions[startIndex+1].RightAnswer,
        randomExam.questions[startIndex+1].Wrong1,
        randomExam.questions[startIndex+1].Wrong2,
        randomExam.questions[startIndex+1].Wrong3
      ]
      let audio = randomExam.questions[startIndex+1].Audio
      HandleplayAudios(audio.slice(7))

      setexamName(randomExam.Name)
      setquestion(randomExam.questions[startIndex+1].Name)

      
      shuffledArray = shuffleArray(arr)
      shuffledArray.push()
      setshufflearr(shuffledArray)
      // setanswercp(answer)
       
      }
    }, [randomExam,startIndex])
    const handleradiochange=(e)=>{
      setradioans(e.target.value);
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
               startIndex>=-1 && Trigger<=randomExam?.number_of_questions-1 ? (
                 shufflearr.map((ans,index)=>(
                   <div key={index}>
                <input 
                key={index}
                type="radio"
                className="btn-check"
                name="options"
                id={"option"+index}
                autoComplete="off"
                onChange={handleradiochange}
                checked={radioans===ans}
                value={ans}
                />
              <label className="btn btn-primary" htmlFor={"option"+index} >
              {ans}
              </label>
              </div>
              ))):(<p className="text-center fs-2">You Got {Grade}/{randomExam?.number_of_questions} </p>)
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
          <p className="fs-4 text-center position-absolute top-50 end-50 start-50  ">Please Use HeadPhones For Better Experience..</p>
        </div>
      )}
    </div>
  );
};

export default Exam;