import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import landingStyle from './LandingPage.module.css';

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

            <div className={landingStyle.back}></div>

            <nav className={landingStyle.navbar}>
                <ul className={landingStyle.navbar_menu}>
                    <li className={landingStyle.nav_item}>영화</li>
                    <li className={landingStyle.nav_item}>음악</li>
                    <li className={landingStyle.nav_item}>책</li>
                    <button className={`${landingStyle.landing_btn} ${landingStyle.z5}`} onClick={onClickHandler}>
                        로그아웃
                    </button>
                    <button className={`${landingStyle.landing_btn} ${landingStyle.z5}`} onClick={onClickMypage}>
                        마이페이지
                    </button>
                </ul>
            </nav>
            <div className={`${landingStyle.list_content} ${landingStyle.z5} ${landingStyle.container} ${landingStyle.mt_5}`}>
                <h4>영화 추천</h4>
                <div className={landingStyle.content}></div>
                <p className={landingStyle.content_p}>보스베이비 블라블랄~~~~~~~~~~</p>
            </div>




        </div>
    )
}

export default withRouter(LandingPage)
