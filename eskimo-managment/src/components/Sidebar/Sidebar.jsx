import eskimoLogo from '../../images/eskimo-logo-white.png'

export default function Sidebar(props){
    const { setPage } = props
    return(
        <>
            <div className="sidebar">
                <img className='sidebar__logo' src={eskimoLogo} />
                <h1 className='sidebar__title'>Eskimó Estrada do Campinho</h1>
                <button className='sidebar__button' onClick={() => setPage('pedidos')}>Pedidos</button>
                <button className='sidebar__button' onClick={() => setPage('cardapio')}>Cardápio</button>
            </div>
        </>
    )
}