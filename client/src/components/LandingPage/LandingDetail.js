import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';
import Header from '../Common/Header/Header';
import './LandingDetail.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BasicTabs from "./LandingTabMenu";
import Chart from './Section/Chart';






function Photo(props) {
    return (<>
        <h1 className="actors_h1">출연진</h1>
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
    const MovieId = props.match.params.movieId;
    const [MovieDetail, setMovieDetail] = useState([]);
    const [wish, setwish] = useState('☆');
    const actorUrl = (MovieDetail.actorUrl || '').split(' ');
    const actor = (MovieDetail.actor || '').split('/');
    const director = actor.shift()
    const directorUrl = actorUrl.shift()
    const [emoCount, setEmocount] = useState([]);
    const [peopleCount, setPeopleCount] = useState();
    const [summary, setSummary] = useState([]);
    const [summaryState, SetsummaryState] = useState(false);
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
            })
        Fetchwish()

    }

    const DelWish = () => {
        axios.post("/api/users/movie/DelWish", { variable: variable })
            .then((response) => {
                if (response.data.success) {

                    console.log("찜삭제");
                } else {
                    console.log("실패")
                }
            })
        Fetchwish()

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


    const scrollUp = () => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        FetchLandingDetail()
        // FetchNewchart()


    }, [scrollUp(), Fetchwish()]);


    const FetchLandingDetail = () => {
        const variable = { movieDbId: MovieId };
        axios
            .post(`/api/users${props.match.path}`, variable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.contents);
                    setMovieDetail(response.data.contents);
                    setEmocount(response.data.emoCount)
                    setPeopleCount(response.data.pelpleCount)
                    setSummary(response.data.summary)

                    const variable = {
                        userFrom: localStorage.getItem("userId"),
                        movieId: MovieId,
                        posterUrl: response.data.contents.posterUrl,
                        title: response.data.contents.title,
                        wish: '☆'
                    }
                    axios.post("/api/users/movie/lookup", variable)
                        .then((response) => {
                            if (response.status === 200) {
                                console.log('업로드 성공')
                            } else {
                                console.log('업로드 실패')
                            }
                        })
                } else {
                    alert("영화정보 가져오기에 실패했습니다.");
                }
            })

    }

    const MoreSummary = (props) => {
        SetsummaryState(summaryState => !summaryState)
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
                                    <button onClick={() => {
                                        wish === "☆" ? UpdateWish() : DelWish()
                                    }} className='set_wish'>
                                        {wish === "☆" ? <FavoriteBorderIcon /> : <FavoriteIcon />}
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
                                <>
                                    <div className='summary_pdbottom'>
                                        {!summaryState ? `${summary[0]}...` : `${summary}`}
                                        <button className='btn_more' onClick={() => { MoreSummary() }}>
                                            {!summaryState ? '더보기' : '더보기 접기'}
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
                                        <div className='digit'>
                                            {`감정 지수 : ${peopleCount}명 중 `}
                                            <b style={{ color: "#1976D2" }}>{`${(MovieDetail.emotionDigit * 100).toFixed(1)}%`}</b>
                                            {` 가 이 ${MovieDetail.emotion}감정에 투표 하셨습니다. `}
                                        </div>
                                        <div className='doughnut'>
                                            <Chart count={emoCount} style={{}} />
                                        </div>
                                    </div>
                                </div>
                                <div className='digit_pdbottom'>
                                    <div className='digit_box' style={{}}>
                                        <div className='digit'>
                                            {`감정 지수 : ${peopleCount}명 중 `}
                                            <b style={{ color: "#1976D2" }}>{`${(MovieDetail.emotionDigit * 100).toFixed(1)}%`}</b>
                                            {` 가 이 ${MovieDetail.emotion}감정에 투표 하셨습니다. `}
                                        </div>
                                        <div className='doughnut'>
                                            <Chart count={emoCount} style={{}} />
                                        </div>
                                    </div>
                                </div>
                            </>}
                        />
                    </article>
                </main>
                <Footer />
            </body>
        </>
    );

}


export default withRouter(LandingDetail);