import React from "react";

import { styles } from "../../utils";

const Link = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link} target="_blank">
      {props.children}
    </a>
  );
};

export default Link;
