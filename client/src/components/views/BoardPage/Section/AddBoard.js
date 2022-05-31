import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './AddBoard.css';
import ReactHtmlParser from 'html-react-parser';

function AddBoard(props) {
  return (
    <div className='BoardBox' key={props.id}>
      <div className='BoardUser'>
        <span style={{ display: 'flex' }}>
          <div>{props.writer}</div>
        </span>
      </div>
      <Link to={`/board/${props.id}`}>
        <div className='BoardTitle' >{props.title}</div>
        <div className='BoardContent'>{ReactHtmlParser(props.content)}</div>
      </Link>
    </div>
  )
}

export default withRouter(AddBoard);
