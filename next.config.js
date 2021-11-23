module.exports = {
  reactStrictMode: true,




  async redirects() {
    return [
      {
        source: '/doodles',
        destination: '/',
        permanent: true,
      },
    ]
  },




}
