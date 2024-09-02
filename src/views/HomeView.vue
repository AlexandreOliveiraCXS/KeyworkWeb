<template>
  <div class="conteinerHome">
    <p class="titleHome">Selecione uma das opções:</p>

    <nav class="navHome">
      <button class="buttonHome" @click="handleMovie">Filmes</button>
      <button class="buttonHome" @click="handleGenre">Generos</button>
      <button class="buttonHome" @click="handleStreaming">Streamigs</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  props: {},
  methods: {
    handleGenre() {
      this.$router.push({ name: "genre" });
    },
    handleStreaming() {
      this.$router.push({ name: "streaming" });
    },
    handleMovie() {
      this.$router.push({ name: "movie" });
    },
  },
};
</script>

<style scoped>
.titleHome {
  font-size: 1.5rem;
  color: #ffffff;

  margin-bottom: 1rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.conteinerHome {
  background-color: #6b6b70;

  width: 50vh;
  height: 50vh;

  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.navHome {
  display: flex;
  align-items: center;
  justify-content: center;
}

.buttonHome {
  background-color: #ff8000;
  color: #ffffff;

  width: 10vh;
  height: 8vh;
  margin-right: 2rem;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
