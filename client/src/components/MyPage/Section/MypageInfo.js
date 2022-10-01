import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MypageInfo.css';
import Header from '../../Common/Header/Header';
import { Link } from 'react-router-dom';
import MySubSection from './MySubSection';
import Footer from '../../Common/Footer/Footer';
function MypageInfo(props) {

    const userFrom = localStorage.getItem("userId");
    const [lookContents, setLookContents] = useState([]);
    const [wishContents, setWishContents] = useState([]);

    let variables = {
        userFrom: userFrom,
    }

    const FetchLookMovie = () => {
        axios
            .post("/api/users/movie/getLookContents", variables)
            .then((response) => {
                if (response.data.success) {
                    setLookContents(response.data.lookContents);
                    console.log('movie ID : ', response.data.lookContents);
                } else {
                    alert("조회정보 가져오기에 실패했습니다.");
                }
            })
    }

    const FetchWishMovie = () => {
        axios
            .post("/api/users/movie/getWishContents", variables)
            .then((response) => {
                if (response.data.success) {
                    setWishContents(response.data.wishContents);
                    console.log('Wish ID : ', response.data.wishContents);
                } else {
                    alert("조회정보 가져오기에 실패했습니다.");
                }
            })
    }



    const [users, setUsers] = useState('');

    useEffect(() => {
        FetchLookMovie();
        FetchWishMovie();
        axios.get('/api/users/mypage')
            .then(response => {
                console.log(response.data)
                setUsers(response.data);
            });
        console.log(lookContents)

    }, [])

    return (
        <>
            <Header />
            <div className='mypage__backgnd'>
                <div className="mypage__info">
                    <div className="mypage__wrap">
                        <div className="mypage__user__L">
                            <div className="mypage__user__img">
                                <img className='avatar' src="https://seoulmarket.net/common/img/default_profile.png" alt="jofpin" />
                            </div>
                            <div className="mypage__user__infoBox">
                                <span className='mypage__user__name'>{users.name}님 안녕하세요</span>
                                <div className='mypage__user__innerText'>오늘 기분은 {localStorage.getItem("emotion").split('"')[1]} 하군요</div>
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
                <MySubSection map={lookContents} label="전체 시청내역" more={`/more/mylooksmore`} />
                <MySubSection map={wishContents}label="찜한 콘텐츠" />
            </div>
            <Footer />
        </>
    );
}

export default MypageInfo;