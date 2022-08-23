import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CreateBoard.css';
import Header from '../../Common/Header/Header';
import { useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Button from '@mui/material/Button';


function CreateBoard({ history }) {
    const userFrom = localStorage.getItem("userId");
    const writerFrom = localStorage.getItem('userName');
    const [boardWriter, setBoardWriter] = useState(String(writerFrom));
    const [inputs, setInput] = useState({
        boardTitle: '',
        boardContent: ''
    })

    const { boardTitle, boardContent } = inputs;

    const getValue = e => {
        const { name, value } = e.target;
        setInput({
            ...inputs,
            [name]: value
        })
        console.log(inputs);
    };

    const onSubmit = (e) => {
        if (!boardTitle) {
            alert(`제목을 작성해주세요`);
            return;
        } else if (!boardContent) {
            alert(`내용을 작성해주세요`);
            return;
        } else if (boardContent.length > 300) {
            alert(`내용을 300자 이내로 작성해주세요`);
            return;
        }
        let variables = {
            userFrom: userFrom,
            boardTitle: boardTitle,
            boardContent: boardContent,
            boardWriter: boardWriter,
        };

        axios.post("/api/users/board/upload", variables).then((response) => {
            if (response.status === 200) {
                setInput({
                    boardTitle: "",
                    boardContent: "",
                });
                history.push('/board');
            } else {
                alert("게시글 업로드에 실패하였습니다.");
            }
        });
    };
    return (
        <>
            <Header />
            <div className='createBoard'>
                <div className='board_top2 board__C__main'>
                    <h2 className='board_title'>게시물 쓰기</h2>
                    <div className='create_btn'>
                        <div className='create_btn_first'>
                            <Link to="/board"><button className='w_button'>
                                뒤로가기&nbsp;&nbsp;
                            </button></Link>
                        </div>
                        <div>
                            <button className='w_button' onClick={onSubmit}>
                                &nbsp;&nbsp;등록
                            </button>
                        </div>
                    </div>
                </div>
                <div className='form_wrapper '>
                    <span><strong>제목 : </strong></span>
                    <input className='title_input'
                        type='text'
                        placeholder='제목'
                        onChange={getValue}
                        name='boardTitle' />
                </div>
                <div className='editorWidth'>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{ placeholder: "Placeholder text..." }}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();

                            setInput({
                                ...inputs,
                                boardContent: data
                            })
                            console.log(inputs);
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default withRouter(CreateBoard);