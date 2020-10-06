import React, { Component } from "react";
import myaxios from "../../utils/myaxios";
import { NavBar, Icon, Carousel,Toast } from "antd-mobile";
import "./GoodDetail.scss";
export default class GoodDetail extends Component {
    constructor(props) {
      super(props);
      // console.log(props);
    }
  state = {
    goodInfo: {},
    imgHeight: 250,
    /* 设置轮播图是否显示 默认情况不显示 */
    showSwiper: false,
    showCollect:false
  };
  componentDidMount() {
    let { goods_id } = this.props.match.params;
    myaxios
      .get("goods/detail", {
        params: {
          goods_id,
        },
      })
      .then((res) => {
        console.log(res);
        /* 3. 当请求的轮播图回来的时候   showSwiper true*/
        this.setState({
          goodInfo: res,
          showSwiper: true,
        });
      })
      .catch((err) => console.log(err));
      // 初次进入商品详情的时候  判断商品是否被收藏
      let collections_str = localStorage.getItem("collections");
      let collections = JSON.parse(collections_str||"[]");
      // 对收藏进行循环遍历
      // 判断是否在收藏中
      let index = collections.findIndex(v=>{
          if(v.goods_id == goods_id){
              return true;
          }
      })
      if(index!=-1){
          this.setState({
              showCollect:true
          })
      }
  }
  /* 收藏的功能 */
  handleCollect = (params) => {
      // collections 代表的是收藏的数据 数组
      
      let collections_str = localStorage.getItem("collections");
      let collections = JSON.parse(collections_str||"[]");
      // 对收藏进行循环遍历
      // 判断是否在收藏中
      let index = collections.findIndex(v=>{
          if(v.goods_id === this.state.goodInfo.goods_id){
              return true;
          }
      })
      if(index!=-1){
          // 代表之前收藏过
          collections.splice(index,1);
          Toast.info("取消收藏成功",1);
          this.setState({
            showCollect:false
          })
      }else{
          Toast.info("收藏成功！",1);
          collections.push(this.state.goodInfo);
          this.setState({
            showCollect:true
          })
      }
      localStorage.setItem("collections",JSON.stringify(collections));
    
  }
  gotoCart =(params) => {
      this.props.history.push("/cart")
  }
  // 添加到购物车中
  addToCart = (params) => {
      // 1.首先从本地缓存中获取购物车数据
      let carts_str = localStorage.getItem("carts");
      let carts = JSON.parse(carts_str||"[]");
      // 获取goods_id
      let { goods_id } = this.props.match.params;
      let index = carts.findIndex(v=>{
          if(v.goods_id == goods_id){
              return true;
          }
      })
      // index === -1 代表是找不到 
      if(index === -1){
          let goods_info = this.state.goodInfo;
          goods_info.num = 1; // 第一次添加 数量是1
          goods_info.checked = true; // 在购物车中默认被选中
          carts.push(goods_info)
      }else{
          carts[index].num ++; // 第n次添加 n > 1
      }
      Toast.info("加入购物车成功",1);
      localStorage.setItem("carts",JSON.stringify(carts));
  }
  pay = (params) => {
      this.props.history.push("/pay");
  }
  
  
  render() {
    return (
      <div className="yg-detail">
        <NavBar
          className="yg-detail-nav"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
          商品详情
        </NavBar>
        {/* 首页轮播图开始 */}
        <div className="yg-detail-swiper">
          {/* 2. showSwiper和轮播图绑定 */}
          {this.state.showSwiper && (
            <Carousel infinite autoplay={true} autoplay infinite>
              {this.state.goodInfo.pics &&
                this.state.goodInfo.pics.map((v) => {
                  return (
                    <div
                      key={v.goods_id}
                      className="imageWrapper"
                      style={{
                        display: "inline-block",
                        width: "100%",
                        height: this.state.imgHeight,
                      }}
                    >
                      <img
                        src={v.pics_mid}
                        alt=""
                        style={{ width: "100%", verticalAlign: "top" }}
                        onLoad={() => {
                          // fire window resize event to change height
                          window.dispatchEvent(new Event("resize"));
                          this.setState({ imgHeight: "auto" });
                        }}
                      />
                    </div>
                  );
                })}
            </Carousel>
          )}
        </div>
        {/* 首页轮播图结束 */}
        {/* 价格和分享区域开始
            
         */}
        <div className="yg-detail-price">
          <div className="price-left">
            <span className="title1">￥{this.state.goodInfo.goods_price}</span>
          </div>
          <div className="price-right">
            <i className="iconfont icon-fenxiang"></i>
            <i className={this.state.showCollect?"iconfont icon-shoucang active":"iconfont icon-shoucang"} onClick={this.handleCollect}></i>
          </div>
        </div>
        {/* 价格和分享区域结束 */}
        {/* 商品的标题的开始 */}
        <div className="yg-detail-title">{this.state.goodInfo.goods_name}</div>
        {/* 商品的标题的结束 */}
        {/* 图文详情开始 */}
        <div className="yg-detail-richtext">
            <div className="richtext-title">图文详情</div>
            <div className="richtext-content"
            dangerouslySetInnerHTML={{__html:this.state.goodInfo.goods_introduce}}
            >
            </div>
        </div>
        {/* 图文详情结束 */}
        {/* 底部的工具栏开始 */}
        <div className="yg-detail-bottom">
            <div className="bottom-contact">
                <i className="iconfont icon-kefu"></i>
                <div className="title">联系客服</div>
            </div>
            <div className="bottom-cart" onClick={this.gotoCart}>
                <i className="iconfont icon-gouwuche"></i>
                <div className="title">购物车</div>
            </div>
            <div className="bottom-addToCart" onClick={this.addToCart}>
                <span className="title1">加入购物车</span>
            </div>
            <div className="bottom-buy" onClick={this.pay}>
                <span className="title2">立即购买</span>
            </div>

        </div>
       
        {/* 底部的工具栏结束 */}
      </div>
    );
  }
}

// import React, { Component } from "react";
// import myaxios from "../../utils/myaxios";
// import { NavBar, Icon, Carousel, Toast } from "antd-mobile";
// import "./GoodDetail.scss";
// import {withRouter} from "react-router-dom"
// class GoodDetail extends Component {
//   constructor(props) {
//     super(props);
//     console.log(props.match.params.goods_id);
//   }
//   state = {
//     goodInfo: {},
//     imgHeight: 250,
//   };

//   //点击跳转购物车
//   handleAddCart = (e) => {
//       let goods_id = e.target.getAttribute("data_index")
//       console.log(goods_id)
//       this.props.history.push("/cart")
//   }

//   //收藏的功能
//   handleCollect = (params) => {
//       // collections 代表的是收藏的数据 数组

//       let collections_str = localStorage.getItem("collections");
//       let collections = JSON.parse(collections_str || "[]");
//       //对收藏进行循环遍历
//       //判断是否在收藏中
//       let index = collections.findIndex(v=>{
//           if(v.goods_id === this.state.goodInfo.goods_id){
//               return true;
//           }
//       })
//       if(index != -1){
//           //代表之前收藏过
//           collections.splice(index,1);
//           Toast.info("取消收藏成功",1);
//           this.setState({
//               showCollect:false
//           })
//       }else{
//           Toast.info("收藏成功!",1);
//           collections.push(this.state.goodInfo)
//           this.setState({
//               showCollect:true
//           })
//       }
//       localStorage.setItem("collections",JSON.stringify(collections));
//   }
  

//   //点击加入购物车
//   addToCart = (params) => {
//       //1,首先从本地缓存中获取购物车的数据
//       let carts_str = localStorage.getItem("carts");
//       let carts = JSON.parse(carts_str || "[]");
//       //获取goods_id  循环一下看看里面有没有,给里面加个1
//       let {goods_id} = carts.findIndex(v=>{
//           if(v.goods_id == goods_id){
//               return true;
//           }
//       })
//       //如果索引是-1的时候,代表找不到,findIndex方法拿不到数据就是-1  
//       //== 不用判断类型 === 需要判断类型
//       if(index == -1){
//           let goods_info = this.state.goodInfo;
//           //如果是第一次加的话,就得从goodsinfo里面给他一个值
//           goods_info.num = 1  //第一次添加数量是1
//           goods_info.checked = true; //在购物车中默认被选中
//           //推到小车里面
//           carts.push(goods_info)
//       }else{
//           //第n次添加
//           carts[index].num++  //第n次添加 n > 1
//       }
//       Toast.info("加入购物车成功",1);
//       localStorage.setItem("carts",JSON.stringify(carts));
//   }
  
//   componentDidMount() {
//     let { goods_id } = this.props.match.params;
//     myaxios
//       .get("goods/detail", {
//         params: {
//           goods_id,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         this.setState({
//           goodInfo: res,
//         });
//       })
//       .catch((err) => console.log(err));
//   }
  
//   render() {
//     return (
//       <div className="yg-detail">
//         <NavBar
//           className="yg-detail-nav"
//           mode="light"
//           icon={<Icon type="left" />}
//           onLeftClick={() => window.history.go(-1)}
//         >
//           商品详情
//         </NavBar>
//         {/* 首页轮播图开始 */}
//         <div className="yg-detail-swiper">
//           <Carousel infinite autoplay={true}>
//             {this.state.goodInfo.pics &&
//               this.state.goodInfo.pics.map((v) => {
//                 return (
//                   <div
//                     key={v.goods_id}
//                     className="imageWrapper"
//                     style={{
//                       display: "inline-block",
//                       width: "100%",
//                       height: this.state.imgHeight,
//                     }}
//                   >
//                     <img
//                       src={v.pics_mid}
//                       alt=""
//                       style={{ width: "100%", verticalAlign: "top" }}
//                       onLoad={() => {
//                         // fire window resize event to change height
//                         window.dispatchEvent(new Event("resize"));
//                         this.setState({ imgHeight: "auto" });
//                       }}
//                     />
//                   </div>
//                 );
//               })}
//           </Carousel>
//         </div>
//         {/* 首页轮播图结束 */}
//         {/* 价格和分享区域开始 */}
//         <div className="yg-detail-price">
//             <div className="price-left">
//             <span className="title1">￥{this.state.goodInfo.goods_price}</span> 
//             </div>
//             {/* 分享跟收藏 */}
//             <div className="price-right">
//                 <i className="iconfont icon-fenxiang"></i>
//                 <i className="iconfont icon-shoucang"></i>
//             </div>
//         </div>
//         {/* 这个是描述 */}
//         <div className="price-title">
//             <h2>{this.state.goodInfo.goods_name}</h2>
//         </div>
//         {/* 描述结束 */}
//         {/* 详情页开始 */}
//         <div dangerouslySetInnerHTML = {{ __html: this.state.goodInfo.goods_introduce }} />
//         {/* 详情页结束 */}
//         {/* 底部开始 */}
//         <div className="detail_footer">
//              <div className="detail_kefu">
//                  <i className="iconfont icon-kefu icon_kefu"></i>
//                  <span className="icon_titlekefu">联系客服</span>
//             </div> 
//              <div className="detail_cart" onClick={this.handleAddCart}>
//                  <i className="iconfont icon-gouwuche icon_cart"  data_index={this.state.goodInfo.goods_id}></i>
//                  <span className="title_cart"  data_index={this.state.goodInfo.goods_id}>购物车</span>
//              </div>
//              <div className="detail_add" onClick={this.addToCart}>
//                  <h2>加入购物车</h2>
//              </div>
//              <div className="detail_pay">
//                  <h2>立即购买</h2>
//              </div>
//         </div>
//         {/* 底部结束 */}
//       </div>
//     );
//   }
// }

// export default withRouter(GoodDetail)