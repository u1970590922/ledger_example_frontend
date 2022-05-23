<template>
    <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
            <v-fab-transition>
                <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right small color="cyan" v-bind="attrs"
                    v-on="on" @click="toTop">
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </v-fab-transition>
        </template>
        <span>滾動到頂部</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'ScrollTop',
    data() {
        return {
            fab: false
        }
    },
    methods: {
        onScroll(e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop() {
            this.$vuetify.goTo(0)
        },
    },
}
</script>
