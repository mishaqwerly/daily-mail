<template>
  <div>
    <AppArticleForm
      :initialValues="initialValues"
      :validationErrors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm.vue'
import {actionTypes} from '@/store/modules/createArticle.js'

export default {
  name: 'AppCreateArticle',
  components: {
    AppArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
      validationErrors: null,
      isSubmitting: false,
    }
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, {articleInput})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
}
</script>
