import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../actions/actions';
import getAllCategories from './../api/getAllCategories';
import getAllProducts from './../api/getAllProducts';

class Aside extends React.Component{
    constructor(){
            super();
            this.state = {
                isMenFashion: true,
                isWomenFashion: true
               
            }
        }
    async componentDidMount(){
        const data = await getAllCategories()
        this.props.listCategories(data)
    }      

    onToggleCategoryMen=(e)=>{
        e.preventDefault();
        this.setState({
            isMenFashion: !this.state.isMenFashion
        }) 
    }
    
    onToggleCategoryWomen=(e)=>{
        e.preventDefault();
        this.setState({
            isWomenFashion: !this.state.isWomenFashion
        })    
    }

    //Get product by slug
    onSlug = async (slug) => {
        const data = await getAllProducts();
        const productBySlug = data.filter(product => product.slug === slug)
        this.props.listProductsBySlug(productBySlug)
    }


    render() {
        var {isMenFashion, isWomenFashion} = this.state
        var { categories } = this.props

        var showCategoryMen = categories.filter(category => category.type === 'nam').map((category, index)=>{
            return <li key={index}>
                        <NavLink 
                            to={`/products/${category.slug}`} 
                            onClick={()=>{this.onSlug(category.slug)}}>
                            {category.name}
                        </NavLink>
                    </li>
            });
        var showCategoryWomen = categories.filter(category => category.type === 'nu').map((category, index)=>{
            return <li key={index}>
                        <NavLink to={`/products/${category.slug}`} 
                            onClick={()=>{this.onSlug(category.slug)}}>
                            {category.name}
                        </NavLink>
                    </li>
            });           
             
        return(

            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>Thể Loại</h2>
                    <div className="panel-group category-products" id="accordian">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a  data-toggle="collapse" 
                                        data-parent="#accordian" 
                                        href="#nam"
                                        onClick={this.onToggleCategoryMen}>
                                        <span className="badge pull-right"><i className={isMenFashion ? "fa fa-plus" : 'fa fa-minus'}></i></span>
                                        Thời Trang Nam
                                    </a>
                                </h4>
                            </div>
                            <div id="nam" className={"panel-collapse" && isMenFashion ? "collapse" : ''}>
                                <div className="panel-body">
                                    <ul>
                                        {showCategoryMen}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                    <a  data-toggle="collapse" 
                                        data-parent="#accordian" 
                                        href="#nu"
                                        onClick={this.onToggleCategoryWomen}>
                                        <span className="badge pull-right"><i className={isWomenFashion ? "fa fa-plus" : 'fa fa-minus'} ></i></span>
                                        Thời Trang Nữ
                                    </a>
                                </h4>
                            </div>
                            <div id="nu" className={"panel-collapse" && isWomenFashion ? "collapse" : ''}>
                            
                                <div className="panel-body">
                                    <ul>
                                        {showCategoryWomen}            
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="brands_products">
                        <h2>Nhãn Hiệu</h2>
                        <div className="brands-name">
                            <ul className="nav flex-column nav-stacked">
                                <li><NavLink to="#"> <span className="pull-right">(22)</span>Nike</NavLink></li>
                                <li><NavLink to="#"> <span className="pull-right">(58)</span>Gucci</NavLink></li>
                            </ul>
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        categories: state.categories.categories   
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        listCategories: ( categories )=> {
            dispatch(action.fetchCategories(categories));
        },
        listProductsBySlug: (productsBySlug)=>{
            dispatch(action.fetchProductBySlug(productsBySlug));
        }

    }
}

// export default Aside;
export default connect(mapStateToProps, mapDispatchToProps)(Aside);