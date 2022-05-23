<template>
    <v-footer :absolute="footerFixed" app :dark="$vuetify.theme.dark">
        <v-layout class="flex justify-center grow">
            <strong>&copy; {{ new Date().getFullYear() }}</strong>
        </v-layout>
    </v-footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Footer',
    computed: {
        ...mapState('components/core', ['footerFixed']),
    },
}
</script>