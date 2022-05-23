<template>
  <ValidationProvider :rules="rules" :name="name" :vid="vid" v-slot="{ errors }">
    <template v-if="searchable">
      <v-autocomplete :value="value" :items="items" :item-text="keys[0]" :item-value="keys[1]" :label="label"
        :multiple="multiple" :error-messages="errors" :clearable="clearable" :disabled="disabled"
        @click:clear="handleClear" @change="handleChange"></v-autocomplete>
    </template>
    <template v-else>
      <v-select :value="value" :items="items" :item-text="keys[0]" :item-value="keys[1]" :label="label"
        :multiple="multiple" :error-messages="errors" :clearable="clearable" :disabled="disabled"
        @click:clear="handleClear" @change="handleChange"></v-select>
    </template>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputMenu',
  props: {
    value: {
      type: [String, Number, Boolean, Array, Object],
      default: undefined,
    },
    items: {
      type: Array,
      default: () => [],
    },
    keys: {
      type: Array,
      default: () => ['text', 'value'],
    },
    label: {
      type: String,
      default: '請選擇...',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    disabled: {
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
    handleChange(value) {
      this.$emit('input', value)
    },
    handleClear() {
      this.$emit('input', undefined)
    },
  },
}
</script>
