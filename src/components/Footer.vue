<template>
  <footer class="footer text-white py-3" :class="{ 'dark-mode': isDarkMode }">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="footer-about">
            <h2 class="h5 footer-title">NBA Players</h2>
            <p class="small">{{ $t("footer.rights") }}</p>
            <p class="small text-white">
              © {{ currentYear }} {{ $t("footer.database") }}
            </p>
          </div>
        </div>

        <div class="col-md-3 mb-4">
          <div class="footer-contact">
            <h2 class="h5 footer-title">{{ $t("footer.contact") }}</h2>
            <address class="small">
              <p class="d-flex align-items-center">
                <font-awesome-icon icon="phone" class="me-2" />
                {{ $t("footer.phone") }}
              </p>
              <p class="d-flex align-items-center">
                <font-awesome-icon icon="envelope" class="me-2" />
                {{ $t("footer.email") }}
              </p>
              <p class="d-flex align-items-center">
                <font-awesome-icon icon="map-marker-alt" class="me-2" />
                {{ $t("footer.address") }}
              </p>
            </address>
          </div>
        </div>

        <div class="col-md-3 mb-4">
          <div class="footer-teams">
            <h2 class="h5 footer-title">{{ $t("footer.topTeams") }}</h2>
            <ul class="list-unstyled">
              <li v-for="team in teams" :key="team">
                <a href="#" class="text-white text-decoration-none">
                  {{ $t(`footer.teams.${team}`) }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-3">
          <h5 class="h5 footer-title">{{ $t("footer.follow") }}</h5>
          <div class="social-icons">
            <a href="https://www.facebook.com/" class="me-3 text-white">
              <font-awesome-icon :icon="['fab', 'facebook']" size="2x" />
            </a>
            <a href="https://www.instagram.com/" class="me-3 text-white">
              <font-awesome-icon :icon="['fab', 'instagram']" size="2x" />
            </a>
            <a href="https://x.com/" class="text-white">
              <font-awesome-icon :icon="['fab', 'twitter']" size="2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    isDarkMode: Boolean,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      teams: ["Lakers", "Celtics", "Warriors", "Heat", "Bulls"],
    };
  },
};
</script>

<style scoped>
.footer h5 {
  font-size: 1.2rem;
}
.footer p {
  font-size: 1rem;
}

.social-icons a {
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #003399 !important;
}

.footer-title {
  position: relative;
  display: inline-block;
  transition: color 0.3s ease;
  color: white;
}

/* Línea animada debajo del título */
.footer-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 0;
  height: 3px;
  background-color: #003399; /* Azul marino */
  transition: width 0.3s ease;
}

/* Hover animado */
.footer-title:hover {
  color: #003399; /* Azul marino */
}

.footer-title:hover::after {
  width: 100%;
}
</style>
