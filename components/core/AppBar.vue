<template>
    <v-app-bar fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn v-if="!$vuetify.breakpoint.mdAndDown && drawer" icon @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-menu offset-y transition="slide-y-transition">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class="mx-3">
                    <v-avatar size="40">
                        <v-icon dark large>mdi-account-circle-outline</v-icon>
                    </v-avatar>
                </v-btn>
            </template>
            <v-list subheader two-line dense>
                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon large>mdi-account-circle-outline</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>Name</v-list-item-title>
                        <v-list-item-subtitle>Admin</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider class="mx-2" />
                <v-list-item>
                    <v-hover v-slot="{ hover }">
                        <v-list-item-content>
                            <v-btn text :color="hover ? 'cyan darken-1' : null">
                                <v-icon left>mdi-logout-variant</v-icon>
                                登出
                            </v-btn>
                        </v-list-item-content>
                    </v-hover>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar',
    computed: {
        drawer: {
            get() {
                return this.$store.state.components.core.drawer
            },
            set(value) {
                this.$store.commit('components/core/updateDrawer', value)
            }
        },
        miniVariant: {
            get() {
                return this.$store.state.components.core.miniVariant
            },
            set(value) {
                this.$store.commit('components/core/updateMiniVariant', value)
            }
        }
    },
    data() {
        return {
            title: '帳本'
        }
    }
}
</script>