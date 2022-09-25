import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './MySubSection.css';

import '../../LandingPage/Section/SubBanner.css';

function MyStepIn(props) {
    return (
        <>
            {props.map &&
                props.map.map((Contents, index) => {
                    if (index <= 4) {
                        return (
                            <>
                                <div className='point_img'>
                                    <Link to={`/login/${Contents.movieId}`}><img src={Contents.posterUrl} /></Link>
                                </div>
                            </>

                        )
                    }
                })
            }
        </>
    )

}



function MySubSection(props) {
    return (<>
        <section className='sub_section'>
            <div id="multisection_index">
                <div className='section_banner'>
                    <div className='contents_title'>
                        <span className='label'>{props.label}</span>
                    </div>
                    <div className='more_contents'>
                        <Link className='btn_more' to = {props.more} onClick={() => {
                        }}>더보기</Link>
                    </div>
                </div>
                <div class="img_wrap">
                    <MyStepIn map = {props.map} />
                </div>
            </div>
        </section>

    </>)
}

export default MySubSection