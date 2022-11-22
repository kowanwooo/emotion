import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './MoreAllContents.css'
import Header from '../../Common/Header/Header';
import Pagination from "@material-ui/lab/Pagination";
import styled from "styled-components";
import postArray from '../../Variable/variable';

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


function MoreContents(props) {    

    const userFrom = localStorage.getItem("userId");
    const morePath = props.match.params.emotionId;

    const [totalPage, settotalPage] = useState(0);
    const [Contents, setContents] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [boardTap, setboardTap] = useState(0);
    const [post, setPost] = useState('');
    const [moreTitle, setMoreTitle] = useState();

    const FetchMoreContents = () => {
        for (let i = 0; i < Object.keys(postArray).length; i++) {
            if (morePath === Object.keys(postArray)[i]) { //path 값이랑 key랑 같으면
                setPost(Object?.values(postArray)[i]) // 그 key의 value를 재료로
                console.log(post)
                axios.post(`/api/users${props.match.path}`, 
                { page: currentPage, emotionId: post, userFrom : userFrom })
                    .then((response) => {
                        if (response.data.success) {
                            console.log(response.data.content);
                            setContents(response.data.content);
                            settotalPage(Math.ceil(response.data.count / 20));
                            setboardTap(0);
                            setMoreTitle(response.data.State);
                            console.log(response.data.State);
                        } else {
                            alert("콘텐츠을 보여줄 수 없습니다.");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }
    

    const handlePageChange = (e) => {
        const currentPage = parseInt(e.target.textContent);
        setcurrentPage(currentPage);
        // console.log('currentPage : ', currentPage)
        window.scroll({top:0, left:0, behavior:'smooth'});
    };

    useEffect(() => {
        // window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, [currentPage, boardTap, ])
    useEffect(() => {
        FetchMoreContents()


    },)




    return (
        <>
            <main className='list-view'>
                <Header />
                <div id='contents'>
                    <div className='more_title' style={{color : 'white'}}>
                        <h1 className='title-name'>{moreTitle}</h1>
                    </div>
                    <div className='list-view-detail'>
                        {Contents &&
                            Contents.map((Content, index) => {
                                return (
                                    <>
                                        <Badge to={post === ('myvisit' || 'mywish') ? Content.movieId : Content._id} src={Content.posterUrl} />
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
        </>
    )
}

export default withRouter(MoreContents)