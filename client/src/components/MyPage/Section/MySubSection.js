import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './MySubSection.css';

function MySubSection(props) {
    const userFrom = localStorage.getItem("userId");
    const [movieId, setMovieID] = useState([]);

    let variables = {
        userFrom: userFrom,
    }

    const FetchMovieID = ()=>{
        axios
        .post("/api/users/movie/getMovieId",variables)
        .then((response) =>{
            if(response.data.success){
                setMovieID(response.data.movieId);
                console.log('movie ID : ',response.data.movieId);
            }else{
                alert("조회정보 가져오기에 실패했습니다.");
            }
        })  
    }

    

    useEffect(() => {
        FetchMovieID();
    }, [,])



        return (
            <>
                <div className='mysub_wrap'>
                    <div className="">
                        <h2 className="title-area">
                            <span className="mysub_title">{props.title}</span>
                        </h2>
                    </div>
                    <div>
                        <div className="no-data">                        
                        {movieId &&
                            movieId.map((MovieId, index) =>{
                                return(
                                    <>
                                        <span><img src={MovieId.posterUrl}></img></span>    
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
}

export default MySubSection