import React, { useRef, useState } from 'react'
import "../StylePages/Update.css"
import axios from 'axios';
import { setAuthUser } from '../../../helper/Storage';
import { useNavigate } from 'react-router-dom';

 const Register = () => {
  // const navigate = useNavigate();

  // const [register, setRegister] = useState({
  //   email:"",
  //   name:"",
  //   password:"",
  //   loading:false,
  //   err:[],
  // });
  //   const handlesubmit =(e)=>{
  //          e.preventDefault();
  //          setRegister({...register,loading:true , err:[]})
  //          axios.post("http://localhost:4000/api/register",{
  //           email:register.email,
  //           password:register.password,
  //           name:register.name,
         
  //          }
  //          ).then((resp) => {
  //           setRegister({...register , loading:false,err:[]})
  //           setAuthUser(resp.data);
  //           navigate("/");
            
  //          }
  //          ).catch((errors) => {
  //            setRegister({
  //              ...register,
  //              loading:false,
               
  //             })
  //             console.log(errors);
             
             
  //          }
  //          )
  //   }

  
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password:"",
    err: "",
    loading: false,
    success: null,
  });

  const image = useRef(null);

  const handlesubmit = (e) => {
    e.preventDefault();

    setRegister({ ...register, loading: true });

    const formData = new FormData();
    formData.append("name", register.name);
    formData.append("email", register.email);
    formData.append("password",register.password);
    console.log(image.current.files);
    if (image.current.files && image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    axios
      .post("http://localhost:4000/api/register", formData, {
          "Content-Type": "multipart/form-data",
        },
      )
      .then((resp) => {
        setRegister({
          name: "",
          password: "",
          email:"",
          err: null,
          loading: false,
          success: "user Created Successfully !",
        });
        image.current.value = null;
      })
      .catch((err) => {
        console.log(err);
        setRegister({
          ...register,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };


  return (
    <>
      {register.err &&(
        <div  variant="danger"  className="alert alert-danger ">
          {register.err}
        </div>
      )}

{register.success &&(
        <div  variant="success"  className="alert alert-success ">
          {register.success}
        </div>
      )}
    <form className='update' onSubmit={handlesubmit}>
      <div className='box-update'>
        <h1>Register</h1>
        <input typeof='text' required placeholder='username' value={register.name} onChange={(e) => {
        setRegister({...register,name:e.target.value})
      }
      }></input>
        <input typeof='text'  required placeholder='E-mail'value={register.email} onChange={(e) => {
        setRegister({...register,email:e.target.value})
      }}></input>
        <input type="password" required placeholder='password'value={register.password} onChange={(e) => {
          setRegister({...register,password:e.target.value})
        }}></input>
        <div class="mb-3">
  <label for="formFile" class="form-label">select photo</label>
  <input class="form-control" type="file" ref={image} id="formFile"/>
        </div>  

        {/* <input typeof='text'  required placeholder='confirm password'value={register.email} onChange={(e) => {
        setRegister({...register,email:e.target.value})
      }}></input> */}
        <button type='sumbit' > <a>Create</a></button>

      </div>
        
    </form>
    </>
  )
}
export default Register;