import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CreateBoard.css';
import Header from '../../Header/Header';
import { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

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

            <div className='form_wrapper board__C__main'>
                <span>제목 : </span>
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
                <button className="btn btn-primary btn-lg" onClick={onSubmit}>제출</button>
            </div>
        </>
    )
}

export default withRouter(CreateBoard);