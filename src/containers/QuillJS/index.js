import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class QuillJS extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>QuillJS</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="bg-secondary p-5">
              <div className="bg-white">
                <ReactQuill
                  value={this.state.text}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuillJS;
