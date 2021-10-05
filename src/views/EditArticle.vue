<template>
  <div>
    <AppLoader v-if="isLoading" />
    <AppArticleForm
      v-if="initialValues"
      :initialValues="initialValues"
      :validationErrors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="submitFrom"
    />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm.vue'
import {actionTypes} from '@/store/modules/editArticle.js'
import AppLoader from '@/components/Loader.vue'
import {mapState} from 'vuex'
export default {
  name: 'AppEditArticle',
  components: {
    AppArticleForm,
    AppLoader,
  },
  data() {
    return {
      isSubmitting: false,
    }
  },
  methods: {
    submitFrom(articleInput) {
      this.$store
        .dispatch(actionTypes.updateArticle, {
          article: articleInput,
          slug: this.slug,
        })
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
  computed: {
    ...mapState({
      initialValues: (state) => state.editArticle.data,
      isLoading: (state) => state.editArticle.isLoading,
      validationErrors: (state) => state.editArticle.validationErrors,
    }),
    slug() {
      return this.$route.params.slug
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, this.slug)
  },
}
</script>
