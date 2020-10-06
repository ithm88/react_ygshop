import React, { Component } from 'react'
import "./SearchCenter.scss"
import bjd from "../../assets/img/bjd.jpg"
//引入路由 axios mobile
import {NavBar,Icon,SearchBar} from "antd-mobile"
//引入axios
import myaxios from "../../utils/myaxios"
//引入路由
import {withRouter} from "react-router-dom"
class SearchCenter extends Component {
    state = {
        inputVal:"",
        productList:[
        ]
    }
    getProductList = (params) => {
        console.log("点击了取消")
        //点击后获取到inputVal输入框的值发请求
        myaxios.get("goods/qsearch",{
            params:{
                query:this.state.inputVal,
            },
        })
        .then((res)=>{
            console.log(res);
            this.setState({
                //这里是把通过关键字查询到的值,赋值给数组里面
                productList:res,
            })
        })
    }

    //点击进入商品详情并传参
    handleItemClick=(e) => {
        console.log(e.target)
        let good_id = e.target.getAttribute("data_goods_id");
        this.props.history.push("/goodDetail/"+good_id);
    }
    
    
    render() {
        return (
            <div className="yg-sc">
                <NavBar
                   className="yg-sc-nav"
                   mode="light"
                   icon={<Icon type="left" />}
                   onLeftClick={() => window.history.go(-1)}
                 >
                   搜索中心
                 </NavBar>
                 {/* 搜索中心输入框开始 */}
                 <SearchBar
                 maxLength="6"
                 cancelText="确定"
                  className="yg-sc-search"
                  //提示是搜索的意思
                  placeholder="Search"
                  //绑定输入框事件
                  value={this.state.inputVal}
                  //键盘按下提交事件
                //   onSubmit={value => console.log(value, 'onSubmit')}
                //   //清除的方法
                //   onClear={value => console.log(value, 'onClear')}
                //   //聚焦的方法
                //   onFocus={() => console.log('onFocus')}
                //   //失去焦点的方法
                //   onBlur={() => console.log('onBlur')}
                //onCancel 取消的意思
                  onCancel={() => this.getProductList()}
                  showCancelButton
                  //输入内容的时候触发
                  onChange={(value)=>{
                      console.log(value);
                      this.setState({
                          inputVal:value,
                      });
                  }}
                />
                {/* 搜索中心的输入框结束,产品列表开始 */}
                {/* 产品列表开始 */}
                <div className="yg-sc-list" onClick={this.handleItemClick}>
                  {this.state.productList.map((v)=>{
                      return (
                         <div className="yg-sc-list-con" key={v.goods_id} data_goods_id={v.goods_id}>
                             {/* 这是左边的图片 */}
                             <div className="yg-sc-list-img" data_goods_id={v.goods_id}>
                                 <img src={bjd}></img>
                             </div>
                             {/* 这是右边的文字 */}
                             <div className="yg-sc-list-item" data_goods_id={v.goods_id}>
                             {v.goods_name}
                            </div>
                         </div>
                      )
                  })}
                </div>
            </div>
        )
    }
}

export default withRouter(SearchCenter)
