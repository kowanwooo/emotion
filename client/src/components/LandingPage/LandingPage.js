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
import postArray from '../Variable/variable';
import LoadingPage from '../Common/LoadingPage/LoadingPage';



function LandingPage(props) {

  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  const [Contents, setContents] = useState([]);
  const [ContentsP, setContentsP] = useState([]);
  const [ContentsKorea, setContentsKorea] = useState([]);
  const [ContentsAmerica, setContentsAmerica] = useState([]);
  const [ContentsAction, setContentsAction] = useState([]);
  const [ContentsRandom, setContentsRandom] = useState([]);
  const [ContentsHappy, setContentsHappy] = useState([]);
  const [ContentsAnger, setContentsAnger] = useState([]);
  const [ContentsSadness, setContentsSadness] = useState([]);
  const [EmotionState, setEmotionState] = useState(localStorage.getItem("emotion").split('"')[1]);
  const [EmotionContents, setEmotionContents] = useState([]);
  const [EmotionMsg, setEmotionMsg] = useState(null);
  const [loading, setLoading] = useState(true);





  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    ScrollY > 100 ? setBtnStatus(true) : setBtnStatus(false);
  }


  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
  }

  useEffect(()=>{
      setTimeout(() => {
        setLoading(false);
    }, 1000);
  },[])


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
    FetchEmotionContents();
    FetchContentsKorea();
    FetchContentsAmerica();
    FetchContentsAction();
    FetchContentsRandom();
    FetchContentsHappy();
    FetchContentsAnger();
    FetchContentsSadness();

  }, [])

  const FetchContents = () => {
    axios.post("/api/users/contents/getContents")
      .then((response) => {
        if (response.data.success) {
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
          setContentsP(response.data.contents);
        } else {
          alert("콘텐츠을 보여줄 수 없습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FetchContentsAmerica = () => {
    axios.post("/api/users/contents/America").then((response) => {
      if (response.data.success) {
        setContentsAmerica(response.data.contents);
      } else {
        console.log("콘텐츠 오류");
      }
    });
  };
  const FetchEmotionContents = () => {
    axios
      .post(`/api/users/contents/emotion/${EmotionState}`)
      .then((response) => {
        if (response.data.success) {
          setEmotionState(localStorage.getItem("emotion").split('"')[1]);
          setEmotionContents(response.data.contents);
          setEmotionMsg(response.data.State);
        } else {
          console.log("콘텐츠 오류");
        }
      });
  };

  const FetchContentsKorea = () => {
    axios.post("/api/users/contents/Korea").then((response) => {
      if (response.data.success) {

        setContentsKorea(response.data.contents);
      } else {
        console.log("콘텐츠 오류");
      }
    });
  };
  const FetchContentsAction = () => {
    axios.post("/api/users/contents/Action").then((response) => {
      if (response.data.success) {
        setContentsAction(response.data.contents);
      } else {
        console.log("콘텐츠 오류");
      }
    });
  };
  const FetchContentsHappy = () => {
    axios.post("/api/users/contents/Happy").then((response) => {
      if (response.data.success) {
        setContentsHappy(response.data.contents);
      } else {
        console.log("콘텐츠 오류");
      }
    });
  };
  const FetchContentsAnger = () => {
    axios.post("/api/users/contents/Anger").then((response) => {
      if (response.data.success) {
        setContentsAnger(response.data.contents);
      } else {
        console.log("콘텐츠 오류");
      }
    });
  };
  const FetchContentsSadness = () => {
    axios.post("/api/users/contents/Sadness").then((response) => {
      if (response.data.success) {
        setContentsSadness(response.data.contents);
      } else {
        console.log("콘텐츠 오류");
      }
    });
  };
  const FetchContentsRandom = () => {
    axios.post("/api/users/contents/Random").then((response) => {
      if (response.data.success) {
        setContentsRandom(response.data.contents);
      } else {
        console.log("콘텐츠 오류");
      }
    });
  };




  return loading ? (<LoadingPage/>) : (
    <>
      <Header />
      <MainBanner />
      <SubBanner label={`${EmotionMsg}의 감정 이신가요?`} Contents={EmotionContents} more={`/more/${EmotionState}`} moreText={"더보기"} /> 
      <SubBanner label="최신순" Contents={Contents} more={`/more/latestorder`} moreText={"더보기"} />
      <SubBanner label="관객순" Contents={ContentsP} more={`/more/manyspectators`} moreText={"더보기"} />
      <SubBanner label="한국영화" Contents={ContentsKorea} more={`/more/korea`} moreText={"더보기"} />
      <SubBanner label="외국영화" Contents={ContentsAmerica} more={`/more/fcountry`} moreText={"더보기"} />
      <SubBanner label="장르 : 액션" Contents={ContentsAction} more={`/more/action`} moreText={"더보기"} />
      <SubBanner label="감정 : 행복" Contents={ContentsHappy} more={`/more/happy`} moreText={"더보기"} />
      <SubBanner label="감정 : 슬픔" Contents={ContentsSadness} more={`/more/sad`} moreText={"더보기"} />
      <SubBanner label="감정 : 분노" Contents={ContentsAnger} more={`/more/angry`} moreText={"더보기"} />
      <TopButton BtnStatus={BtnStatus} handleTop={handleTop} />
      <Footer />
    </>
  )

}

export default withRouter(LandingPage);
