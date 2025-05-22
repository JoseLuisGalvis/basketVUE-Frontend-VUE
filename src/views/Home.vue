<template>
  <div class="container-fluid" :class="{ 'dark-mode': isDarkMode }">
    <div class="carousel-container">
      <div class="carousel-top">
        <div class="carousel-inner">
          <img
            v-for="n in 13"
            :key="'top-' + n"
            :src="getTopImage(n)"
            alt="Player"
            class="gap rounded"
            @load="handleImageLoad"
            @error="handleImageError"
            loading="lazy"
          />
        </div>
      </div>
      <div class="text">
        <h1
          class="shadow-nba title-hover"
          @mouseenter="showImage = true"
          @mouseleave="showImage = false"
        >
          {{ $t("home.title") }}
          <img
            v-if="showImage"
            :src="vzlaImage"
            alt="Venezuela"
            class="hover-image"
          />
        </h1>
        <button class="canvas-confetti-btn" @click="triggerConfetti">
          🎉
          <span class="tool-tip">{{ $t("home.confetti") }}</span>
        </button>
      </div>
      <div class="carousel-bottom">
        <div class="carousel-inner">
          <img
            v-for="n in 13"
            :key="'bottom-' + n"
            :src="getBottomImage(n)"
            alt="Player"
            class="gap rounded"
            @load="handleImageLoad"
            @error="handleImageError"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from "canvas-confetti";

export default {
  name: "HomeView",
  props: {
    isDarkMode: Boolean,
  },
  data() {
    return {
      showImage: false,
    };
  },
  computed: {
    vzlaImage() {
      return new URL("../assets/images/vzla.png", import.meta.url).href;
    },
  },
  methods: {
    triggerConfetti() {
      confetti({
        particleCount: 3000,
        spread: 80,
        angle: 75,
      });
    },
    getTopImage(n) {
      // Imágenes 1-13 para el carrusel superior
      return new URL(`../assets/images/${n}.jpg`, import.meta.url).href;
    },
    getBottomImage(n) {
      // Imágenes 14-26 para el carrusel inferior
      return new URL(`../assets/images/${n + 13}.jpg`, import.meta.url).href;
    },
    // Método unificado alternativo si prefieres usar uno solo
    getImage(n, isTop = true) {
      const imageNumber = isTop ? n : n + 13;
      return new URL(`../assets/images/${imageNumber}.jpg`, import.meta.url)
        .href;
    },
  },
};
</script>

<style scoped>
.container-fluid {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.text {
  text-align: center;
  margin-bottom: 20px;
  z-index: 1;
}
.carousel-container {
  width: auto !important;
  /* display: flex;
  flex-direction: column;
  gap: 40px;  Separación entre filas */
}
.carousel-top,
.carousel-bottom {
  height: 310px;
  overflow: hidden;
  white-space: nowrap;
}
.canvas-confetti-btn {
  font-size: 2em;
  margin-top: 1em !important;
}
.carousel-inner {
  width: auto !important;
}
.carousel-inner img:hover {
  box-shadow: 0 0 5px #000050, 0 0 10px #fff, 0 0 15px rgba(244, 3, 3, 0.3);
  cursor: pointer;
}
.carousel-top .carousel-inner {
  animation: moveRight 90s linear infinite;
}
.carousel-bottom .carousel-inner {
  animation: moveLeft 90s linear infinite;
}
.gap {
  margin: 5px;
}
.rounded {
  border-radius: 10px; /* Bordes redondeados */
}
img {
  width: 230px;
  height: 280px;
}
@keyframes moveRight {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes moveLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
button {
  width: 100%;
  font-size: 0.75em;
  margin: 0 !important;
}

.shadow-nba {
  text-shadow: 0 1px 2px #000, 0 6px 10px rgba(255, 255, 255, 0.3) !important;
}

.title-hover {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.hover-image {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  object-fit: contain;
  z-index: 10;
  animation: fadeIn 0.3s ease-in-out;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

img {
  transition: filter 0.3s ease;
}

.dark-mode .carousel-inner img {
  filter: grayscale(100%);
}
</style>
