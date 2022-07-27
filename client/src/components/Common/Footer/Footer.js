import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-menu">
                <div className="footer-info-area footer-info-link-all">
                    <ul>
                        <li>
                            <Link href="/customer/company.html" target="_blank">
                                회사소개
                            </Link>
                        </li>
                        <li>
                            <Link href>
                                인재채용
                            </Link>
                        </li>
                        <li>
                            <Link className="">
                                서비스 소개
                            </Link>
                        </li>
                        <li>
                            <Link>이용약관</Link>
                        </li>
                        <li className="footer-privacy">
                            <Link>개인정보 처리방침</Link>
                        </li>
                        <li>
                            <Link>고객센터</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-info-area footer-info-copyright">
                    <span>감정콘텐츠 추천 Team Apple</span>
                    <span>팀장 이형석</span>
                    <span className="last">고객센터 1588-**** (평일, 주말 내내 쉴꺼임)</span>
                    <br />
                    <span>사업자등록번호 666-66-66666</span>
                    <span className="last">호스팅서비스제공자 : 내가 곧 할 예정</span>
                    <br />
                    <span>통신판매업 신고번호 : 제 2022-우리집에서-0727호</span>
                    <span className="last">Team Apple 학교 :
                        <Link className="info_link">
                            https://www.tu.ac.kr
                        </Link>
                    </span>
                    <br />
                    <address>부산광역시 남구 신선로 428 컴퓨터공학과</address>
                    <span className="last">전자우편주소 :
                        <Link>홍길동@naver.com</Link>
                    </span>
                    <span className="copyright">Copyright© Team Apple All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer