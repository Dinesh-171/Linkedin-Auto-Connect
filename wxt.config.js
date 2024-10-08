import { defineConfig } from 'wxt'; // Import the defineConfig function from wxt.

// Export the configuration for the Chrome extension.
export default defineConfig({
  manifest: {
    manifest_version: 3, // Use Manifest V3 for the extension.
    name: 'LinkedIn Auto Connect',
    version: '1.0',
    description: 'Automatically send connection requests on LinkedIn.',
    author : 'Dinesh Padhi',
    "icons": {
      "16": "icon/icon16.png",
      "32": "icon/icon32.png",
      "48": "icon/icon48.png",
      "96": "icon/icon96.png"
    },
    action: {
      default_popup: 'entrypoints/popup/index.html', // Popup displayed when the extension icon is clicked.
      "default_icon": {
    "16": "icon/icon16.png",
    "32": "icon/icon32.png",
    "48": "icon/icon48.png",
    "96": "icon/icon96.png"
  }
    },
    background: {
      service_worker: 'entrypoints/background.js' // Background script for event handling.
    },
    permissions: [
      'activeTab', // Allows interaction with the active tab.
      'scripting', // Enables script injection.
      'storage', // Access to storage for saving data.
    ],
  }
});
