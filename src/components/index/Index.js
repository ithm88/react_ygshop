import React, { Component } from "react";
import { NavBar, Carousel,Flex } from "antd-mobile";
import SearchInput from "../searchInput/SearchInput";
import "./Index.scss";
import { withRouter } from "react-router-dom";
import myaxios from "../../utils/myaxios";
class Index extends Component {
  state = {
    swiper_list: [],
    imgHeight: 170,
    catitems:[], //首页分类的数据
    productData:[]// 图片列表的数据
  };
  // 轮播图点击事件
  handleSwiperClick = (goods_id) => {
    this.props.history.push("/goodDetail/" + goods_id);
  };
  // 导航图片的点击
  handleCatItemClick = (params) => {
     this.props.history.push("/category"); 
  }
  // 图片列表的点击事件
  handleImgClick = ()=>{
      this.props.history.push("/goodList?"+"query='服装'");
  }
  

  componentDidMount() {
      /* 首页轮播图数据 */
    myaxios.get("home/swiperdata")
      .then((res) => {
        console.log(res)
        this.setState({
          swiper_list: res,
        });
      })
      .catch((err) => console.log(err));
      /* 首页导航的数据 */
    myaxios.get("/home/catitems").then(res=>{
      console.log(res)
        this.setState({
            catitems:res
        })
    })
    /* 首页图片列表 */
    myaxios.get("/home/floordata").then(res=>{
      console.log("首页图片列表")
      console.log(res)
        this.setState({
            productData:res
        })
    })
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
        {/* 首页搜索框结束 */}
        {/* 首页轮播图开始 */}
        <div className="yg-index-swiper">
          <Carousel autoplay={true} infinite>
            {this.state.swiper_list.map((val) => (
              <div
                onClick={this.handleSwiperClick.bind(this, val.goods_id)}
                key={val.goods_id}
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight,
                }}
              >
                <img
                  src={val.image_src}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        {/* 首页轮播图结束 */}
        {/* 首页分类导航开始 */}
        <div className="yg-index-catitems">
              <div className="catitems-item">
              <Flex>
                  {
                      this.state.catitems.map(v=>{
                          return <Flex.Item key={v.image_src} onClick={this.handleCatItemClick}>
                              <img src={v.image_src} alt=""/>
                          </Flex.Item>
                      })
                  }
              </Flex>
              </div>    
        </div>
        {/* 首页分类导航结束 */}
        {/* 首页图片列表开始 */}
        <div className="yg-index-productData">
            {
                this.state.productData.map(v=>{
                    return <div key={v.floor_title.image_src} className="productData-item">
                        {/* 标题开始 */}
                        <div className="product-title">
                            <img src={v.floor_title.image_src} alt=""/>
                        </div>
                        {/* 标题结束 */}
                        {/* 图片列表的开始 */}
                        <div className="product-image-list">
                            {
                                v.product_list.map(vv=>{
                                    return <div className="image-list-item" key={vv.image_src} onClick={this.handleImgClick}>
                                        <img src={vv.image_src} alt=""/>
                                    </div>
                                })
                            }
                        </div>
                        {/* 图片列表的结束 */}

                    </div>
                })
            }
        </div>
        {/* 首页图片列表结束 */}

        
      </div>
    );
  }
}
export default withRouter(Index);