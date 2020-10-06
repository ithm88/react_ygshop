import React, { Component } from 'react'
//引入axios
import axios from "axios";
//引入scss样式
import "./TestConfig.scss"
export default class TestConfig extends Component {

    state = {
        price :[
            {
                id:0,
                orderNo:"DP123456",
                body:"iphone",
                prices:1
            }
        ]

    }
    //点击后提交参数跳转
    handleClick = (e) => {
        console.log("点击了")
        //axios.post("http://localhost:18001/pay",{
        axios.post("http://115.29.148.10:8989/login/loginUser?telephone=13923815937&password=123456",{
            // orderNo:this.state.price.orderNo,
            // body:this.state.price.body,
            // price:this.state.price.prices
        }).then((res)=>{
            // console.log(this.state.price.orderNo)
            // console.log(this.state.price.body)
            // console.log(this.state.price.prices)
            console.log(res)
        }).catch((err)=>console.log(err))
    }
    
    //发起支付请求

    //调用生命周期方法
    componentDidMount(){
        
    }
    render() {
        return (
            <div className="list_pay">
                {this.state.price.map((v)=>{
                        return (
                          <div className="item-test" key={v.id}>
                                <div>商户单号:{v.orderNo}</div>
                                <div>商品描述:{v.body}</div>
                                <div>商品价格:{v.prices}</div>
                                <div className="buttonlist"><button onClick={this.handleClick}>支付</button></div>
                          </div>
                        )
                    })}
            </div>
        )
    }
}
