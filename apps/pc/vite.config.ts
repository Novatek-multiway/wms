import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { wrapperEnv } from "./src/utils/getEnv";
import viteCompression from "vite-plugin-compression"; // 开启压缩

import { resolve } from "path";

const baseUrl = resolve(__dirname, "..", "..", "dist", "wms-pc");

const pathResolve = (dir: string): any => {
	return resolve(__dirname, dir);
};

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	return {
		base: mode.mode === "development" ? "./" : "./", // 配置打包静态文件输出路径
		plugins: [
			react(),
			viteCompression({
				//生成压缩包gz
				verbose: true,
				disable: false,
				threshold: 10240,
				algorithm: "gzip",
				ext: ".gz"
			})
		],
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true
				}
			}
		},
		resolve: {
			// alias: {
			// 	"@": pathResolve("./src")
			// },
			alias: [
				{ find: /^~/, replacement: "" },
				{ find: "@", replacement: pathResolve("./src") },
				{
					find: "@components",
					replacement: pathResolve("./src/components")
				}
			],
			extensions: [".js", ".ts", ".jsx", ".tsx", ".json"]
		},
		server: {
			host: "0.0.0.0",
			open: viteEnv.VITE_OPEN,
			port: viteEnv.VITE_PORT, // 本地端口号
			proxy: {
				// 请求代理地址(仅开发环境有效)
				"/api": {
					target: "http://120.79.8.215:7239/api",
					changeOrigin: true,
					secure: true, // 如果是https接口，需要配置这个参数
					// ws: true, //websocket支持
					rewrite: path => path.replace(/^\/api/, "")
				},
				"/report": {
					target: "http://120.79.8.215:7239/",
					changeOrigin: true,
					secure: true, // 如果是https接口，需要配置这个参数
					// ws: true, //websocket支持
					rewrite: path => path.replace(/^\/report/, "api")
				},
				"/wms_pc": {
					target: "http://localhost:7188/",
					changeOrigin: true,
					secure: true, // 如果是https接口，需要配置这个参数
					// ws: true, //websocket支持
					rewrite: path => path.replace(/^\/wms_pc/, "")
				}
			},
			hmr: {
				overlay: false
			}
		},
		build: {
			outDir: baseUrl,
			sourcemap: true,
			// minify: "terser",
			terserOptions: {
				// delete console/debugger
				compress: {
					drop_console: viteEnv.VITE_DROP_CONSOLE
				}
			},
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		}
	};
});
