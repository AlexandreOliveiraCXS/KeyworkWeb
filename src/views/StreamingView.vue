<template>
  <div class="conteinerStreaming">
    <p class="titleStreaming">Generos Cadastrados:</p>

    <InputButton @button-clicked="handleClick" />
    <ul class="ulStreaming">
      <li v-for="streaming in streamings" :key="streaming.id" class="liStreaming">
        {{ streaming.name }}
        <button @click="handleDelete(streaming.name)" class="buttonStreaming">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api/axios";
import InputButton from "../components/InputButton.vue";

export default {
  name: "StreamingView",
  data() {
    return {
      streamings: [],
    };
  },
  components: {
    InputButton,
  },
  props: {},
  methods: {
    async handleDelete(value) {
      try {
        await api.post("/streaming/delete", { name: value });
        this.streamings = this.streamings.filter((s) => s.name !== value);
      } catch (error) {
        alert("Erro ao enviar dados ");
      }
    },

    async handleClick(inputValue) {
      try {
        const response = await api.post("/streaming", { name: inputValue });
        this.streamings.push(response.data);
      } catch (error) {
        alert("Erro ao enviar dados: " + inputValue);
      }
    },

    async fetchData() {
      try {
        const response = await api.get("/streaming");
        console.log(response.data);
        this.streamings = response.data;
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

.conteinerStreaming {
  background-color: #6b6b70;

  width: 50vh;
  height: 50vh;

  border-radius: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ulStreaming {
  list-style-type: none;
  background-color: #e1e1e6;
  width: 80%;
  height: 60%;

  border-radius: 8px;

  overflow: auto;
  padding-right: 0.5rem;
  box-sizing: content-box;
}

.ulStreaming::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #a8a8b3;
  border-radius: 0 8px 8px 0;
}

.ulStreaming::-webkit-scrollbar {
  width: 0.6rem;
}

.ulStreaming::-webkit-scrollbar-thumb {
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

.liStreaming {
  padding: 0.5rem;
  display: flex;
  align-content: center;
  justify-content: space-between;
}

.liStreaming:hover {
  background-color: #a8a8b3;
  border-radius: 2px;
}

.buttonStreaming {
  background-color: #eb1717;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 8px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttonStreaming:hover {
  background-color: #c51f1f;
}
</style>
