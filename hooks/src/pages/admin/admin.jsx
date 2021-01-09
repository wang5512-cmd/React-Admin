import React, { useEffect } from "react";
import StoreUtils from "../../utils/storeUtils";
import { Layout } from "antd";
import LeftNav from "../../components/leftnav";
import Header from "../../components/header";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./home/home";
import Product from "./product/product";
import Category from "./product/category";
import Role from "./role/role";
import User from "./user/user";
import Line from "./charts/line";
import Bar from "./charts/bar";
import Pie from "./charts/pie";
const { Footer, Sider, Content } = Layout;
function Admin(props) {
  useEffect(() => {
    const user = StoreUtils.getUser();
    if (!user || !user._id) {
      props.history.push("/login");
    }
  }, []);
  return (
    <Layout style={{ height: "100%" }}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: "20px", background: "#fff" }}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/product" component={Product} />
            <Route path="/category" component={Category} />
            <Route path="/role" component={Role} />
            <Route path="/user" component={User} />
            <Route path="/charts/line" component={Line} />
            <Route path="/charts/bar" component={Bar} />
            <Route path="/charts/pie" component={Pie} />
            <Redirect to="/home" />
          </Switch>
        </Content>
        <Footer
          style={{ height: "60px", lineHeight: "60px", textAlign: "center" }}
        >
          Footer
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Admin;
