import React, { Component } from 'react'
//引入购物车图片
import Cartimg from "../../assets/img/cart.jpg"
import {withRouter} from "react-router-dom"
//引入样式
import "./Cart.scss"
//引入路由
import {NavBar,Icon,Modal} from "antd-mobile"
class Cart extends Component {
    // constructor(props){
    //     super(props);
    //     console.log(props)
    // }
    //跳转页面
    state = {
        carts:[],
        allChecked:false,
        totalsum:0,
        totalnum:0
    }
    //点击小选择框
    handleItem = (index) => {
        //查看lostorge里面的信息
        this.state.carts[index].checked = !this.state.carts[index].checked
        localStorage.setItem("carts",JSON.stringify(this.state.carts))
        //调用封装的localStorage更新
        this.componentDidMount()
    }
    
    //跳转到支付页面
    historyPay = (params) => {
        this.props.history.push("/pay")
    }
    

    //点击全选框
    handleAddClick = (params) => {
        //点击全选后取反
        let allChecked = !this.state.allChecked; 
        this.setState({
            allChecked
        })
        console.log(allChecked)
        if(allChecked == true){
            console.log("打印true")
            let carts_str = localStorage.getItem("carts");
            let carts = JSON.parse(carts_str || "[]");
            carts.map((v)=>{
                v.checked = true
            })
            this.saveCarts(carts);
            console.log(carts)
        }else{
            console.log("打印fasle")
            let carts_str = localStorage.getItem("carts");
            let carts = JSON.parse(carts_str || "[]");
            carts.map((v)=>{
                v.checked = false
            })
            this.saveCarts(carts);
            console.log(carts)
        }
        this.totalsum()
    }

    subHandleClick = (index)=>{
        let cartsdel = this.state.carts
        let carts = this.state.carts[index]
        if(carts.num - 1 === 0){
            //提示用户你确定要删除商品吗
            // alert('删除商品', "您确定要删除商品吗???", [
            //     { text: '取消', onPress: () => console.log("删除商品取消")},
            //     { text: '确定', onPress: () =>{
            //         //删除商品
            //         cartsdel.splice(index,1);
            //         //在刷新localStorage 的carts
            //         this.localStorage()
            //      }
            //     },
            //   ])
            cartsdel.splice(index,1);
            console.log(this.state.carts)
            this.localStorage()
            this.totalsum()
        }else{
            carts.num--
            //更新状态
            this.setState({
                carts
            })
            localStorage.setItem("carts",JSON.stringify(this.state.carts))
            //调用封装的localStorage更新
            this.localStorage()
            this.totalsum()
        }
    }

    addHandleClick = (index) => {
        let carts = this.state.carts[index]
        carts.num++
        //更新状态
        this.setState({
            carts
        })

        localStorage.setItem("carts",JSON.stringify(this.state.carts))
        //调用封装的localStorage更新
        this.localStorage()
        this.totalsum()
    }
    

    //点击图片跳转
    handleGoodsNameClick = (e) => {
        let goods_id = e.target.getAttribute("data_index")
        this.props.history.push("/goodDetail/"+parseInt(goods_id))
    }
    //封装跟新localStorage
    localStorage = ()=>{
        let carts_str = localStorage.getItem("carts");
        let carts = JSON.parse(carts_str || "[]");
        this.setState({
            carts
        })
    }


    //保存小车
    saveCarts = (carts) => {
        this.carts = carts;
        localStorage.setItem("carts",JSON.stringify(carts));
        //异步this.state.carte
        this.setState({
            carts,
        });        
    }
    

    //获取本地缓存中的购物车数据
    componentDidMount(){
        let carts_str = localStorage.getItem("carts");
        let carts = JSON.parse(carts_str || "[]");
        //判断全选按钮的状态
        let allChecked = true;
        let bool = carts.some((v,i)=>{
            //只要有一个是假
            if(!v.checked){
                //只要有一项没有checked,说明购物小车没有被全选
                return true;// 说明购物小车中没有被全选
            }
        })
        if(bool){
            //真的情况
            allChecked = false;
        }
        this.setState({
            carts,
            allChecked
        })
        //this.localStorage()
        this.saveCarts(carts);
        //调用总计的方法
        this.totalsum()
    }

    //总计
    totalsum = (params) => {
        let totalsum = 0
        let totalnum = 0
        let carts_str = localStorage.getItem("carts");
        let carts = JSON.parse(carts_str || "[]");
        console.log(carts)
        carts.map((v)=>{
            if(v.checked){
                totalsum += v.goods_price * v.num
                totalnum += v.num
            }
        })
        this.setState({
            totalsum,
            totalnum
        })
    }
    

    render() {
        return (
            <div className="cart_con">
                <div className="cart_con_header">
                    <NavBar
                      className="yg-cart-nav"
                      mode="light"
                      icon={<Icon type="left" />}
                      onLeftClick={() => window.history.go(-1)}
                    >
                      购物车
                    </NavBar>
                </div>
                {/* 判断购物车是否有数据 */}
                {!!this.state.carts.length ? 
                
                <div className="cart-con-headerss">
                    {this.state.carts.map((val,index)=>{
                        return (
                            <div className="cart_con_headersss" key={val.goods_id}>
                                {/* 商品列表开始 */}
                <div className="cart_con_list">
                    <div 
                    onClick={this.handleItem.bind(this,index)}
                    className="cart_left">
                        <i 
                        className={val.checked?"allcheck iconfont icon-xz":"delcheck iconfont icon-xz"}
                        ></i>
                    </div>
                    <div className="cart_content">
                        <img onClick={this.handleGoodsNameClick} data_index={val.goods_id} src={val.goods_small_logo} ></img>
                    </div>
                    <div className="cart_right">
                        <h3 onClick={this.handleGoodsNameClick} data_index={val.goods_id}>{val.goods_name}
                        </h3>
                        <div className="cart_button">
                        <h3>¥{val.goods_price}</h3>
                            <div className="cart_button_str">
                        <span onClick={this.subHandleClick.bind(this,index)}>-</span><span>{val.num}</span><span onClick={this.addHandleClick.bind(this,index)}>+</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 底部结算开始 */}
                <div className="footer_pay">
                    <div className="footer_pay_con" onClick={this.handleAddClick}>
                        <i className={this.state.allChecked?"allcheck iconfont icon-xz":"delcheck iconfont icon-xz"}></i> 
                        <span>全选</span><span>合计</span><span>¥{this.state.totalsum}</span>
                    </div>
                    <div className="footer_pay_con_ppy" onClick={this.historyPay}>
                        <h2>去结算({this.state.totalnum})</h2>
                    </div>
                </div>
                            </div>
                        )
                    })}
                </div>
                
                :<div className="yg-cart-empty">
                    <img src={Cartimg} className="cart-empty-ime"></img>
                    <h3 className="empty_text"><a href="#/category"></a>去逛逛</h3>
                </div>}
                {/* 判断购物车是否有数据 */}

                
            </div>
        )
    }
}

export default withRouter(Cart)
