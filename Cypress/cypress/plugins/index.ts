import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: any) {
      // Initialize a storage object
      let storage = {
        formData: {},
      };

      // Register tasks
      on("task", {
        // Task to set form data
        setFormData(data: any) {
          storage.formData = { ...storage.formData, ...data };
          return null;
        },
        // Task to get form data
        getFormData() {
          return storage.formData;
        },
        // Task to reset form data
        resetFormData() {
          storage.formData = {};
          return null;
        },
      });

      return config;
    },
  },
});
