<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <Navbar
      :is-dark-mode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"
      @change-language="changeLanguage"
    />
    <main class="flex-grow-1">
      <router-view :is-dark-mode="isDarkMode" />
    </main>
    <Footer :is-dark-mode="isDarkMode" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Navbar, Footer },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>
