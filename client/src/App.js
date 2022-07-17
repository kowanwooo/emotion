import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Emotion from './components/views/Emotion/Emotion';
import Spinner from './components/views/Spinner/Spinner';
import CreateBoard from './components/views/BoardPage/Section/CreateBoard';
import BoardDetail from './components/views/BoardPage/BoardDetail'
import Auth from './hoc/auth'
import MyPage from './pages/MyPage';
import Board from "./pages/Board";



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });

  return loading ? (<Spinner />) : (
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
      </Switch>
    </Router >
  );
}

export default App;

