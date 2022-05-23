<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
    min-width="290px">
    <template v-slot:activator="{ on }">
      <ValidationProvider :rules="rules" :name="name" :vid="vid" v-slot="{ errors }">
        <v-text-field :value="value" :label="label" readonly v-on="on" :error-messages="errors" :clearable="clearable"
          @click:clear="handleClear">
        </v-text-field>
      </ValidationProvider>
    </template>
    <v-date-picker :value="value" @input="menu = false" @change="handleChange"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'InputDate',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '請選擇...',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    vid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value)
    },
    handleClear() {
      this.$emit('input', null)
    },
  },
}
</script>
