import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class CKEditorJS extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>CKEditor</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="bg-secondary p-5">
              <div className="bg-white">
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Hello from CKEditor 5!</p>"
                  onInit={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                  }}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CKEditorJS;
