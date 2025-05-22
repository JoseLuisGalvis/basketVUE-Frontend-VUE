import { createI18n } from "vue-i18n";

const messages = {
  es: {
    navbar: {
      home: "Inicio",
      gallery: "Galería",
      filter: "Filtro",
    },
    home: {
      title: "Jugadores NBA",
      confetti: "¡Clic aquí!",
    },
    footer: {
      rights: "Todos los derechos reservados",
      database: "Base de Datos de Jugadores NBA",
      topTeams: "Mejores Equipos",
      teams: {
        Lakers: "Los Angeles Lakers",
        Celtics: "Boston Celtics",
        Warriors: "Golden State Warriors",
        Heat: "Miami Heat",
        Bulls: "Chicago Bulls",
      },
      playerStats: "Estadísticas",
      stats: {
        scorers: "Máximos Anotadores",
        assists: "Líderes en Asistencias",
        rebounds: "Reboteadores",
        defensive: "Estrellas Defensivas",
        mvps: "MVPs de Temporada",
      },
      contact: "Contacto",
      phone: "+1 555-NBA-FANS",
      email: "info@nbaplayers.com",
      address: "NBA Plaza, Nueva York, NY 10001",
      follow: "Síguenos",
    },
    gallery: {
      rotate: "Girar",
      pause: "Pausar",
      animate: "Animar",
      circular: "Circular",
      floating: "Flotante",
      loading: "Cargando jugadores...",
      error: "Error al cargar los datos",
      retry: "Reintentar",
      number: "Número",
      position: "Posición",
      team: "Equipo",
      stats: "Estadísticas",
      info: "Información",
    },
    filter: {
      loading: "Cargando jugadores...",
      noResults: "No se encontraron jugadores para esta posición",
      positions: {
        all: "Todos",
        base: "Base",
        escolta: "Escolta",
        alero: "Alero",
        "ala-pivot": "Ala-Pívot",
        pivot: "Pívot",
      },
      playerDetails: {
        number: "Número",
        position: "Posición",
        stats: "Estadísticas",
        team: "Equipo",
        info: "Información",
      },
    },
  },
  en: {
    navbar: {
      home: "Home",
      gallery: "Gallery",
      filter: "Filter",
    },
    home: {
      title: "NBA Players",
      confetti: "Click me!",
    },
    footer: {
      rights: "All rights reserved",
      database: "NBA Players Database",
      topTeams: "Top Teams",
      teams: {
        Lakers: "Los Angeles Lakers",
        Celtics: "Boston Celtics",
        Warriors: "Golden State Warriors",
        Heat: "Miami Heat",
        Bulls: "Chicago Bulls",
      },
      playerStats: "Player Stats",
      stats: {
        scorers: "Top Scorers",
        assists: "Assists Leaders",
        rebounds: "Rebound Kings",
        defensive: "Defensive Stars",
        mvps: "Season MVPs",
      },
      contact: "Contact Us",
      phone: "+1 555-NBA-FANS",
      email: "info@nbaplayers.com",
      address: "NBA Plaza, New York, NY 10001",
      follow: "Follow Us",
    },
    gallery: {
      rotate: "Rotate",
      pause: "Pause",
      animate: "Animate",
      circular: "Circular",
      floating: "Floating",
      loading: "Loading players...",
      error: "Error loading data",
      retry: "Retry",
      number: "Number",
      position: "Position",
      team: "Team",
      stats: "Statistics",
      info: "Info",
    },
    filter: {
      loading: "Loading players...",
      noResults: "No players found for this position",
      positions: {
        all: "All",
        base: "Point Guard",
        escolta: "Shooting Guard",
        alero: "Small Forward",
        "ala-pivot": "Power Forward",
        pivot: "Center",
      },
      playerDetails: {
        number: "Number",
        position: "Position",
        stats: "Statistics",
        team: "Team",
        info: "Information",
      },
    },
  },
};

const i18n = createI18n({
  locale: "es", // Idioma por defecto
  fallbackLocale: "en",
  messages,
  silentTranslationWarn: true, // Evita warnings en desarrollo
  formatFallbackMessages: true, // Usa el mensaje original si falla
});

export default i18n;
