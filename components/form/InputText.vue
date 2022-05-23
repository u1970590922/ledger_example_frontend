<template>
  <ValidationProvider :rules="rules" :name="name" :vid="vid" v-slot="{ errors }">
    <v-text-field :value="value" :type="type" :label="label" :min="min" :max="max" :step="step" :prepend-icon="icon"
      :readonly="readonly" :clearable="clearable" :disabled="disabled" :error-messages="errors" @input="handleInput"
      @click:clear="handleClear"></v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '請輸入...',
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    icon: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    },
    handleClear() {
      this.$emit('input', null)
    },
  },
}
</script>
