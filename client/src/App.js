import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Emotion from './components/FaceApi/Section/Emotion/Emotion';
import CreateBoard from './components/BoardPage/Section/CreateBoard';
import BoardDetail from './components/BoardPage/BoardDetail'
import Auth from './hoc/auth'
import MyPage from './pages/MyPage';
import Board from "./pages/Board";
import MoreBannerPage from './components/MoreBannerPage/MoreBannerPage'




function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LoginPage, null)} />
        <Route path="/login" component={Auth(LandingPage, true)} />
        <Route path="/emotion" component={Auth(Emotion, null)} />
        <Route path="/register" component={Auth(RegisterPage, null)} />
        <Route path="/mypage" component={Auth(MyPage, null)} />
        <Route exact path="/board" component={Auth(Board, true)} />
        <Route path="/board/create" component={Auth(CreateBoard)} />
        <Route path="/board/:boardId" component={Auth(BoardDetail, true)} />
        <Route path="/more" component={Auth(MoreBannerPage, null)} />
      </Switch>
    </Router >
  );
}

export default App;

