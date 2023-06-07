import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path'


export default ({mode, command}) => {
  const env=loadEnv(mode, process.cwd());   // 获取.env文件里定义的环境变量

  const analysPlugins = mode === 'analys' ? [
    visualizer({
      emitFile: false,
      filename: "stats.html",
      gzipSize: true,
      open: true
    })
  ] : []
  
  return defineConfig({
    plugins: [
      vue(),
    ].concat(analysPlugins),
    build: {
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('vue-router')) {
                return 'vue'
              }
              return 'vendor'; //代码宰割为第三方包
            }
          },
        }
      }
    },
    define: {
      'process.env': process.env
    },
    server: {
      port: 8880,
      open: true,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: false, // 解决代理https协议报错问题
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          rewrite: (path: any) => path.replace(/^\/api/, ""),
        },
      }
    },
    base: '/',
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        // 全局样式引入
        less:{
          additionalData: `@import "${path.resolve(__dirname, "./src/assets/styles/global.less")}";`,
          charset: false
        }
      },
    }
  })
}