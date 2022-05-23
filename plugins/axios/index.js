import ErrorHandler from './errorHandler';
import {
    setClient
} from '~/services/http';
import {
    Model
} from 'vue-api-query';

export default ({
    $axios,
    $snackbar
}) => {

    $axios.onRequest(config => {
        return config
    })

    $axios.onRequestError(error => {
        return Promise.reject(error)
    })

    $axios.onResponseError(error => {
        const errorHandler = new ErrorHandler(error);
        $snackbar.show({
            message: errorHandler.getMessage(),
            color: "error",
        });
        return Promise.reject(error);
    })

    setClient($axios);
    Model.$http = $axios;
}
