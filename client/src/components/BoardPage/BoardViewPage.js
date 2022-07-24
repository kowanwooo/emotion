import React, { useEffect, useState } from 'react'
import './BoardViewPage.css';
import axios from 'axios';
import Header from '../Common/Header/Header';
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AddBoard from './Section/AddBoard'

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
                    setContent(response.data.boards);
                    settotalPage(Math.ceil(response.data.count / 5));
                    setboardTap(0);
                } else {
                    alert("게시글을 보여줄 수 없습니다.");
                }
            });
        console.log('1')
    };

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
    };


    return (
        <>
            <Header />
            <div className='boardView'>
                <div className='board__main'>
                    <div className='board_top'>
                        <h2 className='board_title'>감정 게시판</h2>
                        <Button component={Link} to="/board/create" variant="contained" color="primary">
                            게시물 쓰기
                        </Button>
                    </div>

                    <form className="board-actions">
                        <div className="board-btns" >
                            <div className="form-custom-radio-btngroup">
                                <div className="radio-container">
                                    <input onClick={FetchBoard} type="radio" name="sort" id="radio1" value="new" className="blog_sort_input" defaultChecked="checked" />
                                    <label htmlFor="radio1">새로운 게시물 순</label>
                                </div>
                                <div className="radio-container">
                                    <input onClick={popularityBoard} type="radio" name="sort" id="radio2" value="hot_blog" className="blog_sort_input" />
                                    <label htmlFor="radio2">조회수 순</label>
                                </div>
                            </div>

                        </div>
                    </form>

                    <div className="board_build_list">
                        <div className="board_header">
                            <span className="post_category"></span>
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
                                count={totalPage}
                                page={currentPage}
                                onChange={handlePageChange}
                                shape="rounded"
                                size="large"
                                color='primary'
                                hidePrevButton
                                hideNextButton
                            />
                        </PaginationBox>
                    </div>
                </div>
            </div>
        </>
    )
}



export default BoardPage