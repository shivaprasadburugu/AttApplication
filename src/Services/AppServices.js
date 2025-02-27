import axios from "axios";
const branchUrl = 'api/'
const getBaseUrl =() => {
    const hostname = window.location.hostname;
    if(hostname == 'localhost:3000'){

        //return 'https://localhost:44389/' + branchUrl;
        return 'http://172.16.0.205:7005/' + branchUrl;

    }else{

        //return 'https://localhost:44389/' + branchUrl;
        //return 'http://172.16.0.205:7005/' + branchUrl;
        return 'http://14.99.141.154.7005/' + branchUrl;
        
    }

}
const baseUrl = getBaseUrl();

const headers = {
    headers: { 'Content-Type': 'application/json' },
}
export const get = (url) =>{
    debugger
    return axios.get(baseUrl + url, headers);
}
