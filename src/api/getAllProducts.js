import axios from 'axios';
import { GETALLPRODUCTS } from './../config/config';

async function getAllProducts(){
    let data;
    await axios.get(GETALLPRODUCTS)
    .then(function (res) {
        data = res.data;
    })
    .catch(function (err) {
        data = err.res;
    });
    return data;
}

export default getAllProducts;