import { withRouter } from 'react-router-dom';
import Header from '../Common/Header/Header';
import MoreContents from './Section/MoreContents';
import Footer from '../Common/Footer/Footer';




function MoreBannerPage(){
    return(<>
    <Header/>
    <MoreContents/>
    <Footer/>
    </>    
    )
}

export default withRouter(MoreBannerPage)