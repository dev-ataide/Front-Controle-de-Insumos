module.exports = {
  async rewrites() {
    return [
      {
        source: '/files/:path*',
        destination: '/files/:path*', // Use the same path as the source
      },
    ];
  },
};
