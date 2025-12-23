declare global {
  // Note the capital "W"
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EkycInstance: any;
  }
}

window.MyNamespace = window.EkycInstance || {};
