import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEarListen, faSquareCheck, listen } from "@fortawesome/free-solid-svg-icons"
import React from 'react'
import image1 from '../../Assets/Images/home1.jpg'
import image2 from '../../Assets/Images/home2.jpeg'
import image3 from '../../Assets/Images/home3.jpeg'
import image4 from '../../Assets/Images/homelanding.png'
import '../StylePages/Home.css'

const Home = () => {
  return (
    <div className='slider'>
    <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={image1} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block ">
        <p>Do you have hearing loss? Take our online hearing test to find out.</p>
        <button>Start your free hearing test</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src={image2} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <p>Your first step to better hearing is only a click away. In less than five minutes you'll have a better understanding of your hearing health.</p>
        <button>Our locations</button>
      </div>
    </div>
    <div class="carousel-item">
      <img src={image3} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <p>If you'd like a professional hearing tone test in one of our centers, simply book an appointment.</p>
        <button>Book an appointment</button>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

<div className='container'>
  <h2 className='text-center fw-bold'>About the online hearing test</h2>
<p className='text-center fs-4'>
  If you suspect you may be<span className='fw-bold'> experiencing hearing loss </span>, our online hearing test can help you<br></br> decide if you need to seek professional help. Here’s how it works
</p>
<div className='w-50'>
  <ul className='Info'>
    <li> <FontAwesomeIcon className='check-square' icon={faSquareCheck} /> Results in five minutes </li>
    <li><FontAwesomeIcon className='check-square' icon={faSquareCheck} /> Four Simple questions on each audio </li>
    <li className='underline'><FontAwesomeIcon className='check-square' icon={faSquareCheck} /> know about your hearing aids </li>
  </ul>
</div>
</div>
<div className='Common_signs'>
  <div className='container Common_signs_info'>

  <h2 className='fw-bold'> Common signs of hearing loss</h2>
  <p>Do you have trouble understanding conversation in noisy places ?<br></br> Do you ask people to repeat themselves? Have people told you to get your hearing checked?<br></br>You may be missing important sounds and not know it.</p>


  </div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00808055" fill-opacity="1" d="M0,160L40,165.3C80,171,160,181,240,170.7C320,160,400,128,480,112C560,96,640,96,720,122.7C800,149,880,203,960,234.7C1040,267,1120,277,1200,277.3C1280,277,1360,267,1400,261.3L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
  </svg>
</div>
<div className='container Hearing_section'>
    <h2>Do you have hearing loss?</h2>
    <p>If you're not sure — maybe you've started to think you do, or people close to you have said you might - take the<a href='#' className='test_link'> free online hearing test.</a></p>
    <img src={image4} className='w-75 h-75'></img>
</div>
    </div>
  )
}

export default Home
