import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles.css";

// Configuración de FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Importar iconos sólidos
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

// Importar iconos de redes sociales (brands)
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

// Agregar todos los iconos a la biblioteca
library.add(
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faMoon,
  faSun,
  faFacebook,
  faInstagram,
  faTwitter
);

const app = createApp(App);

// Registrar el componente FontAwesome globalmente
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(i18n);
app.mount("#app");
