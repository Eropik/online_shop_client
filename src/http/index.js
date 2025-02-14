import axios from "axios";

const URL = process.env.REACT_APP_API_URL

const $host=axios.create({
    baseURL:URL
});

const $authHost=axios.create({
    baseURL: URL
});


const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
}

$authHost.interceptors.request.use(authInterceptor);

export{
    $host,
    $authHost
}
