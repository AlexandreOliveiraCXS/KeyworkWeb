<template>
  <div>
    <input v-model="inputValue" placeholder="Nome do item" class="textInput" />
    <button @click="notifyParent" class="buttonInput">Adicionar</button>
  </div>
</template>

<script>
export default {
  name: "InputButton",
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
.textInput {
  padding: 0.5rem;

  border-radius: 6px;
  border: 1px solid #a8a8b3;

  width: 15rem;
  background-color: #e1e1e6;
  margin-bottom: 1rem;
  margin-right: 0.5rem;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttonInput {
  background-color: #4adb96;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 8px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.buttonInput:hover {
  background-color: #3aad76;
}
</style>
