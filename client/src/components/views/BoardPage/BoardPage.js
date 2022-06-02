import React, { useEffect, useState } from 'react'
import '../LandingPage/LandingPage.css';
import './BoardPage.css';
import CkeEditor from './Section/CkeEditor';
import axios from 'axios';
import AddBoard from "./Section/AddBoard";


function BoardPage() {

    const userFrom = localStorage.getItem("userId");
    const writerFrom = localStorage.getItem('userName');
    const [boardWriter, setBoardWriter] = useState(String(writerFrom));
    const [inputs, setInput] = useState({
        boardTitle: '',
        boardContent: ''
    })
    const [viewContent, setViewContent] = useState([]);

    const [totalPage, settotalPage] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [Content, setContent] = useState([]);
    const { boardTitle, boardContent } = inputs;


    useEffect(() => {
        FetchBoard();
        console.log('fetch')
    }, [currentPage]);

    const FetchBoard = () => {
        axios
            .post("api/users/board/getBoard", { page: currentPage })
            .then((response) => {
                if (response.data.success) {
                    setContent(response.data.boards);
                    settotalPage(Math.ceil(response.data.count / 5));
                } else {
                    alert("게시글을 보여줄 수 없습니다.");
                }
            });
    };
    const onRemove = (id) => {
        setContent(Content.filter((Content) => Content._id !== id));
        FetchBoard();
    };

    const onSubmit = (e) => {
        e.preventDefault();
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
        axios.post("api/users/board/upload", variables).then((response) => {
            if (response.status === 200) {
                setInput({
                    boardTitle: "",
                    boardContent: "",
                });
                // FetchBoard();
            } else {
                alert("게시글 업로드에 실패하였습니다.");
            }
        });
    };

    const getValue = e => {
        const { name, value } = e.target;
        setInput({
            ...inputs,
            [name]: value
        })
        console.log(inputs);
    };

    return (

        <div style={{ textAlign: "center" }}>
            <nav className='navbar'>
                <ul className='navbar_menu'>
                    <li className='nav_item'>영화</li>
                    <li className='nav_item'>음악</li>
                    <li className='nav_item'>책</li>
                    <button className='landing_btn z5'>
                        로그아웃
                    </button>
                    <button className='landing_btn z5'>
                        마이페이지
                    </button>
                </ul>
            </nav>

            {Content &&
                Content.map((board, index) => {
                    return (
                        <React.Fragment key={index}>
                            <AddBoard
                                id={board._id}
                                user={board.userFrom._id}
                                time={board.createdAt}
                                writer={board.boardWriter}
                                title={board.boardTitle}
                                content={board.boardContent}

                                onRemove={onRemove}
                            />
                        </React.Fragment>
                    );
                })}

            <h1>게시판</h1>

            <div className='form_wrapper'>
                <span>제목 : </span>
                <input className='title_input'
                    type='text'
                    placeholder='제목'
                    onChange={getValue}
                    name='boardTitle' />
            </div>

            <CkeEditor getValue={getValue} inputs={inputs} setInput={setInput} />
            <button className="btn btn-primary btn-lg" onClick={onSubmit}>제출</button>
        </div >
    )
}



export default BoardPage