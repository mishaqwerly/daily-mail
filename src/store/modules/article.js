import articleApi from '@/api/actilce.js'

const state = {
  data: null,
  errors: null,
  isLoading: false,
}

export const mutationTypes = {
  getArticleStart: '[article] getArticleStart',
  getArticleSuccess: '[article] getArticleSuccess',
  getArticleFailure: '[article] getArticleFailure',

  deleteArticleStart: '[article] deleteArticleStart',
  deleteArticleSuccess: '[article] deleteArticleSuccess',
  deleteArticleFailure: '[article] deleteArticleFailure',
}

const mutations = {
  [mutationTypes.getArticleStart]: (state) => {
    state.data = null
    state.errors = null
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess]: (state, payload) => {
    state.data = payload
    state.isLoading = false
  },
  [mutationTypes.getArticleFailure]: (state, payload) => {
    state.errors = payload
    state.isLoading = true
  },

  [mutationTypes.deleteArticleStart]: () => {},
  [mutationTypes.deleteArticleSuccess]: () => {},
  [mutationTypes.deleteArticleFailure]: (state, payload) => {
    state.errors = payload
  },
}

export const actionTypes = {
  fetchArticle: '[article] fetchArticle',
  deleteArticle: '[article] deleteArticle',
}

const actions = {
  [actionTypes.fetchArticle]: (context, slug) => {
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
  [actionTypes.deleteArticle]: (context, slug) => {
    return new Promise(() => {
      context.commit(mutationTypes.deleteArticleStart)
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess)
        })
        .catch((errors) => {
          context.commit(mutationTypes.deleteArticleFailure, errors)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
