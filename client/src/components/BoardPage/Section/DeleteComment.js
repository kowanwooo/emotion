import React from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';

const Button = styled.button`
  color: #FFFFFF;
  font-size: 12px;
  line-height: 22px;
  background-color: #6e6e6e;
  border-radius: 20%;
  cursor: pointer;
`

function DeleteComment(props) {
    const onDelete = () => {
        let variables = {
            id: props.id,
            userFrom: props.user,
        }
        let confirmDelete = window.confirm("삭제하시겠습니까?");
        confirmDelete && axios.post("/api/users/comment/deleteComment", variables)
            .then(response => {
                if (response.data.success) {
                    alert("댓글 삭제에 성공했습니다.");
                    props.onRemove(response.data.result._id);
                } else {
                    alert("댓글 삭제에 실패했습니다.");
                }
            })
    }
    return (
        <Button onClick={onDelete}>
            삭제
        </Button>
    )
}

export default withRouter(DeleteComment);
