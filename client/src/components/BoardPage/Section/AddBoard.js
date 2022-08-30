import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AddBoard.css';
import axios from 'axios';


function AddBoard(props) {
  const userFrom = localStorage.getItem("userId");
  const [CommentCounts, setCommentCounts] = useState(0);
  const [likeCounts, setLikeCounts] = useState(0);
  const [ViewCounts, setViewCounts] = useState(0);
  const currentPage = props.currentPage; // 상태에 있는 페이지
  const boardTap = props.boardTap;
  let variables = {
    //userFrom, id를 재료로 보냅니당.
    userFrom: userFrom, 
    boardFrom: props.id,
  };

  useEffect(() => {
    axios
      .post("/api/users/comment/getComment", variables)
      .then((response) => {
        if (response.data.success) {
          setCommentCounts(response.data.commentCounts);
        } else {
          alert("댓글을 보여줄 수 없습니다.");
        }
      })

    axios
      .post("/api/users/like/likeCounts", variables)
      .then((response) => {
        if (!response.data.success) {
          alert("좋아요 정보를 가져오는데 실패했습니다.");
          return;
        }
        let responsedData = response.data.likeCounts;
        setLikeCounts(responsedData);
      })
      .catch((e) => console.log(e));

    axios
      .post(`/api/users/board`, variables)
      .then((response) => {
        if (!response.data.success) {
          alert("조회수 정보를 가져오는데 실패했습니다.");
          return;
        }
        let responsedData = response.data.boardviews;
        setViewCounts(responsedData);
      })
  }, [currentPage, boardTap]);


  return (
    <>
      {/* 작성자의 id값으로 이동한다. 키값은 유일하다. board._id */}
      <Link key={props.id} to={`/board/${props.id}`} className="post_item" >
        <div className="post_heading">
          <span className="post_category">
          </span>
          <div className="post_content">
            <span className="post_title">
             {/* board.boardTitle */}
              {props.title} 
            </span>
            <i className="post_comment">
              {/* 댓글 갯수 */}
              [{CommentCounts}]
            </i>
          </div>
        </div>
        <div className="post_detail">
          <span className="post_writer">
          {/* boardWriter */}
            {props.writer}
          </span>
          {/* boardCreatedAt */}
          <span className="post_date">{props.time}</span>

          {/* 카운터들 */}
          <span className="post_view">{ViewCounts}</span>
          <span className="post_recommend">{likeCounts}</span>
        </div>
      </Link>

    </>
  )
}

export default withRouter(AddBoard);
