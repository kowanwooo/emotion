import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';
import Header from '../Common/Header/Header';
import './LandingDetail.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import BasicTabs from "./LandingTabMenu";
import Chart from './Section/Chart';
import { useForm } from "react-hook-form"
import SubBanner from './Section/SubBanner';



function Photo(props) {
    return (<>
        {/* <h1 className="actors_h1">출연진</h1> */}
        <div className="movie_actor_and_director">
            <div className="introduce_actor_director">
                <div className="actors_director">
                    <div className="director">
                        <div className="director_border">
                            <img
                                src={props.directorUrl}
                                alt="director"
                                className="director_img"
                            />
                        </div>
                        <div className="director_name">
                            <span className="director_name1">{props.director}</span>
                            <span className="director_name2">감독</span>
                        </div>
                    </div>
                    {props.actorUrl &&
                        props.actorUrl.map((actorurl, index) => {
                            return (
                                <div className="actors_pics_names">
                                    <div className="actor_border">
                                        <img
                                            src={actorurl}
                                            alt="actor"
                                            className="actor_img"
                                        />
                                    </div>
                                    <div className="actor_names">
                                        <span className="actor_names1">{props.actor[index]}</span>
                                        <span className="actor_names2">주연</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div></>)
}


function LandingDetail(props) {
    const UserName = localStorage.getItem("userName");
    const MovieName = localStorage.getItem("movie");
    const userFrom = localStorage.getItem("userId")
    const MovieId = props.match.params.movieId;

    const [relatedContents, setRelatedContents] = useState([]);
    const [MovieDetail, setMovieDetail] = useState([1]);
    const [wish, setwish] = useState('☆');
    const actorUrl = (MovieDetail.actorUrl || '').split(' ');
    const actor = (MovieDetail.actor || '').split('/');
    const director = actor.shift()
    const directorUrl = actorUrl.shift()
    const [emoCount, setEmocount] = useState([]);
    const [summary, setSummary] = useState([]);
    const [summaryModal, SetsummaryModal] = useState(false);
    const [voteModal, SetVoteModal] = useState(false);
    const [webEmoCount, SetWebEmoCount] = useState()
    const { register, handleSubmit } = useForm();
    const [isVote, setIsVote] = useState();
    const [isArray, setIsArray] = useState();
    const [userVote, setUserVote] = useState();
    actor.pop()


    const variable = {
        userFrom: localStorage.getItem("userId"),
        movieId: MovieId,
    }

    const UpdateWish = () => {
        axios.post("/api/users/movie/UpdateWish", { variable: variable })
            .then((response) => {
                if (response.data.success) {
                    console.log("찜");
                } else {
                    console.log("실패")
                }
            }).then(()=>{
                Fetchwish()
            })

    }

    const DelWish = () => {
        axios.post("/api/users/movie/DelWish", { variable: variable })
            .then((response) => {
                if (response.data.success) {
                    console.log("찜삭제");
                } else {
                    console.log("실패")
                }
            }).then(()=>{
                Fetchwish()
            })
            

    }

    const Fetchwish = (e) => {
        axios.post("/api/users/movie/FetchWish", { variable: variable })
            .then((response) => {
                if (response.data.success) {
                    setwish(response.data.contents.wish)

                } else {
                    alert("콘텐츠을 보여줄 수 없습니다.");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }



    useEffect(()=>{
        FetchLandingDetail()
    },[MovieId])

    useEffect(()=>{
        FetchRelatedContents()
        FetchUserState()
    },[MovieDetail])

    const FetchLandingDetail = () => {
        const variable = { movieDbId: MovieId };
        axios
            .post(`/api/users${props.match.path}`, variable)
            .then(response => {
                if (response.data.success) {
                    setMovieDetail(response.data.contents);
                    setEmocount(response.data.emoCount)
                    setSummary(response.data.summary)
                } else {
                    alert("영화정보 가져오기에 실패했습니다.");
                }

            }).then(()=>{
                Fetchwish()
                scrollUp()
                DelCheck()
                SetVoteModal(false)
            })
    }

    const DelCheck = (checkThis) => {
        const checkboxes = document.getElementsByName('emotion')
        for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false

        }
    }

    const scrollUp = () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    const FetchRelatedContents = () =>{
        axios.post(`/api/users/contents/emotion/related`,
        { emotion: MovieDetail.emotion })
        .then((response) => {
            if (response.data.success) {
                console.log(response.data.contents);
                setRelatedContents(response.data.contents);
            } else {
                alert("콘텐츠을 보여줄 수 없습니다.");
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    const FetchUserState = () =>{
        const wishVariable = {
            userFrom: localStorage.getItem("userId"),
            movieId: MovieId,
            posterUrl: MovieDetail.posterUrl,
            title: MovieDetail.title,
            wish: '☆'
        }
        axios.post("/api/users/movie/create", wishVariable)
            .then((response) => {
                if (response.status === 200) {
                    console.log('업로드 성공')
                } else {
                    console.log('업로드 실패')
                }
            })
        axios.post("/api/users/votecontents", wishVariable)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.Array)
                    console.log('isArray : ', response.data.isArray)
                    setIsArray(response.data.isArray)
                    SetWebEmoCount(response.data.Array)
                } else {
                }
            })
        axios.post("/api/users/votecheckuser", wishVariable)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.voteState)
                    setIsVote(response.data.voteState)
                    setUserVote(response.data.userVote)
                    console.log('response.data.userVote : ', response.data.userVote)
                } else {

                }
            })
    }




    const MoreSummary = (props) => {
        SetsummaryModal(summaryModal => !summaryModal)
    }
    const VoteOnOff = () => {
        SetVoteModal(voteModal => !voteModal)
    }

    const checkOnlyOne = (checkThis) => {
        const checkboxes = document.getElementsByName('emotion')
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkThis) {
                checkboxes[i].checked = false
            }
        }
    }

    const onSubmit = (data) => {
        alert(`투표를 완료하셨습니다.`);

        let voteVari = {
            userFrom: userFrom,
            title: MovieName,
            movieFrom: MovieId,
            data: data
        }
        console.log('voteVari', voteVari)

        axios.post("/api/users/createvote", voteVari)
            .then((response) => {
                if (response.data.success) {
                    console.log('투표완료')
                } else {
                    console.log('투표실패')
                }
            }).then(()=>{
                FetchUserState()
            })

    }




    return (
        <>        
            <body className="landingdetail_body">
                <Header />
                <main className="movie_content">
                    <article id="main_content" className="kakao_article">
                        <div className="section_detail">
                            <div className="box_basic" data-tiara-layer="main">
                                <div className="info_poster">
                                    <img
                                        src={MovieDetail.posterUrl}
                                        className="movie_poster"
                                    ></img>
                                    <button onClick={() => { wish === "☆" ? UpdateWish() : DelWish() }}>
                                        {wish === "☆" ? <FavoriteIcon style={{color : "white"}} /> : <FavoriteIcon style={{color : "FF6666"}} />}
                                    </button>
                                </div>
                                <div className="detail_tit">
                                    <div className="detail_tit_fixed" aria-hidden="true"></div>
                                    <h3 className="h1_movietitle">
                                        <span className="txt_title">{MovieDetail.title}</span>
                                    </h3>
                                </div>
                                <div className="detail_cont">
                                    <div className="inner_cont1">
                                        <ul className="list_cont1">
                                            <li className="movie_dt">
                                                <strong className="li_strong">개봉</strong>{" "}
                                                <a className="moviedetail_a">
                                                    {MovieDetail.releaseDate}
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="list_cont2">
                                            <li className="movie_dt">
                                                <strong className="li_strong">장르</strong>{" "}
                                                <a className="moviedetail_a">{MovieDetail.genre}</a>
                                            </li>
                                        </ul>
                                        <ul className="list_cont3">
                                            <li className="movie_dt">
                                                <strong className="li_strong">국가</strong>{" "}
                                                <a className="moviedetail_a">{MovieDetail.country}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="inner_cont2">
                                        <ul className="list_cont4">
                                            <li className="movie_dt">
                                                <strong className="li_strong">등급</strong>{" "}
                                                <a className="moviedetail_a text_margin">
                                                    {MovieDetail.parentalGuidance}
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="list_cont5">
                                            <li className="movie_dt">
                                                <strong className="li_strong">평점</strong>{" "}
                                                <a className="moviedetail_a text_margin">
                                                    {MovieDetail.grade}
                                                </a>
                                            </li>
                                        </ul>
                                        <ul className="list_cont6">
                                            <li className="movie_dt">
                                                <strong className="li_strong">누적관객</strong>
                                                <a className="moviedetail_a">{MovieDetail.audience}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <BasicTabs
                            label1={`줄거리`}
                            tab1={
                                <><div className='tab_pdtop'></div>
                                    <div className='summary_pdbottom'>
                                        {!summaryModal ? `${summary[0]}...` : `${summary}`}
                                        <button className='btn_more' onClick={() => { MoreSummary() }}>
                                            {!summaryModal ? '더보기' : '더보기 접기'}
                                        </button>

                                    </div>
                                </>
                            }
                            label2={"감독/배우"}
                            tab2={<Photo directorUrl={directorUrl} director={director} actorUrl={actorUrl} actor={actor} />}
                            label3={"감정 정보"}
                            tab3={<>

                                <div className='digit_pdbottom'>
                                    <div className='digit_box' style={{}}>
                                        <div className='digit_1'>
                                            <div className='digit_title'>원본 데이터 감정 차트</div>

                                            <div className='doughnut'>
                                                <Chart count={emoCount} style={{}} />
                                            </div>
                                        </div>
                                        <div className='digit_2'>
                                            <div className='digit_title'>웹 사이트 감정 차트</div>
                                            <div className='doughnut'>
                                                {!isArray ? <> 투표가 아직 없습니다. </> : <Chart count={webEmoCount} style={{}} />}

                                            </div>
                                        </div>
                                    </div>
                                </div>




                                {isVote === 1 ? <>
                                    <button className='btn_vote' onClick={() => { VoteOnOff() }}>{!voteModal ? '투표 하기' : '투표 접기'}</button>
                                    {!voteModal ? <></> :
                                        <div className='vote_box'>
                                            <div className='vote_checkbox' >
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <span className='box'><label><input  {...register("emotion")} type="checkbox" value="happy" onChange={(e) => checkOnlyOne(e.target)} /> 행복</label></span>
                                                    <span className='box'><label><input  {...register("emotion")} type="checkbox" value="fear" onChange={(e) => checkOnlyOne(e.target)} /> 공포</label></span>
                                                    <span className='box'><label><input  {...register("emotion")} type="checkbox" value="surprised" onChange={(e) => checkOnlyOne(e.target)} /> 놀람</label></span>
                                                    <span className='box'><label><input {...register("emotion")} type="checkbox" value="angry" onChange={(e) => checkOnlyOne(e.target)} /> 화남</label></span>
                                                    <span className='box'><label><input {...register("emotion")} type="checkbox" value="sad" onChange={(e) => checkOnlyOne(e.target)} /> 슬픔</label></span>
                                                    <span className='box'><label><input {...register("emotion")} type="checkbox" value="neutral" onChange={(e) => checkOnlyOne(e.target)} /> 중립</label></span>
                                                    <span className='box'><label><input {...register("emotion")} type="checkbox" value="hate" onChange={(e) => checkOnlyOne(e.target)} /> 혐오</label></span>
                                                    <div className='vote_submit'><input type="submit" /></div>
                                                </form>

                                            </div>
                                        </div>
                                    }
                                </> : <><b>{UserName}</b>님께서는 <b>{userVote}</b> 감정에 투표를 하셨습니다.</>}


                            </>}
                        />
                    </article>
                </main>
                <SubBanner label="유사 컨텐츠" Contents={relatedContents} />
                <Footer />
            </body>
        </>
    );

}
                                            {/* {`원본 데이터 감정 지수 : ${peopleCount}명 중 `}
                                            <b style={{ color: "#1976D2" }}>{`${(MovieDetail.emotionDigit * 100).toFixed(1)}%`}</b>
                                            {` 가 이 ${MovieDetail.emotion}감정에 투표 하셨습니다. `} */}

export default withRouter(LandingDetail);