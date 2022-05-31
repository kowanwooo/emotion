import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/user_action";
import './LandingPage.css';
import axios from 'axios';

function LandingPage(props) {

    const [User, setUser] = useState({
        userId: "",
        userName: "",
    })

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(logoutUser()).then((response) => {
            if (response.payload.logoutSuccess) {
                window.localStorage.removeItem("userId");
                props.history.push("/");
            } else {
                alert("로그아웃에 실패했습니다");
            }
        });
    };

    const onClickMypage = () => {
        props.history.push("/mypage")
    }

    useEffect(() => {
        const userFrom = localStorage.getItem("userId");
        axios.get('api/users/profile', { _id: userFrom })
            .then((response) => {
                setUser({
                    userId: response.data.id,
                    userName: response.data.name,
                })
                window.localStorage.setItem('userName', response.data.name);
            })
    }, [])
    return (
        <div>

            <div className='back'></div>

            <nav className='navbar'>
                <ul className='navbar_menu'>
                    <li className='nav_item'>영화</li>
                    <li className='nav_item'>음악</li>
                    <li className='nav_item'>책</li>
                    <button className='landing_btn z5' onClick={onClickHandler}>
                        로그아웃
                    </button>
                    <button className='landing_btn z5' onClick={onClickMypage}>
                        마이페이지
                    </button>
                </ul>
            </nav>
            <div className='list_content z5 container mt_5'>
                <h4>영화 추천</h4>
                <div className='content'></div>
                <p className='content_p'>보스베이비 블라블랄~~~~~~~~~~</p>
            </div>




        </div>
    )
}

export default withRouter(LandingPage)
