import App from './App.tsx';
// import '@shared/styles/index.css';
import { render } from 'preact/compat';

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
    render(<App />, document.getElementById('root')!);
  } catch (err) {
    console.error('SDK boost failed', err);
  }
}

BoostDemoApp();
