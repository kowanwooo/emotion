import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Header from "../../Common/Header/Header";
import AddBoard from "../../BoardPage/Section/AddBoard";


function Comment() {
    const [CommentsFrom, setCommentsFrom] = useState([]);

    useEffect(() => {
        getMyComments();
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
                <div className='m_board_wrap'>
                    <h3>내가 쓴 댓글</h3>
                    {(CommentsFrom.length === 0) &&
                        <div>
                            <h2>댓글 목록이 없습니다.</h2>
                        </div>
                    }
                    {CommentsFrom &&
                        CommentsFrom.map((board, index) => {
                            console.log(board)
                            const boardCreatedAt = board.createdAt.substr(0, 10);
                            return (
                                <React.Fragment key={index}>
                                    <AddBoard
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
        </>
    );
}

export default withRouter(Comment);
