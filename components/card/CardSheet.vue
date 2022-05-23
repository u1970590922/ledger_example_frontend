<template>
    <v-sheet class="v-sheet--offset mx-auto slide-in-elliptic-bottom-fwd" :color="color" :elevation="elevation"
        :max-width="`calc(100% - ${reduceWidth}px)`" dark>
        <v-card-title>
            {{ text }}
            <v-spacer></v-spacer>
            <template v-if="refresh">
                <v-btn icon @click="onClick">
                    <v-icon dark>mdi-sync</v-icon>
                </v-btn>
            </template>
        </v-card-title>
    </v-sheet>
</template>

<script>
export default {
    name: "CardSheet",
    props: {
        color: {
            type: String,
            default: "blue",
        },
        elevation: {
            type: String,
            default: "12",
        },
        text: {
            type: String,
            default: "",
        },
        reduceWidth: {
            type: String,
            default: "30",
        },
        refresh: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClick() {
            this.$emit("click");
        },
    },
};
</script>

<style lang="scss" scoped>
.v-sheet--offset {
    top: -8px;
    position: relative;
    border-radius: 15px;
}
</style>

