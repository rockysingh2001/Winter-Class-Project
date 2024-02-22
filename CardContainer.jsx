import React, {  useEffect, useState } from 'react'
import Card from './Card'
import './CardContainer.css'


export default function CardContainer() {
  const [selectedPokemon,setSelectedPokemon] = useState(null)
  const [prevv,setPrevv] = useState(null)
  const [nextt,setNextt] = useState(null)
  const [data,setData] = useState([])

  const secondApi =async(arg)=>{
    arg.map(async(item,index)=>{
        let rawPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}/`)
        let parsedDataPokemon = await rawPokemon.json()
        setData((prev)=>[...prev,parsedDataPokemon])  
    })
  }


  const firstApi =async(arg)=>{
    let raw = await fetch(arg?arg:'https://pokeapi.co/api/v2/pokemon?limit=20')
    let parsedData = await raw.json()
    setPrevv(parsedData.prev)
    setNextt(parsedData.next)
    secondApi(parsedData.results)
  } 

  useEffect(()=>{
    firstApi()
  },[])

  const handleCardClick = (pokemon)=>{
    setSelectedPokemon(pokemon)
  }
  const closes = ()=>{
    setSelectedPokemon(null)
  }

  const next =()=>{
    setData([])
    firstApi(nextt)
  }
  const prev =()=>{
    setData([])
    firstApi(prevv)
  }
    return (
    <>
    <div>
    
    <div className='cc'>
    
      {data ? (
        data.map((item,index)=>(
            <Card className="cards-only" key={index} 
            id={item.id} 
            pic={item.sprites.other.dream_world.front_default?item.sprites.other.dream_world.front_default:""} 
            name={item.name} 
            type={item.types[0].type.name}
            onClick = {()=>handleCardClick(item)}/>
        ))
        
      ):(<div>its loading</div>)
     
      } 
      </div>

      {data && (<div className='footer'>
          <button className='next-btn'  onClick={next}>Next &rarr;</button>
          <button className='prev-btn' onClick={prev}>&larr; Prev</button>
        </div>)}
      </div>
   

      {
        selectedPokemon && (
          <div className='popup-container' style={{display:"block"}}>
            <table>
                 <tr>
                  <td>
                      <img src={selectedPokemon.sprites.other.dream_world.front_default?selectedPokemon.sprites.other.dream_world.front_default:""} alt='j-'/>
                      <h1>{selectedPokemon.name?selectedPokemon.name:"...."}</h1>

                  </td>
                  <td>
                        <h2>weight {selectedPokemon.weight?selectedPokemon.weight:"0"}</h2>
                        <h2>height {selectedPokemon.height?selectedPokemon.height:0}</h2>
                  
                  </td>
                
                  <td>
                   
                        {selectedPokemon.stats.map((item,index)=>(
                            <li className='list'>Stat {index+1}: {item.stat.name}</li>
                          ))}
                    </td>
                        
                    <td>
                          {selectedPokemon.stats.map((item,index)=>(
                                  <li className='list'>Bs {index+1}: {item.base_stat}</li>
                                ))}
                    </td>
                          
                    <td> 
                            <div className='close' onClick={closes}>X</div>
                    </td>
                    
              </tr>
              </table>

            </div>
        )
      }


    </>
  )
}
