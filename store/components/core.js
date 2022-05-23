export const state = () => ({
    drawer: false,
    miniVariant: true,
    footerFixed: false,
    size: {
        height: 0,
        width: 0
    }
})

export const mutations = {
    updateDrawer(state, drawer) {
        state.drawer = drawer;
    },
    updateMiniVariant(state, miniVariant) {
        state.miniVariant = miniVariant;
    },
    updateFooterFixed(state, fixed) {
        state.footerFixed = fixed;
    },
    updateWindowSize(state, size) {
        state.size.height = size.height;
        state.size.width = size.width;
    }
}
