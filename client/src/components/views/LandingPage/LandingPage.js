import React, { useEffect, useState, Component } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Slider from 'react-slick';
import styled from 'styled-components';
import './LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "blue",
        width: "100px",
        right: "50px"
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "blue",
        width: "100px",
        left: "50px",
        float: "right",
        zIndex: "50"
      }}
      onClick={onClick}
    />
  );
}

const Div = styled.div`
    position: relative;
    width: 1240px;
    height: 508px;
    float: left;
    // margin: 0 10px;
    text-align : center;
`;

const Img = styled.img`
    position: relative;
    width: 50%;
    height: 80%;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
    display : block;
    margin : auto;
    

`;

export class Movie extends Component {
  render() {
    const settings = {
      // dots: true,
      // infinite: true,
      // slidesToShow: 3,
      // slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,

      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 3000,
      cssEase: "linear",

    };


    return (
      <div className='main__banner'>
        <div className='movieBox'>
          <Slider {...settings}>
            <Div><h2>프로필이닥!!!</h2>
              <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwlwpcNbe1iEk_Qm31HtSFoKvmcE0wjH3rjOThQ6FXYks0pEczq6J4QL00VcSj3OySf5s&usqp=CAU" />
            </Div>
            <Div><h2>프로필이닥!!!</h2>
              <Img src="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200" />
            </Div>
            <Div><h2>프로필이닥!!!</h2>
              <Img src="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200" />
            </Div>
            <Div><h2>dddd</h2>
            </Div>
          </Slider>
        </div>
      </div>
    );
  }
}





function LandingPage(props) {
  return (
    <>
      <Header />
      <div id='movie__name'>
        <h1>기분이 우울할때 보면 좋아</h1>
      </div>
      <Movie />

    </>
  )
}

export default withRouter(LandingPage);
