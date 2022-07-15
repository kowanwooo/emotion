import React, { useEffect, useState, Component } from 'react'
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';
import Slider from 'react-slick';
import styled from 'styled-components';
import './LandingPage.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       />
//     );
//   }
  
//   function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       />
//     );
//   }

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
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />

        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };


      return (
        <div className='main__banner'>
            <div className='movieBox'>
                <Slider {...settings}>
                    <Div>프로필이닥!!!
                        <Img src ="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200"/>
                    </Div>
                    <Div>프로필이닥!!!
                        <Img src ="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200"/>
                    </Div>
                    <Div>프로필이닥!!!
                        <Img src ="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200"/>
                    </Div>
                    <Div>1</Div>
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
            <div id = 'movie__name'>
                <h1>기분이 우울할때 보면 좋아</h1>
            </div>
            <Movie/>
            <h1>메인 넣을공간</h1>
            <h1>메인 넣을공간</h1>
            <h1>메인 넣을공간</h1>
            <h1>메인 넣을공간</h1>

        </>
    )
}

export default withRouter(LandingPage);
