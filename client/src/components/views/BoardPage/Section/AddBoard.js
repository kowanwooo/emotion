import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AddBoard.css';
import axios from 'axios';


function AddBoard(props) {
  const userFrom = localStorage.getItem("userId");
  const [CommentCounts, setCommentCounts] = useState(0);
  const [likeCounts, setLikeCounts] = useState(0);
  const [ViewCounts, setViewCounts] = useState(0);
  const currentPage = props.currentPage;
  const boardTap = props.boardTap;
  let variables = {
    userFrom: userFrom,
    boardFrom: props.id,
  };

  useEffect(() => {
    console.log(props.match.path)
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
    console.log(props.writer)
  }, [currentPage, boardTap]);


  return (
    <>
      <Link key={props.id} to={`/board/${props.id}`} className="post_item" >
        <div className="post_heading">
          <span className="post_category">
          </span>
          <div className="post_content">
            <span className="post_title">
              {props.title}
            </span>
            <i className="post_comment">
              [{CommentCounts}]
            </i>
          </div>
        </div>
        <div className="post_detail">
          <span className="post_writer">
            {props.writer}
          </span>
          <span className="post_date">{props.time}</span>
          <span className="post_view">{ViewCounts}</span>
          <span className="post_recommend">{likeCounts}</span>
        </div>
      </Link>

    </>
  )
}

export default withRouter(AddBoard);
