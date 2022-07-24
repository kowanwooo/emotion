import React from 'react'
import './AddComment.css'
import './ClickedBoard.css'
import DeleteComment from './DeleteComment'
function AddComment(props) {
    const currentUser = window.localStorage.getItem('userId');

    return (
        <div className="comment">
            <div className="box">
                <div className="pic"></div>
                <div className="text content_wrap">
                    <div>
                        <span className="nick">
                            {props.writer}
                        </span>
                        {props.user === currentUser
                            ? <DeleteComment
                                id={props.id}
                                user={props.user}
                                onRemove={props.onRemove}
                            />
                            : null}
                    </div>
                    <div className="content">
                        <p>{props.content}</p>
                    </div>
                    <div>
                        <span className="date">{props.time}</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AddComment