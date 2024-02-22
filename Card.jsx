import React from 'react'
import './Card.css'
import ImageNotFound from './ImageNotFound.png'
export default function Card(
  {id,pic,name,type,onClick}) {
 
  return (
    <>
      <div className='main-container' onClick={onClick} >
        <h2>{id?id:"0"}</h2>
        <img className="image-class"src={pic?pic:ImageNotFound} alt='h'/>
        <h2>{name?name:"...."}</h2>
        <h3>{type?type:"...."}</h3>
      </div>
    </>
  )
}
