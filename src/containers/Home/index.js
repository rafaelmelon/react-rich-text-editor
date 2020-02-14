import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="container mt-5">
    <div className="row mb-5">
      <div className="col">
        <div className="d-flex justify-content-center">
          <h1>draft-js / quill-js / ckeditor-js / slate-js</h1>
        </div>
      </div>
    </div>
    <div className="row justify-content-md-center mb-5">
      <div className="col col-lg-2"></div>
      <div className="col-md-auto">
        <div className="d-flex justify-content-center">
          <Link to="/draft-js">draft-js</Link>
        </div>
      </div>
      <div className="col-md-auto">
        <div className="d-flex justify-content-center">
          <Link to="/quill-js">quill-js</Link>
        </div>
      </div>
      <div className="col-md-auto">
        <div className="d-flex justify-content-center">
          <Link to="/ckeditor-js">ckeditor-js</Link>
        </div>
      </div>
      <div className="col-md-auto">
        <div className="d-flex justify-content-center">
          <Link to="/slate-js">slate-js</Link>
        </div>
      </div>
      <div className="col col-lg-2"></div>
    </div>
    <div className="row">
      <div className="col">
        <div className="d-flex justify-content-center">
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/rafaelmelon/react-rich-text-editor"
              target="__blank"
            >
              https://github.com/rafaelmelon/react-rich-text-editor
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
