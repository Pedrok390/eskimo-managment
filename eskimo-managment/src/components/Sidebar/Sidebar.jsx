import eskimoLogo from '../../images/eskimo-logo-white.png'
import { NavLink } from 'react-router-dom'
export default function Sidebar(props){
    const { setPage, page } = props
    return(
        <>
            <div className="sidebar">
                <img className='sidebar__logo' src={eskimoLogo} />
                <h1 className='sidebar__title'>Eskimó Estrada do Campinho</h1>
                <div className='sidebar__nav'>
                    <NavLink to='/' className='sidebar__button'>Dashboard</NavLink>
                    <NavLink to='/menu' className='sidebar__button'>Cardápio</NavLink>
                    <NavLink to='/orders' className='sidebar__button'>Pedidos</NavLink>
                </div>
            </div>
        </>
    )
}