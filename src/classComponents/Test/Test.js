import React from "react";
import { ReactDOM } from "react";

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: "world" };
  }

  componentWillMount() {
    console.log("componentWillMount()");
  }

  componentDidMount() {
    console.log("componentDidMount()");
  }

  changeState() {
    this.setState({ hello: "Vishal" });
  }

  render() {
    return (
      <div>
        <h1>Geeks.org{this.state.hello}</h1>
        <button onClick={this.changeState.bind(this)}>Change State</button>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate()");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate()");
  }
}

// ReactDOM.render(<Test/>,document.getElementById("root"))
