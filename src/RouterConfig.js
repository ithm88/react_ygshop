import React, { Component } from 'react'
//引入路由
import {HashRouter as Router, Route}  from "react-router-dom"
import Cart from "./components/cart/Cart"
import Index from "./components/index/Index"
import My from "./components/my/My"
import Category from "./components/category/Category"
import SearchCenter from "./components/searchCenter/SearchCenter"
import GoodDetail from "./components/goodDetail/GoodDetail"
import GoodList from "./components/goodList/GoodList"
import Pay from "./components/pay/Pay"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Tabbar from "./components/tabbar/Tabbar"
import TestConfig from "./components/testCofnig/TestConfig" 
export default class RouterConfig extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route path="/" exact render={()=><Tabbar><Index></Index></Tabbar>}></Route>
                    <Route path="/cart" exact render={()=><Tabbar><Cart></Cart></Tabbar>}></Route>
                    <Route path="/my" exact render={()=><Tabbar><My></My></Tabbar>}></Route>
                    <Route path="/category" exact render={()=><Tabbar><Category></Category></Tabbar>}></Route>
                    <Route path="/searchCenter" exact render={ ()=><SearchCenter></SearchCenter> }></Route>
                    <Route path="/goodDetail/:goods_id" exact render={ (props)=><GoodDetail {...props}></GoodDetail> }></Route>
                    <Route path="/goodList/" exact render={ (props)=><GoodList {...props}></GoodList> }></Route>
                    <Route path="/testconfig" exact render={()=><TestConfig></TestConfig>}></Route>
                    <Route path="/pay" exact render={(props)=><Pay {...props}></Pay>}></Route>
                    <Route path="/login" exact render={(props)=><Login {...props}></Login>}></Route>
                    <Route path="/register" exact render={(props)=><Register {...props}></Register>}></Route>
                    
                </Router>
            </div>
        )
    }
}
