export const state = () => ({
    show: false,
    message: '',
    color: '',
    position: {
        top: false,
        bottom: false,
        left: false,
        right: false,
    },
})

export const actions = {
    close({
        commit
    }) {
        commit('displayChange', false)
    },
}

export const mutations = {
    show(state, payload) {
        state.message = payload.message
        state.color = payload.color
        payload.position.split('-').forEach(key => {
            state.position[key] = true
        });
        state.show = true
    },
    displayChange(state, show) {
        state.show = show
    },
    reset(state) {
        state.show = false
        state.message = ''
        state.color = ''
        Object.keys(state.position).forEach(key => {
            state.position[key] = false
        })
    }
}
