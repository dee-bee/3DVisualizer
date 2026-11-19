import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const { CODESPACE_NAME, GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN, PAGES_BASE_PATH } = process.env
const previewHost = CODESPACE_NAME && GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
  ? `${CODESPACE_NAME}-8000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
  : undefined

const x3dTags = new Set([
  'x3d', 'scene', 'navigationinfo', 'background', 'viewpoint',
  'transform', 'shape', 'appearance', 'material', 'box',
])

export default defineConfig(({ command }) => ({
  plugins: [vue({
    template: { compilerOptions: { isCustomElement: tag => x3dTags.has(tag) } },
  })],
  base: command === 'build' ? PAGES_BASE_PATH || '/3DVisualizer/' : '/',
  server: {
    host: '0.0.0.0',
    port: 8000,
    strictPort: true,
    allowedHosts: previewHost ? [previewHost] : [],
  },
}))
