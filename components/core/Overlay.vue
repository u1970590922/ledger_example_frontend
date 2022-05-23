<template>
    <v-overlay :value="status" z-index="999">
        <v-row class="fill-height" align-content="center" justify="center">
            <v-progress-circular indeterminate :color="color" :size="message.length * 15">
                <p style="color:white">{{ message }}</p>
            </v-progress-circular>
        </v-row>
    </v-overlay>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Overlay",
    computed: {
        ...mapState("components/overlay", ["status", "message", "color"]),
    },
};
</script>