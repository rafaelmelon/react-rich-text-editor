import React from "react";
import { Route, Switch } from "react-router-dom";

import { Navbar } from "../components";
import { Home, DraftJS, QuillJS, CKEditorJS, SlateJS } from "../containers";

const Routes = () => (
  <>
    {/* <Navbar /> */}
    <Switch>
      <Route exact={true} path="/" component={DraftJS} />
      {/* <Route path="/draft-js" component={DraftJS} />
      <Route path="/quill-js" component={QuillJS} />
      <Route path="/ckeditor-js" component={CKEditorJS} />
      <Route path="/slate-js" component={SlateJS} /> */}
    </Switch>
  </>
);

export default Routes;
