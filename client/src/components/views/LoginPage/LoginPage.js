import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { Link, withRouter } from 'react-router-dom';
import "./LoginPage.css"


function LoginPage(props) {


    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    window.localStorage.setItem('userId', response.payload.userId);
                    props.history.push('/login')
                } else {
                    alert(response.payload.message);
                }
            })


    }


    return (
        <div className='login__background'>
            <div className='login__page'>
                <h1 className='login__title'>Apple</h1>
                <div className='login__form'>
                    <form onSubmit={onSubmitHandler}>
                        <input type="email" value={Email} onChange={onEmailHandler} placeholder="email" />
                        <input type="password" value={Password} onChange={onPasswordHandler} placeholder="password" />
                        <br />
                        <button type="submit">
                            Login
                        </button>
                        <p className='login__message'>Not registered? <Link to="/register">Create an account</Link></p>
                    </form>
                </div>
                <button><Link to={'/register'}>register</Link></button>
                <button><Link to={'/login'}>/</Link></button>
            </div>
        </div>

    )
}

export default withRouter(LoginPage)
