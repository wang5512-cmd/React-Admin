import Header from "antd/lib/calendar/Header";
import React, { Component } from "react";
import "./header.css";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <header className="header">我是头部</header>;
  }
}

export default Index;
