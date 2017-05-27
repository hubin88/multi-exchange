import React, { Component, PropTypes } from 'react';
import './css/main.scss'; // import global css style


export default class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.getUrlarguments();
  }
  getUrlarguments = () => {};
  render() {
    return (
      // App root node
      <div id="App">
        {this.props.children}
      </div>
    );
  }
}
