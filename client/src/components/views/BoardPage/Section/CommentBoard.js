import React from 'react'
import { Link } from 'react-router-dom';
import './CommentBoard.css';

function CommentBoard(props) {
    return (
        <>
            <section className="col-12 comments" id="comments_wrapper">
                <div className="form-reply fixed">
                    <span>댓글쓰기</span>
                    <form method="post">
                        <textarea onChange={props.onChange} style={{ resize: 'none' }} className="form-control" id="id_content" name="content" rows="3" required="required"></textarea>
                        <button onClick={props.onSubmit} className="btn">등록</button>
                    </form>
                </div>
            </section>
            <div className="btns col-12">
                <Link to="/board/create">
                    <button className="btn btn-theme btn-a-tag">
                        게시물 쓰기
                    </button>
                </Link>
                <Link to="/board">
                    <button className="btn btn-theme btn-a-tag" >
                        목록
                    </button>
                </Link>
            </div>
        </>
    )
}

export default CommentBoard