import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // server: { // Just for development
    // proxy: {
    //   "/api": { // whenever we visit /api, you should prefix with target
    //     target: "http://localhost:5000",
    //   },
    // },
  // },
});
