const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, { isServer }) => {
      // Enable WebAssembly support
      config.experiments = {
        asyncWebAssembly: true,
        layers: true, // Enable the layers experiment
      };
  
      // Handle the case where you may need fallbacks
      if (!isServer) {
        config.resolve.fallback = {
          fs: false, // Prevents issues with fs module on client-side
        };
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  