export const getEnvVariables = () => {
  // import.meta.env;
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_WS_URL: import.meta.env.VITE_WS_URL
  };
};
