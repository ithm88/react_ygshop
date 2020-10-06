import React, { Component } from 'react'
import "./Login.scss"
import { withRouter } from "react-router-dom"
// import axios from "../../utils/axios"
import axios from "axios"
class Index extends Component {
    state = {
        username: "",
        password: ""
    }
    handleRegister = (params) => {
        this.props.history.push("/register")
    }
    saveUserName=(e) => {
        this.setState({
            username: e.target.value
        })
    }
    savePassword=(e) => {
        this.setState({
            password: e.target.value
        })
    }
    // 登陆
    handleLogin = (params) => {
        let telephone = this.state.username;
        let password = this.state.password;
        if(!telephone || !password){
            console.log("账号或者密码不能为空！");
            alert("账号或者密码不能为空！")
            return false;
        }
        let url = "http://115.29.148.10:8989/login/loginUser?telephone="+telephone+"&&password="+password;
        axios.get(url).then(res=>{
            console.log(res);
            //判断是否登录成功
            if(!res.data.flag){
                alert(res.data.message)
                return false;
            }
            localStorage.setItem("userinfo",JSON.stringify(res.data.data));
            this.props.history.push("/my");
        }).catch(err=>console.log(err))
    }
    //------------------------------------------------------------------------------------------------------------------------------
        
    render() {
        return (
            <div className="yg-login">
                <input type="text"
                    value={this.state.username}
                    name="" id="" placeholder="账号"
                    onChange={this.saveUserName}
                    />
                <input type="password"
                    value={this.state.password}
                    onChange={this.savePassword}
                    name="" id="" placeholder="密码" />
                <div className="yg-login-btn"
                onClick={this.handleLogin}
                >登陆</div>
                <h1 onClick={this.handleRegister}>注册</h1>
            </div>
        )
    }
}
export default withRouter(Index)
