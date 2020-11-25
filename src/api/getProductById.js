import axios from 'axios';
import { GETPRODUCTBYID } from './../config/config';

async function getProductById(id){
    let data;
    await axios.get(GETPRODUCTBYID + id)
    .then(function (res) {
        data = res.data;
    })
    .catch(function (err) {
        data = err.res;
    });
    return data;
}

export default getProductById;