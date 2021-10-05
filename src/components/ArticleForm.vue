<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">
        <AppErrorMessage :errors="validationErrors" v-if="validationErrors" />

        <form @submit.prevent="submitForm()">
          <fieldset class="form-group">
            <input
              class="form-control form-control-lg"
              type="text"
              placeholder="Article Title"
              v-model="title"
            />
          </fieldset>

          <fieldset class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="What's this article about?"
              v-model="description"
            />
          </fieldset>

          <fieldset class="form-group">
            <textarea
              class="form-control"
              rows="8"
              placeholder="Write your article (in markdown)"
              v-model="body"
            >
            </textarea>
          </fieldset>

          <fieldset class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="Enter tags"
              v-model="tagList"
            />

            <div class="tag-list">tag-list</div>
          </fieldset>

          <button
            class="btn btn-lg pull-xs-right btn-primary"
            type="submit"
            :disabled="isSubmitting"
          >
            Publish Article
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AppErrorMessage from '@/components/ErrorMessaga.vue'

export default {
  name: 'AppArticleForm',
  components: {
    AppErrorMessage,
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    }
  },
  props: {
    initialValues: {
      type: Object,
      required: false,
    },
    validationErrors: {
      type: String,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    submitForm() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' '),
      }
      this.$emit('articleSubmit', form)
    },
  },
}
</script>
