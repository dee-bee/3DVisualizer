<script setup>
import D3Demo from './components/D3Demo.vue'
import ThreeDemo from './components/ThreeDemo.vue'
import X3domDemo from './components/X3domDemo.vue'
</script>

<template>
  <main>
    <h1>Hello World Again!</h1>
    <ThreeDemo />
    <X3domDemo />
    <D3Demo />
  </main>
</template>

<style scoped>
main {
  max-width: 36rem;
  margin-inline: auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}
section + section {
  margin-top: 2rem;
}
</style>
