import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useParams } from 'react-router-dom'

const Player = () => {

  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })
  const {id} = useParams()
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDUzZmFjNTUxNjU4N2VkZWExNjBkNWY1ODAwY2RmMyIsIm5iZiI6MTczNzExOTU3OC45NDQsInN1YiI6IjY3OGE1NzVhOTNmNzQyY2MyOWFkMTM2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HJCEb2QOJ1eYuGpoD6-TCgY2OlT3SRIIF574h9Lw4Uc'
    }
  };

  useEffect(()=> {
      
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

  },[])

  return (
    <div className='player'>
      <img src={back_arrow} alt="" />
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
