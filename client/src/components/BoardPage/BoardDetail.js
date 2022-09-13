import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from '../Common/Header/Header';
import ClickedBoard from './Section/ClickedBoard';
import CommentBoard from './Section/CommentBoard';
import AddComment from './Section/AddComment';

function BoardDetail(props) {
    const BoardId = props.match.params.boardId;
    const userFrom = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const [Content, setContent] = useState([]);
    const [Comments, setComments] = useState([]);
    const [BoardDetail, setBoardDetail] = useState([]);
    const [CommentCounts, setCommentCounts] = useState(0);
    const [ViewsCounts, setViewsCounts] = useState(0);
    const [Value, setValue] = useState("");
    let variables = {
        userFrom: userFrom,
        boardFrom: BoardId,
        commentContent: Value,
        commentWriter: userName,
    }

    useEffect(() => {
        FetchBoardDetail();
        FetchComment();
        console.log('props : ',props)
    }, []);

    const FetchBoardDetail = () => {
        const variable = { boardId: BoardId };
        axios
            .post(`/api/users${props.match.path}`, variable)
            .then(response => {
                if (response.data.success) {
                    setBoardDetail([response.data.board]);
                    setViewsCounts([response.data.boardviews])
                } else {
                    alert("게시글 가져오기에 실패했습니다.");
                }
            })

    }

    const FetchComment = () => {
        axios
            .post("/api/users/comment/getComment", variables)
            .then((response) => {
                if (response.data.success) {
                    setComments(response.data.comments);
                    setCommentCounts(response.data.commentCounts);
                } else {
                    alert("댓글을 보여줄 수 없습니다.");
                }
            })
    }

    const onChange = (e) => {
        setValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/users/comment/upload', variables)
            .then(response => {
                alert("댓글이 등록되었습니다.");
                FetchComment();
            })
    }
    const onReset = (e) => {
        setValue("");
    }
    const onRemove = (id) => {
        setContent(Content.filter((Content) => Content._id !== id));
    };
    const onRemoveComment = (id) => {
        setComments(Comments.filter(Comments => Comments._id !== id))
        FetchComment();
    }

    return (
        <div>
            <Header />
            <div className='boardDetail'>
                <div className='board__C__main'>
                    {BoardDetail && BoardDetail.map((board, index) => {
                        return (
                            <React.Fragment key={index}>
                                <ClickedBoard
                                    id={board._id}
                                    user={board.userFrom}
                                    time={board.createdAt}
                                    writer={board.boardWriter}
                                    title={board.boardTitle}
                                    content={board.boardContent}
                                    CommentCounts={CommentCounts}
                                    ViewsCounts={ViewsCounts}
                                    history={`${props.history}`}
                                    onRemove={onRemove}
                                />

                            </React.Fragment>
                        )
                    })
                    }
                    {Comments && Comments.map((comment, index) => {
                        const commentCreatedAt = comment.createdAt.substr(0, 10);
                        return (
                            <React.Fragment key={index}>
                                <AddComment
                                    id={comment._id}
                                    user={comment.userFrom}
                                    time={commentCreatedAt}
                                    writer={comment.commentWriter}
                                    content={comment.commentContent}
                                    onRemove={onRemoveComment}

                                />
                            </React.Fragment>
                        )
                    })
                    }
                    <CommentBoard
                        onSubmit={onSubmit}
                        onChange={onChange}
                        onReset={onReset}
                    />
                </div>
            </div>
        </div>
    )
}

export default withRouter(BoardDetail);
