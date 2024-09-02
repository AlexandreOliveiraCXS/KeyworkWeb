<template>
  <div class="contentLogin">
    <InputButtonLogin @button-clicked="handleClick" />
  </div>
</template>

<script>
import InputButtonLogin from "../components/InputButtonLogin.vue";
import api from "../api/axios";

export default {
  name: "LoginView",
  components: {
    InputButtonLogin,
  },
  props: {
    msg: String,
  },
  methods: {
    async handleClick(inputValue) {
      try {
        const response = await api.get("/users/one", {
          params: { name: inputValue },
        });

        localStorage.clear();
        localStorage.setItem("nameUser", response.data.name);
        localStorage.setItem("idUser", response.data.id);

        this.$router.push({ name: "home" });
      } catch (error) {
        localStorage.clear();
        alert("Erro ao enviar dados: " + inputValue);
      }
    },
  },
};
</script>

<style scoped>
.contentLogin {
  background-color: #ff8000;

  width: 50vh;
  height: 50vh;

  border-radius: 16px;  

}
</style>
