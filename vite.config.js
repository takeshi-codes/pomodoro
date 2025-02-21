import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "https://takeshi-codes.github.io/pomodoro/",
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
