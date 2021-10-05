<template>
  <div class="app">
    <AppHeader />
    <router-view />
  </div>
</template>
<script>
import AppHeader from '@/components/Header.vue'
import {actionTypes} from '@/store/modules/auth.js'
export default {
  name: 'Home',
  components: {
    AppHeader,
  },
  computed: {},
  methods: {},
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  },
}
</script>

<style lang="scss">
body {
  background: #1b1c23;
  color: #d2d5da;
}

a {
  color: rgb(255, 179, 111);
}

.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover {
  color: rgb(255, 179, 111);
}

.nav-pills.outline-active .nav-link.active {
  background: #fff !important;
  border-bottom: 2px solid rgb(255, 179, 111) !important;
  color: rgb(255, 179, 111) !important;
}
.page-link:focus,
.page-link:hover {
  color: #1b1c23;
}

.nav-pills.outline-active .nav-link.active {
  background: #6a6a6a !important;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.navbar-light .navbar-nav .nav-link {
  color: #d2d5da;
}

.home-page .sidebar {
  background: #6a6a6a;
  color: #d2d5da;
}

.article-preview {
  border-top: 1px solid #d2d5da;
}

.page-link {
  background: #6a6a6a;
  color: #d2d5da;
  border: 1px solid #aaa8a8;
}

.article-preview {
  border-top: 1px solid #d2d5da;
  background: #353535;
  margin-bottom: 28px;
  padding: 1.5rem 1rem;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
}

.home-page .banner {
  background: rgb(255, 179, 111);
}

.navbar-brand {
  color: rgb(255, 179, 111) !important;
}

.page-item.active .page-link,
.page-item.active .page-link:focus,
.page-item.active .page-link:hover {
  background-color: rgb(255, 179, 111);
  border-color: rgb(255, 179, 111);
}

.btn {
  margin: 0 5px;
}
</style>
