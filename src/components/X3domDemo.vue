<script>
import runtimeUrl from 'x3dom/x3dom.js?url'
import 'x3dom/x3dom.css'
let runtimePromise

function loadRuntime() {
  runtimePromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = runtimeUrl
    script.onload = resolve
    script.onerror = () => {
      script.remove()
      runtimePromise = undefined
      reject(new Error('X3DOM failed to load'))
    }
    document.head.append(script)
  })
  return runtimePromise
}
</script>

<script setup>
import { onMounted, ref } from 'vue'

const scene = ref(null)
const unavailable = ref(false)

onMounted(async () => {
  try {
    await loadRuntime()
    // The browser runtime scans for X3D elements. Vue has mounted ours by now.
    if (scene.value && !scene.value.hasRuntime) window.x3dom.reload()
  } catch {
    unavailable.value = true
  }
})
</script>

<template>
  <section>
    <h2>X3DOM</h2>
    <p v-if="unavailable">The X3DOM runtime could not load.</p>
    <p v-else>Drag to rotate the box.</p>
    <x3d ref="scene" width="100%" height="240px" showProgress="false">
      <scene>
        <navigationinfo type='"EXAMINE"'></navigationinfo>
        <background skyColor="0.945 0.961 0.976"></background>
        <viewpoint position="0 0 5"></viewpoint>
        <transform rotation="1 1 0 0.6">
          <shape>
            <appearance>
              <material diffuseColor="0.04 0.62 0.53"></material>
            </appearance>
            <box size="1.5 1.5 1.5"></box>
          </shape>
        </transform>
      </scene>
    </x3d>
  </section>
</template>

<style scoped>
x3d {
  display: block;
  border: 0;
}
</style>
