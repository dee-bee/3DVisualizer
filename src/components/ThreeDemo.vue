<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {
  BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvas = ref(null)
const unavailable = ref(false)
let dispose

onMounted(() => {
  const element = canvas.value
  let renderer
  try {
    renderer = new WebGLRenderer({ canvas: element, antialias: true })
  } catch {
    unavailable.value = true
    return
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0xf1f5f9)

  const scene = new Scene()
  const camera = new PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.set(3, 2, 4)

  const geometry = new BoxGeometry()
  const materials = [0x2563eb, 0x0891b2, 0xf59e0b, 0x9333ea, 0xdb2777, 0x059669]
    .map(color => new MeshBasicMaterial({ color }))
  scene.add(new Mesh(geometry, materials))

  const controls = new OrbitControls(camera, element)
  controls.enablePan = false
  controls.enableZoom = false
  const render = () => renderer.render(scene, camera)
  controls.addEventListener('change', render)

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = element
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    render()
  }
  const observer = new ResizeObserver(resize)
  observer.observe(element)
  resize()

  dispose = () => {
    observer.disconnect()
    controls.removeEventListener('change', render)
    controls.dispose()
    geometry.dispose()
    materials.forEach(material => material.dispose())
    renderer.dispose()
  }
})

onUnmounted(() => dispose?.())
</script>

<template>
  <section>
    <h2>Three.js</h2>
    <p v-if="unavailable">WebGL is unavailable in this browser.</p>
    <template v-else>
      <p>Drag to orbit the cube.</p>
      <canvas ref="canvas" aria-label="Interactive colored cube"></canvas>
    </template>
  </section>
</template>

<style scoped>
canvas {
  display: block;
  width: 100%;
  height: 240px;
  touch-action: none;
}
</style>
