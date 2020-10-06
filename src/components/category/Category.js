import React, { Component } from 'react'
//引入antd-mobile
import {NavBar} from "antd-mobile";
//引入searchinput 组件  
import SearchInput from "../searchInput/SearchInput"
//引入样式
import "./Category.scss"
//引入路由
import {withRouter} from "react-router-dom"
//引入axios请求
import myaxios from "../../utils/myaxios"
class Category extends Component {
    //这里定义状态接收
    state = {
        categories: [], 
        categories_content: [], 
        select_index:0, 
    }


    //这个是点击分类
    handleItemClick = (e) => {
        //获取点击选中的项
        let select_index = e.target.getAttribute("data-index");
        console.log(select_index)
        this.setState({
            select_index:parseInt(select_index),
            //这个是点击拿到的下标赋值给中间内容遍历
            categories_content: this.state.categories[select_index].children,
        })
    }

    //这个是点击图片加标题进入详情
    handleProductItemClick = (e) => {
        console.log("点击图片进来了")
        let cid = e.target.getAttribute("data-index");
        console.log(this.props);
        console.log(cid);
        this.props.history.push("/goodList/?cid="+cid)
    }
    
    
    
// 获取分类菜单的数据
getCategories = (params) => {
    myaxios
      .get("categories")
      .then((res) => {
          console.log(res)
        this.setCategories(res);
      })
      .catch((err) => { 
        console.log(err);
      });
  };
  // 设置分类菜单的数据
  // is_storaged 代表是否之前已经缓存过
  setCategories = (res, is_storaged) => {
    //缓存请求的数据
    let categories_cache = {};
    if (is_storaged) {
      // 直接获取本地缓存中的数据即可
      categories_cache = JSON.parse(localStorage.getItem("categories_cache"));
    } else {
      categories_cache = { date: Date.now(), categories: res };
    }
    // 缓存到本地中
    localStorage.setItem("categories_cache", JSON.stringify(categories_cache));
    this.setState({
      categories: res,
      categories_content: res[0].children,
    });
  };

  componentDidMount() {
      console.log(this.state.categories)
      console.log(this.state.categories_content)
      console.log(this.state.select_index)
    // https://www.linweiqin.cn/api/public/v1/categories
    // 进来的时候 先判断本地缓存是否过期
    // 如果没有过期的情况下 直接获取本地的缓存
    let categories_cache = localStorage.getItem("categories_cache");
    // 如果本地缓存不会空
    if (categories_cache) {
      // 判断本地缓存是否过期
      // 当前时间
      let current_time = Date.now();
      // 存储的时间
      let storage_time = JSON.parse(categories_cache).date;
      if (current_time - storage_time > 60 * 60 * 1000) {
        // 一小时过期
        this.getCategories();
      } else {
        // 缓存没有过期
        // 第二个参数 代表是否已经缓存
        this.setCategories(JSON.parse(categories_cache).categories, true);
      }
    } else {
      this.getCategories();
    }
  }

    render() {
        return (
            <div className="yg-index">
                {/* 首页导航条开始 */}
                <div className="yg-index-nav">
                  <NavBar className="index-nav">优购商城</NavBar>
                </div>
                {/* 首页导航条结束 */}
                {/* 首页搜索框开始 */}
                <div className="yg-index-search">
                  <SearchInput></SearchInput>
                </div>
                {/* 中间内容开始 */}
                <div className="yg-category-content">
                    {/* 左边内容列表 */}
                    <div className="content-left">
                        {/* title List 利用冒泡机制点击事件*/}
                        <div className="content-left-title" onClick={this.handleItemClick}>
                            {this.state.categories.map((v,index)=>{
                                return (
                                <div 
                                data-index={index}
                                className={
                                this.state.select_index === index
                                ? "active title-item" 
                                : "title-item"}
                                key={v.cat_id}>
                                {v.cat_name}
                                </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 右边的内容 */}
                    <div className="content-right">
                        {/* titlecategorylist */}
                        <div className="content-right-category">
                            {/* 遍历右边的标题 */}
                            {this.state.categories_content.map((v,i)=>{
                                return (
                                    <div className="content-right-title" key={v.cat_id}>
                                        {/* 二级菜单开始 */}
                                        <div className="content-right-title-item">
                                            {"/"}
                                            {v.cat_name}
                                            {"/"}
                                        </div>
                                         {/* 二级菜单结束 */}
                                        {/* 产品的列表开始 */}
                                     <div 
                                     className="product-list"
                                     onClick={this.handleProductItemClick}
                                     >
                                        {v.children&&v.children.map((v)=>{
                                            return (
                                              <div
                                                key={v.cat_id}
                                                className="product-list-item"
                                                onClick={this.handleClick}
                                              >
                                                  {/* 图片 */}
                                                  <div className="imagerWrapper"
                                                  >
                                                    <img
                                                    src={v.cat_icon}
                                                    alt=""
                                                    data-index={v.cat_id}
                                                    
                                                    >
                                                    </img>
                                                  </div>
                                                  {/* 描述 */}
                                            <div 
                                            data-index={v.cat_id}
                                            className="item-title">{v.cat_name}</div>
                                              </div>
                                            )
                                        })}
                                     </div>
                                    </div>
                                    
                                    
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* 中间内容结束 */}
            </div>
        )
    }
}

export default withRouter(Category)
