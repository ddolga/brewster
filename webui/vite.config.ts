import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    optimizeDeps: {
        include: ['brewster-types']
    },
    build: {
        commonjsOptions: {
            include: [/brewster-types/,/node_modules/]
        }
    }
})
