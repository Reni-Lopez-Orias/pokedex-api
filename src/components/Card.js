export function Card({ pokemon, handlePokemonSelected }) {

    return (
        <div onClick={() => handlePokemonSelected(pokemon)} className='animate__animated animate__fadeIn cursor-pointer card border-2 shadow-lg flex items-center rounded-xl flex-col w-40 pt-5'  >
            <img className="logo_pokemon" src={`${pokemon.sprites.other.dream_world.front_default}`} alt='' />
            <div className="flex justify-between w-full mt-2" style={{ padding: '5px 10px', background: 'lightgray', borderRadius: '0px 0px 10px 10px', gap: '15px', fontSize: '12px' }}>
                <strong>#0{pokemon.id}</strong>
                <strong>{pokemon.name.toUpperCase()}</strong>
            </div>
        </div>
    )

}