import { Link, withRouter } from 'react-router-dom';
import './SubBanner.css';

function Img_Src(props) {
    return (<>
        <div className='point_img'>
            <a href='#'><img src={props.src} /></a>
        </div>
    </>)
}


function SubBanner(props) {
    return (<>
        <section>
            <div id="multisection_index">
                <div className='section_banner'>
                    <div className='title'>
                        <span className='label'>{props.label}</span>
                    </div>
                    <div className='more_contents'>
                        <Link>더보기</Link>
                    </div>
                </div>
                <div class="img_wrap">
                    <Img_Src src="https://img.wavve.com/BMS/program_poster/202206/S01_P458632414-2_w720_h1080_q75.jpg" />
                    <Img_Src src="https://img.wavve.com/BMS/program_poster/202206/C9903_C99000000002-2_w720_h1080_q75.jpg" />
                    <Img_Src src="https://img.wavve.com/202202/20220213/2656ca7270318b1d154d847e9531c927_w720_h1080_q75.jpg" />
                    <Img_Src src="https://img.wavve.com/BMS/program_poster/202112/S01_V0000330171_w720_h1080_q75.jpg" />
                    <Img_Src src="https://img.wavve.com/202201/20220127/ae4465d001a0a8d3be382f9324b3eb5b_w720_h1080_q75.jpg" />
                </div>
            </div>
        </section>

    </>)
}

export default withRouter(SubBanner);