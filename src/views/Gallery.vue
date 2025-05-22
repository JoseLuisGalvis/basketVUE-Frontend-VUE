<template>
  <div class="gallery-container">
    <!-- Cards de jugadores flotantes -->
    <div
      v-for="(player, index) in players"
      :key="player.id"
      class="player-card"
      :style="getCardPosition(index)"
      @click="showPlayerDetails(player)"
    >
      <img :src="player.imgSrc" :alt="player.name" class="player-image" />
      <div class="player-name">{{ player.name }}</div>
      <div class="player-number">{{ player.number }}</div>
      <div class="player-position">{{ player.position }}</div>
      <div class="player-team">{{ player.teamName }}</div>
    </div>

    <!-- Modal de detalles -->
    <div
      class="modal-overlay"
      :class="{ active: showModal }"
      @click="closeModal"
    >
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">×</button>
        <img
          :src="selectedPlayer?.imgSrc"
          :alt="selectedPlayer?.name"
          class="modal-player-image"
        />
        <h2 class="modal-player-name">{{ selectedPlayer?.name }}</h2>
        <div class="modal-player-stats">
          <p>
            <strong>{{ $t("gallery.number") || "Número" }}:</strong>
            {{ selectedPlayer?.number }}
          </p>
          <p>
            <strong>{{ $t("gallery.position") || "Posición" }}:</strong>
            {{ selectedPlayer?.position }}
          </p>
          <p>
            <strong>{{ $t("gallery.team") || "Equipo" }}:</strong>
            {{ selectedPlayer?.teamName }}
          </p>
          <p>
            <strong>{{ $t("gallery.stats") || "Estadísticas" }}:</strong>
            {{ selectedPlayer?.stats }}
          </p>
          <p>
            <strong>{{ $t("gallery.info") || "Info" }}:</strong>
            {{ selectedPlayer?.info }}
          </p>
        </div>
      </div>
    </div>

    <!-- Loading spinner -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>{{ $t("gallery.loading") || "Cargando jugadores..." }}</p>
    </div>

    <!-- Error message -->
    <div v-if="error" class="error-message">
      <p>{{ $t("gallery.error") || "Error al cargar los datos" }}</p>
      <button class="retry-btn" @click="fetchPlayers">
        {{ $t("gallery.retry") || "Reintentar" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GalleryView",
  data() {
    return {
      players: [],
      showModal: false,
      selectedPlayer: null,
      loading: true,
      error: false,
    };
  },
  async mounted() {
    await this.fetchPlayers();
  },
  methods: {
    async fetchPlayers() {
      this.loading = true;
      this.error = false;

      try {
        const response = await fetch(
          "https://basket-api-1cge.onrender.com/api/players"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.players = await response.json();

        if (!this.players || this.players.length === 0) {
          throw new Error("No players data received");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
        this.error = true;

        // Fallback con algunos datos locales si falla la API
        this.players = [
          {
            id: 1,
            imgSrc: "https://devsapihub.com/img-players/1.png",
            name: "DeMarcus Cousins",
            number: "#0",
            position: "Center",
            stats: "25.2 PPG 5.4 APG 12.9 RPG",
            teamName: "[New Orleans Pelicans]",
            info: "INJURED | Four-time All-Star | No. 5 overall pick in 2010",
          },
          {
            id: 2,
            imgSrc: "https://devsapihub.com/img-players/2.png",
            name: "Anthony Davis",
            number: "#23",
            position: "Forward-Center",
            stats: "27.1 PPG 2.4 APG 10.7 RPG",
            teamName: "[New Orleans Pelicans]",
            info: "Five-time All-Star | Scored 52 points in 2017 All-Star Game",
          },
        ];
      } finally {
        this.loading = false;
      }
    },

    getCardPosition(index) {
      const cols = 7;
      const rows = 4;
      const col = index % cols;
      const row = Math.floor(index / cols);

      // Variación pseudo-aleatoria basada en el índice para efecto scattered
      const randomX = ((index * 47) % 120) - 60; // -60 a +60px
      const randomY = ((index * 29) % 80) - 40; // -40 a +40px

      const baseX = (col - (cols - 1) / 2) * 220; // Espaciado base horizontal
      const baseY = (row - (rows - 1) / 2) * 200; // Espaciado base vertical

      const x = baseX + randomX;
      const y = baseY + randomY;

      return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%)`,
        // Rotación sutil y aleatoria para cada card
        transform: `translate(-50%, -50%) rotate(${((index * 17) % 8) - 4}deg)`,
      };
    },

    showPlayerDetails(player) {
      this.selectedPlayer = player;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedPlayer = null;
    },
  },
};
</script>

<style scoped>
.gallery-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  overflow: hidden;
}

.player-card {
  position: absolute;
  width: 180px;
  height: 240px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: float 8s ease-in-out infinite;
}

/* Animación flotante suave */
@keyframes float {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0px)
      rotate(var(--rotation, 0deg));
  }
  25% {
    transform: translate(-50%, -50%) translateY(-8px)
      rotate(calc(var(--rotation, 0deg) + 1deg));
  }
  50% {
    transform: translate(-50%, -50%) translateY(0px)
      rotate(var(--rotation, 0deg));
  }
  75% {
    transform: translate(-50%, -50%) translateY(8px)
      rotate(calc(var(--rotation, 0deg) - 1deg));
  }
}

/* Delay diferente para cada card */
.player-card:nth-child(2n) {
  animation-delay: -2s;
}
.player-card:nth-child(3n) {
  animation-delay: -4s;
}
.player-card:nth-child(5n) {
  animation-delay: -6s;
}

.player-card:hover {
  transform: translate(-50%, -50%) scale(1.15) rotate(0deg) !important;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  z-index: 10;
  animation-play-state: paused;
}

.player-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.player-card:hover .player-image {
  transform: scale(1.1);
  border-color: #fdb827;
}

.player-name {
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 5px;
  line-height: 1.2;
}

.player-number {
  font-size: 18px;
  font-weight: bold;
  color: #fdb827;
  margin-bottom: 5px;
}

.player-position {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.player-team {
  font-size: 10px;
  color: #c41e3a;
  text-align: center;
  font-weight: bold;
}

/* Modal para detalles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: scale(0.7) translateY(50px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-overlay.active .modal-content {
  transform: scale(1) translateY(0);
}

.modal-player-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 20px;
  display: block;
  border: 4px solid #fdb827;
  object-fit: cover;
}

.modal-player-name {
  font-size: 28px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 10px;
}

.modal-player-stats {
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.8;
}

.modal-player-stats p {
  margin-bottom: 8px;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

/* Loading y Error states */
.loading-spinner,
.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 50;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #fdb827;
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

.error-message p {
  font-size: 18px;
  margin-bottom: 15px;
}

.retry-btn {
  padding: 12px 24px;
  background: #c41e3a;
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #a01729;
  transform: translateY(-2px);
}

/* Responsividad */
@media (max-width: 768px) {
  .player-card {
    width: 140px;
    height: 200px;
    padding: 10px;
  }

  .player-image {
    width: 60px;
    height: 60px;
  }

  .player-name {
    font-size: 12px;
  }

  .player-number {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .player-card {
    width: 120px;
    height: 180px;
    padding: 8px;
  }

  .player-image {
    width: 50px;
    height: 50px;
  }

  .modal-content {
    padding: 20px;
    margin: 20px;
  }

  .modal-player-image {
    width: 100px;
    height: 100px;
  }

  .modal-player-name {
    font-size: 24px;
  }
}
</style>
