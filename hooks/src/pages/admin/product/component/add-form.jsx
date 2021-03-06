import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";
const Item = Form.Item;
const { Option } = Select;
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  };
  componentWillMount() {
    // 将form对象通过setForm方法传递给父组件
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <label>分类名称</label>
        {getFieldDecorator("categoryName", {
          initialValue: "",
        })(<Input placeholder="请输入分类名称" />)}
      </Form>
    );
  }
}

export default Form.create()(AddForm);
