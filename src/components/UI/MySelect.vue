<template>
  <select :modelValue="modelValue" @change="changeOptions">
    <option value="">Choose something from list</option>
    <option v-for="option of options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: { type: Array, default: () => [] },
  },
  methods: {
    changeOptions(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
