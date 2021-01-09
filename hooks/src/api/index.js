import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";

const BASE_URL = "";
export const reqLogin = (username, password) =>
  ajax(BASE_URL + "/login", { username, password }, "POST");

// 获取一级二级分类列表
export const reqCategorys = (parentId) =>
  ajax(BASE_URL + "/manage/category/list", { parentId });

// 添加分类
export const reqAddCategory = (categoryName, parentId) =>
  ajax(BASE_URL + "/manage/category/add", { categoryName, parentId }, "POST");

// 更新分类
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(
    BASE_URL + "/manage/category/update",
    { categoryId, categoryName },
    "POST"
  );

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE_URL + "/manage/product/list", {
    pageNum,
    pageSize,
  });

/* 
  搜索商品分页列表(根据商品名称/商品描述)
  搜索的类型
  */
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax(BASE_URL + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

// 上架下架
export const reqUpdateStatus = (productId, status) =>
  ajax(
    BASE_URL + "/manage/product/updateStatus",
    { productId, status },
    "POST"
  );

// 获取天气
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log("jsonp()", err, data);
      // 如果成功了
      if (!err && data.status === "success") {
        // 取出需要的数据
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });
      } else {
        // 如果失败了
        message.error("获取天气信息失败!");
      }
    });
  });
};
