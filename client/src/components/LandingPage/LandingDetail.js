import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';
import Header from '../Common/Header/Header';
import './LandingDetail.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



function LandingDetail(props) {
    const MovieId = props.match.params.movieId;
    const [MovieDetail, setMovieDetail] = useState([]);
    const [wish, setwish] = useState('☆');
    const actorUrl = (MovieDetail.actorUrl || '').split(' ');
    const actor = (MovieDetail.actor || '').split('/');
    const director = actor.shift()
    const directorUrl = actorUrl.shift()
    const [emoCount, setEmocount] = useState([]);
    actor.pop()


    ChartJS.register(ArcElement, Tooltip, Legend);

const Data = {

    // labels: ['행복', '공포', '놀람', '화남', '슬픔', '중립', '혐오'],
    datasets: [
        {
            data: emoCount,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                '#ffffff',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                '#ffffff',
            ],
            borderWidth: 1,

            
        },
    ],
};
const options = {
    legend: { // 범례삭제
        display: false
    },
    // responsive 속성을 false로 지정한다.
    responsive: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },

    tooltips: {
        callbacks: {
            label: function (tooltipItem) {
                return tooltipItem.yLabel;
            }
        }
    }
};

    // const CreateWish = () =>{

    //     const variable = {
    //         userFrom: localStorage.getItem("userId"),
    //         movieId: MovieId,
    //         posterUrl: MovieDetail.posterUrl,
    //         title: MovieDetail.title,
    //         wish : '☆'
    //     }
    //     console.log(variable)

    //     axios.post("/api/users/movie/CreateWish", { variable: variable})
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log('업로드 성공')
    //             } else {
    //                 console.log('업로드 실패')
    //             }
    //         })

    // }

    const UpdateWish = () => {
        const variable = {
            userFrom: localStorage.getItem("userId"),
            movieId: MovieId,
        }

        axios.post("/api/users/movie/UpdateWish", variable)
            .then((response) => {
                if (response.data.success) {
                    // setwish(response.data.contents.wish);
                    console.log("찜");
                } else {
                    console.log("실패")
                }
            })
        Fetchwish();

    }

    const DelWish = () => {
        const variable = {
            userFrom: localStorage.getItem("userId"),
            movieId: MovieId,
        }

        axios.post("/api/users/movie/DelWish", variable)
            .then((response) => {
                if (response.data.success) {
                    // setwish(response.data.contents.wish);

                    console.log("찜삭제");
                } else {
                    console.log("실패")
                }
            })
        Fetchwish();

    }

    const Fetchwish = (e) => {


        const variable = {
            userFrom: localStorage.getItem("userId"),
            movieId: MovieId,
        }

        axios.post("/api/users/movie/FetchWish", variable).then((response) => {
            if (response.data.success) {
                setwish(response.data.contents.wish)
                console.log('wish : ', response.data.contents)

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

    }, [scrollUp(), Fetchwish()]);



    const FetchLandingDetail = () => {
        const variable = { movieDbId: MovieId };
        axios
            .post(`/api/users${props.match.path}`, variable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.contents);
                    setMovieDetail(response.data.contents);
                    setEmocount([response.data.contents.happy,
                        response.data.contents.fear,
                        response.data.contents.surprised,
                        response.data.contents.angry,
                        response.data.contents.sad,
                        response.data.contents.neutral,
                        response.data.contents.hate])

                    console.log('MovieDetail : ', response.data.contents)

                    const testvari = {

                        userFrom: localStorage.getItem("userId"),
                        movieId: MovieId,
                        posterUrl: response.data.contents.posterUrl,
                        title: response.data.contents.title,
                        wish: '☆'
                    }
                    axios.post("/api/users/movie/lookup", testvari)
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



    return (
        <>
            <body className='landingdetail_body'>
                <Header />
                
                <main className='movie_content'>
                    <article id='main_content' className='kakao_article'>
                        <div className='section_detail'>
                            <div className="box_basic" data-tiara-layer="main">
                                <div className="info_poster">
                                    <img src={MovieDetail.posterUrl} className='movie_poster'></img>
                                    <button onClick={() => {
                                        wish === "☆" ? UpdateWish() : DelWish()
                                    }} className={wish === '☆' ? 'del_wish' : 'set_wish'}>
                                        {wish === "☆" ? <FavoriteBorderIcon/> :<FavoriteIcon/> }
                                    </button>
                                </div>
                                <div className="detail_tit">
                                    <div className="detail_tit_fixed" aria-hidden="true">
                                    </div>
                                    <h3 className="h1_movietitle">
                                        <span className="txt_title">
                                            {MovieDetail.title}
                                        </span>
                                    </h3>
                                </div>
                                <div className="detail_cont">
                                    <div className="inner_cont1">
                                        <ul className="list_cont1">
                                            <li className='movie_dt'><strong className='li_strong'>개봉</strong>  <a className='moviedetail_a'>{MovieDetail.releaseDate}</a></li>
                                        </ul>
                                        <ul className="list_cont2">
                                            <li className='movie_dt'><strong className='li_strong'>장르</strong>  <a className='moviedetail_a'>{MovieDetail.genre}</a></li>
                                        </ul>
                                        <ul className="list_cont3">
                                            <li className='movie_dt'><strong className='li_strong'>국가</strong>  <a className='moviedetail_a'>{MovieDetail.country}</a></li>
                                        </ul>
                                    </div>
                                    <div className="inner_cont2">
                                        <ul className="list_cont4">
                                            <li className='movie_dt'><strong className='li_strong'>등급</strong>  <a className="moviedetail_a text_margin">{MovieDetail.parentalGuidance}</a></li>
                                        </ul>
                                        <ul className="list_cont5">
                                            <li className='movie_dt'><strong className='li_strong'>평점</strong>  <a className="moviedetail_a text_margin">{MovieDetail.grade}점</a></li>
                                        </ul>
                                        <ul className="list_cont6">
                                            <li className='movie_dt'><strong className='li_strong'>누적관객</strong><a className='moviedetail_a'>{MovieDetail.audience}명</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <Doughnut data={Data} options={options} style={{
                                position: "absolute", height: "200px", top: "175px",
                                right: "363px",
                            }} />
                        </div>
                        <div className='tabmenu_wrap'>
                            <ul class="list_tabmenu" role="tablist" data-tiara-layer="tab">
                                <li className="">
                                    <a href="/moviedb/main?movieId=155115" class="link_tabmenu">
                                        <span class="txt_tabmenu">주요정보</span>
                                    </a>
                                </li>
                                <li className="">
                                    <a href="/moviedb/crew?movieId=155115" class="link_tabmenu">
                                        <span class="txt_tabmenu">출연/제작</span>
                                    </a>
                                </li>
                                <li className=''>
                                    <a href="/moviedb/contents?movieId=155115" class="link_tabmenu">
                                        <span class="txt_tabmenu">영상/포토</span>
                                    </a>
                                </li>
                                <li className=''>
                                    <a href="/moviedb/grade?movieId=155115" class="link_tabmenu">
                                        <span class="txt_tabmenu">평점</span>
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <h1 className='actors_h1'>출연진</h1>
                        <div className='movie_actor_and_director'>
                            <div className='introduce_actor_director'>
                                <div className='actors_director'>
                                    <div className='director'>
                                        <div className='director_border'>
                                            <img src={directorUrl} alt="director" className='director_img' />
                                        </div>
                                        <div className='director_name'>
                                            <span className='director_name1'>{director}</span>
                                            <span className='director_name2'>감독</span>
                                        </div>
                                    </div>
                                    {actorUrl && actorUrl.map((actorurl, index) => {
                                        return (
                                            <div className='actors_pics_names'>
                                                <div className='actor_border'>
                                                    <img src={actorurl} alt="actor" className='actor_img' />
                                                </div>
                                                <div className='actor_names'>
                                                    <span className='actor_names1'>{actor[index]}</span>
                                                    <span className='actor_names2'>주연</span>
                                                </div>
                                            </div>

                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
                <Footer />
            </body >



        </>
    )

}


export default withRouter(LandingDetail);