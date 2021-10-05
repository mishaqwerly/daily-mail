<template>
  <ul class="pagination">
    <li
      class="page-item"
      v-for="page in pages"
      :key="page"
      :class="{active: page === currentPage}"
    >
      <router-link class="page-link" :to="{url: url, query: {page: page}}">{{
        page
      }}</router-link>
    </li>
  </ul>
</template>

<script>
import {range} from '@/helpers/utils.js'
export default {
  name: 'AppPagination',
  props: {
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    pages() {
      let pageCount = Math.ceil(this.total / this.limit)
      return range(1, pageCount)
    },
  },
  mounted() {},
}
</script>
