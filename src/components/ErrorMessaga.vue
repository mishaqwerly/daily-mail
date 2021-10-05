<template>
  <div class="error-message">{{ error }}</div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    error: {
      type: String,
      required: false,
      default: 'Something went wrong',
    },
  },
}
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
}
</style>
