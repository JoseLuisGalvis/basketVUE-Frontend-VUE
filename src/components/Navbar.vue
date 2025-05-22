<template>
  <nav class="navbar navbar-expand-lg" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/src/assets/images/nbalogo.png"
          alt="Logo"
          width="100"
          height="50"
          class="me-2 logo-rectangular"
        />
        <span class="text-white shadow-nba">{{ $t("home.title") }}</span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleNavbar"
        aria-controls="navbarNav"
        :aria-expanded="isNavbarOpen"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: isNavbarOpen }"
        id="navbarNav"
      >
        <div class="navbar-nav ms-auto">
          <router-link
            class="nav-link text-white"
            to="/"
            @click="closeNavbar"
            >{{ $t("navbar.home") }}</router-link
          >
          <router-link
            class="nav-link text-white"
            to="/gallery"
            @click="closeNavbar"
            >{{ $t("navbar.gallery") }}</router-link
          >
          <router-link
            class="nav-link text-white"
            to="/filter"
            @click="closeNavbar"
            >{{ $t("navbar.filter") }}</router-link
          >
          <button class="btn btn-nba ms-2" @click="$emit('toggle-dark-mode')">
            <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
          </button>
          <div class="dropdown ms-2" ref="languageDropdown">
            <button
              class="btn btn-nba dropdown-toggle"
              type="button"
              @click="toggleLanguageDropdown"
              :aria-expanded="isLanguageDropdownOpen"
            >
              {{ currentLanguageLabel }}
            </button>
            <ul class="dropdown-menu" :class="{ show: isLanguageDropdownOpen }">
              <li>
                <button
                  class="dropdown-item"
                  :class="{ active: $i18n.locale === 'es' }"
                  @click="changeLanguage('es')"
                >
                  🇪🇸 Español
                </button>
              </li>
              <li>
                <button
                  class="dropdown-item"
                  :class="{ active: $i18n.locale === 'en' }"
                  @click="changeLanguage('en')"
                >
                  🇺🇸 English
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    isDarkMode: Boolean,
  },
  data() {
    return {
      isNavbarOpen: false,
      isLanguageDropdownOpen: false,
    };
  },
  computed: {
    currentLanguageLabel() {
      return this.$i18n.locale === "es" ? "🇪🇸 Español" : "🇺🇸 English";
    },
  },
  mounted() {
    // Cerrar dropdown cuando se hace clic fuera
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    closeNavbar() {
      this.isNavbarOpen = false;
    },
    toggleLanguageDropdown() {
      this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    },
    changeLanguage(lang) {
      this.$emit("change-language", lang);
      this.isLanguageDropdownOpen = false;
    },
    handleClickOutside(event) {
      if (
        this.$refs.languageDropdown &&
        !this.$refs.languageDropdown.contains(event.target)
      ) {
        this.isLanguageDropdownOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.navbar-brand span {
  font-size: 1.5rem;
  font-weight: bold;
}
.nav-link {
  font-size: 1.1rem;
  transition: color 0.3s ease;
}
.nav-link:hover {
  color: #ffd700 !important;
}
.btn-nba {
  background-color: #000050;
  color: #fff;
  transition: all 0.3s ease;
  border: none;
}
.btn-nba:hover {
  background-color: #000080;
  color: #fff;
}
.shadow-nba {
  text-shadow: 0 1px 2px #000, 0 6px 10px rgba(0, 0, 0, 0.3) !important;
}

/* Estilos del dropdown personalizado */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.375rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.dropdown-item:hover {
  color: #1e2125;
  background-color: #e9ecef;
}

.dropdown-item.active {
  color: #fff;
  background-color: #000050;
}

/* Dark mode para dropdown */
.dark-mode .dropdown-menu {
  background-color: #343a40;
  border-color: #495057;
}

.dark-mode .dropdown-item {
  color: #fff;
}

.dark-mode .dropdown-item:hover {
  color: #fff;
  background-color: #495057;
}

/* Responsive */
@media (max-width: 991.98px) {
  .dropdown-menu {
    position: static;
    display: block;
    width: 100%;
    margin-top: 0;
    border: 0;
    box-shadow: none;
  }
}
</style>
