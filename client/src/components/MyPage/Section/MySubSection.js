import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './MySubSection.css';

function MyStepIn(props){
    return (
        <>
            <div>
                {props.map &&
                    props.map.map((MovieId, index) => {
                        return (
                            <>
                                <span><img src={MovieId.posterUrl}></img></span>
                            </>
                        )
                    })}
            </div>
        </>
    )

}

function MySubSection(props) {
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
                        <MyStepIn map = {props.map}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MySubSection