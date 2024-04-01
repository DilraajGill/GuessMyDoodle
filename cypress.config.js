import { defineConfig } from "cypress";
import { updateUserPoints, deleteUser } from "./models/Database.js";

export default defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      on("task", {
        async updateUserPoints({ username, points }) {
          await updateUserPoints(username, points);
          return null;
        },
        async deleteUser({ username }) {
          return await deleteUser(username);
        },
      });
      return config;
    },
  },
});
