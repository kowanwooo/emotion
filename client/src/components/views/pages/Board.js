import React from "react";
import { Route, withRouter } from "react-router-dom";
import BoardDetail from "../BoardPage/BoardDetail";
import BoardView from "../BoardPage/BoardViewPage";

function Board({ match }) {
    return (
        <>
            <Route exact path={match.path} component={BoardView} />
            <Route path={`${match.path}/:id`} component={BoardDetail} />
        </>
    );
}

export default withRouter(Board);
