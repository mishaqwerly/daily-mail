<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLogin">
        <router-link
          :to="{name: 'yourFeed'}"
          class="nav-link"
          :class="{active: currentRout === 'yourFeed'}"
        >
          Your feed
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          :to="{name: 'globalFeed'}"
          class="nav-link"
          :class="{active: currentRout === 'globalFeed'}"
        >
          Global feed
        </router-link>
      </li>

      <li class="nav-item" v-if="currentRout === 'tag'">
        <router-link
          :to="{name: 'tag'}"
          class="nav-link"
          :class="{active: currentRout === 'tag'}"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {gettersTypes} from '@/store/modules/auth.js'
export default {
  name: 'AppFeedToggler',
  props: {},
  computed: {
    ...mapGetters({
      isLogin: gettersTypes.isLogin,
    }),
    currentRout() {
      return this.$route.name
    },
    tagName() {
      return this.$route.params.slug ? this.$route.params.slug : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.feed-toggle {
  width: 100%;
}
</style>
