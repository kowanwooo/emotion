import React from 'react'
import './MySubSection.css';

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
                    <div className="no-data"><p><span>{props.title}이 없어요</span></p></div>
                </div>
            </div>
        </>
    )
}

export default MySubSection