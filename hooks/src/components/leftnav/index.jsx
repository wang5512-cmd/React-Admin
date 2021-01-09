import React, { useEffect, useState } from "react";
import { Menu, Icon, Button } from "antd";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;

function Index(props) {
  const pathname = props.location.pathname;
  let openKey;
  let menuNodes;
  // 根据menu的数据数组生成对应的标签数组
  const getMenuNodes_map = (menuList) => {
    return menuList.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };
  const getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        // 查找一个与当前请求路径匹配的子item
        const cItem = item.children.find((cItem) => cItem.key === pathname);
        // 如果存在说明当前item的子列表需要展开
        if (cItem) {
          openKey = item.key;
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };

  menuNodes = getMenuNodes(menuList);

  return (
    <div style={{ width: "100%" }}>
      <Menu
        selectedKeys={[pathname]}
        defaultOpenKeys={[openKey]}
        mode="inline"
        theme="dark"
      >
        {
          // getMenuNodes(menuList)
          menuNodes
        }
      </Menu>
    </div>
  );
}

export default withRouter(Index);
