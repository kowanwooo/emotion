import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MypageInfo.css';
import Header from '../../Common/Header/Header';
import { Link } from 'react-router-dom';
import MySubSection from './MySubSection';

function MypageInfo(props) {
    const [users, setUsers] = useState('');

    useEffect(() => {
        axios.get('/api/users/mypage')
            .then(response => {
                console.log(response.data)
                setUsers(response.data);
            })
    }, [])

    return (
        <>
            <Header />
            <div className='mypage__backgnd'>
                <div className="mypage__info">
                    <div className="mypage__wrap">
                        <div className="mypage__user__L">
                            <div className="mypage__user__img">
                                <img className='avatar' src="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200" alt="jofpin" />
                            </div>
                            <div className="mypage__user__infoBox">
                                <span className='mypage__user__name'>{users.name}님 안녕하세요</span>
                                <div className='mypage__user__innerText'>쏼라쏼라쏼라</div>
                            </div>
                        </div>
                        <div className="mypage__user__R">
                            <div className="mypage__user__matadata">
                                <ul className="mypage__user__matadata__list">
                                    <Link to="/mypage/boardlist"><li>내가 쓴 글</li></Link>
                                    <Link to="/mypage/comment"><li>내가 댓글 단 글</li></Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <MySubSection title="전체 시청내역" />
                <MySubSection title="찜한 콘텐츠" />
            </div>
        </>
    );
}

export default MypageInfo;