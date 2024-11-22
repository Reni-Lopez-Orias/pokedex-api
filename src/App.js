import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Card } from './components/Card';
import { getPokemons, searchPokemon } from './services/pokeApi';
import { Skeletyon } from './components/Skeleton';

function App() {

  const [limit, setLimit] = useState(10);
  const [pokemonList, setPokemonsList] = useState([]);
  const [pokemonSelected, setPokemonsSelected] = useState(null);
  const [pokemonListTemp, setPokemonsListTemp] = useState([]);

  const inputSearchPokemon = useRef('');

  useEffect(() => {
    fetchPokemons();
  }, [limit]);

  const fetchPokemons = async () => {

    const pokemons = [];
    for (let index = pokemonList.length; index < limit; index++) {
      const responsePokemons = await getPokemons(index + 1);
      pokemons.push(responsePokemons);
    }
    if (pokemons.length > 0) {
      const updatedPokemonList = [...pokemonList, ...pokemons];
      setPokemonsList(updatedPokemonList);
      setPokemonsListTemp(updatedPokemonList);
    }

  };

  const handleInputChange = async () => {

    if (inputSearchPokemon.current.value.length > 1) {
      const response = await searchPokemon(inputSearchPokemon.current.value);
      if (response) {
        const newArray = [];
        newArray.push(response)
        setPokemonsList(newArray);
      }
    }

    else if (inputSearchPokemon.current.value.length < 1) {
      setPokemonsList(pokemonListTemp);
    }

  }

  const handlePokemonSelected = (pokemon) => { 
    const abilities = pokemon.abilities.map(({ ability }) => ability);
    pokemon.abilities = abilities; 

    setPokemonsSelected(pokemon);
  }

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight <= e.target.scrollTop + e.target.clientHeight + 1;

    if (bottom)
      setLimit((prevLimit) => prevLimit + 10);

  };

  return (
    <div className='container_page rounded-xl border-2'>

      <div className='text-right w-full pt-5 pl-5'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
      </div>

      <div className='mb-4'>
        <img className='logo' src='/assets/logo.png' alt='logo pokemon' />
      </div>

      <div className='flex justify-between items-center container_icons_input'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
        {/* input  */}
        <div className="relative px-5 rounded-full shadow-sm">
          <input onChange={handleInputChange} ref={inputSearchPokemon} type="text" name="pokemon_name" id="pokemon_name" className="block w-full rounded-full py-1.5 px-5 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm/6 focus:outline-none" placeholder="Search Pokemon" />
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" /></svg>
      </div>

      <div onScroll={handleScroll} className='flex container_pokemon_list gap-6 p-4 overflow-auto justify-center'>
        {
          (pokemonList.length !== 0 && !pokemonSelected && (
            pokemonList.map((pokemon) => (
              <Card key={pokemon.id} handlePokemonSelected={handlePokemonSelected} pokemon={pokemon} />
            ))
          )
          )
        }
        {
          pokemonList.length === 0 && (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeletyon key={index} />
            ))
          )
        }
      </div>

      {
        pokemonSelected && (
          <div className='details_pokemon animate__animated animate__backInUp'>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '0px' }} >
              <img style={{ height: '250px', position: 'relative', bottom: '50px' }} src={`${pokemonSelected.sprites.other.dream_world.front_default}`} alt='pokemon' />
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '35px', color: 'white' }}>#0{pokemonSelected.id}</span>
              <svg style={{ cursor: 'pointer' }} onClick={() => setPokemonsSelected(null)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='white' d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
              <span> {pokemonSelected.name.toUpperCase()} </span>
            </div>

            <div className='mb-5' style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px 20px' }}>
                <span>{pokemonSelected.height}</span>
                <strong>Height</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px 20px' }}>
                <span>{pokemonSelected.weight}</span>
                <strong>Weight</strong>
              </div>

            </div>

            <div className='flex items-center justify-center '>
              <ul className="mx-auto grid max-w-full w-full grid-cols-3 gap-x-5 px-8">
                <li className="">
                  <input className="peer sr-only" type="radio" value="yes" name="answer" id="yes" checked />
                  <label className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out" for="yes">Stats</label>

                  <div style={{ width: '99%', height: '100% ' }} className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">

                    {
                      pokemonSelected.stats.map((stat) => (
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center', borderBottom: 'solid 1px lightgray', padding: '10px 0px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '40%' }}>
                            <span style={{ color: 'black' }}  > {stat.stat.name.toUpperCase()} </span>
                            <span class=" text-xs text-yellow-400"> {stat.base_stat} </span>
                          </div>
                          <div style={{ width: '60%', marginLeft: '10px' }} class="  h-4 relative w-60 rounded-full overflow-hidden">
                            <div class=" w-full h-full bg-gray-200 absolute "></div>
                            <div class=" h-full bg-yellow-400 sm:bg-green-500 absolute" style={{ width: `${stat.base_stat}%` }}></div>
                          </div>
                        </div>
                      ))
                    }



                  </div>
                </li>

                <li className="">
                  <input className="peer sr-only" type="radio" value="no" name="answer" id="no" />
                  <label className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out" for="no">Abilities</label>

                  <div style={{ width: '99%', height: '100% ' }} className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                      <div class="mt-8 flex">
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap', // Permite que los botones se acomoden en nuevas filas
                          gap: '10px', // Espacio entre los botones
                          justifyContent: 'flex-start', // Alinea los botones hacia la izquierda
                        }}>
                          {
                            pokemonSelected.abilities.map((abilitie) => (
                              <button key={abilitie.name} type="button" style={{ background: 'lightgray', margin: '5px' }} class="rounded-full px-4 mr-2 text-white p-2 rounded  leading-none flex items-center">
                                {abilitie.name.toUpperCase()}
                              </button>
                            ))
                          }

                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="">
                  <input className="peer sr-only" type="radio" value="yesno" name="answer" id="yesno" />
                  <label className="flex justify-center cursor-pointer rounded-full border border-gray-300 bg-white py-2 px-4 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500 transition-all duration-500 ease-in-out " for="yesno">Moves</label>

                  <div style={{ width: '99%', height: '90%' }} className="absolute bg-white shadow-lg left-0 p-6 border mt-2 border-indigo-300 rounded-lg mx-auto transition-all duration-500 ease-in-out translate-x-40 opacity-0 invisible peer-checked:opacity-100 peer-checked:visible peer-checked:translate-x-1">
                    <div className="mt-8">
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap', // Permite que los botones se acomoden en nuevas filas
                        gap: '10px', // Espacio entre los botones
                        justifyContent: 'flex-start', // Alinea los botones hacia la izquierda
                      }}>
                        {
                          pokemonSelected.moves.map((move) => (
                            <button
                              key={move.move.name}
                              type="button"
                              style={{
                                background: 'lightgray',
                                margin: '5px',
                                padding: '10px 20px', // Ajusta el tamaño de los botones
                                fontSize: '14px', // Ajusta el tamaño del texto
                              }}
                              className="rounded-full text-white flex items-center"
                            >
                              {move.move.name.toUpperCase()}
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  </div>

                </li>
              </ul>

            </div>

          </div>
        )
      }

      {/* <strong>#0{pokemonSelected.id}</strong>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
              <img style={{ height: '150px', position: 'relative', bottom: '50px' }} src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg' alt='pokemon' />

            </div>
            

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

              <div style={{ display: 'flex', width: '100%', alignItems: 'baseline' }}>
                <h3 className='pe-2'>Abilities: </h3>
                <div style={{ width: '100%' }} className="  max-w-full bg-white shadow rounded">
                  <div style={{ height: '20px' }} className="bg-gray-200 rounded" role="progressbar" aria-valuenow={75} aria-valuemin="0" aria-valuemax="100">
                    <div style={{ height: '20px', width: `75%`, transition: 'width 2s' }} className="bg-green-400 rounded h-6 text-center text-white text-sm transition">
                      {75}%
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px' }}>{pokemonSelected.name.toUpperCase()}</span>

            </div> */}

    </div>
  );
}

export default App;
