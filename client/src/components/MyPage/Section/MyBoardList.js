import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../../Common/Header/Header';
import './MyBoardList.css';
import MyAddTable from './MyAddTable';
import MyAddTableHeader from './MyAddTableHeader';
import Footer from '../../Common/Footer/Footer';

function MyBoardList({ history }) {
    const [MyBoard, setMyBoard] = useState([]);

    useEffect(() => {
        const userFrom = window.localStorage.getItem('userId');
        axios.post('/api/users/myBoard', { 'userFrom': userFrom })
            .then(response => {
                if (response.data.success) {
                    setMyBoard(response.data.boards);
                } else {
                    alert("게시글 정보를 가져오는데 실패했습니다.")
                }
            })
        console.log('get board!')
    }, [])

    const onRemove = (id) => {
        setMyBoard(MyBoard.filter(MyBoard => MyBoard._id !== id))
        history.push("/mypage/boardlist")
    }
    return (
        <>
            <Header />
            <div className='myBoardList'>
                <div className='board_top'>
                    <div className='top_inner'>
                        <h2 className='board_title'>내가 쓴 게시물</h2>
                    </div>
                </div>
                <div className='m_board_wrap'>

                    {(MyBoard.length === 0) &&
                        <div>
                            <h2>게시글 목록이 없습니다.</h2>
                        </div>
                    }
                    <MyAddTableHeader />
                    {MyBoard && MyBoard.map((board, index) => {
                        console.log(board)
                        console.log(index)
                        const boardCreatedAt = board.createdAt.substr(0, 10);
                        return (
                            <React.Fragment key={index}>
                                <MyAddTable
                                    id={board._id}
                                    user={board.userFrom}
                                    time={boardCreatedAt}
                                    writer={board.boardWriter}
                                    title={board.boardTitle}
                                    content={board.boardContent}
                                    onRemove={onRemove}
                                />
                            </React.Fragment>
                        )
                    })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(MyBoardList);