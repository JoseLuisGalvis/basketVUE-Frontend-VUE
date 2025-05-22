<template>
  <div class="container-fluid">
    <!-- Header con filtros de posición -->
    <div class="filter-header">
      <h1 class="title text-white">{{ $t("navbar.filter") }}</h1>
      <div class="position-filters">
        <button
          v-for="(name, key) in POSITION_NAMES"
          :key="key"
          @click="selectPosition(key)"
          :class="['filter-btn', { active: selectedPosition === key }]"
        >
          {{ name }}
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Cargando jugadores...</p>
    </div>

    <!-- Timeline horizontal -->
    <div v-else-if="players.length > 0" class="timeline-container">
      <div class="timeline-scroll" ref="timelineScroll">
        <div class="timeline-track">
          <div
            v-for="(player, index) in players"
            :key="player.id"
            class="timeline-item"
            @click="openPlayerModal(player)"
          >
            <!-- Card del jugador -->
            <div class="player-card">
              <div class="card-image">
                <img
                  :src="player.imgSrc"
                  :alt="player.name"
                  @error="handleImageError"
                />
              </div>
              <div class="card-content">
                <h3 class="player-name">{{ player.name }}</h3>
                <p class="player-number">{{ player.number }}</p>
                <p class="player-position">{{ player.position }}</p>
                <p class="player-stats">{{ player.stats }}</p>
                <p class="player-team">{{ player.teamName }}</p>
              </div>
            </div>

            <!-- Línea conectora (excepto el último) -->
            <div
              v-if="index < players.length - 1"
              class="timeline-connector"
            ></div>
          </div>
        </div>
      </div>

      <!-- Controles de navegación -->
      <div class="timeline-controls">
        <button @click="scrollLeft" class="control-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button @click="scrollRight" class="control-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Estado sin resultados -->
    <div v-else class="no-results">
      <p>No se encontraron jugadores para esta posición</p>
    </div>

    <!-- Modal de detalles -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>

        <div v-if="selectedPlayer" class="modal-body">
          <div class="modal-image">
            <img
              :src="selectedPlayer.imgSrc"
              :alt="selectedPlayer.name"
              @error="handleImageError"
            />
          </div>
          <div class="modal-info">
            <h2>{{ selectedPlayer.name }}</h2>
            <div class="player-details">
              <div class="detail-item">
                <span class="label">Número:</span>
                <span class="value">{{ selectedPlayer.number }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Posición:</span>
                <span class="value">{{ selectedPlayer.position }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Estadísticas:</span>
                <span class="value">{{ selectedPlayer.stats }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Equipo:</span>
                <span class="value">{{ selectedPlayer.teamName }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Información:</span>
                <span class="value">{{ selectedPlayer.info }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterView",
  data() {
    return {
      players: [],
      loading: false,
      selectedPosition: "all",
      showModal: false,
      selectedPlayer: null,
      POSITION_MAPPING: {
        all: "all",
        base: "Guard",
        escolta: "Forward-Guard",
        alero: "Forward",
        "ala-pivot": "Forward-Center",
        pivot: "Center",
      },
      POSITION_NAMES: {
        all: "Todos",
        base: "Base",
        escolta: "Escolta",
        alero: "Alero",
        "ala-pivot": "Ala-Pívot",
        pivot: "Pívot",
      },
    };
  },
  mounted() {
    this.loadPlayers();
  },
  methods: {
    async selectPosition(position) {
      this.selectedPosition = position;
      await this.loadPlayers();
    },

    async loadPlayers() {
      this.loading = true;
      try {
        const position = this.POSITION_MAPPING[this.selectedPosition];
        let url;

        if (position === "all") {
          // Si necesitas cargar todos los jugadores, ajusta esta URL
          url = "https://basket-api-1cge.onrender.com/api/players";
        } else {
          url = `https://basket-api-1cge.onrender.com/api/players/position/${position.toLowerCase()}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        this.players = Array.isArray(data) ? data : [data];
      } catch (error) {
        console.error("Error loading players:", error);
        this.players = [];
      } finally {
        this.loading = false;
      }
    },

    openPlayerModal(player) {
      this.selectedPlayer = player;
      this.showModal = true;
      document.body.style.overflow = "hidden"; // Prevenir scroll del body
    },

    closeModal() {
      this.showModal = false;
      this.selectedPlayer = null;
      document.body.style.overflow = "auto"; // Restaurar scroll del body
    },

    scrollLeft() {
      const container = this.$refs.timelineScroll;
      container.scrollBy({ left: -300, behavior: "smooth" });
    },

    scrollRight() {
      const container = this.$refs.timelineScroll;
      container.scrollBy({ left: 300, behavior: "smooth" });
    },

    handleImageError(event) {
      event.target.src = "https://placehold.co/250x300";
    },
  },
};
</script>

<style scoped>
.container-fluid {
  position: relative;
  margin: 0 auto;
  background: linear-gradient(
    to bottom right,
    #01014a,
    #010147,
    #031d6d,
    #030359,
    #060681
  );
  background-size: 200% 200%;
  animation: gradientMovement 10s linear infinite;
}

@keyframes gradientMovement {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }
}

.filter-header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 20px;
}

.position-filters {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn {
  background: #e2e8f0;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

.filter-btn.active {
  background: linear-gradient(135deg, #d00505 0%, #ef4545 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.loading {
  text-align: center;
  padding: 50px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.timeline-container {
  position: relative;
}

.timeline-scroll {
  overflow-x: auto;
  padding: 20px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.timeline-scroll::-webkit-scrollbar {
  display: none;
}

.timeline-track {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 50px;
}

.timeline-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.player-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  width: 280px;
  flex-shrink: 0;
}

.player-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #a70404 0%, #ec7070 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.player-card:hover .card-image img {
  transform: scale(1.1);
}

.card-content {
  padding: 20px;
}

.player-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 8px;
}

.player-number {
  font-size: 1.1rem;
  color: #f20808;
  font-weight: bold;
  margin-bottom: 5px;
}

.player-position {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.player-stats {
  color: #4a5568;
  font-size: 0.85rem;
  margin-bottom: 8px;
  font-weight: 500;
}

.player-team {
  color: #f20808;
  font-size: 0.85rem;
  font-weight: 500;
}

.timeline-connector {
  width: 60px;
  height: 2px;
  background: linear-gradient(135deg, #a70404 0%, #ec7070 100%);
  position: relative;
}

.timeline-connector::after {
  content: "";
  position: absolute;
  right: -5px;
  top: -3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f20808;
}

.timeline-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.control-btn {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
  transform: scale(1.1);
}

.no-results {
  text-align: center;
  padding: 50px;
  color: #718096;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: background 0.3s ease;
  z-index: 1;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.7);
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.modal-image {
  height: 300px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 30px;
}

.modal-info h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #1a202c;
  margin-bottom: 20px;
  text-align: center;
}

.player-details {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background: #f7fafc;
  border-radius: 10px;
  border-left: 4px solid #667eea;
}

.label {
  font-weight: bold;
  color: #4a5568;
  min-width: 100px;
}

.value {
  color: #1a202c;
  text-align: right;
  flex: 1;
  margin-left: 20px;
}

.dark-mode .card-content {
  background: #222 !important;
}

.dark-mode .card-content h3 {
  color: #fff !important;
}

.dark-mode .filter-header .title {
  color: #fff !important;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-track {
    padding: 0 20px;
  }

  .player-card {
    width: 250px;
  }

  .modal-content {
    width: 95%;
  }

  .modal-body {
    flex-direction: column;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .value {
    text-align: left;
    margin-left: 0;
    margin-top: 5px;
  }

  .title {
    font-size: 2rem;
  }

  .position-filters {
    gap: 8px;
  }

  .filter-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
