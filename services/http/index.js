let client = {};

export const setClient = (newclient) => {
    client = newclient
}

const METHODS = [
    'request', 'delete', 'get', 'head', 'options',
    'post', 'put', 'patch'
];

let service = {};

METHODS.forEach(method => {
    service[method] = function () {
        return client[method].apply(null, arguments);
    }
})

export default service;
