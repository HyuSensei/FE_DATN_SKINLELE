// vite.config.js
import { defineConfig } from "file:///D:/Project/BCTN_SkinLeLe/FE/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Project/BCTN_SkinLeLe/FE/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import compression from "file:///D:/Project/BCTN_SkinLeLe/FE/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Project\\BCTN_SkinLeLe\\FE";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "gzip",
      ext: ".gz"
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@assets": path.resolve(__vite_injected_original_dirname, "src/assets"),
      "@axios": path.resolve(__vite_injected_original_dirname, "src/axios"),
      "@components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@const": path.resolve(__vite_injected_original_dirname, "src/const"),
      "@helpers": path.resolve(__vite_injected_original_dirname, "src/helpers"),
      "@hook": path.resolve(__vite_injected_original_dirname, "src/hook"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@redux": path.resolve(__vite_injected_original_dirname, "src/redux"),
      "@resources": path.resolve(__vite_injected_original_dirname, "src/resources"),
      "@routers": path.resolve(__vite_injected_original_dirname, "src/routers"),
      "@storage": path.resolve(__vite_injected_original_dirname, "src/storage"),
      "@utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      "@validate": path.resolve(__vite_injected_original_dirname, "src/validate")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0XFxcXEJDVE5fU2tpbkxlTGVcXFxcRkVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RcXFxcQkNUTl9Ta2luTGVMZVxcXFxGRVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovUHJvamVjdC9CQ1ROX1NraW5MZUxlL0ZFL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXByZXNzaW9uXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBjb21wcmVzc2lvbih7XG4gICAgICBhbGdvcml0aG06IFwiZ3ppcFwiLFxuICAgICAgZXh0OiBcIi5nelwiLFxuICAgIH0pLFxuICBdLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFwaTogXCJtb2Rlcm4tY29tcGlsZXJcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXG4gICAgICBcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYXNzZXRzXCIpLFxuICAgICAgXCJAYXhpb3NcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYXhpb3NcIiksXG4gICAgICBcIkBjb21wb25lbnRzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2NvbXBvbmVudHNcIiksXG4gICAgICBcIkBjb25zdFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9jb25zdFwiKSxcbiAgICAgIFwiQGhlbHBlcnNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaGVscGVyc1wiKSxcbiAgICAgIFwiQGhvb2tcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaG9va1wiKSxcbiAgICAgIFwiQHBhZ2VzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL3BhZ2VzXCIpLFxuICAgICAgXCJAcmVkdXhcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvcmVkdXhcIiksXG4gICAgICBcIkByZXNvdXJjZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvcmVzb3VyY2VzXCIpLFxuICAgICAgXCJAcm91dGVyc1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9yb3V0ZXJzXCIpLFxuICAgICAgXCJAc3RvcmFnZVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9zdG9yYWdlXCIpLFxuICAgICAgXCJAdXRpbHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvdXRpbHNcIiksXG4gICAgICBcIkB2YWxpZGF0ZVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcInNyYy92YWxpZGF0ZVwiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuICAgICAgICAgIGFudGQ6IFtcImFudGRcIl0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlEsU0FBUyxvQkFBb0I7QUFDeFMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGlCQUFpQjtBQUh4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osS0FBSztBQUFBLE1BQ1A7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2xDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUMvQyxVQUFVLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsZUFBZSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdkQsVUFBVSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLFlBQVksS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNqRCxTQUFTLEtBQUssUUFBUSxrQ0FBVyxVQUFVO0FBQUEsTUFDM0MsVUFBVSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLFVBQVUsS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QyxjQUFjLEtBQUssUUFBUSxrQ0FBVyxlQUFlO0FBQUEsTUFDckQsWUFBWSxLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ2pELFlBQVksS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUNqRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsYUFBYSxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLElBQ3JEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLFVBQzdCLE1BQU0sQ0FBQyxNQUFNO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
