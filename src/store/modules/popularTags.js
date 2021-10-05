import popularTagsApi from '@/api/popularTags.js'

const state = {
  data: null,
  errors: null,
  isLoading: false,
}

export const mutationTypes = {
  getDataStart: '[tags] getDataStart',
  getDataSuccess: '[tags] getDataSuccess',
  getDataFailure: '[tags] getDataFailure',
}

export const actionTypes = {
  getTags: '[tags] getTags',
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
  [actionTypes.getTags](context) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.getDataStart)
      popularTagsApi
        .getTags()
        .then((tags) => {
          resolve(tags)
          context.commit(mutationTypes.getDataSuccess, tags)
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
