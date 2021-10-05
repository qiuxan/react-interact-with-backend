import axios from "axios";
import { toast } from 'react-toastify';
import * as Sentry from "@sentry/react";


axios.interceptors.response.use(null, error => {
    // console.log('interceptor called');
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        toast.error('An unexpected error occurred.');
        Sentry.captureException(error);
        // console.log("looging the error", error);

    }
    return Promise.reject(error);

});

export default Sentry.withProfiler({
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
});

