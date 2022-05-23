<template>
    <v-navigation-drawer v-model="drawer" :mini-variant="$vuetify.breakpoint.mdAndDown ? false : miniVariant" fixed app>
        <v-list>
            <div v-for="(item, index) in routes" :key="index">
                <RouteList :routes="item" :key="index" />
            </div>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import RouteList from '@/components/list/RouteList'

export default {
    name: 'Drawer',
    components: {
        RouteList
    },
    computed: {
        drawer: {
            get() {
                return this.$store.state.components.core.drawer
            },
            set(value) {
                this.$store.commit('components/core/updateDrawer', value)
            }
        },
        ...mapState('components/core', ['miniVariant']),
        ...mapState('components/routeList', ['routes']),
    },
}
</script>