import axios from 'axios';
import { GETALLCATEGORIES } from './../config/config';

async function getAllCategories(){
    let data;
    await axios.get(GETALLCATEGORIES)
    .then(function (res) {
        data = res.data;
    })
    .catch(function (err) {
        data = err.res;
    });
    return data;
}

export default getAllCategories;