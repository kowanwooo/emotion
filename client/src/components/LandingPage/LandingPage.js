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

  const [EmotionContents, setEmotionContents] = useState([]);
  const [EmotionMsg, setEmotionMsg] = useState(null);


  
  

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
    getFear();
    getSurprised();
    getAngry();
    getSad();
    getNeutral();
    getHappy();
    getHate();
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

  const getFear = () =>{
    axios.post("/api/users/contents/emotion/getFear")
    .then((response) =>{
      if(response.data.success){
        if(localStorage.getItem("emotion").split('"')[1] === 'fear'){ //뿌려주기 테스트 
          setEmotionContents(response.data.fear);
          setEmotionMsg('공포 표정의 콘텐츠입니다.')
        }
      }else{
        console.log('콘텐츠 오류')
      }
    })
  }

  
  const getSurprised = () =>{
    axios.post("/api/users/contents/emotion/getSurprised")
    .then((response) =>{
      if(response.data.success){
        if(localStorage.getItem("emotion").split('"')[1] === 'surprised'){ //뿌려주기 테스트 
          setEmotionContents(response.data.surprised);
          setEmotionMsg('놀란 표정의 콘텐츠입니다.')
        }
      }else{
        console.log('콘텐츠 오류')
      }
    })
  }

  const getAngry = () =>{
    axios.post("/api/users/contents/emotion/getAngry")
    .then((response) =>{
      if(response.data.success){
        if(localStorage.getItem("emotion").split('"')[1] === 'angry'){ //뿌려주기 테스트 
          setEmotionContents(response.data.angry);
          setEmotionMsg('화난 표정의 콘텐츠입니다.')
        }
      }else{
        console.log('콘텐츠 오류')
      }
    })
  }

  const getSad = () =>{
    axios.post("/api/users/contents/emotion/getSad")
    .then((response) =>{
      if(response.data.success){
        if(localStorage.getItem("emotion").split('"')[1] === 'sad'){ //뿌려주기 테스트 
          setEmotionContents(response.data.sad);
          setEmotionMsg('슬픈 표정의 콘텐츠입니다.')
        }
      }else{
        console.log('콘텐츠 오류')
      }
    })
  }

  const getNeutral = () =>{
    axios.post("/api/users/contents/emotion/getNeutral")
    .then((response) =>{
      if(response.data.success){
        if(localStorage.getItem("emotion").split('"')[1] === 'neutral'){ //뿌려주기 테스트 
          setEmotionContents(response.data.neutral);
          setEmotionMsg('평범한 표정의 콘텐츠입니다.')
        }
      }else{
        console.log('콘텐츠 오류')
      }
    })
  }


  const getHappy = () =>{
    axios.post("/api/users/contents/emotion/getHappy")
    .then((response) =>{
      if(response.data.success){
        if(localStorage.getItem("emotion").split('"')[1] === 'happy'){ //뿌려주기 테스트 
          setEmotionContents(response.data.happy);
          setEmotionMsg('기쁜 표정의 콘텐츠입니다.')
        }
      }else{
        console.log('콘텐츠 오류')
      }
    })
  }

  const getHate = () =>{
    axios.post("/api/users/contents/emotion/getHate")
    .then((response) =>{
      if(response.data.success){
        if(localStorage.getItem("emotion").split('"')[1] === 'hate'){ //뿌려주기 테스트 
          setEmotionContents(response.data.hate);
          setEmotionMsg('혐오 표정의 콘텐츠입니다.')
        }
      }else{
        console.log('콘텐츠 오류')
      }
    })
  }



  return (
    <>
      <Header />
      <MainBanner />
      <SubBanner label={EmotionMsg} Contents={EmotionContents} />
      <SubBanner label="최신순"  Contents={Contents} />
      <SubBanner label="관객순" Contents={ContentsP} />
      <TopButton BtnStatus={BtnStatus} handleTop={handleTop} />
      <Footer />
    </>
  )

}

export default withRouter(LandingPage);
