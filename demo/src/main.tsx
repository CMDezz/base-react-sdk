import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// import "../../src/index.tsx";
const sdkUri = import.meta.env.VITE_SDK_URI;
// const env = import.meta.env;

async function loadSDK() {
  if (import.meta.env.DEV) {
    await import('../../src/index.tsx');
    // await import(sdkUri);
  } else {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = sdkUri;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error(`Failed to load SDK from ${sdkUri}`));
      document.head.appendChild(script);
    });
  }
}

async function BoostDemoApp() {
  try {
    await loadSDK();

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (err) {
    console.error('SDK boost failed', err);
  }
}

BoostDemoApp();
