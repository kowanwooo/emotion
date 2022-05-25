/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './MyPage.css';
//import './MyPage.css';
import { Link } from 'react-router-dom';

function MyPage(props) {

    const [users, setUsers] = useState('');

    useEffect(() => {
        axios.get('/api/users/mypage')
            .then(response => {
                console.log(response.data)
                setUsers(response.data);
            })
    }, [])





    return (
        <div className='mypage__backgnd'>
            <div className='content_profile_page'>
                <div className='profile_user_page card'>
                    <div className='img_user_profile'>
                        <img className='profile_bgHome' src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg" />
                        <img className='avatar' src="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200" alt="jofpin" />
                    </div>
                    <button>올ㅋ</button>
                    <div className='user_profile_data'>
                        <h1 className='text_center'>{users.name}</h1>
                        <p className='text_center'>github.com/Apple</p>
                    </div>
                    <div className='description_profile'>Front_end | Security | CSS Warrior | 5/12 끄적끄적</div>
                    <ul className='data_user'>
                        <li><Link to="#"><strong>3390</strong><span>대충 좋아요 구간</span></Link></li>
                        <li><Link to="#"><strong>718</strong><span>표정</span></Link></li>
                        <li><Link to="#"><strong>239</strong><span>머넣을지 모르겠넹</span></Link></li>
                    </ul>
                </div>
            </div>

            <footer>
                <h4>Design by <Link to="#" target="_blank" title="#">@내가 해버림</Link></h4>
            </footer>
        </div >

    )
}

export default MyPage
