<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="(tag, idx) in tagLust"
      :key="idx"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppTagList',
  props: {
    tagLust: {
      type: Array,
      required: false,
    },
  },
}
</script>
