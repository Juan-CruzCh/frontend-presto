import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["23b3-189-28-90-220.ngrok-free.app"],
    host: "0.0.0.0",
    port: 5173,
  },
});
