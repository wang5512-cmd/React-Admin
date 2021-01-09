import React, { useEffect, useState } from "react";
import Header from "./header/index";
import "./login.css";
import { Form, Icon, Input, Button, message } from "antd";
import { reqLogin } from "../../api";
import StoreUtils from "../../utils/storeUtils";
function Login(props) {
  const { getFieldDecorator } = props.form;
  useEffect(() => {
    const user = StoreUtils.getUser();
    if (user && user._id) {
      props.history.replace("/");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { username, password } = values;
        reqLogin(username, password).then((res) => {
          console.log(res);
          StoreUtils.saveUser(res.data.data);
          message.success("登陆成功");
          props.history.replace("/");
        });
      }
    });
  };

  return (
    <div className="login">
      <Header />
      <div className="login-content">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "请输入用户名" },
                { min: 4, message: "用户名最少4位" },
                { max: 8, message: "用户名最多8位" },
              ],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "请输入密码" },
                { min: 4, message: "密码最少4位" },
                { max: 8, message: "密码最多8位" },
                {
                  pattern: /^[0-9a-zA-Z_]+$/,
                  message: "密码必须是字母数字下划线",
                },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Form.create()(Login);
