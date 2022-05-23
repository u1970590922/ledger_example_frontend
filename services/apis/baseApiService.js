import { isObject } from "lodash"
import http from '~/services/http'

const PATH_PREFIX = '/'

export default class BaseApiService {

    constructor(resource) {
        this.resource = resource
        this.withoutResource = false
    }

    withoutResourcePath() {
        this.withoutResource = true
    }

    addResourcePath(path) {
        if (path.substring(0, 1) === PATH_PREFIX) {
            path = ''
        } else {
            path = `${PATH_PREFIX}${path}`
        }
        return `${PATH_PREFIX}${this.resource}${path}`
    }

    preparePath(path) {
        if (this.withoutResource) {
            return path
        }
        return this.addResourcePath(path)
    }

    get(...args) {
        args[0] = this.preparePath(args[0])
        return http.get(...args)
    }

    post(...args) {
        args[0] = this.preparePath(args[0])
        return http.post(...args)
    }

    patch(...args) {
        args[0] = this.preparePath(args[0])
        return http.patch(...args)
    }

    delete(...args) {
        args[0] = this.preparePath(args[0])
        return http.delete(...args)
    }

    getById(id) {
        return this.get(String(id))
    }

    create(data) {
        if (!(data instanceof FormData)) {
            if (isObject(data)) {
                data = JSON.stringify(data)
            }
        }
        return this.post('/', data)
    }

    update(id, data) {
        if (data instanceof FormData) {
            data.set('_method', 'PUT')
            return this.post(String(id), data)
        } else {
            if (isObject(data)) {
                data = JSON.stringify(data)
            }
            return this.put(String(id), data)
        }
    }

    destroy(id) {
        return this.delete(String(id))
    }

    download(path, params) {
        return this.get(path, {
            responseType: "blob",
            params
        })
    }
}
