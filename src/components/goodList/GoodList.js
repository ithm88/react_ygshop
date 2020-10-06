import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";
import { Tabs, Toast } from "antd-mobile";
import SearchInput from "../searchInput/SearchInput";
import "./GoodList.scss";
import emptyProduct from "../../assets/img/empty_product.jpg";
import myaxios from "../../utils/myaxios";
export default class GoodList extends Component {
  constructor(props) {
    super(props);
    // 列表的引用
    this.goodListRef = React.createRef();
    this.pagesize = 10; // 默认返回的每条请求的数量
    this.pagenum = 1; //
  }
  state = {
    tabs: [{ title: "综合" }, { title: "销量" }, { title: "价格" }],
    goods: [],
  };
  componentDidMount() {
    console.log(this.props.location.search);
    let { search } = this.props.location;
    let params = search.split("?")[1] || "";
    // ?cid=6
    // cid=6
    // ["cid","6"]
    let params_arr = params.split("=");
    if (params_arr[0] === "cid") {
      this.cid = params_arr[1].replace(/'/g, '');
    } else if (params_arr[0] === "query") {
      this.query = params_arr[1].replace(/'/g, '');
    }
    // console.log(this);
    this.getProductList();
    // 注册滚动监听的时间
    // console.log(this.goodListRef);
    this.goodListRef.current.parentElement.addEventListener(
      "scroll",
      this.handleScroll
    );
  }
  handleScroll = () => {
    // console.log("列表开始滚动拉");
    let parentElement = this.goodListRef.current.parentElement;
    // 客户端的高度 clientHeight
    let clientHeight = parentElement.clientHeight;
    // console.log("列表的高度",this.goodListRef.current.clientHeight);
    //列表的高度
    let scrollHeight = parentElement.scrollHeight;
    // console.log("列表可以滚动的高度",scrollHeight);
    // 列表已经滚动的高度
    let scrollTop = parentElement.scrollTop;
    // console.log("列表已经滚动的高度",scrollTop);
    // 如果结果小于或者等于1 说明已经触底
    // console.log(scrollHeight-clientHeight-scrollTop);
    // 发请求 或者最新的列表数据
    if (scrollHeight - clientHeight - scrollTop <= 1) {
      console.log("触底拉");
      this.getProductList();
    }
  };
  
  componentWillUnmount() {
    // 卸载监听事件
    this.goodListRef.current.parentElement.removeEventListener(
      "scroll",
      this.handleScroll
    );
  }

  /* 获取产品的列表 */
  getProductList = () => {
    // this.total null
    // this.pagesize null

    // 拼接的参数
    let params = {};
    if (this.cid) {
      params["cid"] = this.cid;
    }
    if (this.query) {
      params["query"] = decodeURIComponent(this.query);
    }
    // 如果页码存在
    if (this.total) params["pagenum"] = ++this.pagenum;
    //
    else params["pagenum"] = this.pagenum;
    // 默认页码
    params["pagesize"] = this.pagesize;
    //如果当前的页码大于总的页面
    if (this.pagenum > Math.ceil(this.total / this.pagesize)) {
      Toast.info("已经是最后一条数据啦", 1);
    } else {
      myaxios
        .get("goods/search", {
          params: params,
        })
        .then((res) => {
          console.log(res);
          this.total = res.total;
          this.pagenum = res.pagenum;
          this.setState({
            goods: [...this.state.goods, ...res.goods], // 追加数据
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  handleItemClick = (goods_id) => {
    this.props.history.push("/goodDetail/" + goods_id);
  };

  render() {
    return (
      <div className="yg-gl">
        {/* 商品列表导航条开始 */}
        <div className="yg-gl-nav">
          <NavBar
            className="gl-nav"
            icon={<Icon type="left" />}
            onLeftClick={() => window.history.go(-1)}
          >
            商品列表
          </NavBar>
        </div>
        {/* 商品列表导航条结束 */}

        {/* tab切换栏开始 */}
        <div className="yg-gl-tab">
          <Tabs
            tabs={this.state.tabs}
            initialPage={0}
            onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
            }}
            tabBarUnderlineStyle={{ borderColor: "red" }}
            //tabBarTextStyle={{ fontWeight: "100", color: "black" }}
          >
            <div className="gl-tab-zh" ref={this.goodListRef}>
              {this.state.goods.map((v, index) => {
                return (
                  <div
                    className="tab-zh-item"
                    key={v.goods_id}
                    onClick={this.handleItemClick.bind(this, v.goods_id)}
                  >
                    <div className="zh-item-left">
                      <img
                        src={
                          v.goods_small_logo ? v.goods_small_logo : emptyProduct
                        }
                        alt=""
                      />
                    </div>
                    <div className="zh-item-right">
                      <div className="item-right-top">{v.goods_name}</div>
                      <div className="item-right-bottom">￥{v.goods_price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "150px",
                backgroundColor: "#fff",
              }}
            >
              销量
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "150px",
                backgroundColor: "#fff",
              }}
            >
              价格
            </div>
          </Tabs>
        </div>
        {/* tab切换栏结束 */}
      </div>
    );
  }
}


// import React, { Component } from 'react'
// import {NavBar,Tabs,Badge,Toast} from "antd-mobile"
// import SearchInput from "../searchInput/SearchInput"
// import emptyProduct from "../../assets/img/empty_product.jpg"
// import "./GoodList.scss"
// import myaxios from "../../utils/myaxios"
// export default class GoodList extends Component {
//     constructor(props){
//         super(props)
//         // 列表的引用
//         this.goodListRef = React.createRef();
//         this.pagesize = 10; // 默认返回的每条请求的数量
//         this.pagenum = 1; //
//     }
//     state = {
//          tabs : [
//             { title: <Badge text={''}>综合</Badge> },
//             { title: <Badge text={''}>销量</Badge> },
//             { title: <Badge text={''}>价格</Badge> },
//           ],
//           goods:[] 
//     }
    
//     //生命周期,数据加载后
//     componentDidMount(){
//         console.log("打印进来了")
//         //获取传进来的参数
//         let search = this.props.location.search;
//         //切割字符串
//         let params = search.split("?")[1] || "";
//         console.log(params); //query='服装'

//         //再根据等号裁剪
//         let params_arr = params.split("=");
//         console.log(params_arr) //["query", "'服装'"]
//         if(params_arr[0] === "cid"){
//             this.cid = params_arr[1] //就把浏览器的cid赋值给cid
//             console.log(this.cid)
//         }else{
//             this.query = params_arr[1];
//             console.log(this.query)
//         }

//         //注册滚动监听事件
//         console.log(this.goodListRef.current) // {current: div.gl-tab-zh}
//         this.goodListRef.current.parentElement.addEventListener(
//             "sroll",
//             this.handleScroll
//         );

//         //发请求
//         myaxios.get("goods/search",{
//             params:params_arr
//         })
//         .then((res)=>{
//             console.log(res);
//             this.setState({
//                 goods:res.goods  //追加数据
//             });
//             console.log(this.state.goods)
//         })
//     }
//     handleScroll = () =>{
//         // console.log("列表开始滚动拉");
//         let parentElement = this.goodListRef.current.parentElement;
//         // 客户端的高度 clientHeight
//         let clientHeight = parentElement.clientHeight;
//         console.log("列表的高度",this.goodListRef.current.clientHeight);

//         //列表的高度
//         let scrollHeight = parentElement.scrollHeight;
//         console.log("列表可以滚动的高度",scrollHeight)

//         //列表已近滚动的高度
//         let scrollTop = parentElement.scrollTop;
//         console.log("列表已经滚动的高度",scrollTop);
//         //如果结果小于或者等于1,说明已经触底

//         //发请求 或者最新的列表数据
//         if(scrollHeight - clientHeight - scrollTop <= 1){
//             console.log("触底拉");
//             this.getProductList();
//         }
//     }

//     //获取产品的列表
//       /* 获取产品的列表 */
//   getProductList = () => {
//     // this.total null
//     // this.pagesize null

//     // 拼接的参数
//     let params = {};
//     if (this.cid) {
//       params["cid"] = this.cid;
//     }
//     if (this.query) {
//       params["query"] = decodeURIComponent(this.query);
//     }
//     // 如果页码存在
//     if (this.total) params["pagenum"] = ++this.pagenum;
//     //
//     else params["pagenum"] = this.pagenum;
//     // 默认页码
//     params["pagesize"] = this.pagesize;
//     //如果当前的页码大于总的页面
//     if (this.pagenum > Math.ceil(this.total / this.pagesize)) {
//       Toast.info("已经是最后一条数据啦", 1);
//     } else {
//       myaxios
//         .get("goods/search", {
//           params: params,
//         })
//         .then((res) => {
//           console.log(res);
//           this.total = res.total;
//           this.pagenum = res.pagenum;
//           this.setState({
//             goods: [...this.state.goods, ...res.goods], // 追加数据
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   handleItemClick = (goods_id) => {
//     this.props.history.push("/goodDetail/" + goods_id);
//   };
    
//     render() {
//         return (
//             <div className="yg-gl-con">
//                 {/* 首页导航条开始 */}
//                 <div className="yg-index-nav">
//                   <NavBar className="index-nav">商品列表</NavBar>
//                 </div>
//                 {/* 首页导航条结束 */}

//                 {/* 首页搜索框开始 */}
//                 <div className="yg-index-search">
//                   <SearchInput></SearchInput>
//                 </div>
//                 {/* 列表栏开始 */}
//                 <div className="yg-index-lists">
//                     <Tabs tabs={this.state.tabs}
//                     tabBarActiveTextColor={"red"}
//                     tabBarUnderlineStyle={{color:"red"}}
//                       initialPage={0}
//                       onChange={(tab, index) => { console.log('onChange', index, tab); }}
//                       onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
//                     >
//                       <div className="gl-tab-zh" ref={this.goodListRef} style={{ display: 'flex'}}>
//                         {this.state.goods.map((v,index)=>{
//                             return (
//                                 <div
//                                     onClick={this.handleItemClick.bind(this,v.goods_id)}
//                                     className="tab-zh-item"
//                                     key={v.goods_id}
//                                     >
//                                     {/* 这是放图片的 */}
//                                     <div className="zh-item-let">
//                                         <img src={v.goods_small_logo?v.goods_small_logo : emptyProduct}></img>
//                                     </div>
//                                     {/* 这个是标题 */}
//                                     <div className="zh-item-right">
//                                         <h2>{v.goods_name}</h2>
//                                         <h3>¥{v.goods_price}</h3>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                       </div>
//                       <div style={{ display: 'flex'}}>
//                         销量
//                       </div>
//                       <div style={{ display: 'flex'}}>
//                         价格
//                       </div>
//                     </Tabs>
//                 </div>
//                 {/* 列表栏结束 */}
//             </div>
//         )
//     }
// }
