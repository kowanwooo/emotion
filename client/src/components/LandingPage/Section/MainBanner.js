import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import './MainBanner.css';
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
        width: "100px",
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
        width: "100px",
        left: "50px",
        zIndex: "50"
      }}
      onClick={onClick}
    />
  );
}

const Div = styled.div`
  `;

const MainImg = styled.img`
      position: relative;
      width: 1240px;
      height: 508px;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
      display : inline;
      margin : auto;
  `;

const H2 = styled.h2`
  `

export class MainBanner extends Component {
  render() {

    const settings = {
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      dotsClass: "dots_css", // 목록 버튼 css 설정 하기위한 필요요소
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 3000,
      cssEase: "linear",

    };

    return (
      <div className='main__banner'>
        <div className='movieBox'>
          <Slider {...settings}>
            <Div>
              <MainImg src="https://img.wavve.com/banner/pooq/2022/imgbuild_20220722_153329846.png" />
            </Div>
            <Div>
              <MainImg src="https://img.wavve.com/banner/pooq/2022/imgbuild_20220722_153329846.png" />
            </Div>
            <Div>
              <MainImg src="https://img.wavve.com/banner/pooq/2022/imgbuild_20220722_153329846.png" />
            </Div>
          </Slider>
        </div>
      </div>
    );
  }
}

export default withRouter(MainBanner);