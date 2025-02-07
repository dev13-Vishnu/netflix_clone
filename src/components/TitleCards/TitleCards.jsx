import './TitleCards.css';
import React, { useEffect, useRef, useState } from 'react'
import cards_data from '../../assets/cards/Cards_data'
const TitleCards = ({title, category}) => {

  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDUzZmFjNTUxNjU4N2VkZWExNjBkNWY1ODAwY2RmMyIsIm5iZiI6MTczNzExOTU3OC45NDQsInN1YiI6IjY3OGE1NzVhOTNmNzQyY2MyOWFkMTM2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HJCEb2QOJ1eYuGpoD6-TCgY2OlT3SRIIF574h9Lw4Uc'
    }
  };
  
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  
  useEffect(()=> {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref = {cardsRef}>
        {apiData.map((card,index)=>{
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
