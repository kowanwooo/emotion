import React, { useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom';
import LandingPage from '../components/LandingPage/LandingPage';
import LandingDetail from '../components/LandingPage/LandingDetail';

function Landing({ match }) {
    return (
        <>
            <Route exact path={match.path} component={LandingPage} />
            <Route path={`${match.path}/:id`} component={LandingDetail} />
        </>

    )
}
export default withRouter(Landing);

