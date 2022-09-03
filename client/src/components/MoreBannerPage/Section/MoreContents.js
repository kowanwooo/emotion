import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './MoreAllContents.css'
import Header from '../../Common/Header/Header';
import Footer from '../../Common/Footer/Footer';
import Pagination from "@material-ui/lab/Pagination";
import styled from "styled-components";

const PaginationBox = styled.div`
    text-align: center;
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
`;

function Badge(props) {
    return (
        <>
            <ul className='badge-list'>
                <Link to={`/login/${props.to}`}>
                    <img src={props.src}></img>
                </Link>
            </ul>
        </>
    )
}


function MoreContents() {
    const [totalPage, settotalPage] = useState(0);
    const [Contents, setContents] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [boardTap, setboardTap] = useState(0);


    const FetchMoreContents = () => {
        axios.post("/api/users/contents/moreContents", { page: currentPage })
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.content);
                    setContents(response.data.content);
                    settotalPage(Math.ceil(response.data.count / 20));
                    setboardTap(0);
                    console.log('Content : ', Contents)
                    console.log('currentPage : ', currentPage)
                    console.log('totalPage : ', totalPage)
                    console.log('boardTap : ', boardTap)
                } else {
                    alert("콘텐츠을 보여줄 수 없습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePageChange = (e) => {
        const currentPage = parseInt(e.target.textContent);
        setcurrentPage(currentPage);
        console.log('currentPage : ', currentPage)
        window.scroll({top:0, left:0, behavior:'smooth'});
    };

    useEffect(() => {
        FetchMoreContents();
    }, [currentPage, boardTap])


    return (
        <>
            <main className='list-view'>
                <Header />
                <div id='contents'>
                    <div className='title'>
                        <h1 className='title-name'>{localStorage.getItem('TitleName')}</h1>
                    </div>
                    <div className='list-view-detail'>
                        {Contents &&
                            Contents.map((Content, index) => {
                                return (
                                    <>
                                        <Badge to={Content._id} src={Content.posterUrl} />
                                    </>
                                )

                            })}
                    </div>
                    <PaginationBox>
                        <Pagination
                            className='hihi'
                            count={totalPage}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            size="large"
                            color="primary"
                            hidePrevButton
                            hideNextButton
                        />
                    </PaginationBox>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}

export default withRouter(MoreContents)