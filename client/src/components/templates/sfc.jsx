import React from "react";

const TestComponent = () => {
  // hooks and other methods
  
  useEffect(() => {
    // Update the document title using the browser API
    // console.log("suggestion array changed");
  }, []);
  }

  // methods here
  render() {
    return (
      <React.Fragment>
        <div className="sampleClass">
          <div><h1>SFC Component Here!</h1></div>
        </div>
      </React.Fragment>
    );
  }

  export default TestComponent;