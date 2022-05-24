import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { Link, withRouter } from 'react-router-dom';
import registerStyle from './RegisterPage.module.css';


function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push("/login")
                } else {
                    alert("Failed to sign up")
                }
            })
    }



    return (
        <div className={registerStyle.register_background} >
            <div className={registerStyle.register_page}>
                <h1 className={registerStyle.register_title}>Apple</h1>
                <div className={registerStyle.form}>
                    <form className={registerStyle.register_form} onSubmit={onSubmitHandler}>
                        <input type="email" value={Email} onChange={onEmailHandler} placeholder="Email" />
                        <input type="text" value={Name} onChange={onNameHandler} placeholder="Name" />
                        <input type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" />
                        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="Confirm Password" />
                        <button type="submit">
                            회원 가입
                        </button>
                        <p className={registerStyle.message}>Already registered? <Link to={'/'}>Sign In</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterPage)
