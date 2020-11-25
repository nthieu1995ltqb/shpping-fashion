import './index.scss';
import React from 'react';
import Aside from '../../components/Aside';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import getAllProducts from './../../api/getAllProducts';
import * as action from '../../actions/actions';
import Item from './../../components/Item';

class Products extends React.Component{
    constructor(){
        super();
        this.state = {
            numEachPage: 6,
            minValue: 0,
            maxValue: 6
        }
    }

    async componentDidMount(){
        const data = await getAllProducts();
        this.props.listProducts(data)    
    }   

    handleChange = (value) => {
        const { numEachPage } = this.state;
        this.setState({
            minValue: (value - 1) * numEachPage,
            maxValue: value * numEachPage
        })
    }
    
    render(){

        let { products } = this.props;
        let { numEachPage } = this.state;
        const total = Math.ceil(products.length/numEachPage);
        return(        
            <div className="container" >
                <div className="row">
                    <Aside />
                    
                    <div className="col-sm-9 padding-right">
                        <div className="features_items">
                            <h2 className="title text-center">Sản Phẩm</h2>
                            {this.showProducts(products)}
                        </div>
                        <Pagination 
                            defaultCurrent={1}
                            defaultPageSize = {numEachPage}
                            onChange={ this.handleChange }
                            total={total*numEachPage} 
                        />
                    </div>
                </div>
            </div>
            
        )
    }


    showProducts(products){
        var result = null;
        var {onAddToCart , history, products} = this.props;
        var { minValue, maxValue } = this.state;
        if(products.length > 0){
            result = products.slice(minValue, maxValue).map((product, index) => {
                return <Item
                            key={index} 
                            product={product}
                            onAddToCart = {onAddToCart}
                            history = {history}
                            />
            });
        }
        return result;
    }
}

const mapStateToProps = (state)=>{
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props)=>{
    return{
        onAddToCart: (product) =>{
            dispatch(action.actAddToCart(product, 1));
        },
        listProducts: (products) => {
            dispatch(action.fetchProduct(products))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Products);