import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './MyAddTable.css';
import axios from 'axios';


function MyAddTable(props) {
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
      <Link key={props.id} to={`/board/${props.id}`} className="add_table" >
        <div className="cs-table02-wrap">
          <table className="cs-table-02">
            {/* <caption>Superheros and sidekicks</caption> */}
            <colgroup>
              <col style={{ width: '139px' }} />
              <col />
              <col style={{ width: '70px' }} />
              <col style={{ width: '70px' }} />
              <col style={{ width: '50px' }} />
              <col style={{ width: '50px' }} />
            </colgroup>
            <tbody>
              <tr className="">
                <td><p className="noti-type">&nbsp;&nbsp;&nbsp;&nbsp;{'>>'}</p></td>
                <td>
                  <span>{props.title}</span>
                  <i className="add_comment">
                    [{CommentCounts}]
                  </i>
                </td>
                <td><p className="noti_date">{props.writer}</p></td>
                <td><p className="noti_date noti_time">{props.time}</p></td>
                <td><p className="noti_date">{ViewCounts}</p></td>
                <td><p className="noti_date">{likeCounts}</p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Link>
    </>
  )
}

export default withRouter(MyAddTable);
