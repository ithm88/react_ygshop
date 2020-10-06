import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import "./Pay.scss";
import axios from "axios";
import QRCode from "qrcode.react";
import payImg from "../../assets/img/pay.jpg"
export default class Pay extends Component {
  state = {
    carts: [],
    totalPrice: 0,
    sum: 0, // 去支付的商品数量
    addressObj: {
        address:1
    },
    qrUrl:""

    /*    
        address	是	string	详细地址
        address_name	是	string	收件人
        address_mobile	是	string	联系方式
        oauth_token	是	string	登录凭证(放在拦截器中)*/
  };
  //二维码
  //    weixin://wxpay/bizpayurl?pr=wgBMBOi00
    /* 
    react前端生成二维码
    安装组件：

    npm install qrcode.react --save　　
    引入组件：

    import QRCode  from 'qrcode.react';
    调用方式：

    <QRCode
          value={this.state.qrUrl}  //value参数为生成二维码的链接
          size={200} //二维码的宽高尺寸
          fgColor="#000000"  //二维码的颜色
     />
     */
    handleClear = (params) => {
        console.log("竟来了")
        let qrUrl = ""
        this.setState({
            qrUrl
        })
    }
    

  //支付
  payPrice = (params) => {
      console.log("DF99011")
      console.log("idphone")
      console.log(this.state.totalPrice)
      let add = parseInt(Math.random()*101) 
      let udd = "DF99011"+add
      console.log(udd)
      axios.post("http://115.29.148.10:18001/pay?orderNo="+udd+"&&body=idphone&&price="+this.state.totalPrice)
      .then((res)=>{
         let qrUrl = res.data.code_url
         this.setState({
             qrUrl
         })
      }).catch((err)=>{
          console.log("console假的")
      })
    // this.setState({
    //     qrUrl:payImg
    // })
  }
  
  componentDidMount() {
    let carts_str = localStorage.getItem("carts");
    let carts = JSON.parse(carts_str || "[]");
    let totalPrice = 0; // 总价
    let sum = 0; // 商品数量
    // 判断购物小车是否选中
    carts = carts.filter((v) => {
      if (v.checked) {
        return true;
      }
    });
    // 计算总价
    carts.forEach((v) => {
      totalPrice += v.goods_price * v.num;
      sum += v.num;
    });
    this.setState({
      carts,
      totalPrice,
      sum,
    });
  }
  render() {
    return (
      <div className="yg-pay">
        {/* 支付页面导航的开始 */}
        <NavBar
          className="yg-py-nav"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
          支付
        </NavBar>
        {/* 支付页面导航的结束 */}
        {/* 支付遮罩,如果有值加上遮罩,没有值就渲染 */}
        {this.state.qrUrl?
        <div className="qrcode_pay_opcity">
            
        {/* 支付二维码结束 */}
        </div>:""}
        {/* 支付遮罩结束 */}
        {/* 支付二维码 */}
        {this.state.qrUrl?
            <div className="qrcode_pay_list">
                <QRCode
                className="qrcode_pay"
                value={this.state.qrUrl} //value参数为生成二维码的连接
                size={200}  //二维码的宽高尺寸
                fgColor="#000000"  //二维码的颜色
                > 
                </QRCode>
                {/* <img
                src={this.state.qrUrl}
                className="qrcode_pay"></img> */}
                {/* 取消支付 */}
                <div
                onClick={this.handleClear}
                className="qrcode_pay_clear">取消支付</div>
        </div>:""  
        }
        {/* 选择地址开始 */}
        <div className="yg-pay-address">
          <div className="pay-address-btn">选择地址</div>
        </div>
        {/* 选择地址结束 */}
        {/* 已选商品开始 */}
        <div className="yg-pay-list">
          <h3 className="list-title">已选商品</h3>
          <div className="pay-list-content">
            {this.state.carts.map((v, index) => {
              return (
                <div className="content-list-item" key={v.goods_id}>
                  <div className="list-item-mid">
                    <img src={v.goods_small_logo} alt="" />
                  </div>
                  <div className="list-item-right">
                    <div className="right-top">
                      <div className="right-top-title">{v.goods_name}</div>
                    </div>
                    <div className="right-bottom">
                      <div className="right-bottom-left">￥{v.goods_price}</div>
                      <div className="right-bottom-right">
                        <span className="num">X{v.num}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 已选商品结束 */}
        {/* 底部功能栏开始 */}
        <div className="yg-pay-bottom">
          <div className="bottom-left">
            <span className="title1">合计</span>
            <span className="price">￥{this.state.totalPrice}</span>
          </div>
          <div className="bottom-right" onClick={this.payPrice}>
              {
                  this.state.addressObj.address ?<span className="title3">去支付({this.state.sum})</span>:<span className="title2">去支付({this.state.sum})</span>
              }
            
          </div>
        </div>
        {/* 底部功能栏结束 */}
      </div>
    );
  }
}
