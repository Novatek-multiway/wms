declare global {
  interface Window {
    message: {
      error: (msg: string) => void;
    };
  }
}
