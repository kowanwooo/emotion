import { withRouter } from 'react-router-dom';
import Header from '../Common/Header/Header';
import MoreContents from './Section/MoreContents';





function MoreBannerPage(){
    return(<>
    <Header/>
    <MoreContents/>
    </>    
    )
}

export default withRouter(MoreBannerPage)