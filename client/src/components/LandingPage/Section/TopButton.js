import React, { useEffect, useState } from 'react'
import './TopButton.css';

function TopButton(props) {

    return (
        <div className="btn_wrap">
            <button className={props.BtnStatus ? "topBtn" : "topBtn.active"} onClick={props.handleTop} />
        </div>

    )
}

export default TopButton