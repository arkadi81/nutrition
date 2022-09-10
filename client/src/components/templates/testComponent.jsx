import React from "react";

export default class TestComponent extends React.Component {
  // hooks and other methods

  componentDidUpdate() {
    // console.log("component did update fired");
  }

  componentDidMount() {
    // console.log("component did mount fired");
  }

  // methods here
  render() {
    return (
      <React.Fragment>
        <div class="sampleClass">
          <div>{this.props.testMessage}</div>
        </div>
      </React.Fragment>
    );
  }
}
