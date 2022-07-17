import React from "react";
import { Route, withRouter } from "react-router-dom";
import BoardDetail from "../components/views/BoardPage/BoardDetail";
import BoardView from "../components/views/BoardPage/BoardViewPage";
import CreateBoard from "../components/views/BoardPage/Section/CreateBoard";

function Board({ match }) {
    return (
        <>
            <Route exact path={match.path} component={BoardView} />
            <Route path={`${match.path}/create`} component={CreateBoard} />
            <Route path={`${match.path}/:id`} component={BoardDetail} />

        </>
    );
}

export default withRouter(Board);
