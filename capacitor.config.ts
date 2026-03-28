import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.sansaar',
  appName: 'Sansaar',
  webDir: 'dist',
  server: {
    url: 'https://528caf31-3775-493a-8abe-ced1cbeb85f9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
