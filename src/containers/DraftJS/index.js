import React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  CompositeDecorator,
  Entity,
  convertToRaw
} from "draft-js";

import { BlockStyleControls, InlineStyleControls, Link } from "./components";
import { getBlockStyle, styleMap, styles, findLinkEntities } from "./utils";

import "./draft-js.css";

class DraftJS extends React.Component {
  constructor(props) {
    super(props);

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showURLInput: false,
      urlValue: "",
      isReadOnly: false
    };
    this.editor = React.createRef();
    this.url = React.createRef();
  }

  focus = () => this.editor.current.focus();

  onChange = editorState => {
    this.setState({ editorState });
  };

  promptForLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState(
        {
          showURLInput: true,
          urlValue: url
        },
        () => {
          setTimeout(() => this.url.current.focus(), 0);
        }
      );
    }
  };

  removeLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  };

  toggleBlockType = blockType => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  onURLChange = e => this.setState({ urlValue: e.target.value });

  onLinkInputKeyDown = e => {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  };

  confirmLink = e => {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.setState(
      {
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        showURLInput: false,
        urlValue: ""
      },
      () => {
        setTimeout(() => this.editor.current.focus(), 0);
      }
    );
  };

  onReadOnly = () => {
    const { editorState, showURLInput, urlValue, isReadOnly } = this.state;
    this.setState({
      isReadOnly: !isReadOnly
    });
  };

  render() {
    const { editorState, showURLInput, urlValue, isReadOnly } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>DraftJS</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="bg-secondary p-5">
              <div className="bg-white">
                <div className="RichEditor-root">
                  <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                  />
                  <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                  />
                  <div className="RichEditor-controls">
                    <button
                      className="RichEditor-button"
                      onMouseDown={this.promptForLink}
                      style={{ marginRight: 10 }}
                    >
                      Add Link
                    </button>
                    <button
                      className="RichEditor-button"
                      onMouseDown={this.removeLink}
                      style={{ marginRight: 10 }}
                    >
                      Remove Link
                    </button>
                    <button
                      className={`RichEditor-readOnlyButton${
                        !isReadOnly ? "" : "-active"
                      }`}
                      onMouseDown={this.onReadOnly}
                    >
                      {!isReadOnly ? "Editable" : "Blocked"}
                    </button>
                  </div>
                  {showURLInput && (
                    <div style={styles.urlInputContainer}>
                      <input
                        onChange={this.onURLChange}
                        ref={this.url}
                        style={styles.urlInput}
                        type="text"
                        value={urlValue}
                        onKeyDown={this.onLinkInputKeyDown}
                      />
                      <button
                        className="RichEditor-button"
                        onMouseDown={this.confirmLink}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                  <div className={className} onClick={this.focus}>
                    <Editor
                      blockStyleFn={getBlockStyle}
                      customStyleMap={styleMap}
                      editorState={editorState}
                      onChange={this.onChange}
                      placeholder="Enter some text..."
                      ref={this.editor}
                      readOnly={isReadOnly}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DraftJS;
