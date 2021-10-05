<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="№" target="_blank">Daily mail</a>
      <ul class="nav navbar-nav pull-xs-right" v-if="isAnonymous">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{name: 'globalFeed'}"
          >
            Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{name: 'login'}"
          >
            Sign in
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            :to="{name: 'register'}"
          >
            Sign up
          </router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav pull-xs-right" v-else>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'globalFeed'}">
            Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'CreateArticle'}">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'globalFeed'}">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>

        <li class="nav-item" v-if="false">
          <router-link
            class="nav-link"
            :to="{name: 'userProfile', params: {slug: currentUser.username}}"
          >
            <img class="user-pic" :src="currentUser.image" />
            &nbsp;
            {{ currentUser.username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import {mapGetters} from 'vuex'
import {gettersTypes} from '@/store/modules/auth.js'
export default {
  name: 'AppHeader',
  components: {},
  props: {},
  computed: {
    ...mapGetters({
      isLogin: gettersTypes.isLogin,
      currentUser: gettersTypes.currentUser,
      isAnonymous: gettersTypes.isAnonymous,
    }),
  },
  methods: {},
}
</script>
