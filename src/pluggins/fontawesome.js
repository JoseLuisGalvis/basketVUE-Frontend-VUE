// src/plugins/fontawesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Iconos que vas a usar
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

// Añadir íconos a la biblioteca
library.add(
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faFacebook,
  faInstagram,
  faTwitter
);

export default FontAwesomeIcon;
