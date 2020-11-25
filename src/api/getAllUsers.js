import axios from 'axios';
import { GETALLUSERS } from './../config/config';

async function getAllUsers(){
    let data;
    await axios.get(GETALLUSERS)
    .then(function (res) {
        data = res.data;
    })
    .catch(function (err) {
        data = err.res;
    });
    return data;
}

export default getAllUsers;