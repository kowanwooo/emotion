import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from "../../../_actions/user_action";
import './Header.css';

function Header(props) {

    const path = window.location.href

    const Checkpage = (props) => {
        if (path === 'http://localhost:3000/emotion') { props.preventDefault(); }
    }

    useEffect(()=>{
    })

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
    const testee = () => {
        window.scrollTo({
            top: 450,
            behavior: "smooth",
        });
    }
    const testee1 = () => {
        window.scrollTo({
            top: 1000,
            behavior: "smooth",
        });
    }
    const testee2 = () => {
        window.scrollTo({
            top: 1600,
            behavior: "smooth",
        });

    }

    return (
        <div className='header'>
            <div>
                <div className='header-nav'>
                    <div className="wrap">
                        <ul className='nav'>
                            <li><Link to={'/mypage'} onClick = {()=>{Checkpage();}}>MY</Link></li>
                            <li><button onClick={logoutHandler}>로그아웃</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='header-gnb'>
                <Link to={'/login'} onClick = {()=>{Checkpage();}}><h1 className='logo' >Apple</h1></Link>
                <nav className='gnb-left'>
                    <ul className='gnb-menu'>
                        <li><Link to={'/login'} onClick = {()=>{Checkpage();}}>홈</Link></li>
                        <li><button onClick={(e) => {
                            Checkpage()
                            toggleMenu()
                            } }>카테고리</button></li>
                        <li><Link to={'/board'} onClick = {()=>{Checkpage();}}>게시판</Link></li>
                    </ul>
                    <ul className={isOpen ? "show-menu" : "hide-menu"} >
                        <li><Link onClick={testee} to={'#'}>나의 감정</Link></li>
                        <li><Link onClick={testee1} to={'#'}>최신순</Link></li>
                        <li><Link onClick={testee2} to={'#'}>관객순</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default withRouter(Header);