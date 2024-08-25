import { useState,useEffect } from 'react'
import Axios from "axios";
import './App.css'

function App() {
  const [movieName,setMovieName]=useState('')
  const [review,setReview]=useState('')
  const [movieReviewList,setMovieReviewList]=useState([])
  
  useEffect(() => {
    Axios.get('http://localhost:5174/api/get').then((response)=>{
      setMovieReviewList(response.data)
    })

  }, [])
  

  const submitReview = ()=>{
    Axios.post("http://localhost:5174/api/insert",{movieName: movieName,movieReview: review}).then(
      ()=>{alert('successful insert')}
    )

  }
  return (
    <>
      <div className='App'>
        <h1>CRUD APPLICATION</h1>
        <div className='form'>
          <label htmlFor="">Movie Name:</label>
          <input type="text" name='moviename' onChange={(e)=>{setMovieName(e.target.value)}}/>
          <label htmlFor="">Review:</label>
          <input type="text" name='review' onChange={(e)=>{setReview(e.target.value)}}/>
          <button onClick={submitReview}>Submit</button>
          {movieReviewList.map((val)=>{
            
            return <h1>Movie Name : {val.movieName} ||| Movie Review : {val.movieReview}</h1>
          })}
        </div>
      </div>
      
    </>
  )
}

export default App
