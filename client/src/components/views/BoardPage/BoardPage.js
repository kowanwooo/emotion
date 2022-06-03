import React, { useEffect, useState } from 'react'
import '../LandingPage/LandingPage.css';
import './BoardPage.css';
import axios from 'axios';
import CkeEditor from './Section/CkeEditor';
import AddBoard from "./Section/AddBoard";
import Header from '../Header/Header';
import { Link } from 'react-router-dom';


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
        <>
            <Header />
            <div className='board__main' style={{ textAlign: "center" }}>
                <table>

                    <thead>
                        <tr>
                            <th><input class="check all" type="checkbox" /></th>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input class="check" type="checkbox" /></td>
                            <td>1</td>
                            <td><Link href="#">글의 제목 - 1</Link></td>
                            <td>거북이</td>
                            <td>2019.10.14</td>
                        </tr>
                        <tr>
                            <td><input clLinkss="check" type="checkbox" /></td>
                            <td>2</td>
                            <td><Link href="#">글의 제목 - 2</Link></td>
                            <td>거북이</td>
                            <td>2019.10.14</td>
                        </tr>
                        <tr>
                            <td><input clLinkss="check" type="checkbox" /></td>
                            <td>3</td>
                            <td><Link href="#">글의 제목 - 3</Link></td>
                            <td>거북이</td>
                            <td>2019.10.14</td>
                        </tr>
                    </tbody>
                </table>
                <div class="page-box">
                    <Link class="btn" href="#">&lt;&lt;</Link>
                    <Link class="btn" href="#">&lt;</Link>

                    <Link class="btn number" href="#">1</Link>
                    <Link class="btn number" href="#">2</Link>
                    <Link class="btn number on" href="#">3</Link>
                    <Link class="btn number" href="#">4</Link>
                    <Link class="btn number" href="#">5</Link>

                    <Link class="btn" href="#">&gt;</Link>
                    <Link class="btn" href="#">&gt;&gt;</Link>
                </div>
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
        </>
    )
}



export default BoardPage