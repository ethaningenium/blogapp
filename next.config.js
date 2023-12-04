/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paulvanderlaken.files.wordpress.com',
        port: '',
        pathname: '/2020/02/post-box-11.jpg',
      },
      {
        protocol: 'https',
        hostname: 'www.artaigallery.com',
        port: '',
        pathname: '/cdn/shop/products/Game_of_Nature_img_0_1080x.jpg',
      },
    ],
  },
}

module.exports = nextConfig
