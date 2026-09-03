import { useState } from 'react'
import eskimoLogo from '../../images/eskimo-logo.png'
import { useNavigate } from 'react-router-dom';

export default function Login({handleLogin}){
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin(email, password)
            .then(() => {
                navigate("/");
        })
    }
    return(
    <>
        <div className="login">
            <div className='login__container'>
                <img src={eskimoLogo} className='login__image'/>
                <h1 className='login__title'>Entre na sua Conta</h1>
                <form className='login__form' onSubmit={handleSubmit}>
                    <p className='login__form-label'>E-mail</p>
                    <input className='login__input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className='login__form-label'>Senha</p>
                    <input className='login__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='login__submit' type='submit'>Entrar</button>
                </form>
            </div>
        </div>
    </>
    )
}