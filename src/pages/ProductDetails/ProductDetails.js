import React from 'react';
import Aside from '../../components/Aside';

import axios from 'axios';
import {NavLink, withRouter} from 'react-router-dom';

import RelatedProducts from './RelatedProducts';
import BeautyStars from 'beauty-stars';
import {connect} from 'react-redux';
import * as action from '../../actions/actions';

import getAllProducts from './../../api/getAllProducts';
import getProductById from './../../api/getProductById';

class ProductDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //product: [],
            count: 1,
            totalPriceItem: 0,
            productById: [],
            productBySlug: [],
            srcImg: "",
            indexImg: 0,
            slug: ""  
        }
    }
    async componentDidMount(){

        const data = await getAllProducts();
        var { id, slug }=this.props.match.params

        this.setState({
            productById: data.find(product => product.id === id),
            productBySlug: data.filter(product => product.slug === slug).slice(0,4),
            srcImg: data.find(product => product.id === id).img1
        })
    } 

    //handler zoom image
    zoomImage=(e, index)=>{
        e.preventDefault();
        this.setState({
            indexImg: index
        })
    } 

     render(){

        var { indexImg, srcImg, productBySlug, productById } = this.state
        var listImgs = [productById.img1, productById.img2, productById.img3]
        srcImg = srcImg.replace('0', indexImg)
        var showImgs = listImgs.map((img, index)=>{
            return <NavLink to="#" key={index} onClick={(e)=>{this.zoomImage(e, index)}}><img src={'../../'+img} alt=""/></NavLink>
        })

        //Set array related products
        var showRelatedProducts = productBySlug.map((productBySlug, index)=>{
            return <RelatedProducts key={index} 
                                    productBySlug={productBySlug}
                                    img={productBySlug.img}
                                    name={productBySlug.name}
                                    price={productBySlug.price}/>
        })

        return(
            <div className="container" >
                <div className="row">
                    <Aside />
                    
                    <div className="col-sm-9 padding-right">
                        <div className="product-details">
                            <div className="col-sm-5">
                                <div className="view-product">
                                    <img src={"../../" + srcImg} alt="" />
                                </div>
                                <div id="similar-product" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            {showImgs}
                                        </div>   
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-sm-7">
                                <div className="product-information">
                                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                    <h2>{productById.name}</h2>
                                    <p>SKU: ESP00{productById.id}</p>
                                    <img src="images/product-details/rating.png" alt="" />
                                    <span>
                                        <div>
                                        <span>${productById.price}</span>
                                        </div>

                                        <button type="button" className="btn btn-fefault cart"
                                            onClick = { () => this.onAddToCart(productById)}>
                                            <i className="fa fa-shopping-cart"></i> &nbsp;
                                            Thêm Vào Giỏ Hàng
                                        </button>
                                    </span>
                                    <p><b>Tình Trạng:</b> Còn Hàng</p>
                                    <p><b>Trạng Thái:</b> Mới</p>
                                    <p><b>Thương Hiệu:</b> E-SHOPPER</p>
                                    <div className="row">
                                        <b className="col-sm-3" style={{float:"left"}}>Rating:</b>
                                        <div className="col-sm-9">
                                        <BeautyStars                                            
                                            value={productById.rating} 
                                            onChange={value => this.setState({ value })}
                                            size="15px"
                                            activeColor="#fe980f"
                                            inactiveColor="#efdcc3" />
                                        </div>                                       
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="container relate-products">
                            <div className="page-header">
                                <h2>Sản Phẩm Liên Quan</h2>
                            </div>
                            {showRelatedProducts}
                        </div> 
                        
                        <div className="reviews">
                            <h2>Bình Luận</h2>
                            <div className="single-blog-post">
                                <div className="post-meta">
                                    <ul>
                                        <li><NavLink to="#"><i className="fa fa-user"></i>Tác Giả</NavLink></li>
                                        <li><NavLink to="#"><i className="fa fa-clock-o"></i>Thời Gian</NavLink></li>
                                        <li><NavLink to="#"><i className="fa fa-calendar-o"></i>Ngày Tháng</NavLink></li>
                                    </ul>
                                </div>
                                
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                <p><b>Viết Bình Luận</b></p>
                                
                                <form action="#" >
                                    <span>
                                        <input type="text" placeholder="Tên Của Bạn"/>
                                        <input type="email" placeholder="Địa Chỉ Email"/>
                                    </span>
                                    <textarea name="" ></textarea>
                                    <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                    <button type="button" className="btn btn-default pull-right">
                                        Gủi Bình Luận
                                    </button>
                                </form>
                            </div>
                        
                        </div>
                        
                        
                    </div>
                    
                </div>
            </div>
        )
    }

    onAddToCart = (product) =>{
        

        var test = 'TOKEN';
        let { history} = this.props;

        if (test in sessionStorage){
            this.props.onAddToCart(product);
            //console.log("ok")
        } else{
            
            //console.log("err")
            alert("Bạn chưa đăng nhập. Bạn cần phải đăng nhập mới được mua hàng")
            history.push("/login");

        }
        //this.props.onAddToCart(product);
        
    }

}

// export default ProductDetails;

const mapStateToProps = (state)=>{
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props)=>{
    return{
        onAddToCart: (product) =>{
            dispatch(action.actAddToCart(product, 1));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));