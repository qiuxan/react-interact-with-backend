import axios from "axios";


axios.interceptors.response.use(null, error => {
    // console.log('interceptor called');
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        alert('An unexpected error occurred.');
        console.log("looging the error", error);
    }
    return Promise.reject(error);

});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};