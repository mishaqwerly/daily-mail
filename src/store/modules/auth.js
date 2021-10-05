import authApi from '@/api/auth'
import {setItem} from '@/helpers/LocalStorageHelper.js'

const state = {
  isSubmiting: false,
  isLogin: null,
  validationErrors: null,
  user: null,
  isLoading: false,
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',
  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmiting = false
    state.isLogin = true
    state.user = payload
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmiting = false
    state.isLogin = false
    state.validationErrors = payload
  },

  [mutationTypes.loginStart](state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmiting = false
    state.isLogin = true
    state.user = payload
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmiting = false
    state.isLogin = false
    state.validationErrors = payload
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLogin = true
    state.user = payload
    state.isLoading = false
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLogin = false
    state.isLoading = false
  },
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.registerStart)
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          resolve(response.data.user)
          setItem('accessToken', response.data.user.token)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailure,
            result.response.data.errors
          )
          reject(result.response.data.errors)
        })
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user)
          resolve(response.data.user)
          setItem('accessToken', response.data.user.token)
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          )
          reject(result.response.data.errors)
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise((resolve, reject) => {
      context.commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          )
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit(mutationTypes.getCurrentUserFailure)
          reject(result.response.data.errors)
        })
    })
  },
}

export const gettersTypes = {
  currentUser: '[auth] currentUser',
  isLogin: '[auth] isLogin',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  [gettersTypes.currentUser]: (state) => state.user,
  [gettersTypes.isLogin]: (state) => state.isLogin,
  [gettersTypes.isAnonymous]: (state) => {
    return state.isLogin == null ? true : false
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
