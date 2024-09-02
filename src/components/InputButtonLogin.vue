<template>
  <div class="conteinerLogin">
    <span class="titleLogin">Bem-vindo</span>
    <span class="titleLogin">Keywork Filmes</span>
    <input v-model="inputValue" placeholder="Usuário" class="inputLogin" />
    <button @click="notifyParent" class="buttonLogin">Enviar</button>
  </div>
</template>

<script>
export default {
  name: "InputButtonLogin",
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    notifyParent() {
      this.$emit("button-clicked", this.inputValue);
    },
  },
};
</script>

<style scoped>
.conteinerLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
}

.titleLogin {
  font-size: 1.5rem;
  color: #ffffff;

  margin-bottom: 1rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.inputLogin {
  padding: 0.5rem;

  border-radius: 6px;
  border: 1px solid #a8a8b3;

  width: 15rem;
  background-color: #e1e1e6;
  margin-bottom: 2rem;

    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

}
.buttonLogin {
  padding: 0.5rem;
  width: 16rem;
  border: 1px solid #a8a8b3;

  border-radius: 6px;
  background-color: #4adb96;

    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

}
</style>
