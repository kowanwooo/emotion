import React, { useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Section from './Section/Section';
import './LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import M_Banner from './Main_Banner/Main_Banner';






function LandingPage(props) {
  return (
    <>
      <Header/>
      <M_Banner />
      <Section label ="실시간 인기 프로그램"/>
      <Section label ="슬퍼어어엉"/>
      <Section label ="꾸에에에엑"/>
      <Section label ="갈길이 멀다"/>
    </>
  )
}

export default withRouter(LandingPage);
