import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Common/Header/Header';
import './LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainBanner from './Section/MainBanner';
import SubBanner from './Section/SubBanner';






function LandingPage(props) {
  return (
    <>
      <Header />
      <MainBanner />
      <SubBanner label="실시간 인기 프로그램" />
      <SubBanner label="슬퍼어어엉" />
      <SubBanner label="꾸에에에엑" />
      <SubBanner label="갈길이 멀다" />
    </>
  )
}

export default withRouter(LandingPage);
