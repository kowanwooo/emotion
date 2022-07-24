import React from "react";
import { Route, withRouter } from "react-router-dom";
import BoardDetail from "../components/BoardPage/BoardDetail";
import BoardViewPage from "../components/BoardPage/BoardViewPage";
import CreateBoard from "../components/BoardPage/Section/CreateBoard";

function Board({ match }) {
    return (
        <>
            <Route exact path={match.path} component={BoardViewPage} />
            <Route path={`${match.path}/create`} component={CreateBoard} />
            <Route path={`${match.path}/:id`} component={BoardDetail} />
        </>
    );
}
export default withRouter(Board);
