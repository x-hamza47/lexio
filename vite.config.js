import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    // server: {
    //     host: true, 
    //     port: 5173,
    //     hmr: {
    //         host: "192.168.1.100",
    //     },
    // },
    optimizeDeps: {
        include: ["@emoji-mart/react", "@emoji-mart/data"],
    },
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});
