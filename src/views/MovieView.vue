<template>
  <div class="conteinerMovie">
    <button>Cadastrar Filme</button>
    <ul class="ulMovie">
      <li v-for="movie in movies" :key="movie.id" class="liMovie">
        <a href="/dash" @click.prevent="navigateToDash(movie.title)" class="aMovie">{{
          movie.title
        }}</a>
        <button @click="handleDelete(movie.title)" class="buttonMovie">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api/axios";

export default {
  name: "MovieView",
  data() {
    return {
      movies: [],
    };
  },
  components: {},
  props: {},
  methods: {
    async navigateToDash(value) {
      this.$router.push({ name: "dash", query: { title: value } });
    },

    async handleDelete(value) {
      try {
        await api.post("/movies/delete", { title: value });
        this.movies = this.movies.filter((s) => s.title !== value);
      } catch (error) {
        alert("Erro ao enviar dados ");
      }
    },

    async handleClick(inputValue) {
      try {
        const response = await api.post("/movies", { title: inputValue });
        this.movies.push(response.data);
      } catch (error) {
        alert("Erro ao enviar dados: " + inputValue);
      }
    },

    async fetchData() {
      try {
        const response = await api.get("/movies");
        console.log(response.data);
        this.movies = response.data;
      } catch (error) {
        alert("Erro ao enviar dados: ");
      }
    },
  },
  mounted() {
    this.fetchData(); // Chama a função quando o componente é montado
  },
};
</script>

<style scoped>
.titleStreaming {
  font-size: 1.5rem;
  color: #ffffff;

  margin-bottom: 1rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.conteinerMovie {
  background-color: #6b6b70;

  width: 50vh;
  height: 50vh;

  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ulMovie {
  list-style-type: none;
  background-color: #e1e1e6;
  width: 80%;
  height: 60%;

  border-radius: 8px;

  overflow: auto;
  padding-right: 0.5rem;
  box-sizing: content-box;
}

.ulMovie::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #a8a8b3;
  border-radius: 0 8px 8px 0;
}

.ulMovie::-webkit-scrollbar {
  width: 0.6rem;
}

.ulMovie::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #ff8000;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.liMovie {
  padding: 0.5rem;
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.liMovie:hover {
  background-color: #a8a8b3;
  border-radius: 2px;
}

.buttonMovie {
  background-color: #eb1717;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 8px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttonMovie:hover {
  background-color: #c51f1f;
}
.aMovie{
  text-decoration: none;
  color: #ffffff;
    text-shadow: 2px 1px 2px rgba(0, 0, 0, 0.5);

}
</style>
