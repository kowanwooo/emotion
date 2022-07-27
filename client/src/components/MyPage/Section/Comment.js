import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Header from "../../Common/Header/Header";
import MyAddTable from './MyAddTable';
import MyAddTableHeader from './MyAddTableHeader';
import Footer from "../../Common/Footer/Footer";

function Comment({ history }) {
    const [CommentsFrom, setCommentsFrom] = useState([]);
    useEffect(() => {
        getMyComments();
        console.log('get comment!')
    }, []);

    const getMyComments = () => {
        let userId = window.localStorage.getItem("userId");
        axios
            .post(`/api/users/comment/comments`, { userFrom: userId })
            .then((response) => {
                saveOptions(response.data.comments);
            })
            .catch((e) => alert(`댓글을 불러오는데 실패했습니다.`));

    };

    const saveOptions = (comments) => {
        const commentsList = [];
        comments.forEach(element => {
            commentsList.push(element.boardFrom);
        })
        setCommentsFrom([...new Set(commentsList.map(JSON.stringify))].map(JSON.parse));
    }

    const onRemove = (id) => {
        setCommentsFrom(CommentsFrom.filter(CommentsFrom => CommentsFrom._id !== id))
    }

    return (
        <>
            <Header />
            <div className='myBoardList'>
                <div className='board_top'>
                    <div className='top_inner'>
                        <h2 className='board_title'>내가 쓴 댓글</h2>
                    </div>
                </div>
                <div className='m_board_wrap'>
                    {(CommentsFrom.length === 0) &&
                        <div>
                            <h2>댓글 목록이 없습니다.</h2>
                        </div>
                    }
                    <MyAddTableHeader />
                    {CommentsFrom &&
                        CommentsFrom.map((board, index) => {
                            const boardCreatedAt = board.createdAt.substr(0, 10);
                            return (
                                <React.Fragment key={index}>
                                    <MyAddTable
                                        id={board._id}
                                        user={board.userFrom}
                                        time={boardCreatedAt}
                                        writer={board.boardWriter}
                                        title={board.boardTitle}
                                        content={board.boardContent}
                                        onRemove={onRemove}
                                    />
                                </React.Fragment>
                            );
                        })}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default withRouter(Comment);
