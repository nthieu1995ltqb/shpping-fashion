import React from 'react';
// import Slideshow from '../../components/Slider'
import Aside from '../../components/Aside'
import Items from '../../components/Items';
import Item from '../../components/Item';
// import axios from 'axios';
import {connect} from 'react-redux';
import * as action from '../../actions/actions';

import Slider from '../../components/Slider';
import getAllProducts from './../../api/getAllProducts';

class HomePage extends React.Component{

    async componentDidMount() {
        const data = await getAllProducts();
        this.props.listProducts(data); 
    }
    
    render() {        
        var {products} = this.props;
        return(
            <div>
                <Slider />
                <div className="container" >
                    <div className="row">
                        <Aside />
                        <Items products={products}/>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        listProducts: (product)=>{
            dispatch(action.fetchProduct(product));
        },
        onAddToCart: (product) =>{
            dispatch(action.actAddToCart(product, 1));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);