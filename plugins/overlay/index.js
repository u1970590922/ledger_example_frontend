import { cloneDeep } from 'lodash'

const DEFAULT_PAYLOAD = {
    message: '處理中...',
    color: 'blue'
}

export default ({
    store
}, inject) => {
    inject('overlay', {
        show(payload) {
            if (typeof payload === 'string' || payload instanceof String) {
                payload = { message: payload };
            }
            store.commit('components/overlay/show', Object.assign(cloneDeep(DEFAULT_PAYLOAD), payload))
        },
        close() {
            store.commit('components/overlay/close')
        }
    })
}
