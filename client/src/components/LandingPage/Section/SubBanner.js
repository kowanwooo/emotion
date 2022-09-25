import { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SubBanner.css';

function ImgSrc(props) {
    return (<>
        <div className='point_img'>
            <Link to={`/login/${props.to}`}><img src={props.src} /></Link>
        </div>
    </>)
}



function SubBanner(props) {

    return (<>
        <section className='sub_section'>
            <div id="multisection_index">
                <div className='section_banner'>
                    <div className='contents_title'>
                        <span className='label'>{props.label}</span>
                    </div>
                    <div className='more_contents'>
                        <Link className='btn_more' to={props.more} onClick={()=>{
                        }}>더보기</Link>
                    </div>
                </div>
                <div class="img_wrap">
                    <ImgSrc to={props.Contents[0]?._id} src={props.Contents[0]?.posterUrl} />
                    <ImgSrc to={props.Contents[1]?._id} src={props.Contents[1]?.posterUrl} />
                    <ImgSrc to={props.Contents[2]?._id} src={props.Contents[2]?.posterUrl} />
                    <ImgSrc to={props.Contents[3]?._id} src={props.Contents[3]?.posterUrl} />
                    <ImgSrc to={props.Contents[4]?._id} src={props.Contents[4]?.posterUrl} />
                </div>
            </div>
        </section>

    </>)
}

export default withRouter(SubBanner);