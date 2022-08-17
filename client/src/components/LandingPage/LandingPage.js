import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Common/Header/Header';
import './LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainBanner from './Section/MainBanner';
import SubBanner from './Section/SubBanner';
import TopButton from './Section/TopButton';
import Footer from '../Common/Footer/Footer';

function LandingPage(props) {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    ScrollY > 100 ? setBtnStatus(true) : setBtnStatus(false);
  }


  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);
    setBtnStatus(false);
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  return (
    <>
      <Header />
      <MainBanner />
      <SubBanner label="실시간 인기 프로그램" />
      <SubBanner label="슬퍼어어엉" />
      <SubBanner label="꾸에에에엑" />
      <SubBanner label="갈길이 멀어" />
      <TopButton BtnStatus={BtnStatus} handleTop={handleTop} />
      <Footer />
    </>
  )
}

export default withRouter(LandingPage);
