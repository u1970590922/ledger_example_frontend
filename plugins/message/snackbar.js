import { cloneDeep } from 'lodash'

const DEFAULT_PAYLOAD = {
    message: '',
    color: 'success',
    position: 'top'
}

export default ({
    store
}, inject) => {
    inject('snackbar', {
        show(payload) {
            if (typeof payload === 'string' || payload instanceof String) {
                payload = { message: payload };
            }
            store.commit('components/snackbar/reset')
            store.commit('components/snackbar/show', Object.assign(cloneDeep(DEFAULT_PAYLOAD), payload))
        }
    })
}
