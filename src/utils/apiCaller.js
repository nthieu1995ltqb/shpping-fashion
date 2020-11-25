import axios from 'axios';

export default function callApi(endpoint, method='GET', body){
	return axios({
			method: method,
			url: `http://localhost:3000/${endpoint}`,
			// url: `https://5fae71a563e40a0016d89ace.mockapi.io/api/shopping-v1/${endpoint}`,
			data: body
		}).catch(error =>{
		});
}