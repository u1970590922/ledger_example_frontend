<template>
    <v-snackbar :top="position.top" :bottom="position.bottom" :left="position.left" :right="position.right"
        v-model="show" :color="color">
        <v-icon color="#FFFFFF" v-if="color === 'success'">mdi-check-circle-outline</v-icon>
        <v-icon color="#FFFFFF" v-else-if="color === 'error'">mdi-alert-circle-outline</v-icon>
        <v-icon color="#FFFFFF" v-else>mdi-alert-circle-outline</v-icon>
        <span>{{ message }}</span>
        <template v-slot:action="{ attrs }">
            <v-btn color="white" fab small text v-bind="attrs" @click="close">
                <v-icon>mdi-window-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "Snackbar",
    computed: {
        show: {
            get() {
                return this.$store.state.components.snackbar.show
            },
            set(value) {
                this.$store.commit("components/snackbar/displayChange", value)
            }
        },
        ...mapState("components/snackbar", [
            "message",
            "color",
            "position",
        ])
    },
    methods: {
        ...mapActions("components/snackbar", ["close"])
    }
};
</script>
