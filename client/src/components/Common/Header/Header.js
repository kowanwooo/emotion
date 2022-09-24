import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from "../../../_actions/user_action";
import './Header.css';

function Header(props) {

    // eslint-disable-next-line no-unused-vars
    const [User, setUser] = useState({
        userId: "",
        userName: "",
    })

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser()).then((response) => {
            if (response.payload.logoutSuccess) {
                window.localStorage.removeItem("userId");
                window.localStorage.removeItem("userName");
                window.localStorage.removeItem("emotion");
                window.location.href = '/'
            } else {
                alert("로그아웃에 실패했습니다");
            }
        });
    };


    const [isOpen, setMenu] = useState(false);  // 메뉴의 초기값을 false로 설정

    const toggleMenu = () => {
        setMenu(isOpen => !isOpen); // on,off 개념 boolean
    }
    return (
        <div className='header'>
            <div>
                <div className='header-nav'>
                    <div className="wrap">
                        <ul className='nav'>
                            <li><Link to={'/mypage'}>MY</Link></li>
                            <li><button onClick={logoutHandler}>로그아웃</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='header-gnb'>
                <Link to={'/login'}><h1 className='logo'>Apple</h1></Link>
                <nav className='gnb-left'>
                    <ul className='gnb-menu'>
                        <li><Link to={'/login'}>홈</Link></li>
                        <li><button onClick={() => toggleMenu()}>카테고리</button></li>
                        <li><Link to={'/board'}>게시판</Link></li>
                    </ul>
                    <ul className={isOpen ? "show-menu" : "hide-menu"}>
                        <li><Link to={'#'}>랭킹순</Link></li>
                        <li><Link to={'#'}>조회수별</Link></li>
                        <li><Link to={'#'}>감정별</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default withRouter(Header);