import React, { useState } from 'react'
import landingStyle from '../LandingPage/LandingPage.module.css';
import boardStyle from './BoardPage.module.css';
import './Editor.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'html-react-parser';

function BoardPage() {

    const [boardTitle, setBoardTitle] = useState({
        title: '',
        content: ''
    })

    const [viewContent, setViewContent] = useState([]);

    const getValue = e => {
        const { name, value } = e.target;
        setBoardTitle({
            ...boardTitle,
            [name]: value
        })
        console.log(boardTitle);
    };

    return (

        <div style={{ textAlign: "center" }}>
            <nav className={landingStyle.navbar}>
                <ul className={landingStyle.navbar_menu}>
                    <li className={landingStyle.nav_item}>영화</li>
                    <li className={landingStyle.nav_item}>음악</li>
                    <li className={landingStyle.nav_item}>책</li>
                    <button className={`${landingStyle.landing_btn} ${landingStyle.z5}`} >
                        로그아웃
                    </button>
                    <button className={`${landingStyle.landing_btn} ${landingStyle.z5}`} >
                        마이페이지
                    </button>
                </ul>
            </nav>

            {viewContent.map((element, item) =>
                <div key={item}>
                    <h2>{element.title}</h2>
                    <div key={item}>
                        {ReactHtmlParser(element.content)}
                    </div>
                </div>
            )}

            <h1>게시판</h1>

            <div className={boardStyle.form_wrapper}>
                <span>제목 : </span>
                <input className={boardStyle.title_input}
                    type='text'
                    placeholder='제목'
                    onChange={getValue}
                    name='title' />
            </div>
            <CkeEditor getValue={getValue} boardTitle={boardTitle} setBoardTitle={setBoardTitle} ></CkeEditor>
            <button className="btn btn-primary btn-lg" onClick={() => {
                setViewContent(viewContent.concat({ ...boardTitle }));
            }}>제출</button>
        </div >
    )
}

function CkeEditor({ getValue, boardTitle, setBoardTitle }) {

    return (
        <div className='editorWidth'>
            <CKEditor
                editor={ClassicEditor}
                config={{ placeholder: "Placeholder text..." }}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();

                    setBoardTitle({
                        ...boardTitle,
                        content: data
                    })
                    console.log(boardTitle);
                }}


            />
        </div>
    )
}

export default BoardPage