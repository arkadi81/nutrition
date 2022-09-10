import React from "react";

export default class ReactComponent extends React.Component {
  state = {};

  // hooks and other methods

  componentDidUpdate() {
    // console.log("component did update fired");
  }

  componentDidMount() {
    // console.log("component did mount fired");
  }

  // methods here

  init = () => {
    // do stuff here
  };

  render() {
    return (
      <React.Fragment>
        <div class="sampleClass"></div>
      </React.Fragment>
    );
  }
}
