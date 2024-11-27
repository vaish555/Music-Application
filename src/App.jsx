import React, { useRef, useState } from 'react'
import "./App.css"
import AajAudio from "../public/Aaj Ki Raat - Stree 2_128-(DJMaza).mp3"
import Aajimage from "../public/aaj ki raat.webp"
import aakadAudio from "../public/Aakad(PagalWorld).mp3"
import aakadimage from "../public/aakad.jpg"
import akhiyaAudio from "../public/Ankhiyan-Teri-Mere-Dil-Pe-War-Kare(PagalWorld).mp3"
import akhiyaimage from "../public/akhiya.jpg"
import ghoomarAudio from "../public/Ghoomar---Padmaavat(PagalWorld).mp3"
import ghoomarimage from "../public/ghoomar.jpg"

import { ImLoop2 } from "react-icons/im";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

function App() {
  let [currentIndex,setCurrentindex]=useState(0);
  let [currentTime,setCurrentTime]=useState(0);
  let [play,setPlay]=useState(false);
  let [isLooping,setLoop]=useState(false);

  let audioRef=useRef(null);
  let loopIcon=useRef(null);
  
  
  let musicArray=[
    {
      "audio":AajAudio,
      "image":Aajimage
    },
    {
      "audio":aakadAudio,
      "image":aakadimage
    },
    {
      "audio":akhiyaAudio,
      "image":akhiyaimage
    },
    {
      "audio":ghoomarAudio,
      "image":ghoomarimage
    }
  ]

  let leftMovement=()=>{
    setCurrentindex((prev)=>{
    return prev==0? musicArray.length-1:prev-1;
    })
  }
  let rightMovement=()=>{
    setCurrentindex((prev)=>{
    return prev==musicArray.length-1?  0:prev+1;
    })
  }
  
  let playOrPause=()=>{
    if(play){
      audioRef.current.pause();
    }
    else{
      audioRef.current.play();
    }
    setPlay(!play);
  }
  let timeHandler=()=>{
    setCurrentTime(audioRef.current.currentTime);
  }
  let handleRange=(e)=>{
    audioRef.current.currentTime=e.target.value;
    setCurrentTime(e.target.value);
  }

  let loopHandler=()=>{
    if(isLooping){
      audioRef.current.currentTime=0;
      audioRef.current.play();
    }
    else{
      setPlay(false);
    }
  }

  let toggleLoop=()=>{
    setLoop(!isLooping)
  }

  return (
    <div className='music-container'>
      <div className='part1'>
        <img src={musicArray[currentIndex].image} alt="" />
      </div>
      <div className='part2'>
        <div className='part2-1'>
          <input type="range" max={audioRef.current?.duration} value={currentTime} onChange={(e)=>{handleRange}}/>
          <audio src={musicArray[currentIndex].audio} ref={audioRef} onTimeUpdate={timeHandler} onEnded={loopHandler}></audio>
        </div>
        <div className='part2-2'>
        <ImLoop2 onClick={toggleLoop}/>
        <FaArrowCircleLeft onClick={leftMovement}/>
        {
          play?    <FaPause onClick={playOrPause}/>:<FaPlay onClick={playOrPause}/>
        }
       <FaArrowCircleRight  onClick={rightMovement}/>
       </div>
      </div>
    </div>
  )
}

export default App
