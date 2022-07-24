import React, { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom';
import MypageInfo from '../components/MyPage/Section/MypageInfo';
import Comment from "../components/MyPage/Section/Comment";
import MyBoardList from '../components/MyPage/Section/MyBoardList';

function MyPage({ match }) {
    return (
        <>
            <Route exact path={match.path} component={MypageInfo} />
            <Route path={`${match.path}/boardlist`} component={MyBoardList} />
            <Route path={`${match.path}/comment`} component={Comment} />
        </>

    )
}
export default withRouter(MyPage);

