import React, { Component } from "react";
import { Card, Table, Button, Icon, Modal } from "antd";
import { reqCategorys, reqUpdateCategory, reqAddCategory } from "../../../api";
import AddForm from "./component/add-form";
import UpdateForm from "./component/update-form";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [], //一级分类列表
      showStatus: 0, // 0不显示 1显示添加 2显示更新
    };
  }
  // 组件将要更新
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  // 组件挂载后发送ajax请求
  componentDidMount() {
    this.getCategorys();
  }
  /*初始化table所有的列数*/
  initColumns = () => {
    this.columns = [
      {
        title: "分类名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        render: (category) => (
          <span onClick={() => this.showupdateModal(category)}>修改分类</span>
        ),
      },
    ];
  };
  getCategorys = async () => {
    const result = await reqCategorys();
    if (result.data.status == 0) {
      const categorys = result.data.data;
      this.setState({
        categorys,
      });
    }
  };
  // 显示添加弹框
  showaddModal = () => {
    this.setState({
      showStatus: 1,
    });
  };
  // 显示修改弹框
  showupdateModal = (category) => {
    // 保存分类对象
    this.category = category;
    this.setState({
      showStatus: 2,
    });
  };
  // 响应点击取消确认框
  handleCancel = () => {
    this.setState({
      showStatus: 0,
    });
  };
  // 添加分类
  addCategory = async () => {
    // 1隐藏确定按钮
    this.setState({
      showStatus: 0,
    });
    // 准备数据
    const categoryName = this.form.getFieldValue("categoryName");
    // 2 发请求更新分类
    const result = await reqAddCategory(categoryName, "0");
    console.log(222, result);
    if (result.data.status === 0) {
      // 3 重新显示列表
      this.getCategorys("0");
    }
  };
  // 更新分类
  updateCategory = async () => {
    // 1隐藏确定按钮
    this.setState({
      showStatus: 0,
    });
    // 准备数据
    const categoryId = this.category._id;
    const categoryName = this.form.getFieldValue("categoryName");
    // 2 发请求更新分类
    const result = await reqUpdateCategory({ categoryId, categoryName });
    console.log(111, result);
    if (result.data.status === 0) {
      // 3 重新显示列表
      this.getCategorys("0");
    }
  };
  render() {
    const { categorys, showStatus } = this.state;
    // 读取指定分类
    const category = this.category || {}; //刚开始是没有的
    const title = <span>分类</span>;
    const extra = (
      <Button type="primary" onClick={this.showaddModal}>
        <Icon type="plus" />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          rowKey="_id"
          dataSource={categorys}
          columns={this.columns}
          pagination={{
            defaultCurrent: "1",
            defaultPageSize: "3",
            showQuickJumper: true,
          }}
        />
        <Modal
          title="添加分类"
          visible={showStatus == 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            setForm={(form) => {
              this.form = form;
            }}
          ></AddForm>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus == 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.form = form;
            }}
          ></UpdateForm>
        </Modal>
      </Card>
    );
  }
}

export default Category;
