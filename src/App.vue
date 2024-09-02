<!-- src/App.vue -->

<template>
  <div id="app" class="screem">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto;
}

body,
input,
textarea,
select,
button {
  font: 400 1rem "Roboto", sans-serif;
}

button {
  cursor: pointer;

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;

  outline: inherit;
}
input {
   all: unset;

}

.screem {
  background-color: #29292e;
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
