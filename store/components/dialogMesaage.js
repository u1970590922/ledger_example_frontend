export const state = () => ({
    show: false,
    message: ''
})

export const actions = {
    close({
        commit
    }) {
        commit('displayChange', false)
        commit('resetMessage')
    },
}

export const mutations = {
    show(state, message) {
        state.message = message
        state.show = true
    },
    displayChange(state, show) {
        state.show = show
    },
    resetMessage(state) {
        state.message = ''
    },
}
