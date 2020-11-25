import React from 'react';
import { Pagination } from 'antd';
import Item from './Item';

class Items extends React.Component{

    constructor(){
        super();
        this.state = {
            numEachPage: 9,
            minValue: 0,
            maxValue: 9
        }
    }

    handleChange = (value) => {
        const { numEachPage } = this.state;
        this.setState({
            minValue: (value - 1) * numEachPage,
            maxValue: value * numEachPage
        })
    }

    render(){  
        let { numEachPage } = this.state;
        let { products } = this.props;
        const total = Math.ceil(products.length/numEachPage);
        return(
            <div className="col-sm-9 padding-right">
                <div className="features_items">
                    <h2 className="title text-center">sản phẩm nổi bật</h2>
                    <div className="row">
                    {this.showProducts(products)}
                    </div>                    
                </div>
                <Pagination 
                    defaultCurrent={1}
                    defaultPageSize = {numEachPage}
                    onChange={ this.handleChange }
                    total={total*numEachPage} 
                />
            </div>
        )
    }

    showProducts(products) {
        let result = null;
        let { onAddToCart , history } = this.props;
        let { minValue, maxValue } = this.state;
        if(products.length > 0){
            result = this.props.products.slice(minValue, maxValue).map((product, index) => {
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


export default Items;