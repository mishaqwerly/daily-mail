<template>
  <div>
    <ul class="error-messages">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppValidationErrors',
  components: {},
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errors() {
      const errors = []
      Object.keys(this.validationErrors).forEach((key) => {
        errors.push(...this.validationErrors[key])
      })
      return errors
    },
  },
  methods: {},
}
</script>
