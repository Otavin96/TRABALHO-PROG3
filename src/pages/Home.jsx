import { useState, useEffect } from "react"
import api from "../service/api"

const Home = () => {

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
      api.get('/pokemon/1/').then((res) => setPokemon(res.data.sprites.front_default))
    }, [])


  return (
    <div className="grid grid-cols-4 gap-4">

      <div className="rounded-md h-64 ml-2 mr-2 bg-red-400 shadow-xl">
        <div className="header-card rounded-t-md bg-white">
          <h2 className="font-bold text-center">Nome</h2>
        </div>
        <img src={pokemon} alt="" />
      </div>
      <div className="rounded-md ml-2 mr-2 ml-2 bg-white shadow-xl"><img src={pokemon} alt="" /></div>
      <div className="rounded-md ml-2 mr-2 bg-white shadow-xl"><img src={pokemon} alt="" /></div>
      <div className="rounded-md ml-2 mr-2 bg-white shadow-xl"><img src={pokemon} alt="" /></div>
      <div className="rounded-md h-64 ml-2 mr-2 bg-white shadow-xl"><img src={pokemon} alt="" /></div>
      <div className="rounded-md ml-2 mr-2 bg-white shadow-xl"><img src={pokemon} alt="" /></div>
      <div className="rounded-md ml-2 mr-2 bg-white shadow-xl"><img src={pokemon} alt="" /></div>
      <div className="rounded-md ml-2 mr-2 bg-white shadow-xl"><img src={pokemon} alt="" /></div>

      {/* {pokemon.map((item, index) => (
        
      ))} */}
      
    </div>
  )
}

export default Home