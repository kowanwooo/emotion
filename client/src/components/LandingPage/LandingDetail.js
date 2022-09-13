import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import './LandingDetail.css'



function LandingDetail(props) {
    const MovieId = props.match.params.movieId;
    const [MovieDetail, setMovieDetail] = useState([]);
    const actorUrl = (MovieDetail.actorUrl || '').split(' ');
    const actor = (MovieDetail.actor || '').split('/');
    const director = actor.shift()
    const directorUrl = actorUrl.shift()
    actor.pop()

    useEffect(() => {
        FetchLandingDetail();
        console.log(`LandingDetail(props) : ${props.match.params.movieId}`)
        
    }, [,]);

    const FetchLandingDetail = () => {
        const variable = { movieDbId: MovieId };
        axios
            .post(`/api/users${props.match.path}`, variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.contents);
                    setMovieDetail(response.data.contents);
                    console.log('MovieDetail : ', response.data.contents)

                } else {
                    alert("영화정보 가져오기에 실패했습니다.");
                }
            })
    }

    return (
        <>
            <div>
                title : {MovieDetail.title}
                <img src={MovieDetail.posterUrl} alt="poster" />
            </div>
            <br />
            <hr />
            <div>summary : {MovieDetail.summary}</div>
            <br />
            <hr />
            <div>runningTime : {MovieDetail.runningTime}</div>
            <br />
            <hr />
            <div>releaseDate : {MovieDetail.releaseDate}</div>
            <br />
            <hr />
            <div>parentalGuidance : {MovieDetail.parentalGuidance}</div>
            <br />
            <hr />
            <div>grade : {MovieDetail.grade}</div>
            <br />
            <hr />
            <div>genre : {MovieDetail.genre}</div>
            <br />
            <hr />
            <div>emotion : {MovieDetail.emotion}</div>
            <br />
            <hr />
            <div>country : {MovieDetail.country}</div>
            <br />
            <hr />
            <div>audience : {MovieDetail.audience}</div>
            <br />
            <hr />
            <div>
                director : {director}
            </div>
            <br />
            <hr />
            <br />
            <div>
                <img src={directorUrl} alt="director" />
            </div>
            <br />
            <hr />
            <br />
            <div>
                actor :
                {actor && actor.map((actor, index) => {
                    return (
                        <span>{actor}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    )
                })
                }
            </div>
            <br />
            <hr />
            <br />
            <div>
                {actorUrl && actorUrl.map((actorurl, index) => {
                    return (
                        <img src={actorurl} alt="actor" />
                    )
                })
                }
            </div>
            <br />
        </>
    )

}


export default withRouter(LandingDetail);