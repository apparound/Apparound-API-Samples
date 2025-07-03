import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), '')

   const envVariables = Object.keys(env).reduce((acc: any, key) => {
      if (key.startsWith('CPQ_') || key.startsWith('UTILITIES_')) {
         acc[`import.meta.env.${key}`] = JSON.stringify(env[key])
      }
      return acc
   }, {})

   return {
      define: envVariables,
      build: {
         outDir: './dist/web',
      },
      server: {
         host: '::',
         port: 8080,
      },
      plugins: [
         react(),
         svgr({
            // svgr options: https://react-svgr.com/docs/options/
            svgrOptions: { exportType: 'default', ref: true, svgo: false, titleProp: true },
            include: '**/*.svg',
         }),
         mode === 'development' && componentTagger(),
      ].filter(Boolean),
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
      },
   }
})
