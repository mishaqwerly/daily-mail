import feedApi from '@/api/feed.js'

const state = {
  data: null,
  errors: null,
  isLoading: false,
}

export const mutationTypes = {
  getDataStart: '[feed] getDataStart',
  getDataSuccess: '[feed] getDataSuccess',
  getDataFailure: '[feed] getDataFailure',
}

export const actionTypes = {
  getData: '[feed] getData',
}

const mutations = {
  [mutationTypes.getDataStart](state) {
    state.isLoading = true
    state.data = null
    state.errors = null
  },
  [mutationTypes.getDataSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getDataFailure](state, payload) {
    state.isLoading = false
    state.errors = payload
  },
}

const actions = {
  [actionTypes.getData](context, {apiUrl}) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.getDataStart)
      feedApi
        .getFeed(apiUrl)
        .then((response) => {
          resolve(response.data)
          context.commit(mutationTypes.getDataSuccess, response.data)
        })
        .catch((error) => {
          reject(error)
          context.commit(mutationTypes.getDataFailure, error)
        })
    })
  },
}

export default {
  state,
  actions,
  mutations,
}
