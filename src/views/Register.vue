<template>
  <div class="register">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center ng-binding">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}"> Have an account? </router-link>
          </p>

          <AppValidationErrors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />

          <form
            @submit.prevent="onSubmit"
            class="ng-pristine ng-valid ng-valid-email"
          >
            <fieldset ng-disabled="$ctrl.isSubmitting">
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  v-model="username"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>

              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                :disabled="isSubmitted"
              >
                Sign up
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import AppValidationErrors from '@/components/ValidationErrors.vue'
import {actionTypes} from '@/store/modules/auth.js'
export default {
  name: 'AppRegister',
  components: {
    AppValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
      username: '',
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          password: this.password,
          username: this.username,
        })
        .then((user) => {
          console.log(user)
          this.$router.push({name: 'globalFeed'})
        })
    },
  },
  computed: {
    ...mapState({
      isSubmitted: (state) => state.auth.isSubmitted,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
}
</script>
