<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
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
          <span>
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'EditArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle()"
            >
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <AppLoader v-if="isLoading" />
      <AppErrorMessage :errors="errors" v-if="errors" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <AppTagList
            v-if="article.tagList.length"
            :tagLust="article.tagList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/article.js'
import {mapState} from 'vuex'
import AppErrorMessage from '@/components/ErrorMessaga.vue'
import AppLoader from '@/components/Loader.vue'
import AppTagList from '@/components/TagList.vue'
export default {
  name: 'AppArticle',
  components: {
    AppErrorMessage,
    AppLoader,
    AppTagList,
  },
  mounted() {
    this.$store.dispatch(actionTypes.fetchArticle, this.slug)
  },
  computed: {
    ...mapState({
      article: (state) => state.article.data,
      errors: (state) => state.article.errors,
      isLoading: (state) => state.article.isLoading,
    }),
    slug() {
      return this.$route.params.slug
    },
  },
  methods: {
    deleteArticle() {
      this.$store.dispatch(actionTypes.deleteArticle, this.slug)
      this.$router.push({name: 'globalFeed'})
    },
  },
}
</script>
