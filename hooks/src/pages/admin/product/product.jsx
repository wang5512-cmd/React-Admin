import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./child/home";
import ProductAddUpdate from "./child/add-update";
import ProductDetail from "./child/detail";
import './product.less'


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        <Route exact path="/product" component={ProductHome} />
        <Route path="/product/addupdate" component={ProductAddUpdate} />
        <Route path="/product/detail" component={ProductDetail} />
        <Redirect to="/product" />
      </Switch>
    );
  }
}

export default Product;
