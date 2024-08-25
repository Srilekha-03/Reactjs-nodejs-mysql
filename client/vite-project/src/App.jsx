import { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:5174/api/get').then((response) => {
      setMovieReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:5174/api/insert", { movieName: movieName, movieReview: review })
      .then(() => {
        setMovieReviewList([...movieReviewList, { movieName: movieName, movieReview: review }]);
        setMovieName('');
        setReview('');
      });
  };

  const deleteReview=(movie)=>{
    Axios.delete(`http://localhost:5174/api/delete/${movie}`)
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:5174/api/update", { movieName: movie, movieReview: newReview })
      .then(() => {
        // Update the state with the new review
        setMovieReviewList(movieReviewList.map(val =>
          val.movieName === movie
            ? { ...val, movieReview: newReview }
            : val
        ));
        setNewReview(''); // Clear the input field
      })
      .catch((error) => {
        console.error("There was an error updating the review!", error);
      });
  };
  
  
  return (
    <>
      <div className='App'>
        <h1>CRUD APPLICATION</h1>
        <div className='form'>
          <label htmlFor="moviename">Movie Name:</label>
          <input
            type="text"
            name='moviename'
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
          />
          <label htmlFor="review">Review:</label>
          <input
            type="text"
            name='review'
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={submitReview}>Submit</button>
          {movieReviewList.map((val) => (
            <div className='card' key={val.id}>
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>
              <button onClick={() => deleteReview(val.movieName)}>Delete</button>
              <input type="text" id='update' onChange={(e)=>{setNewReview(e.target.value)}}/>
              <button onClick={() => updateReview(val.movieName)}>Update</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
