import { withRouter } from 'react-router-dom';
import './Section.css';

function Img_Src(props){
    return(<>
    <a href='#'><img src={props.src}/></a>
    </>)
}


function Section(props){
    return(<>
        <section>
            <div id = "multisection_index">
                <div className='title'>
                    <span className='label'>{props.label}</span>
                </div>
                <div class="img-wrap">
                    <Img_Src src="https://img.wavve.com/BMS/program_poster/202206/S01_P458632414-2_w720_h1080_q75.jpg"/>
                    <Img_Src src="https://img.wavve.com/BMS/program_poster/202206/C9903_C99000000002-2_w720_h1080_q75.jpg"/>
                    <Img_Src src="https://img.wavve.com/202202/20220213/2656ca7270318b1d154d847e9531c927_w720_h1080_q75.jpg"/>
                    <Img_Src src="https://img.wavve.com/BMS/program_poster/202112/S01_V0000330171_w720_h1080_q75.jpg"/>
                    <Img_Src src="https://img.wavve.com/202201/20220127/ae4465d001a0a8d3be382f9324b3eb5b_w720_h1080_q75.jpg"/>
                </div>
            </div>
        </section>

    </>)
}

export default withRouter(Section);