import { withRouter } from 'react-router-dom';

function MoreContents(){
    return(<>
        <main className="list-view">
            <div id="contents">
                <div className="title">
                    <h1>실시간 인기 프로그램</h1>
                    <select></select>
                    <select></select>
                </div>
                <div className="list-view-detail">
                    <img className="thumb-img"></img>
                </div>
                
            </div>

        </main>
    </>)
}

export default withRouter(MoreContents)