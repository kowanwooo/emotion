import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './LandingPage.css';

function LandingPage(props) {

    const [userName, setUserName] = useState('');

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push("/")
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }

    const onClickMypage = () => {
        props.history.push("/login/mypage")
    }

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
