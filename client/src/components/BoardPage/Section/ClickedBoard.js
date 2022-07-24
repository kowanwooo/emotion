import React from 'react'
import parse from 'html-react-parser';
import './ClickedBoard.css'
import DeleteBoard from './DeleteBoard';
import LikeButton from './LikeButton';

function ClickedBoard(props) {
    const currentUser = window.localStorage.getItem('userId');
    const Content = parse(props.content);

    return (
        <>
            <section className="primary post-detail">
                <div className="py-sm-3 clearfix">
                    <h2>
                        감정 게시판
                    </h2>
                </div>
                <div className="post">
                    <div className="title">
                        <div>
                            제목 : {props.title}
                        </div>
                        {props.user === currentUser
                            ? <DeleteBoard
                                board={props.id}
                                user={props.user}
                                history={props.history}
                                onRemove={props.onRemove}
                            />
                            : null}
                    </div>
                    <div className="content">
                        <b>{Content}</b>
                    </div>
                    <div className="info">
                        <div className="thumb">
                        </div>
                        <div className="text">
                            <span className="label">작성자 : {props.writer}</span>
                        </div>
                        <div className="reaction">
                            <div>
                                <span>댓글 {props.CommentCounts}</span>
                                <span> | </span>
                                <span>조회수 {props.ViewsCounts}</span>
                            </div>
                        </div>
                    </div>
                    <div className="action">
                        <div className="vote">
                            추천수&nbsp;&nbsp;
                            <LikeButton
                                boardId={props.id}
                                boardWriter={props.writer}
                                boardTitle={props.title}
                                boardContent={props.content}
                            />
                        </div>

                    </div>
                </div>
            </section>


        </>
    )
}

export default ClickedBoard