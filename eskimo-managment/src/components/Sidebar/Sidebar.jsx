import { useContext } from 'react'
import eskimoLogo from '../../images/eskimo-logo-white.png'
import { NavLink } from 'react-router-dom'
import CurrentUserContext from '../../contexts/CurrentUserContext'
export default function Sidebar(props){
    const {handleLogout} = props
    const {currentUser} = useContext(CurrentUserContext)
    return(
        <>
            <div className="sidebar">
                <img className='sidebar__logo' src={eskimoLogo} />
                <h1 className='sidebar__title'>Eskimó Estrada do Campinho</h1>
                <div className='sidebar__nav'>
                    <NavLink to='/' className='sidebar__button'>Dashboard</NavLink>
                    <NavLink to='/menu' className='sidebar__button'>Cardápio</NavLink>
                    <NavLink to='/orders' className='sidebar__button'>Pedidos</NavLink>
                    {currentUser.role === 'owner' && <NavLink to='/employees' className='sidebar__button'>Funcionários</NavLink>}
                </div>
                <button className='sidebar__logout' onClick={handleLogout}>Sair</button>
            </div>
        </>
    )
}