import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.findash',
  appName: 'FinDash',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    // When developing with a hosted URL, uncomment and set:
    // url: 'https://your-hosted-dashboard.example.com',
    // cleartext: false
  }
};

export default config;
