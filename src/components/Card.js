

export function Card(props) {
    return (
        <div className='border-2 shadow-lg flex items-center rounded-xl flex-col w-40' style={{ width: 'auto' }}>
            <img className="img_card_pokemon" src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg' alt='' />
            <div className="flex justify-between w-full" style={{ padding: '5px 10px', background: 'lightgray', borderRadius: '0px 0px 10px 10px', gap: '15px' }}>
                <strong>#0021</strong>
                <strong>Bulvasaur</strong>
            </div>
        </div>
    )
}