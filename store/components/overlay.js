export const state = () => ({
    message: '',
    color: '',
    status: false
})

export const mutations = {
    show(state, payload) {
        state.status = true
        state.message = payload.message
        state.color = payload.color
    },
    close(state) {
        state.status = false
    }
}
