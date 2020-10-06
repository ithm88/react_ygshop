import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import {withRouter} from "react-router-dom"

class Tabbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'redTab',
          hidden: false,
          fullScreen: true,
        };
      }    
    render() {
        return (
            <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="index"
            //点击前
            icon={<i className="iconfont icon-shouye"></i>}
            //点击后
            selectedIcon={<i className="iconfont icon-shouye"
            style={{color:"#ff2d4a"}}
            ></i>
            }
            // 这里是跳转的路径
            selected={this.props.location.pathname==="/"}
            onPress={() => {
              this.props.history.push("/");
            }}
          >
            {/* 这里是解决多次打印请求的方法 */}
            {this.props.location.pathname==="/"&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            title="分类"
            key="category"
            //点击前
            icon={<i className="iconfont icon-leimupinleifenleileibie"></i>}
            //点击后
            selectedIcon={<i className="iconfont icon-leimupinleifenleileibie"
            style={{color:"#ff2d4a"}}
            ></i>
            }
            // 这里是跳转的路径
            selected={this.props.location.pathname==="/category"}
            onPress={() => {
              this.props.history.push("/category");
            }}
          >
            {/* 这里是解决多次打印请求的方法 */}
            {this.props.location.pathname==="/category"&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            title="购物车"
            key="cart"
            //点击前
            icon={<i className="iconfont icon-gouwuche"></i>}
            //点击后
            selectedIcon={<i className="iconfont icon-gouwuche"
            style={{color:"#ff2d4a"}}
            ></i>
            }
            // 这里是跳转的路径
            selected={this.props.location.pathname==="/cart"}
            onPress={() => {
              this.props.history.push("/cart");
            }}
          >
            {/* 这里是解决多次打印请求的方法 */}
            {this.props.location.pathname==="/cart"&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="my"
            //点击前
            icon={<i className="iconfont icon-daohanglan-05"></i>}
            //点击后
            selectedIcon={<i className="iconfont icon-daohanglan-05"
            style={{color:"#ff2d4a"}}
            ></i>
            }
            // 这里是跳转的路径
            selected={this.props.location.pathname==="/my"}
            onPress={() => {
              this.props.history.push("/my");
            }}
          >
            {/* 这里是解决多次打印请求的方法 */}
            {this.props.location.pathname==="/my"&&this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
        )
    }
}

export default withRouter(Tabbar)
