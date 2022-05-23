export default ({
    store
}, inject) => {
    inject('dialogMessage', {
        show(message) {
            store.commit('components/dialogMesaage/show', message)
        },
        close() {
            store.dispatch('components/dialogMesaage/close')
        }
    })
}
