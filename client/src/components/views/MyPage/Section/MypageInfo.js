import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MypageInfo.css';


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
                                <li>관심 콘텐츠 0</li>
                                <li>콘텐츠 관리 0</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MypageInfo;