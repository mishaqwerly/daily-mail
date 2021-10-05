<template>
  <div>
    <AppLoader v-if="isLoading" />
    <AppErrorMessage :errors="errors" v-if="errors" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img
              src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
            />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <AppTagList
            v-if="article.tagList.length"
            :tagLust="article.tagList"
          />
        </router-link>
      </div>
    </div>
    <AppPagination
      v-if="feed"
      :total="feed.articlesCount"
      :limit="limit"
      :currentPage="currentPage"
      :url="baseUrl"
    />
  </div>
</template>

<script>
import AppPagination from '@/components/Pagination.vue'
import AppLoader from '@/components/Loader.vue'
import AppTagList from '@/components/TagList.vue'
import AppErrorMessage from '@/components/ErrorMessaga.vue'
import {actionTypes} from '@/store/modules/feed.js'
import {mapState} from 'vuex'
import {limit} from '@/helpers/variables.js'
import queryString from 'query-string'

export default {
  name: 'AppFeed',
  components: {
    AppPagination,
    AppLoader,
    AppErrorMessage,
    AppTagList,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      errors: (state) => state.feed.errors,
      feed: (state) => state.feed.data,
      isLoading: (state) => state.feed.isLoading,
    }),
    currentPage() {
      let page = this.$route.query.page ? +this.$route.query.page : 1
      return page
    },
    baseUrl() {
      return this.$route.path
    },
    limit() {
      return limit
    },
    ofset() {
      return this.currentPage * limit - limit
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
  },
  methods: {
    fetchFeed() {
      const stringified = queryString.stringify({
        limit: this.limit,
        ofset: this.ofset,
        ...this.apiUrl.query,
      })
      const apiUrlWuthParams = `${this.apiUrl}?${stringified}`
      this.$store.dispatch(actionTypes.getData, {apiUrl: apiUrlWuthParams})
    },
  },
  mounted() {
    this.fetchFeed()
  },
}
</script>

<style lang="scss">
.article-meta img {
  height: 44px;
  width: 44px;
  margin-right: 6px;
}
</style>
