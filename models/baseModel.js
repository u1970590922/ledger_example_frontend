import {
    Model as BaseModel
} from 'vue-api-query'

export default class Model extends BaseModel {

    baseURL() {
        return `${process.env.BASE_URL}/api/v1`
    }

    request(config) {
        return this.$http.request(config)
    }

    parameterNames() {
        const defaultParams = super.parameterNames()
        const customParams = {
            page: 'page[number]',
            limit: 'page[size]',
        }

        return { ...defaultParams, ...customParams }
    }
}
