<template>
  <div>
    <AppLoader v-if="isLoadingTags" />
    <AppErrorMessage :errors="errors" v-if="errors" />
    <div class="sidebar">
      <p>Popular Tags</p>
      <div v-if="tags" class="tag-list">
        <router-link
          class="tag-default tag-pill"
          v-for="(tag, index) in tags"
          :key="index"
          :to="{name: 'tag', params: {slug: tag}}"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/Loader.vue'
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags.js'
export default {
  name: 'AppPopularTags',
  components: {
    AppLoader,
  },
  computed: {
    ...mapState({
      errors: (state) => state.popularTags.errors,
      isLoadingTags: (state) => state.popularTags.isLoading,
      tags: (state) => state.popularTags.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTags)
  },
}
</script>
