import articleApi from '@/api/actilce.js'

const state = {
  data: null,
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
}

export const mutationTypes = {
  getArticleStart: '[editArticle] getArticleStart',
  getArticleSuccess: '[editArticle] getArticleSuccess',
  getArticleFailure: '[editArticle] getArticleFailure',

  updateArticleStart: '[editArticle] updateArticleStart',
  updateArticleSuccess: '[editArticle] updateArticleSuccess',
  updateArticleFailure: '[editArticle] updateArticleFailure',
}

export const actionTypes = {
  getArticle: '[editArticle] getArticle',
  updateArticle: '[editArticle] updateArticle',
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isSubmitting = true
    state.data = null
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isSubmitting = false
    state.data = payload
    state.isLoading = false
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.data = null
    state.isSubmitting = true
    state.validationErrors = payload
    state.isLoading = false
  },

  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true
    state.isLoading = true
  },
  [mutationTypes.updateArticleSuccess](state, payload) {
    state.data = payload
    state.isSubmitting = false
    state.isLoading = false
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.data = null
    state.isSubmitting = true
    state.validationErrors = payload
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getArticle]: (context, slug) => {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.getArticleStart)
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch((errors) => {
          context.commit(mutationTypes.getArticleFailure, errors)
          reject(errors)
        })
    })
  },
  [actionTypes.updateArticle]: (context, {article, slug}) => {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.updateArticleStart)
      articleApi
        .editArticle(article, slug)
        .then((article) => {
          context.commit(mutationTypes.updateArticleSuccess, article)
          resolve(article)
        })
        .catch((result) => {
          console.log(result.response.data.errors)
          debugger
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          )
          reject(result)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
