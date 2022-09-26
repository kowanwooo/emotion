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


function MoreContents(props) { 
     
    // const emotionId = localStorage.getItem("emotion").split('"')[1]
    // const EmotionId = props.match.params.emotionId;
    const postArray = {
        fear: '공포',
        surprised: '놀람',
        angry: '분노',
        sad: '슬픔',
        neutral: '중립',
        happy: '행복',
        hate: '혐오',
        latestorder: 'latestorder',
        manyspectators: 'manyspectators',
        mylooksmore: 'mylooksmore'
    }


    const userFrom = localStorage.getItem("userId");
    const morePath = props.match.params.emotionId;

    const [totalPage, settotalPage] = useState(0);
    const [Contents, setContents] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [boardTap, setboardTap] = useState(0);
    const [post, setPost] = useState('');

    const FetchMoreContents = () => {
        for (let i = 0; i < Object.keys(postArray).length; i++) {
            if (morePath === Object.keys(postArray)[i]) {
                setPost(Object?.values(postArray)[i])
                // console.log(`Object.values(postArray)[i] : ${Object.values(postArray)[i]}`)
                console.log(post)
                axios.post(`/api/users${props.match.path}`, 
                { page: currentPage, emotionId: post, userFrom : userFrom })
                    .then((response) => {
                        if (response.data.success) {
                            console.log(response.data.content);
                            setContents(response.data.content);
                            settotalPage(Math.ceil(response.data.count / 20));
                            setboardTap(0);
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
        // FetchMoreContents()
        // FetchMoreContents();
        console.log('props : ',props.match.path)
        console.log(`path :/api/users${props.match.path}`)
    }, [currentPage, boardTap, ])
    useEffect(() => {
        FetchMoreContents()


    },)




    return (
        <>
            <main className='list-view'>
                <Header />
                <div id='contents'>
                    <div className='more_title'>
                        <h1 className='title-name'>{post}</h1>
                    </div>
                    <div className='list-view-detail'>
                        {Contents &&
                            Contents.map((Content, index) => {
                                return (
                                    <>
                                        <Badge to={post === 'mylooksmore' ? Content.movieId : Content._id} src={Content.posterUrl} />
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