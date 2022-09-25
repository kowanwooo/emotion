import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner/Spinner';

import { mapExpressionToEmoji } from '../../../../helpers/emojis';

import './Results.css';



const Results = ({ results, processing, photoMode }) => {

  useEffect(() => {


  }, [])

  const goMain = () => {
    window.location.href = '/login'
  }


  const setEmotion = () => {
    const emotion = results[0].expressions.asSortedArray()[0].expression;
    const age = Math.round(results[0].age);
    const gender = results[0].gender;
    console.log(emotion, age, gender);
    window.localStorage.setItem("emotion", JSON.stringify([emotion, age, gender]));
  }
  if (processing && results) {
    return <Spinner />;
  }
  if (!processing && results && results.length > 0) {
    return (
      <div className="results">
        {results.length > 1 ? (
          <div>
            <p>I think!!!</p>
            {results.map((result, i) => (
              <div className="results__wrapper" key={i}>
                <div style={{ width: '300px' }}>
                  <p>
                    One of you is probably {result.gender}, is looking {result.expressions.asSortedArray()[0].expression} and looks around{' '}
                    {Math.round(result.age)}
                  </p>
                </div>
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.expressions.asSortedArray()[0].expression)} size="4x" />
                <FontAwesomeIcon icon={mapExpressionToEmoji(result.gender)} size="4x" />
              </div>
            ))}
          </div>
        ) : (
          <div className="results__wrapper">
            <div>
              <p>I think...</p>
              <p>You look {results[0].expressions.asSortedArray()[0].expression}</p>
              <p>You seem to be {Math.round(results[0].age)} years old</p>
              <p>I think you are a {results[0].gender}</p>
              <div className='finalEmotion_btn'>
                <button onClick={() => {
                  setEmotion();
                  alert(`감정인식이 완료 되었습니다. 당신은 ${localStorage.getItem('emotion').split('"')[1]} 상태 입니다.`)
                  goMain()
                }}><p>Set Emotion</p></button>
              </div>

            </div>
            <div className="results__emoji">
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].expressions.asSortedArray()[0].expression)} size="3x" />
              <FontAwesomeIcon icon={mapExpressionToEmoji(results[0].gender)} size="3x" />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="results">
        <Spinner />
      </div>
    );
  }
};

export default Results;
