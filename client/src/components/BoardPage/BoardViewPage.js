import React, { useEffect, useState } from 'react'
import './BoardViewPage.css';
import axios from 'axios';
import Header from '../Common/Header/Header';
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import { Link } from 'react-router-dom';
import AddBoard from './Section/AddBoard';
import Footer from '../Common/Footer/Footer';

const PaginationBox = styled.div`
    text-align: center;
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
`;

function BoardPage(props) {
    const [totalPage, settotalPage] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [Content, setContent] = useState([]);
    const [boardTap, setboardTap] = useState(0);

    useEffect(() => {
        console.log('fetch')
        FetchBoard();
        console.log(props)
    }, [currentPage]);
    
    const FetchBoard = () => {
        axios
            .post("/api/users/board/getBoard", { page: currentPage })
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.boards)
                    setContent(response.data.boards); // 게시글을 가져옵니당.
                    settotalPage(Math.ceil(response.data.count / 5)); // 페이지 tn
                    setboardTap(0);
                    console.log('Content : ',response.data.boards)
                    console.log('currentPage : ', currentPage)
                    console.log('totalPage : ', totalPage)
                    console.log('boardTap : ', boardTap)
                } else {
                    alert("게시글을 보여줄 수 없습니다.");
                }
            });
    };
    //조회수순 데이터
    const popularityBoard = () => {
        axios
            .post("/api/users/board/getBoardP", { page: currentPage })
            .then((response) => {
                if (response.data.success) {
                    setContent(response.data.boards);
                    settotalPage(Math.ceil(response.data.count / 5));
                    setboardTap(1);
                } else {
                    alert("게시글을 보여줄 수 없습니다.");
                }
            });
        console.log('gigi')
    }
    const handlePageChange = (e) => {
        const currentPage = parseInt(e.target.textContent);
        setcurrentPage(currentPage);
        console.log('currentPage : ',currentPage)
    };


    return (
        <>
            <Header />
            <div className='boardView'>
                <div className='board_top'>
                    <div className='top_inner'>
                        <h1 className='board_title'>감정 게시판</h1>
                    </div>
                </div>
                <div className='board__main'>

                    <div className="board-btns" >
                        <ul className="cs-2depth">
                            <li onClick={FetchBoard}><button>새로운 게시물 순</button></li>
                            <li onClick={popularityBoard}><button>조회수 순</button></li>

                        </ul>
                        <Link to="/board/create"><button className='w_button'>
                            게시물 쓰기
                        </button></Link>
                    </div>


                    <div className="board_build_list">
                        <div className="board_header">
                            <span className="post_category">구분</span>
                            <span className="post_content">제목</span>
                            <span className="post_writer">작성자</span>
                            <span className="post_date">날짜</span>
                            <span className="post_view">조회</span>
                            <span className="post_recommend">추천</span>
                        </div>
                        <div className="post_list">

                            <Link to={"#"} className="post_item post_notice">
                                <div className="post_heading">
                                    <span className="post_category">공지</span>
                                    <div className="post_content">
                                        <span className="post_title">공지가 들어갈 자리</span>
                                        <i className="post_comment">[0]</i>
                                    </div>
                                </div>
                                <div className="post_detail">
                                    <span className="post_writer"><i className="mark_admin">PS</i>관리자</span>
                                    <span className="post_date">2022/05/23</span>
                                    <span className="post_view">24,346</span>
                                    <span className="post_recommend">8</span>
                                </div>
                            </Link>


                            {Content &&
                                Content.map((board, index) => {
                                    //날짜만 가져오기
                                    const boardCreatedAt = board.createdAt.substr(0, 10);

                                    return (
                                        <AddBoard key={index}
                                            id={board._id}
                                            user={board.userFrom._id}
                                            time={boardCreatedAt}
                                            writer={board.boardWriter}
                                            title={board.boardTitle}
                                            content={board.boardContent}
                                            history={`${props.history}`}
                                            currentPage={currentPage}
                                            boardTap={boardTap}
                                        />
                                    );
                                })}
                        </div>
                        <PaginationBox>
                            <Pagination
                                className='hihi'
                                count={totalPage}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                size="large"
                                color="primary"
                                hidePrevButton
                                hideNextButton
                            />
                        </PaginationBox>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}



export default BoardPage