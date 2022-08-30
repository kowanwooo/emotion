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
import axios from 'axios';



function LandingPage(props) {
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const [Contents, setContents] = useState([]);
  const [ContentsP, setContentsP] = useState([]);

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

  useEffect(() => {
    FetchContents();
    FetchContentsP();
  }, [])


  const FetchContents = () => {
    axios.post("/api/users/contents/getContents")
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.contents);
          setContents(response.data.contents);
        } else {
          alert("콘텐츠을 보여줄 수 없습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FetchContentsP = () => {
    axios.post("/api/users/contents/getContentsP")
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.contents);
          setContentsP(response.data.contents);
        } else {
          alert("콘텐츠을 보여줄 수 없습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <MainBanner />
      <SubBanner label="최신순" Contents={Contents} />
      <SubBanner label="관객순" Contents={ContentsP} />
      <TopButton BtnStatus={BtnStatus} handleTop={handleTop} />
      <Footer />
    </>
  )

}

export default withRouter(LandingPage);
