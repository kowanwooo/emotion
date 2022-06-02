import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CkeEditor.css';

function CkeEditor({ getValue, inputs, setInput }) {

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

                    setInput({
                        ...inputs,
                        boardContent: data
                    })
                    console.log(inputs);
                }}

            />
        </div>
    )
}

export default CkeEditor;