const DEFAULT_ERROR_MESSAGE = '未知錯誤'
const HTTP_ERROR_MESSAGE = {
    400: '請求錯誤',
    401: '認證失敗',
    403: '權限不足',
    404: '資源找不到',
    405: '方法錯誤',
    429: '發送過多請求',
    504: '回應超時',
}

export default class ErrorHandler {

    constructor(error) {
        console.log(error);
        this.error = this.setError(error.response);
        this.statusCode = error.response.status;
    }

    setError(error) {
        if (!error.hasOwnProperty('data')) {
            error.data = {
                message: DEFAULT_ERROR_MESSAGE
            };
        }
        return error;
    }

    getMessage() {
        if (
            this.getStatusCode() != 500
            &&
            this.error.data.hasOwnProperty('message')
        ) {
            return this.error.data.message;
        }
        return this.defaultMessage();
    }

    getStatusCode() {
        return this.statusCode;
    }

    defaultMessage() {
        switch (this.statusCode) {
            case 400:
                return HTTP_ERROR_MESSAGE[400];
            case 401:
                return HTTP_ERROR_MESSAGE[401];
            case 403:
                return HTTP_ERROR_MESSAGE[403];
            case 404:
                return HTTP_ERROR_MESSAGE[404];
            case 405:
                return HTTP_ERROR_MESSAGE[405];
            case 429:
                return HTTP_ERROR_MESSAGE[429];
            case 504:
                return HTTP_ERROR_MESSAGE[504];
            default:
                return DEFAULT_ERROR_MESSAGE;
        }
    }
}
