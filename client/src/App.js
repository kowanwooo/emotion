import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MyPage from './components/views/MyPage/MyPage';
import BoardPage from './components/views/BoardPage/BoardPage';
import Emotion from './components/views/Emotion/Emotion';
import Spinner from './components/views/Spinner/Spinner';
import Auth from './hoc/auth'


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });

  return loading ? (<Spinner />) : (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LoginPage, null)} />
        <Route exact path="/login" component={Auth(LandingPage, true)} />
        <Route exact path="/emotion" component={Auth(Emotion, null)} />
        <Route exact path="/register" component={Auth(RegisterPage, null)} />
        <Route exact path="/mypage" component={Auth(MyPage, null)} />
        <Route exact path="/board" component={Auth(BoardPage, null)} />
      </Switch>
    </Router >
  );
}

export default App;

