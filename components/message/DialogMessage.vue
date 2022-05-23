<template>
    <v-dialog v-model="show" max-width="300" persistent overlay-opacity="1">
        <v-card>
            <v-card-title>
                <v-icon left color="orange">mdi-information</v-icon>系統訊息
            </v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions v-if="$nuxt.isOnline">
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close">
                    關閉
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'DialogMessage',
    computed: {
        ...mapState('components/dialogMesaage', ['show', 'message'])
    },
    methods: {
        ...mapActions("components/dialogMesaage", ['close'])
    }
}
</script>