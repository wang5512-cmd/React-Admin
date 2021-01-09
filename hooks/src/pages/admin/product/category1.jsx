import React, { useEffect, useState } from "react";
import { Card, Button, Icon, Table, Modal } from "antd";
import { reqCategorys, reqUpdateCategory } from "../../../api";
import AddForm from "./component/AddForm";
import UpdateForm from "./component/UpdateForm";
function Category(props) {
  var myform;
  const columns = [
    {
      title: "分类名字",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      render: (category) => (
        <div>
          {parentId == "0" ? (
            <span onClick={() => getSubcategorys(category)}>查看子分类</span>
          ) : null}
          <span onClick={() => showUpdateModal(category)}>修改分类</span>
        </div>
      ),
    },
  ];

  const getSubcategorys = (category) => {
    setParentId(category._id);
    setTitle(
      <span>
        <span
          onClick={() => {
            setParentId("0");
            reqCategorys("0").then((res) => {
              setCategorys(res.data.data);
              setTitle("一级分类");
            });
          }}
        >
          一级分类
        </span>
        -----
        <span>{category.name}</span>
      </span>
    );
  };
  const [categorys, setCategorys] = useState([]);
  const [subcategorys, setSubcategorys] = useState([]);
  const [title, setTitle] = useState("一级分类");
  const [parentId, setParentId] = useState("0");
  const [category, setCategory] = useState({});

  // 弹框
  const [showStatus, setShowstatus] = useState(0);
  useEffect(() => {
    reqCategorys(parentId).then((res) => {
      if (parentId == "0") {
        setCategorys(res.data.data);
      } else {
        setSubcategorys(res.data.data);
      }
    });
  }, [parentId]);
  // 显示添加弹框
  const showAddModal = () => {
    setShowstatus(1);
  };
  // 显示修改弹框
  const showUpdateModal = (category) => {
    setCategory(category);
    setShowstatus(2);
  };
  // 关闭弹框
  const handleCancel = () => {
    setShowstatus(0);
  };
  // 添加分类
  const addCategory = () => {};
  // 修改分类
  const updateCategory = () => {
    // 关闭弹框
    setShowstatus(0);
    // 发请求
    const categoryId = category._id;
    const categoryName = myform.getFieldValue("categoryName");
    reqUpdateCategory({ categoryId, categoryName }).then((res) => {
      if (res.data.status == 0) {
        setParentId("0");
        reqCategorys("0").then((result) => {
          setCategorys(result.data.data);
        });
      }
    });
  };
  const extra = (
    <Button type="primary" onClick={showAddModal}>
      <Icon type="plus" />
      添加
    </Button>
  );
  return (
    <Card title={title} extra={extra}>
      <Table
        dataSource={parentId == "0" ? categorys : subcategorys}
        rowKey="_id"
        columns={columns}
      />
      <Modal
        title="添加"
        visible={showStatus == 1}
        onCancel={handleCancel}
        onOk={addCategory}
      >
        <AddForm />
      </Modal>
      <Modal
        title="修改"
        visible={showStatus == 2}
        onCancel={handleCancel}
        onOk={updateCategory}
      >
        <UpdateForm
          categoryName={category.name}
          setForm={(form) => (myform = form)}
        />
      </Modal>
    </Card>
  );
}

export default Category;
