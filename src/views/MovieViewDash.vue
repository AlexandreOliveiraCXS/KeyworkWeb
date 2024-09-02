<template>
  <div class="conteinerMovieDash">
    <div>
      <h1>Filme: {{ movie.title }}</h1>
      <span>Ano de Lançamento: {{ movie.year }}</span>
    </div>

    <ul class="ulMovieDash">
      <li class="liTitleGenre">Generos</li>
      <li class="liPlusGenre">
        <p>Vincular Genero:</p>
        <select
          v-model="selectedGenre"
          id="movieSelect"
          class="selectMovieDash"
        >
          <option
            v-for="genreL in genresList"
            :key="genreL.id"
            :value="genreL.name"
          >
            {{ genreL.name }}
          </option>
        </select>
        <button @click="handleClickGenre" class="saveButtonDash">Salvar</button>
      </li>
      <li v-for="genre in movie.genres" :key="genre" class="liMovieDash">
        {{ genre }}
        <button @click="handleDeleteGenre(genre)" class="buttonMovieDash">
          Delete
        </button>
      </li>
    </ul>

    <ul class="ulMovieDash">
      <li class="liTitleGenre">Streamings</li>

      <li class="liPlusGenre">
        <p>Vincular Streaming:</p>
        <select
          v-model="selectedStreaming"
          id="movieSelect"
          class="selectMovieDash"
        >
          <option
            v-for="streamingL in streamingsList"
            :key="streamingL.id"
            :value="streamingL.name"
          >
            {{ streamingL.name }}
          </option>
        </select>
        <button @click="handleClickStreaming" class="saveButtonDash">
          Salvar
        </button>
      </li>
      <li
        v-for="streaming in movie.streamings"
        :key="streaming"
        class="liMovieDash"
      >
        {{ streaming }}
        <button
          @click="handleDeleteStreaming(streaming)"
          class="buttonMovieDash"
        >
          Delete
        </button>
      </li>
    </ul>

    <div class="commentMovieDash">
      <h1 class="liTitleGenre">Comentários</h1>
      <select
        v-model="selectedRating"
        id="selectedRating"
        class="selectMovieDash"
      >
        <option value="" disabled>Selecione um nota par ao Filme</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <textarea
        id="userInput"
        v-model="textComment"
        rows="4"
        cols="50"
        placeholder="Digite seu comentário sobre o filme..."
        class="textareaMovieDash"
      ></textarea>
      <button @click="handleComment" class="saveButtonDash">
        Salvar Comentário
      </button>
    </div>
    <ul class="ulMovieDash">
      <li class="liMovieDash">Classificação geral: {{ assessmentRating }}</li>
      <li
        v-for="item in commentList.assessmentsList"
        :key="item.comment"
        class="liMovieDash"
      >
        {{ item.comment }} - {{ item.rating }}
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api/axios";

export default {
  name: "MovieViewDash",
  data() {
    return {
      textComment: "",
      selectedRating: 0,
      assessmentRating: 0,
      selectedGenre: "",
      selectedStreaming: "",
      movie: {},
      genresList: [],
      commentList: [],
      streamingsList: [],
    };
  },
  components: {},
  props: {},
  methods: {
    async fetchData() {
      try {
        var response = await api.get("/movies/title", {
          params: { title: this.title },
        });
        this.movie = response.data[0];

        response = await api.get("/genre");
        this.genresList = response.data;

        response = await api.get("/streaming");
        this.streamingsList = response.data;

        response = await api.get("/assessment/movie", {
          params: { title: this.title },
        });
        this.commentList = response.data[0];

        this.assessmentRating =
          this.commentList.assessmentsList.reduce((sum, v) => {
            return sum + v.rating;
          }, 0) / this.commentList.assessmentsList.length;
      } catch (error) {
        alert("Erro ao enviar dados: ");
      }
    },

    async handleClickGenre() {
      await api.post("/moviesgenre", {
        title: this.movie.title,
        genre: this.selectedGenre,
      });

      this.movie.genres.push(this.selectedGenre);
    },

    async handleClickStreaming() {
      await api.post("/MoviesStreaming", {
        title: this.movie.title,
        streaming: this.selectedStreaming,
      });

      this.movie.streamings.push(this.selectedStreaming);
    },

    async handleDeleteGenre(value) {
      await api.post("/MoviesGenre/delete", {
        title: this.movie.title,
        genre: value,
      });

      this.movie.genres = this.movie.genres.filter((s) => s !== value);
    },

    async handleDeleteStreaming(value) {
      await api.post("/MoviesStreaming/delete", {
        title: this.movie.title,
        streaming: value,
      });

      this.movie.streamings = this.movie.streamings.filter((s) => s !== value);
    },

    async handleComment() {
      var nameUser = localStorage.getItem("nameUser");

      if (!nameUser) {
        this.$router.push({ name: "login" });
      } else {
        const response = await api.post("/Assessment", {
          nameUser: localStorage.getItem("nameUser"),
          title: this.movie.title,
          comment: this.textComment,
          rating: this.selectedRating,
        });

        console.log(response.data);
        this.commentList.assessmentsList.push({
          rating: response.data.rating,
          comment: response.data.comment,
        });

        this.assessmentRating =
          this.commentList.assessmentsList.reduce((sum, v) => {
            return sum + v.rating;
          }, 0) / this.commentList.assessmentsList.length;
      }
    },
  },
  computed: {
    title() {
      return this.$route.query.title; // Pega o valor do parâmetro 'title'
    },
  },
  mounted() {
    this.fetchData(); // Chama a função quando o componente é montado
  },
};
</script>

<style scoped>
.commentMovieDash {
  display: flex;
  flex-direction: column;
}
.commentMovieDash * {
  margin-bottom: 0.5rem;
}
.selectMovieDash {
  border-radius: 8px;
}
.textareaMovieDash {
  border-radius: 8px;
  padding: .5rem;
}

.liTitleGenre {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.liPlusGenre {
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-end;
}

.conteinerMovieDash {
  background-color: #6b6b70;

  width: 70vh;
  height: 90vh;

  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.ulMovieDash {
  list-style-type: none;
  background-color: #e1e1e6;
  width: 80%;

  border-radius: 8px;

  overflow: auto;
  padding-right: 0.5rem;
  box-sizing: content-box;
}

.ulMovieDash::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #a8a8b3;
  border-radius: 0 8px 8px 0;
}

.ulMovieDash::-webkit-scrollbar {
  width: 0.6rem;
}

.ulMovieDash::-webkit-scrollbar-thumb {
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

.liMovieDash {
  padding: 0.5rem;
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.liMovieDash:hover {
  background-color: #a8a8b3;
  border-radius: 2px;
}

.saveButtonDash {
  background-color: #4adb96;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 8px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  margin-left: 0.5rem;
}

.saveButtonDash:hover {
  background-color: #39ac74;
}

.buttonMovieDash {
  background-color: #eb1717;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 8px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttonMovieDash:hover {
  background-color: #c51f1f;
}
</style>
