import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], server: {
    host: true, // 👈 Permite conexiones externas (abre el servidor)
    port: 5173, // (opcional) Cambia el puerto si quieres
  }
})
